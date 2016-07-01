<?php

namespace AppBundle\Entity\Repository;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Tools\Pagination\Paginator;

/**
 * NewFeedRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class NewFeedRepository extends EntityRepository
{
    /**
     * @param $userId
     * @param bool|false $getCount
     * @param null $first
     * @param null $count
     * @param null $lastId
     * @return \Doctrine\ORM\Query|mixed
     */
    public function findNewFeed($userId, $getCount = false, $first = null, $count = null, $lastId = null)
    {
        $newFeedIdsQuery = $this->getEntityManager()
            ->createQueryBuilder()
            ->select('DISTINCT nf.id')
            ->from('AppBundle:NewFeed', 'nf')
            ->join('nf.user', 'u', 'WITH', "u != :user AND u.roles = :simpleRole")
            ->join('u.userGoal', 'gfUserGoal')
            ->join('gfUserGoal.goal', 'gfGoal')
            ->join('gfGoal.userGoal', 'userUserGoal', 'WITH', 'userUserGoal.user = :user')
            ->join('nf.goal', 'g', 'WITH', 'g.readinessStatus = true')
            ->leftJoin('u.userGoal', 'ug', 'WITH', 'ug.goal = g')
            ->where('(ug.id IS NULL OR ug.isVisible = true) AND g.publish = TRUE')
            ->orderBy('nf.datetime', 'DESC')
            ->setParameter('user', $userId)
            ->setParameter('simpleRole', 'a:0:{}');

        if ($lastId) {
            $newFeedIdsQuery
                ->andWhere('nf.id < :lastId')
                ->setParameter('lastId', $lastId);
        }

        if (is_numeric($first) && is_numeric($count)) {
            $newFeedIdsQuery
                ->setFirstResult($first)
                ->setMaxResults($count);
        }

        if ($getCount) {
            return $newFeedIdsQuery->select('count(nf)')
                ->getQuery()
                ->getSingleScalarResult();
        }

        $newFeedIds = $newFeedIdsQuery->getQuery()->getScalarResult();

        if (count($newFeedIds) == 0) {
            return [];
        }

        return $this->getEntityManager()
            ->createQueryBuilder()
            ->select('nf, u, g, gi, ss, si, cmt')
            ->from('AppBundle:NewFeed', 'nf')
            ->join('nf.user', 'u', 'WITH', "u != :user AND u.roles = :simpleRole")
            ->join('nf.goal', 'g', 'WITH', 'g.readinessStatus = true')
            ->leftJoin('g.images', 'gi')
            ->leftJoin('u.userGoal', 'ug', 'WITH', 'ug.goal = g')
            ->leftJoin('nf.successStory', 'ss')
            ->leftJoin('ss.files', 'si')
            ->leftJoin('nf.comment', 'cmt')
            ->where('(ug.id IS NULL OR ug.isVisible = true) AND g.publish = TRUE AND nf.id IN (:ids)')
            ->orderBy('nf.datetime', 'DESC')
            ->setParameter('user', $userId)
            ->setParameter('simpleRole', 'a:0:{}')
            ->setParameter('ids', $newFeedIds)
            ->getQuery()
            ->getResult();
    }

    /**
     * @param $action
     * @param $userId
     * @param $goalId
     * @return mixed
     */
    public function removeNewFeed($action, $userId, $goalId)
    {
        return $this->getEntityManager()
            ->createQuery("DELETE FROM AppBundle:NewFeed n
                           WHERE n.action = :action AND n.goal = :goal AND n.user = :user")
            ->setParameter('action', $action)
            ->setParameter('goal',   $goalId)
            ->setParameter('user',   $userId)
            ->execute();
    }

    /**
     * @param $userId
     * @param $action
     * @return mixed
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function findLastGroupByUserAction($userId, $action)
    {
        return $this->getEntityManager()
            ->createQuery("SELECT n.id
                           FROM AppBundle:NewFeed n
                           JOIN n.user u
                           WHERE u.id = :userId AND n.action = :action
                           AND timestampdiff('MINUTE', n.datetime, CURRENT_TIMESTAMP()) < 30")
            ->setParameter('userId', $userId)
            ->setParameter('action', $action)
            ->getOneOrNullResult();

    }
}