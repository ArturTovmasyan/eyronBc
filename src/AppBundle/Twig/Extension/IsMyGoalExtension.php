<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 10/15/15
 * Time: 4:46 PM
 */

namespace AppBundle\Twig\Extension;
use AppBundle\Entity\Goal;
use AppBundle\Entity\UserGoal;
use Application\UserBundle\Entity\User;

/**
 * Class IsMyGoalExtension
 * @package AppBundle\Twig\Extension
 */
class IsMyGoalExtension extends \Twig_Extension
{
    /**
     * @return array
     */
    public function getFunctions()
    {
        return array(
            new \Twig_SimpleFunction('isMyGoal', array($this, 'isMyGoal'))
        );
    }

    /**
     * @param Goal $goal
     * @param User $user
     * @param $type
     * @return bool
     */
    public function isMyGoal(Goal $goal, User $user, $type)
    {
        // get user goals
        $userGoals = $user->getUserGoal();

        // check user count
        if($userGoals->count() > 0){

            // get array from persist collection
            $userGoalsArray = $userGoals->toArray();

            // check if in array
            if(array_key_exists($goal->getId(), $userGoalsArray)){

                // get user current goal
                $userGoal = $userGoalsArray[$goal->getId()];

                // if for add ro list return true
                if($type == "add" || $userGoal ->getStatus() == UserGoal::COMPLETED ){
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'bl_is_my_goal_extension';
    }
}