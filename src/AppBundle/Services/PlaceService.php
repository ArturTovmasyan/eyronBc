<?php

namespace AppBundle\Services;

use AppBundle\Entity\PlaceType;
use AppBundle\Entity\UserPlace;
use Application\UserBundle\Entity\User;
use Doctrine\ORM\EntityManager;

class PlaceService
{
    /**
     * @var GooglePlaceService
     */
    protected $googlePlaceService;

    /**
     * @var EntityManager
     */
    protected $em;

    /**
     * NotifyAboutDoneGoalByPlaceService constructor.
     * @param GooglePlaceService $googlePlaceService
     * @param EntityManager $em
     */
    public function __construct(GooglePlaceService $googlePlaceService, EntityManager $em)
    {
        $this->googlePlaceService = $googlePlaceService;
        $this->em = $em;
    }

    /**
     * This function is used to get all goal by place without confirmed userGoals
     *
     * @param $latitude float
     * @param $longitude float
     * @param User $user
     * @return mixed|null
     */
    public function getAllGoalsByPlace($latitude, $longitude, User $user)
    {
        //set default value
        $sendGoogleRequest = false;

        //set default placeIds value
        $placeIds = [];

        //get places
        $places = $this->em->getRepository('AppBundle:Place')->findAllByBounds($latitude, $longitude);

        if ($places) {

            //get place Ids
            $placeIds = array_keys($places);

            //check if need to send request in google
            if(count($places) > 2 || (count($places) == 1 &&
               reset($places)['place_type'] == PlaceType::TYPE_COUNTRY)) {

                $sendGoogleRequest = true;
            }

            //check if sendGoogleRequest not exist
            if (!$sendGoogleRequest) {

                //get places value in array
                $placesValue = array_values($places);

                if(count($placesValue) == 2) {

                    //check if in array exist 2 similar types
                    if ($placesValue[0]['place_type'] == $placesValue[1]['place_type']) {
                        $sendGoogleRequest = true;
                    }
                }
            }
        }

        //check if sendGoogleRequest is true or places not exist
        if (!$places || $sendGoogleRequest) {

            //get places in google, create and return ids
            $placeIds = $this->googlePlaceService->getPlace($latitude, $longitude, true);
        }

        //create UserPlace for user
        $this->createUserPlace($placeIds, $latitude, $longitude, $user);

        //get goal by place
        $goals = $this->em->getRepository('AppBundle:Goal')->findAllByPlaceIds($placeIds, $user->getId());

        return $goals;

    }

    /**
     * This function is used to create userPlace for user
     *
     * @param $placesIds
     * @param $latitude
     * @param $longitude
     * @param User $user
     */
    private function createUserPlace($placesIds, $latitude, $longitude, User $user)
    {
        //get all places in DB
        $places = $this->em->getRepository('AppBundle:Place')->findAllByIds($placesIds, $user->getId());

        //check if place exists
        if ($places) {

            foreach ($places as $place)
            {
                //check if user not related with place
                if(!$place['related']) {
                    //create userPlace
                    $userPlace = new UserPlace();
                    $userPlace->setLatitude($latitude);
                    $userPlace->setLongitude($longitude);
                    $userPlace->setPlace($place[0]);
                    $userPlace->setUser($user);
                    $this->em->persist($userPlace);
                }
            }

            $this->em->flush();
        }
    }
}