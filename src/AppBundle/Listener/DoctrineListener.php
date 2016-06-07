<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 10/6/15
 * Time: 2:59 PM
 */

namespace AppBundle\Listener;

use AppBundle\Entity\Goal;
use AppBundle\Entity\GoalImage;
use AppBundle\Entity\NewFeed;
use AppBundle\Entity\SuccessStory;
use AppBundle\Entity\UserGoal;
use AppBundle\Model\ActivityableInterface;
use Application\CommentBundle\Entity\Comment;
use Application\UserBundle\Entity\User;
use Doctrine\Common\Persistence\Event\LifecycleEventArgs;
use Doctrine\ORM\Event\OnFlushEventArgs;
use Doctrine\ORM\Event\PostFlushEventArgs;
use Gedmo\Loggable\Entity\LogEntry;
use Symfony\Component\DependencyInjection\Container;

class DoctrineListener
{
    /**
     * @var
     */
    protected $container;

    protected $tokeStorage;

    protected $loadUserStats = true;

    protected $setIsMyGoal = true;


    public function disableUserStatsLoading()
    {
        $this->loadUserStats = false;
    }

    public function enableUserStatsLoading()
    {
        $this->loadUserStats = true;
    }

    public function disableIsMyGoalLoading()
    {
        $this->setIsMyGoal = false;
    }

    public function enableIsMyGoalLoading()
    {
        $this->setIsMyGoal = true;
    }


    /**
     * @param Container $container
     */
    function __construct(Container $container)
    {
        $this->container = $container;
        $this->tokeStorage = $container->get('security.token_storage');
    }

    /**
     * @param LifecycleEventArgs $event
     */
    public function postLoad(LifecycleEventArgs $event)
    {
        if ($token = $this->container->get('security.token_storage')->getToken()){

            $em = $this->container->get('doctrine')->getManager();
            $entity = $event->getObject();

            if ($entity instanceof Goal){

                $user = $token->getUser();

                $shareLink = $this->container->get('router')->generate('inner_goal', array('slug' => $entity->getSlug()));
                $entity->setShareLink($shareLink);

                if ($user instanceof User && $this->setIsMyGoal) {

                    $userGoalsArray = $em->getRepository('AppBundle:UserGoal')->findUserGoals($user->getId());

                    if (count($userGoalsArray) > 0) {
                        if (array_key_exists($entity->getId(), $userGoalsArray)) {
                            $entity->setIsMyGoal($userGoalsArray[$entity->getId()]['status'] == UserGoal::COMPLETED ? UserGoal::COMPLETED : UserGoal::ACTIVE);
                        } else {
                            $entity->setIsMyGoal(0);
                        }
                    }
                }
            }
            if ($entity instanceof User){
                if ($this->loadUserStats){
                    $em->getRepository('ApplicationUserBundle:User')->setUserStats($entity);
                }

            }
        }
    }


    /**
     * @param OnFlushEventArgs $args
     */
    public function onFlush(OnFlushEventArgs $args)
    {
        // get entity manager
        $em = $args->getEntityManager();

        // get unit work
        $uow = $em->getUnitOfWork();

        // for insert
        foreach ($uow->getScheduledEntityInsertions() as $entity) {
            // check entity
            if($entity instanceof User){
                $this->setLocale($entity);
                do{
                    $string = $this->container->get('bl_random_id_service')->randomString()?$this->container->get('bl_random_id_service')->randomString():"";
                    $isUser = $em->getRepository('ApplicationUserBundle:User')->findOneBy(array('uId' => $string));
                }
                while($isUser);

                $entity->setUId($string);
                $metadata = $em->getMetadataFactory()->getMetadataFor('ApplicationUserBundle:User');
                $uow->recomputeSingleEntityChangeSet($metadata, $entity);
            }
        }

        // for update
        foreach ($uow->getScheduledEntityUpdates() as $entity) {
            // check entity
            if($entity instanceof User){
                $this->setLocale($entity);
            }
        }
    }

    public function postUpdate(LifecycleEventArgs $event)
    {
        $entity = $event->getObject();
        $em = $event->getObjectManager();
        $uow = $em->getUnitOfWork();

        if ($entity instanceof UserGoal){
            $token = $this->tokeStorage->getToken();
            $user = null;
            if ($token){
                $user = $token->getUser();
            }

            if (is_object($user)) {
                $changeSet = $uow->getEntityChangeSet($entity);
                if (isset($changeSet['status']) && $changeSet['status'][1] = UserGoal::COMPLETED) {
                    $newFeed = new NewFeed(NewFeed::GOAL_COMPLETE, $user, $entity->getGoal());
                    $em->persist($newFeed);
                    $em->flush();
                }
            }
        }
    }

    public function postPersist(LifecycleEventArgs $event)
    {
        $entity = $event->getObject();
        $em = $event->getObjectManager();

        if ($entity instanceof ActivityableInterface){
            $newFeed = $this->generateActivityOnInsert($em, $entity);
            if (!is_null($newFeed)) {
                $em->persist($newFeed);
                $em->flush();
            }
        }

        if ($entity instanceof NewFeed){
            $em->getRepository('AppBundle:NewFeed')->bindNewFeed($entity);
        }
    }

    /**
     * @param $em
     * @param $entity
     * @return NewFeed|null
     */
    private function generateActivityOnInsert($em, $entity)
    {
        $token = $this->tokeStorage->getToken();
        $user = null;
        if ($token){
            $user = $token->getUser();
        }
        if (is_object($user)){
            $action = $goal = $story = $comment = null;
            if ($entity instanceof Goal){
                $action = NewFeed::GOAL_CREATE;
                $goal = $entity;
            }
            elseif($entity instanceof UserGoal &&
                (is_null($entity->getGoal()->getAuthor()) || $entity->getGoal()->getAuthor()->getId() != $user->getId() || $entity->getStatus() == UserGoal::COMPLETED))
            {
                $action = NewFeed::GOAL_ADD;
                if ($entity->getStatus() == UserGoal::COMPLETED){
                    $action = NewFeed::GOAL_COMPLETE;
                }

                $goal = $entity->getGoal();
            }
            elseif($entity instanceof SuccessStory){
                $action = NewFeed::SUCCESS_STORY;
                $goal = $entity->getGoal();
                $story = $entity;
            }
            elseif($entity instanceof Comment){
                $goalId = $entity->getThread()->getId();
                $goal = $em->getRepository('AppBundle:Goal')->find($goalId);
                if (!is_null($goal)){
                    $comment = $entity;
                    $action = NewFeed::COMMENT;
                }
            }

            if (!is_null($action)) {
                return $newFeed = new NewFeed($action, $user, $goal, $story, $comment);
            }
        }

        return null;
    }

    /**
     * @param $entity
     */
    private  function setLocale($entity)
    {
        // get environment
        $env = $this->container->get('kernel')->getEnvironment();
        if($env != "test"){

            try{
                // get request
                $request = $this->container->get('request');

                // get session
                $session = $request->getSession();

                // get locale
                $locale = $session->get("_locale");

                // get language
                $userLocale = $entity->getLanguage();

                // check user local with default locale
                if($userLocale && $userLocale != $locale){

                    // set session locale
                    $session->set('_locale', $userLocale);
                }
            }
            catch(\Exception $e){
                // this try is used cli/ in cli request object is inactive scope
            }
        }
    }
}