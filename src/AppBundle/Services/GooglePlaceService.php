<?php

namespace AppBundle\Services;

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
    protected $googleApyKey;

    /**
     * NotifyAboutDoneGoalByPlaceService constructor.
     * @param EntityManager $em
     * @param $googleApyKey
     */
    public function __construct(EntityManager $em, $googleApyKey)
    {
        $this->em = $em;
        $this->googleApyKey = $googleApyKey;
    }

    /**
     * This function is used to get place data and notify about goal done
     *
     * @param $latitude
     * @param $longitude
     * @return mixed
     */
    private function getPlace($latitude, $longitude)
    {
        //get google client id
        $key = $this->googleApyKey;

        //concat latitude and longitude by comma for api
        $latLng = $latitude.','.$longitude;

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

            foreach ($places as $place)
            {
                //remove all spaces in word
                $placeArray[] = strtolower(trim($place));
            }

            return $placeArray;
        }

        return null;
    }

    /**
     * This function is used to get all goal by place 
     *
     * @param $latitude
     * @param $longitude
     * @param $userId
     * @return null|Response
     */
    public function getAllGoalsByPlace($latitude, $longitude, $userId)
    {
        //get place by coordinate
        $place = $this->getPlace($latitude, $longitude);

        //check if place not exist
        if ($place) {

            //get goal by place
            $goals = $this->em->getRepository('AppBundle:Goal')->findAllByPlace($place, $userId);

            return $goals;
        }

        return null;
    }
}