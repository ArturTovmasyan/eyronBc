<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 10/20/16
 * Time: 3:01 PM
 */

namespace AppBundle\Services;
use Application\UserBundle\Entity\Badge;
use Application\UserBundle\Entity\User;
use Doctrine\ORM\EntityManager;

/**
 * Class GoalService
 * @package AppBundle\Services
 */
class GoalService extends AbstractProcessService
{
    /**
     * @var EntityManager
     */
    private $em;

    /**
     * GoalService constructor.
     * @param $em
     */
    public function __construct(EntityManager $em)
    {
        $this->em = $em;
    }


    /**
     * @param $service
     * @param $function
     * @param array $arguments
     */
    public function addBadgeForPublish($service, $function, array $arguments)
    {
        // add score for innovator
        $this->runAsProcess($service, $function, $arguments);

    }

    /**
     * @param User $user
     * @return mixed
     */
    public function getUnConfirmGoals(User $user)
    {
        $goals = $this->em->getRepository("AppBundle:Goal")->findUserUnConfirmInPlace($user);

        //
        $addBadge = 0;

        //set confirm default value
        $confirm = false;

        //check if goals exist
        if ($goals) {

            //confirm done goal
            foreach ($goals as $goal)
            {
                //get user goal by user id
                $userGoals = $goal->getUserGoal();

                //get current user userGoal
                $relatedUserGoal = $userGoals->filter(function ($item) use ($user) {
                    return $item->getUser() == $user ? true : false;
                });

                //check if user have user goal
                if ($relatedUserGoal->count() > 0) {
                    //get related user goal
                    $userGoal = $relatedUserGoal->first();
                    //check if user goal is not completed
                    if (!$userGoal->getConfirmed()) {

                        //confirmed done goal for user
                        $userGoal->setConfirmed(true);

                        $places = $goal->getPlace()->toArray();

                        array_map(function($place) use (&$addBadge){
                            $type = $place->getPlaceType(); // get type
                            $typeName = $type->getName(); // get name

                            if($typeName == 'country'){
                                $addBadge+= 5;

                            }elseif ($typeName == 'city'){
                                $addBadge+= 2;

                            }else{
                                $addBadge+= 1;
                            }

                        }, $places);

                        //set confirm value
                        $confirm = true;

                        $this->em->persist($userGoal);
                    }
                }
            }
            //check if user has confirmed goal
            if ($confirm) {
                $this->em->flush();
                $this->em->clear();
            }
        }

        if($addBadge > 0){

            // add score for innovator
            $this->addBadgeForPublish('bl.badge.service', 'addScore',
                array(Badge::TYPE_TRAVELLER, $user->getId(), $addBadge));
        }

        return $goals;
    }

}
