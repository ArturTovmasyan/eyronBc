<?php

namespace AppBundle\Listener;

use AppBundle\Entity\UserGoal;
use Application\UserBundle\Entity\User;
use Doctrine\ORM\Event\PreFlushEventArgs;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use Doctrine\ORM\Mapping\PreFlush;
use Symfony\Component\DependencyInjection\Container;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

class UserGoalListener implements ContainerAwareInterface
{
    /**
     * @var
     */
    public $container;

    /**
     * @param ContainerInterface|null $container
     */
    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;
    }

    /**
     * @param UserGoal $userGoal
     * @param PreFlushEventArgs $event
     * @PreFlush()
     */
    public function postFlush(UserGoal $userGoal, PreFlushEventArgs $event)
    {
        $this->container
            ->get('doctrine')
            ->getManager()
            ->getConfiguration()
            ->getResultCacheImpl()
            ->delete('user_goal_' . $userGoal->getUser()->getId());
    }
}

