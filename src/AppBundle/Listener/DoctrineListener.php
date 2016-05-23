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
use AppBundle\Entity\UserGoal;
use Application\UserBundle\Entity\User;
use Doctrine\Common\Persistence\Event\LifecycleEventArgs;
use Doctrine\ORM\Event\OnFlushEventArgs;
use Symfony\Component\DependencyInjection\Container;

class DoctrineListener
{
    /**
     * @var
     */
    protected $container;

    protected $loadUserStats = true;

    public function disableUserStatsLoading()
    {
        $this->loadUserStats = false;
    }

    public function enableUserStatsLoading()
    {
        $this->loadUserStats = true;
    }


    /**
     * @param Container $container
     */
    function __construct(Container $container)
    {
        $this->container = $container;
    }

    /**
     * @param LifecycleEventArgs $event
     */
    public function postLoad(LifecycleEventArgs $event)
    {
        if ($token = $this->container->get('security.token_storage')->getToken()){

            $entity = $event->getObject();

            if ($entity instanceof Goal){

                $user = $token->getUser();

                $shareLink = $this->container->get('router')->generate('inner_goal', array('slug' => $entity->getSlug()));
                $entity->setShareLink($shareLink);

                if ($user instanceof User) {

                    $userGoals = $user->getUserGoal();

                    if ($userGoals->count() > 0) {
                        $userGoalsArray = $userGoals->toArray();
                        if (array_key_exists($entity->getId(), $userGoalsArray)) {
                            $entity->setIsMyGoal($userGoalsArray[$entity->getId()]->getstatus() == UserGoal::COMPLETED ? UserGoal::COMPLETED : UserGoal::ACTIVE);
                        } else {
                            $entity->setIsMyGoal(0);
                        }
                    }
                }
            }
            if ($entity instanceof User){

                if ($this->loadUserStats) {
                    $em = $this->container->get('doctrine')->getManager();
                    $stats = $em->getRepository('ApplicationUserBundle:User')->findUserStats($entity->getId());

                    $entity->setStats([
                        "listedBy" => $stats['listedBy'] + $stats['doneBy'],
                        "active" => $stats['listedBy'],
                        "doneBy" => $stats['doneBy']
                    ]);
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