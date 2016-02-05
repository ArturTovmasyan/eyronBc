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

class SettingsListener
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
     * @param OnFlushEventArgs $args
     */
    public function onFlush(OnFlushEventArgs $args)
    {
        // get entity manager
        $em = $args->getEntityManager();

        // get unit work
        $uow = $em->getUnitOfWork();

//        // for insert
//        foreach ($uow->getScheduledEntityInsertions() as $entity) {
//
//            // check entity
//            if($entity instanceof Goal){
//                $this->setList($entity);
//                $this->setCover($entity);
//            }
//            // check entity
//            if($entity instanceof GoalImage){
//                $this->setList($entity);
//                $this->setCover($entity);
//            }
//        }

        // for update
        foreach ($uow->getScheduledEntityUpdates() as $entity) {

            //check entity
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

        }
    }


}