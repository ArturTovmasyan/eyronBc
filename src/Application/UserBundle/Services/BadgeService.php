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
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Process\Process;

/**
 * Class BadgeService
 * @package Application\UserBundle\Services
 */
class BadgeService
{
    const BADGE_MAX_SCORE = 'badge_max_score';

    /**
     * @var EntityManager
     */
    private $em;

    /**
     * @var
     */
    private $badgeCommand;

    /**
     * BadgeService constructor.
     * @param EntityManager $em
     * @param $badgeCommand
     */
    public function __construct(EntityManager $em, $badgeCommand)
    {
        $this->em = $em;
        $this->badgeCommand = $badgeCommand;
    }

    /**
     * This function is used to find badge by user, and add score
     *
     * @param $type
     * @param $userId
     * @param $score
     */
    public function addScore($type, $userId, $score)
    {
        // get user
        $user = $this->em->getRepository("ApplicationUserBundle:User")->find($userId);

        if(!$user){
            throw new NotFoundHttpException('User not found');
            }

        // get badge
        $badge = $this->em->getRepository("ApplicationUserBundle:Badge")
            ->findBadgeByUserAndType($userId, $type);

        if(!$badge){

            $badge = new Badge();
            $badge->setType($type);
            $badge->setUser($user);
        }

        $badge->setScore($badge->getScore() + $score);
        $this->em->persist($badge);
        $this->em->flush();
    }


    /**
     * @return array
     */
    public function getMaxScore()
    {
        $badgeMaxScore = apc_fetch(self::BADGE_MAX_SCORE);

        if(!$badgeMaxScore){

            $badgeMaxScore = $this->em->getRepository('ApplicationUserBundle:Badge')->getMaxScores();
            apc_store(self::BADGE_MAX_SCORE, $badgeMaxScore);
        }

        return $badgeMaxScore;
    }
}