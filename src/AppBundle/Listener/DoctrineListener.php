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

            if ($entity instanceof Goal and $user instanceof User){
                $userGoals = $user->getUserGoal();

                if($userGoals->count() > 0) {
                    $userGoalsArray = $userGoals->toArray();
                    if(array_key_exists($entity->getId(), $userGoalsArray)){
                        $entity->setIsMyGoal($userGoalsArray[$entity->getId()]->getstatus() == UserGoal::COMPLETED ? UserGoal::COMPLETED : UserGoal::ACTIVE);
                    }
                    else {
                        $entity->setIsMyGoal(0);
                    }
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
            if($entity instanceof Goal){
                $this->setList($entity);
                $this->setCover($entity);
            }
            // check entity
            if($entity instanceof GoalImage){
                $this->setList($entity);
                $this->setCover($entity);
            }
        }

        // for update
        foreach ($uow->getScheduledEntityUpdates() as $entity) {

            if($entity instanceof User) {

                //get add email
                $addEmail = $entity->addEmail;

                //get user emails
                $userEmails = $entity->getUserEmails();

                //check if addEmail exist
                if ($addEmail) {

                    //generate email activation  token
                    $emailToken = md5(microtime() . $addEmail);

                    //set user emails in array with token and primary value
                    $newEmail = ['userEmails' => $addEmail, 'token' => $emailToken, 'primary' => false];

                    //set new email data in userEmails array
                    $userEmails[$addEmail] = $newEmail;

                    //get 8user full name
                    $userName = $entity->showName();

                    //get send activation email service
                    $this->container->get('bl.email.sender')->sendActivationUserEmail($addEmail, $emailToken, $userName);
                }

                //set user emails
                $entity->setUserEmails($userEmails);
            }

            // check entity
            if($entity instanceof GoalImage){
                $this->setList($entity);
                $this->setCover($entity);
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