<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 9/11/15
 * Time: 1:29 PM
 */

namespace AppBundle\Services;

use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\DependencyInjection\Container;
use Symfony\Component\Validator\Constraints\DateTime;


/**
 * Class GoalPercentService
 * @package AppBundle\Services
 */
class GoalPercentService
{
    /**
     * @var \Symfony\Component\DependencyInjection\Container
     */
    protected  $container;

    /**
     * @var
     */
    protected $em;

    /**
     * @param Container $container
     */
    public function __construct(Container $container)
    {
        $this->container = $container;
        $this->em = $container->get('doctrine')->getManager();
    }

    /**
     * This function is return goal completed percent
     *
     * @param $id
     * @return int|void
     */
    public function getPercent($id)
    {
        if (!$id || !is_numeric($id))
        {
            return;
        }

        $userGoal = $this->em->getRepository('AppBundle:UserGoal')->find($id);

        //if goal is completed
        if($userGoal->getStatus() == 2){
            $percent['time'] = 100;
            $percent['steps'] = 100;
        }else{
            //if goal have listed and do dates
            if($userGoal->getListedDate() && $userGoal->getDoDate()){
                $time1 = $userGoal->getListedDate();
                $time2 = $userGoal->getDoDate();
                $limit = date_diff($time2,$time1)->d;
                $time3 = new \DateTime('now');
                $currentLimit = date_diff($time3,$time1)->d;

                if($currentLimit > $limit){
                    $percent['time'] = 0;
                }else{
                    $percent['time'] = (int)floor((100/$limit)*$currentLimit);
                }
            }else{
                $percent['time'] = 0;
            }
            $percent['steps'] = (int)floor($userGoal->getCompleted());
        }


        return $percent;
    }

    /**
     * This function is return user goals percents
     *
     * @param $id
     * @return int|void
     */
    public function userGoalsPercent($id)
    {
        if (!$id || !is_numeric($id))
        {
            return;
        }
        $user = [];

        $userGoals = $this->em->getRepository('AppBundle:UserGoal')->findBy(array('user' => $id));
        if($userGoals) {
            foreach ($userGoals as $userGoal) {
                $percent = $this->getPercent($userGoal->getId());
                if ($percent['time'] == $percent['steps']) {
                    if ($percent['time'] == 100) {
                        $user['complated'][] = $userGoal->getId();
                    } elseif ($percent['time'] == 0) {
                        $user['noPercent'][] = $userGoal->getId();
                    } else {
                        $user['ok'][] = $userGoal->getId();
                    }
                } else {
                    if ($percent['time'] > $percent['steps']) {
                        $user['late'][] = [
                            'id' => $userGoal->getId(),
                            'percent' => $percent
                        ];
                    } else {
                        $user['good'][] = [
                            'id' => $userGoal->getId(),
                            'percent' => $percent
                        ];
                    }
                }
            }
        }

        return $user;
    }

}