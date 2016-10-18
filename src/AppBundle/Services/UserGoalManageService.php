<?php

namespace AppBundle\Services;

use Doctrine\ORM\EntityManager;

class UserGoalManageService
{
    /**
     * @var EntityManager
     */
    protected $em;

    /**
     * UserGoalManageService constructor.
     * @param EntityManager $em
     */
    public function __construct(EntityManager $em)
    {
        $this->em = $em;
    }

    /**
     * This function is used to set user goal remove LAST date in user
     * 
     * @param $userGoals array
     */
    public function setUserGoalRemoveDate($userGoals)
    {
        foreach ($userGoals as $userGoal)
        {
            //get user
            $user = $userGoal->getUser();

            //set userGoal remove date in user
            $user->setUserGoalRemoveDate(new \DateTime());

            $this->em->persist($user);
        }
    }
}