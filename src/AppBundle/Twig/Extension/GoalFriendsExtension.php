<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 9/27/15
 * Time: 11:10 AM
 */

namespace AppBundle\Twig\Extension;
use Doctrine\ORM\EntityManagerInterface;

/**
 * Class GoalFriendsExtension
 * @package AppBundle\Twig\Extension
 */
class GoalFriendsExtension extends \Twig_Extension
{
    /**
     * @var EntityManagerInterface
     */
    protected $em;

    /**
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->em = $entityManager;
    }

    /**
     * @return array
     */
    public function getFunctions()
    {
        return array(
            new \Twig_SimpleFunction('goalFriends', array($this, 'goalFriends'))
        );
    }

    /**
     * @param $userId
     * @param $count
     * @return mixed
     */
    public function goalFriends($userId, $count = null)
    {
        $goalFriends = $this->em->getRepository('AppBundle:Goal')->findGoalFriends($userId, false, $count);
        return $goalFriends;
    }

    public function getName()
    {
        return 'bl_goal_friends_extension';
    }
}