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
        ],
        'Application\CommentBundle\Entity\Comment' => [
            'function' => 'getCommentNewFeed',
            'idsArray' => 'commentsIds',
            'entities' => 'comments'
        ],
        'AppBundle\Entity\SuccessStory' => [
            'function' => 'getSuccessStoryNewFeed',
            'idsArray' => 'successStoryIds',
            'entities' => 'successStory'
        ]
    ];

    protected $users ;

    protected $goalIds          = [];
    protected $goals            = [];

    protected $userGoalIds      = [];
    protected $userGoals        = [];

    protected $commentsIds      = [];
    protected $comments         = [];

    protected $successStoryIds  = [];
    protected $successStory     = [];

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
     * @return array
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

        $newsFeed = [];

        foreach($entityLogs as $entityLog){
            $functionName = $this->mapper[$entityLog->getObjectClass()]['function'];
            $newFeed = $this->$functionName($entityLog);
            if ($newFeed){
                $newsFeed[] = $newFeed;
            }
        }

        return $newsFeed;
    }

    /**
     * @param $entityLog
     * @return NewFeed|null
     */
    private function getUserGoalNewFeed($entityLog)
    {
        if (!isset($this->userGoals[$entityLog->getObjectId()]) || !isset($this->users[$entityLog->getUsername()])){
            return null;
        }

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
            $newFeed->user = $this->users[$entityLog->getUsername()];

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
        if (!isset($this->goals[$entityLog->getObjectId()]) || !isset($this->users[$entityLog->getUsername()])){
            return null;
        }

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

    /**
     * @param $entityLog
     * @return NewFeed|null
     */
    private function getSuccessStoryNewFeed($entityLog)
    {
        if (!isset($this->successStory[$entityLog->getObjectId()]) || !isset($this->users[$entityLog->getUsername()])){
            return null;
        }

        if ($entityLog->getAction() == "create")
        {
            $successStory = $this->successStory[$entityLog->getObjectId()];
            $newFeed = new NewFeed();
            $newFeed->action = $this->trans->trans('goal.success_story', array(), 'newsFeed');
            $newFeed->datetime = $entityLog->getLoggedAt();
            $newFeed->goal = $successStory->getGoal();
            $newFeed->user = $this->users[$entityLog->getUsername()];
            $newFeed->successStory = $successStory;

            return $newFeed;
        }

        return null;
    }

    /**
     * @param $entityLog
     * @return NewFeed|null
     */
    private function getCommentNewFeed($entityLog)
    {
        if (!isset($this->comments[$entityLog->getObjectId()]) || !isset($this->users[$entityLog->getUsername()])){
            return null;
        }

        if ($entityLog->getAction() == "create")
        {
            $comment = $this->comments[$entityLog->getObjectId()];
            if (isset($this->goals[$comment->getThread()->getId()])){
                $goal = $this->goals[$comment->getThread()->getId()];
            }
            else {
                $goal = $this->em->getRepository('AppBundle:Goal')->find($comment->getThread()->getId());
            }

            if (!$goal){
                return null;
            }

            $newFeed = new NewFeed();
            $newFeed->action = $this->trans->trans('goal.comment', array(), 'newsFeed');
            $newFeed->datetime = $entityLog->getLoggedAt();
            $newFeed->goal = $goal;
            $newFeed->user = $this->users[$entityLog->getUsername()];
            $newFeed->comment = $comment;

            return $newFeed;
        }

        return null;
    }
}

