<?php

namespace AppBundle\Services;

use AppBundle\Entity\Place;
use AppBundle\Entity\UserGoal;
use AppBundle\Entity\UserPlace;
use Application\UserBundle\Entity\User;
use Doctrine\ORM\EntityManager;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class GooglePlaceService
{
    const url = 'https://maps.googleapis.com/maps/api/geocode/json';

    /**
     * @var EntityManager
     */
    protected $em;

    /**
     * @var string
     */
    protected $googleServerKey;

    /**
     * NotifyAboutDoneGoalByPlaceService constructor.
     * @param EntityManager $em
     * @param $googleServerKey
     */
    public function __construct(EntityManager $em, $googleServerKey)
    {
        $this->em = $em;
        $this->googleServerKey = $googleServerKey;
    }

    /**
     * This function is used to get place data and notify about goal done
     *
     * @param $latitude float
     * @param $longitude float
     * @return mixed
     */
    private function getPlace($latitude, $longitude)
    {
        //get google client id
        $key = $this->googleServerKey;

        //concat latitude and longitude by comma for api
        $latLng = trim($latitude).','.trim($longitude);

        //generate geo coding url for get place data by lang and long
        $url = sprintf('%s?latlng=%s&sensor=false&language=en&result_type=locality|country&key=%s', self::url, $latLng, $key);

        //use curl for get response
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-type: application/json'));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

        //get response
        $response = curl_exec($ch);

        //check if response not exist
        if ($response === false) {
            throw new \InvalidArgumentException('Invalid geo coding results');
        }

        //close curl
        curl_close($ch);

        //json decode data
        $response = json_decode($response);

        //get result
        $results = $response->results;

        if (!empty($results)) {

            //get place
            $place = $results[0]->formatted_address;

            //explode place data by comma
            $places = explode(',', $place);

            //set default array
            $placeArray=[];

            foreach ($places as $key => $place)
            {
                if ($key == 0) {
                    $type = 'city';
                } else {
                    $type = 'country';
                }

                //remove all spaces in word
                $placeArray[$type] = strtolower(trim($place));
            }

            return $placeArray;
        }

        return null;
    }

    /**
     * This function is used to get all goal by place without confirmed userGoals
     * @param $latitude float
     * @param $longitude float
     * @param User $user
     * @return mixed|null
     */
    public function getAllGoalsByPlace($latitude, $longitude, User $user)
    {
        //get place by coordinate
        $places = $this->getPlace($latitude, $longitude);

        //check if place not exist
        if ($places) {

            //crete Place and UserPlace for user
            $this->createUserPlaceForUser($places, $latitude, $longitude, $user);

            //get goal by place
            $goals = $this->em->getRepository('AppBundle:Goal')->findAllByPlace($places, $user->getId());

            return $goals;
        }

        return null;
    }

    /**
     * This function is used to create place with userPlace for user
     * 
     * @param $places
     * @param $latitude
     * @param $longitude
     * @param User $user
     */
    public function createUserPlaceForUser($places, $latitude, $longitude, User $user)
    {
        //define entity manager
        $em = $this->em;

        //get all places in DB
        $placesInDb = $this->em->getRepository('AppBundle:Place')->findByNamesAndUserId($places, $user->getId());

        //check if place exists
        if ($placesInDb) {

            foreach ($placesInDb as $place)
            {
                //check if user not related with place
                if(!$place['related']) {
                    //create userPlace
                    $userPlace = new UserPlace();
                    $userPlace->setLatitude($latitude);
                    $userPlace->setLongitude($longitude);
                    $userPlace->setPlace($place[0]);
                    $userPlace->setUser($user);
                    $em->persist($userPlace);
                }
            }
        }
        else {

            //get all placeType index by name
            $placeType = $em->getRepository('AppBundle:PlaceType')->findIndexByName();

            foreach ($places as $key => $place)
            {
                //create new place
                $newPlace = new Place();
                $newPlace->setName($place);
                $newPlace->setPlaceType($placeType[$key]);
                $em->persist($newPlace);

                //create userPlace
                $userPlace = new UserPlace();
                $userPlace->setLatitude($latitude);
                $userPlace->setLongitude($longitude);
                $userPlace->setUser($user);
                $userPlace->setPlace($newPlace);
                $em->persist($userPlace);
            }
        }

        $em->flush();
    }
}