<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 10/17/16
 * Time: 1:34 PM
 */

namespace Application\UserBundle\Services;
use AppBundle\Services\AbstractProcessService;
use AppBundle\Services\PutNotificationService;
use AppBundle\Services\UserNotifyService;
use Application\UserBundle\Entity\Badge;
use Doctrine\ORM\EntityManager;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Process\Process;

/**
 * Class BadgeService
 * @package Application\UserBundle\Services
 */
class BadgeService extends AbstractProcessService
{
    const BADGE_MAX_SCORE = 'badge_max_score';

    /**
     * @var EntityManager
     */
    private $em;

    /**
     * @var UserNotifyService
     */
    private $notifyService;

    /**
     * @var PutNotificationService
     */
    private $pushNote;

    /**
     * @var NotificationService
     */
    private $notification;

    /**
     * BadgeService constructor.
     * @param EntityManager $em
     * @param UserNotifyService $notifyService
     * @param PutNotificationService $pushNote
     * @param NotificationService $notification
     */
    public function __construct(EntityManager $em, UserNotifyService $notifyService,
                                PutNotificationService $pushNote,
                                NotificationService $notification)
    {
        $this->em = $em;
        $this->notifyService = $notifyService;
        $this->pushNote= $pushNote;
        $this->notification= $notification;
    }

    public function findTopUsers()
    {
        $count = 10;
        $minInnovatorScore = 0;
        $minMotivatorScore = 0;
        $minTravellerScore = 0;
        $userIds = [];

        $repo = $this->em->getRepository("ApplicationUserBundle:Badge");

        $innovators = $repo->findTopUsersByType(Badge::TYPE_INNOVATOR, $count);

        // check innovators
        if(is_array($innovators) && count($innovators) > 0){
            $maxScoreBadge = reset($innovators);
            $maxScore = $maxScoreBadge->getScore();

            // map for values and normalize scores
            array_map(function($badge) use ($maxScore, &$userIds){
                $normalizedScore = $badge->getScore()/$maxScore * Badge::MAXIMUM_NORMALIZE_SCORE;
                $normalizedScore = ceil($normalizedScore);
                $badge->normalizedScore = $normalizedScore;
                $userIds[] = $badge->getUser()->getId();
            }, $innovators);

            $minInnovator = end($innovators);
            $minInnovatorScore = $minInnovator->normalizedScore;
        }

        $motivators = $repo->findTopUsersByType(Badge::TYPE_MOTIVATOR, $count);

        // check motivator
        if(is_array($motivators) && count($motivators) > 0){
            $maxScoreBadge = reset($motivators);
            $maxScore = $maxScoreBadge->getScore();

            // map for values and normalize scores
            array_map(function($badge) use ($maxScore, &$userIds){
                $normalizedScore = $badge->getScore()/$maxScore * Badge::MAXIMUM_NORMALIZE_SCORE;
                $normalizedScore = ceil($normalizedScore);
                $badge->normalizedScore = $normalizedScore;
                $userIds[] = $badge->getUser()->getId();
            }, $motivators);

            $minMotivator = end($motivators);
            $minMotivatorScore = $minMotivator->normalizedScore;
        }

        $travellers = $repo->findTopUsersByType(Badge::TYPE_TRAVELLER, $count);

        // check motivator
        if(is_array($travellers) && count($travellers) > 0){
            $maxScoreBadge = reset($travellers);
            $maxScore = $maxScoreBadge->getScore();


            // map for values and normalize scores
            array_map(function($badge) use ($maxScore, &$userIds){
                $normalizedScore = $badge->getScore()/$maxScore * Badge::MAXIMUM_NORMALIZE_SCORE;
                $normalizedScore = ceil($normalizedScore);
                $badge->normalizedScore = $normalizedScore;
                $userIds[] = $badge->getUser()->getId();
            }, $travellers);

            $minTraveller = end($travellers);
            $minTravellerScore = $minTraveller->normalizedScore;
        }

        $userIds = array_unique($userIds);

        $result = array(
            'min' => array(
                'innovator' => $minInnovatorScore,
                'motivator' => $minMotivatorScore,
                'traveller' => $minTravellerScore,
            ),
            'badges' => array(
                'innovator' => $innovators,
                'motivator' => $motivators,
                'traveller' => $travellers,
            ),
            'users' => $userIds
        );

        return $result;
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

        $oldScore = $badge->getScore();

        // generate new score
        $newScore = $oldScore + $score;

        $badge->setScore($newScore);
        $this->em->persist($badge);
        $this->em->flush();

        // get max score from cache
        $maxScore = $this->getMaxScore($newScore, $type);

        // get score by type
        $typMaxScore = $maxScore[$type];

        // check is new score bigger
        if($newScore > $typMaxScore){

            // generate new max score
            $maxScore[$type] = $newScore;

            // add to cache
            apc_delete(self::BADGE_MAX_SCORE);
            apc_add(self::BADGE_MAX_SCORE, $maxScore);
        }

        // check has changed
        if($this->hasScoreChanged($newScore, $oldScore, $type)){

            $this->runAsProcess('bl.badge.service', 'sendNotify',
                array($userId));
        }

    }

    /**
     * @param $newScore
     * @param $oldScore
     * @param $type
     * @return bool
     */
    private function hasScoreChanged($newScore, $oldScore, $type)
    {
        // get score
        $scores = $this->getMaxScore();

        // get type
        $maxScore = $scores[$type];

        // new score
        $newNormalizedScore = ceil($newScore / $maxScore * Badge::MAXIMUM_NORMALIZE_SCORE);

        // old score
        $oldNormalizedScore = ceil($oldScore / $maxScore * Badge::MAXIMUM_NORMALIZE_SCORE);

        if($newNormalizedScore != $oldNormalizedScore){
            return true;
        }

        return false;
    }

    /**
     * @param $userId
     */
    public function sendNotify($userId)
    {
        // get user
        $user = $this->em->getRepository("ApplicationUserBundle:User")->find($userId);

        if(!$user){
            throw new NotFoundHttpException('User not found');
        }

//        $this->notification->sendNotification($user)
//        $this->notifyService->sendEmail($user)
//        $this->pushNote->sendPushNote($user, $message);

    }


    /**
     * This function is used to find badge by user, and remove score
     *
     * @param $type
     * @param $userId
     * @param $score
     */
    public function removeScore($type, $userId, $score)
    {
        // get user
        $user = $this->em->getRepository("ApplicationUserBundle:User")->find($userId);

        if(!$user){
            throw new NotFoundHttpException('User not found');
        }

        // get badge
        $badge = $this->em->getRepository("ApplicationUserBundle:Badge")
            ->findBadgeByUserAndType($userId, $type);

        if($badge){

            $oldScore = $badge->getScore();
            // generate new score
            $newScore = $oldScore - $score;
            $newScore = $newScore < 0 ? 0 : $newScore;

            if($newScore == 0){
                $this->em->remove($badge);
            }else{
                $badge->setScore($newScore);
                $this->em->persist($badge);
            }

            $this->em->flush();

            // get max score from cache
            $maxScore = $this->getMaxScore($newScore, $type);

            // get score by type
            $typMaxScore = $maxScore[$type];

            // check is new score bigger
            if($newScore === $typMaxScore){

                // generate new max score
                $maxScore[$type] = $newScore;

                // add to cache
                apc_delete(self::BADGE_MAX_SCORE);
                apc_add(self::BADGE_MAX_SCORE, $maxScore);
            }

            // check has changed
            if($this->hasScoreChanged($newScore, $oldScore, $type)){

                $this->runAsProcess('bl.badge.service', 'sendNotify',
                    array($userId));
            }
        }
    }

    /**
     * @param int $score
     * @param int $type
     * @return mixed
     */
    public function getMaxScore($score = 0, $type = 0)
    {
        $badgeMaxScore = apc_fetch(self::BADGE_MAX_SCORE);

        $getNewFromDb = true;
        if(is_array($badgeMaxScore) &&
            array_key_exists($type, $badgeMaxScore) &&
            $badgeMaxScore[$type] >= $score){
            $getNewFromDb = false;
        }

        if(!$badgeMaxScore || $getNewFromDb){

            $badgeMaxScore = $this->em->getRepository('ApplicationUserBundle:Badge')->getMaxScores();
            apc_add(self::BADGE_MAX_SCORE, $badgeMaxScore);
        }

        return $badgeMaxScore;
    }
}