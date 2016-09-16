<?php

namespace AppBundle\Services;

use AppBundle\Entity\UserGoal;
use Application\UserBundle\Entity\User;
use Doctrine\ORM\EntityManager;
use Symfony\Bundle\TwigBundle\TwigEngine;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Route;

class NotifyAboutDoneGoalByPlaceService
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
    public function getPlace($latitude, $longitude)
    {
        //get google client id
        $key = $this->googleApyKey;

        //concat latitude and longitude by comma for api
        $latlng = $latitude.','.$longitude;

        //generate geo coding url for get place data by lang and long
        $url = sprintf('%s?latlng=%s&sensor=true&language=en&result_type=locality&key=%s', self::url, $latlng, $key);

        // use curl for get response
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-type: application/json'));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

        //get response
        $response = curl_exec($ch);

        //check if response not exist
        if($response === false) {
            throw new NotFoundHttpException('Place data not found');
        }

        //close curl
        curl_close($ch);

        //json decode data
        $response = json_decode($response, true);

        if(array_key_exists('results', $response)) {

            //get results in response
            $results = reset($response['results']);

            //get place data in results
            $place = $results['formatted_address'];


            //explode place data by comma
            $places = explode(',', $place);

            //set default array
            $placeArray=[];

            foreach ($places as $place)
            {
                //remove all spaces in word
                $placeArray[] = trim($place);
            }

            return $placeArray;
        }

        return null;
    }

    /**
     * This function is used to confirmed done goal by place and notify user about it
     *
     * @param $latitude
     * @param $longitude
     * @param User $user
     * @return null|Response
     */
    public function confirmedDoneGoalByPlace($latitude, $longitude, User $user)
    {
        //get place by coordinate
        $place = $this->getPlace($latitude, $longitude);

        //get entity manager
        $em = $this->em;

        //get current user id
        $userId = $user->getId();
        
        //check if place not exist
        if($place) {

            //get goal by place
            $goals = $this->em->getRepository('AppBundle:Place')->findGoalByPlace($place);

//            //set default array value
//            $userIds = [];
//
//            foreach($goals as $goal)
//            {
//                $goalByPlace = $goal['goal'];
//
//                $userIds[] = $goal['user_id'];
//
//                if(in_array($userId, $userIds)) {
//
//                    continue;
//                }
//                else{
//
//                    $userGoal = new UserGoal();
//                    $userGoal->setUser($user);
//                    $userGoal->setGoal($goalByPlace);
//                    $userGoal->setStatus(UserGoal::COMPLETED);
//                    $userGoal->setCompletionDate(new \DateTime('now'));
//
//                    $em->persist($userGoal);
//                }
//            }
//
//            $em->flush();

            return $goals;
        }

        return null;
    }
}