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
    public $container;


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
            $user = $token->getUser();
            $entity = $event->getObject();

            if ($entity instanceof Goal){
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
                $em = $this->container->get('doctrine')->getManager();
                $stats = $em->getRepository('ApplicationUserBundle:User')->findUserStats($entity->getId());

                $entity->setStats([
                    "listedBy"  => $stats['listedBy'] + $stats['doneBy'],
                    "active"    => $stats['listedBy'],
                    "doneBy"    => $stats['doneBy']
                ]);

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
            if($entity instanceof Goal){
                $this->setList($entity);
                $this->setCover($entity);
            }
            // check entity
            if($entity instanceof GoalImage){
                $this->setList($entity);
                $this->setCover($entity);
            }

            // check entity
            if($entity instanceof User){
                $this->setLocale($entity);
            }
        }

        // for update
        foreach ($uow->getScheduledEntityUpdates() as $entity) {

            // check entity
            if($entity instanceof GoalImage){
                $this->setList($entity);
                $this->setCover($entity);
            }

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
    }


    /**
     * @param $entity
     */
    private function setList($entity)
    {
        // get bl service
        $blService = $this->container->get('bl_service');

        // get goal
        $goal = $entity instanceof Goal ? $entity : $entity->getGoal();

        if($goal){
            // get all images
            $images = $goal->getImages();

            // check images
            if($images->count() > 0){

                // loop for images
                foreach($images as $image){

                    // if cover is selected return
                    if($image->getList() == true){
                        $blService->generateFileForList($image);
                        return;
                    }
                }

                // else set cover first
                $images->first()->setList(true);
                $blService->generateFileForList($images->first());
            }
        }
        elseif($entity->getList() == true){
            $blService->generateFileForList($entity);
        }
    }

    /**
     * @param $entity
     */
    private function setCover($entity)
    {
        // get bl service
        $blService = $this->container->get('bl_service');

        // get goal
        $goal = $entity instanceof Goal ? $entity : $entity->getGoal();

        if($goal){
            // get all images
            $images = $goal->getImages();

            // check images
            if($images->count() > 0){

                // loop for images
                foreach($images as $image){

                    // if cover is selected return
                    if($image->getCover() == true){
                        $blService->generateFileForCover($image);
                        return;
                    }
                }

                // else set cover first
                $images->first()->setCover(true);
                $blService->generateFileForCover($images->first());
            }
        }
        elseif($entity->getCover() == true){
            $blService->generateFileForCover($entity);
        }
    }
}