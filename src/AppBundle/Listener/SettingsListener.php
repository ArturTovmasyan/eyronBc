<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 10/6/15
 * Time: 2:59 PM
 */

namespace AppBundle\Listener;

use Application\UserBundle\Entity\User;
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

        //get user
        $user = $this->container->get('security.token_storage')->getToken()->getUser();

        //get add email
        $addEmail = $user->addEmail;

        //get user emails
        $userEmails = $user->getUserEmails();

        //check if addEmail exist
        if ($addEmail) {

            //generate email activation  token
            $emailToken = md5(microtime() . $addEmail);

            //set user emails in array with token and primary value
            $newEmail = ['userEmails' => $addEmail, 'token' => $emailToken, 'primary' => false];

            //set new email data in userEmails array
            $userEmails[$addEmail] = $newEmail;

            //get 8user full name
            $userName = $user->showName();

            //get send activation email service
            $this->container->get('bl.email.sender')->sendActivationUserEmail($addEmail, $emailToken, $userName);
        }

        //set user emails
        $user->setUserEmails($userEmails);
    }

}