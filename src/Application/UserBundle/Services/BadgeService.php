<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 10/17/16
 * Time: 1:34 PM
 */

namespace Application\UserBundle\Services;
use Application\UserBundle\Entity\Badge;
use Doctrine\ORM\EntityManager;

/**
 * Class BadgeService
 * @package Application\UserBundle\Services
 */
class BadgeService
{
    /**
     * @var EntityManager
     */
    private $em;

    /**
     * BadgeService constructor.
     * @param EntityManager $em
     */
    public function __construct(EntityManager $em)
    {
        $this->em = $em;
    }


    /**
     * This function is used to find badge by user, and add score
     *
     * @param $type
     * @param $user
     * @param $score
     */
    public function addScore($type, $user, $score)
    {
        // get badge
        $badge = $this->em->getRepository("ApplicationUserBundle:badge")
            ->findBadgeByUserAndType($user, $type);

        if(!$badge){
            $badge = new Badge();
            $badge->setType($type);
            $badge->setUser($user);
        }

        $badge->setScore($badge->getScore() + $score);
        $this->em->persist($badge);
        $this->em->flush();
    }

}