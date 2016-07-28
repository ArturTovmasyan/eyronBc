<?php
/**
 * Created by PhpStorm.
 * User: andranik
 * Date: 7/27/16
 * Time: 6:23 PM
 */
namespace Application\UserBundle\Services;

use Application\UserBundle\Entity\Notification;
use Application\UserBundle\Entity\User;
use Application\UserBundle\Entity\UserNotification;
use Doctrine\ORM\EntityManager;

class NotificationService
{
    protected $entityManager;

    public function __construct(EntityManager $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function sendNotification(User $user, $body, $toUsers)
    {
        $notification = new Notification();
        $notification->setBody($body);
        $notification->setPerformer($user);
        $this->entityManager->persist($notification);

        if (!is_array($toUsers) && $toUsers instanceof User){
            $toUsers = [$toUsers];
        }

        foreach($toUsers as $toUser){
            $userNotification = new UserNotification();
            $userNotification->setUser($toUser);
            $userNotification->setNotification($notification);
            $this->entityManager->persist($userNotification);
        }

        $this->entityManager->flush();
    }
}