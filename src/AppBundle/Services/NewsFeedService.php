<?php
/**
 * Created by PhpStorm.
 * User: pc-4
 * Date: 11/13/15
 * Time: 1:39 PM
 */
namespace AppBundle\Services;


use AppBundle\Entity\UserGoal;
use AppBundle\Model\NewFeed;
use Symfony\Component\DependencyInjection\Container;

class NewsFeedService
{
    private $mapper = [
        'AppBundle\Entity\Goal' => [
                'function' => 'getGoalNewFeed',
                'idsArray' => 'goalIds',
                'entities' => 'goals'
            ],
        'AppBundle\Entity\UserGoal' => [
                'function' => 'getUserGoalNewFeed',
                'idsArray' => 'userGoalIds',
                'entities' => 'userGoals'
            ]
    ];

    protected $users ;

    protected $goalIds     = [];
    protected $goals       = [];

    protected $userGoalIds = [];
    protected $userGoals   = [];


    protected $container;
    protected $em;
    protected $trans;

    /**
     * @param Container $container
     */
    public function __construct(Container $container)
    {
        $this->container = $container;
        $this->em = $container->get('doctrine')->getManager();
        $this->trans = $container->get('translator');
    }

    /**
     * @param $entityLogs
     */
    public function getNewsFeed($entityLogs)
    {
        $userUsernames = [];
        //Get logged entities ids in corresponding arrays
        foreach($entityLogs as $entityLog){
            $idsArray = $this->mapper[$entityLog->getObjectClass()]['idsArray'];
            array_push($this->$idsArray, $entityLog->getObjectId());
            $userUsernames[] = $entityLog->getUsername();
        }

        //Get users who perform that actions
        $userUsernames = array_unique($userUsernames);
        $this->users = $this->em->getRepository('ApplicationUserBundle:User')->findByUsernames($userUsernames);

        //Unique ids array and get corresponding objects
        foreach($this->mapper as $className => $singleMapper){
            $idsArray = $singleMapper['idsArray'];
            $this->$idsArray = array_unique($this->$idsArray);

            $objectArray = $singleMapper['entities'];
            $this->$objectArray = $this->em->getRepository($className)->findByIdsWithRelations($this->$idsArray);
        }

        foreach($entityLogs as $entityLog){
            $functionName = $this->mapper[$entityLog->getObjectClass()]['function'];
            $newFeed = $this->$functionName($entityLog);
            if ($newFeed){
                dump($newFeed);
            }



        }

        exit;
    }

    /**
     * @param $entityLog
     * @return null
     */
    private function getUserGoalNewFeed($entityLog)
    {
        $userGoal = $this->userGoals[$entityLog->getObjectId()];
        if ($entityLog->getAction() == "create" &&
            $userGoal->getGoal()->getAuthor()->getId() == $userGoal->getUser()->getId()){
                return null;
        }

        if ($entityLog->getAction() == "create" ||
            ($entityLog->getAction() == "update" && isset($entityLog->getData()['status']) && $entityLog->getData()['status'] == UserGoal::COMPLETED)){

            $newFeed = new NewFeed();
            if ($entityLog->getData()['status'] == UserGoal::COMPLETED){
                $newFeed->action = $this->trans->trans('goal.complete', array(), 'newsFeed');
            }
            else {
                $newFeed->action = $this->trans->trans('goal.add', array(), 'newsFeed');
            }
            $newFeed->datetime = $entityLog->getLoggedAt();
            $newFeed->goal = $userGoal->getGoal();
            $newFeed->user = $userGoal->getUser();

            return $newFeed;
        }

        return null;
    }

    /**
     * @param $entityLog
     * @return NewFeed|null
     */
    private function getGoalNewFeed($entityLog)
    {
        if ($entityLog->getAction() == "create")
        {
            $newFeed = new NewFeed();
            $newFeed->action = $this->trans->trans('goal.create', array(), 'newsFeed');
            $newFeed->datetime = $entityLog->getLoggedAt();
            $newFeed->goal = $this->goals[$entityLog->getObjectId()];
            $newFeed->user = $this->users[$entityLog->getUsername()];

            return $newFeed;
        }

        return null;
    }
}

