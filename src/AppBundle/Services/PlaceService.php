<?php

namespace AppBundle\Services;

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
        //get place by coordinate
        $places = $this->googlePlaceService->getPlace($latitude, $longitude);

        //check if place not exist
        if ($places) {

            //crete UserPlace for user
            $this->createUserPlace($places, $latitude, $longitude, $user);

            //get goal by place
            $goals = $this->em->getRepository('AppBundle:Goal')->findAllByPlace($places, $user->getId());

            return $goals;
        }

        return null;
    }

    /**
     * This function is used to create userPlace for user
     *
     * @param $places
     * @param $latitude
     * @param $longitude
     * @param User $user
     */
    private function createUserPlace($places, $latitude, $longitude, User $user)
    {
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
                    $this->em->persist($userPlace);
                }
            }
            
            $this->em->flush();
        }
    }
}