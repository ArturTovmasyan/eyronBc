<?php

namespace AppBundle\Entity\Repository;

use Doctrine\ORM\EntityRepository;

/**
 * NewFeedRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class NewFeedRepository extends EntityRepository
{
    /**
     * @return array
     */
    public function findUnconvertedLogs()
    {
        $lastConvertedLogId = $this->getEntityManager()
            ->createQuery("SELECT MAX(l.id)
                           FROM AppBundle:NewFeed nf
                           JOIN nf.log l")
            ->getSingleScalarResult();

        return $this->getEntityManager()
            ->createQuery("SELECT le
                           FROM Gedmo\\Loggable\\Entity\\LogEntry le
                           WHERE le.id > :lastConvertedId OR :lastConvertedId IS NULL")
            ->setParameter('lastConvertedId', $lastConvertedLogId)
            ->getResult();
    }

    /**
     * @param $userId
     * @return array
     */
    public function findNewFeed($userId)
    {
        $goalFriendsIds = $this->getEntityManager()
                               ->getRepository('AppBundle:Goal')->findGoalFriends($userId, true);
        if (!count($goalFriendsIds)){
            $goalFriendsIds[] = 0;
        }

        return $this->getEntityManager()
            ->createQuery("SELECT nf, u, g, ss, cmt
                           FROM AppBundle:NewFeed nf
                           JOIN nf.user u
                           JOIN nf.goal g WITH g.readinessStatus = true
                           LEFT JOIN AppBundle:UserGoal ug WITH ug.user = u AND ug.goal = g
                           LEFT JOIN nf.successStory ss
                           LEFT JOIN nf.comment cmt
                           WHERE u.id IN (:ids) AND (ug IS NULL OR ug.isVisible = true)
                           ORDER BY nf.datetime DESC")
            ->setParameter('ids', $goalFriendsIds)
            ->getResult();
    }

    /**
     * @param $userId
     * @return array
     */
    public function findNewFeedByCount($userId)
    {
        $goalFriendsIds = $this->getEntityManager()
                               ->getRepository('AppBundle:Goal')->findGoalFriends($userId, true);
        if (!count($goalFriendsIds)){
            $goalFriendsIds[] = 0;
        }

        $query = $this->getEntityManager()
            ->createQueryBuilder()
            ->select('nf, u, g, ss, cmt')
            ->from('AppBundle:NewFeed', 'nf')
            ->join('nf.goal', 'g', 'WITH', 'g.readinessStatus = true')
            ->join('nf.user', 'u')
            ->leftJoin('AppBundle:UserGoal', 'ug', 'WITH', 'ug.user = u AND ug.goal = g')
            ->leftJoin('nf.successStory', 'ss')
            ->leftJoin('nf.comment','cmt')
            ->where('u.id IN (:ids) AND (ug IS NULL OR ug.isVisible = true)')
            ->orderBy('nf.datetime', 'DESC')
            ->setParameter('ids', $goalFriendsIds);

        return $query->getQuery()->getResult();
    }


}
