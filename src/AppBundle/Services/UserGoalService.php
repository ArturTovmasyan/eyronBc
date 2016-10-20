<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 10/20/16
 * Time: 11:39 AM
 */

namespace AppBundle\Services;

use AppBundle\Entity\Goal;
use AppBundle\Entity\UserGoal;
use Application\UserBundle\Entity\Badge;
use Application\UserBundle\Entity\User;
use Doctrine\ORM\EntityManager;

class UserGoalService extends AbstractProcessService
{
    /**
     * @var EntityManager
     */
    private $em;

    /**
     * UserGoalService constructor.
     * @param EntityManager $em
     */
    public function __construct(EntityManager $em)
    {
        $this->em = $em;
    }


    public function listedBy()
    {
        
    }

    /**
     * @param Goal $goal
     * @param User $user
     * @param $isDone
     * @return bool
     */
    public function doneBy(Goal $goal, User $user, $isDone)
    {
        if($isDone){
            $status = UserGoal::COMPLETED;
            $completionDate = new \DateTime('now');
        }
        else {
            $status = UserGoal::ACTIVE;
            $completionDate = null;
        }

        $newDone = true;
        $userGoal = $this->em->getRepository("AppBundle:UserGoal")->findByUserAndGoal($user->getId(), $goal->getId());

        if(!$userGoal){
            $userGoal = new UserGoal();
            $userGoal->setGoal($goal);
            $userGoal->setUser($user);
            $userGoal->setIsVisible(true);
        }
        else {
            $newDone = !($userGoal->getStatus() == UserGoal::COMPLETED);
        }

        $userGoal->setStatus($status);
        $userGoal->setCompletionDate($completionDate);

        $this->em->persist($userGoal);
        $this->em->flush();

        // check if status is completed, and author is not admin
        if($isDone && $goal->getAuthor() && !$goal->getAuthor()->isAdmin()){

            // add score for inovator
            $this->runAsProcess('bl.badge.service', 'addScore',
                array(Badge::TYPE_INNOVATOR, $goal->getAuthor()->getId(), 1));

        }

        return $newDone;

    }

    /**
     * @param $userGoalId
     * @param User $user
     * @return mixed
     */
    public function deleteUserGoal($userGoalId, User $user)
    {
        $userGoal = $this->em->getRepository("AppBundle:UserGoal")->find($userGoalId);

        // get goal author
        $author = $userGoal->getGoal()->getAuthor();

        $msg = $this->em->getRepository('AppBundle:UserGoal')->removeUserGoal($user->getId(), $userGoal);

        // check if status is completed, and author is not admin
        if(is_numeric($msg) && $author && !$author->isAdmin()){

            $score = $userGoal->getStatus() == UserGoal::COMPLETED ? 2 : 1;

            // add score for inovator
            $this->runAsProcess('bl.badge.service', 'removeScore',
                array(Badge::TYPE_INNOVATOR, $author->getId(), $score));
        }

        return $msg;

    }

}