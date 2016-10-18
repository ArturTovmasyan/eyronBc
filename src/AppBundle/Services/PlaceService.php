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
     * This function is used to create place by coordinate
     *
     * @param $latitude float
     * @param $longitude float
     * @param User $user
     */
    public function createPlace($latitude, $longitude, User $user)
    {
        //set default value
        $sendGoogleRequest = true;

        //get places
        $places = $this->em->getRepository('AppBundle:Place')->findAllByBounds($latitude, $longitude);

        //get place Ids
        $placeIds = array_map(function($item){return $item['id'];}, $places);

        if ($places) {

            // check if place data is city and country
            if(count($places) == 2 &&
                reset($places)['place_type'] != end($places)['place_type']){

                $sendGoogleRequest = false;
            }
        }

        //check if sendGoogleRequest is true or places not exist
        if (!$places || $sendGoogleRequest) {

            //get places in google, create and return ids
            $placeIds = $this->googlePlaceService->getPlace($latitude, $longitude, true);
        }

        //create UserPlace for user
        $this->createUserPlace($placeIds, $latitude, $longitude, $user);
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