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


/**
 * Class ActiveTimeService
 * @package AppBundle\Services
 */
class ActiveTimeService
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
     * This function is return average active time
     *
     * @param $id
     * @return int|void
     */
    public function activeTime($id)
    {
        if (!$id || !is_numeric($id))
        {
            return;
        }
        $count = 0;
        $timesAdd = [];

        $userGoalTimes = $this->em->getRepository('AppBundle:UserGoal')->findActiveTimes($id);
        if ($userGoalTimes)
        {
            foreach($userGoalTimes as $time){
                if($time['doDate'] && gettype($time['doDate']) == 'object'){
                    $timesAdd[] = $time['doDate']->format('H');
                    $count++;
                };

                if($time['completionDate'] && gettype($time['completionDate']) == 'object'){
                    $timesAdd[] = $time['completionDate']->format('H');
                    $count++;
                };

                if($time['listedDate'] && gettype($time['listedDate']) == 'object'){
                    $timesAdd[] = $time['listedDate']->format('H');
                    $count++;
                }

            }
        }

        $successStoryTimes = $this->em->getRepository('AppBundle:SuccessStory')->findActiveTimes($id);

        if($successStoryTimes){
            foreach($successStoryTimes as $time){
                if($time['updated'] && gettype($time['updated']) == 'object'){
                    $timesAdd[] = $time['updated']->format('H');
                    $count++;
                };
            }
        }

        if($count){
//            $activeTime = (int) floor($timesAdd/$count);
            //sorting array
            asort($timesAdd);
            $currentTime = 0;
            $currentCount = 0;
            $maxCount = 0;
            foreach($timesAdd as $time){
                if($time != $currentTime){
                    $currentTime = $time;
                    $currentCount = 1;
                }else{
                    $currentCount++;
                }
                if($currentCount > $maxCount){
                    $maxCount = $currentCount;
                    $activeTime = $time;
                }
            }
        }else{
            $activeTime = 0;
        }

        return $activeTime;
    }
}