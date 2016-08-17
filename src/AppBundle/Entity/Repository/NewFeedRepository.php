<?php

namespace AppBundle\Entity\Repository;

use AppBundle\Entity\NewFeed;
use Doctrine\ORM\EntityRepository;

/**
 * NewFeedRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class NewFeedRepository extends EntityRepository
{
    const MIN_COUNT = 7;

    /**
     * @param $userId
     * @param bool|false $getCount
     * @param null $first
     * @param null $count
     * @param null $lastId
     * @param null $lastDate
     * @param null $singleUserId
     * @return \Doctrine\ORM\Query|mixed
     */
    public function findNewFeed($userId, $getCount = false, $first = null, $count = null, $lastId = null, $lastDate = null, $singleUserId = null)
    {
        $newFeedIdsQuery = $this->getEntityManager()
            ->createQueryBuilder()
            ->select('DISTINCT nf.id')
            ->from('AppBundle:NewFeed', 'nf');

        if (is_null($singleUserId)) {

            $newFeedIdsQuery
                ->join('nf.user', 'u', 'WITH', "u != :user AND u.roles = :simpleRole")
                ->join('u.userGoal', 'gfUserGoal')
                ->join('AppBundle:UserGoal', 'userUserGoal', 'WITH', 'userUserGoal.goal = gfUserGoal.goal AND userUserGoal.user = :user')
                ->setParameter('user', $userId);
        }
        else {
            $newFeedIdsQuery
                ->join('nf.user', 'u', 'WITH', "u = :user AND u.roles = :simpleRole")
                ->setParameter('user', $singleUserId);
        }

        $newFeedIdsQuery
            ->orderBy('nf.datetime', 'DESC')
            ->addOrderBy('nf.id', 'DESC')
            ->setParameter('simpleRole', 'a:0:{}');

        if ($lastDate && $lastId) {
            $newFeedIdsQuery
                ->andWhere("(nf.datetime < :lastDate OR (nf.id < :lastId AND nf.datetime = :lastDate)) AND timestampdiff(DAY, nf.datetime, :lastDate) < :numberOfDays")
                ->setParameter('lastId', $lastId)
                ->setParameter('lastDate', $lastDate)
                ->setParameter(':numberOfDays', 2)
            ;
        }
        elseif ($lastDate){
            $newFeedIdsQuery
                ->andWhere("nf.datetime > :lastDate")
                ->setParameter('lastDate', $lastDate);
        }
        else {
            $newFeedIdsQuery
                ->andWhere("timestampdiff('DAY', nf.datetime, CURRENT_TIMESTAMP()) < :numberOfDays")
                ->setParameter(':numberOfDays', $getCount ? 30 : 6);
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

        if (count($newFeedIds) < self::MIN_COUNT && !($lastDate && !$lastId)) {
            $newFeedIdsQuery->getParameter('numberOfDays')->setValue(is_null($singleUserId) ? 30 : 300);
            $newFeedIds = $newFeedIdsQuery->getQuery()->getScalarResult();
            if (count($newFeedIds) == 0){
                return [];
            }
        }

        return $this->getEntityManager()
            ->createQueryBuilder()
            ->select('nf, u, ss, si, cmt')
            ->from('AppBundle:NewFeed', 'nf')
            ->join('nf.user', 'u')
            ->leftJoin('nf.successStory', 'ss')
            ->leftJoin('ss.files', 'si')
            ->leftJoin('nf.comment', 'cmt')
            ->where('nf.id IN (:ids)')
            ->andWhere('(nf.action = :successStory AND ss.id IS NOT NULL)
                     OR (nf.action = :comment AND cmt.id IS NOT NULL)
                     OR (nf.action != :successStory AND nf.action != :comment)')
            ->orderBy('nf.datetime', 'DESC')
            ->addOrderBy('nf.id', 'DESC')
            ->setParameter('ids', $newFeedIds)
            ->setParameter('successStory', NewFeed::SUCCESS_STORY)
            ->setParameter('comment', NewFeed::COMMENT)
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
        $currentDate = new \DateTime();
        $newFeed = $this->getEntityManager()
            ->createQuery("SELECT n
                           FROM AppBundle:NewFeed n
                           JOIN n.user u
                           WHERE u.id = :userId AND n.action = :action
                           AND timestampdiff('MINUTE', n.datetime, :currentDate) < 30")
            ->setParameter('userId', $userId)
            ->setParameter('action', $action)
            ->setParameter('currentDate', $currentDate->format('Y-m-d H:i:s'))
            ->getResult();

        if (count($newFeed) == 0){
            return null;
        }

        return $newFeed[0];
    }


    /**
     * This function is used to get single activity for group it
     *
     * @return mixed
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function findNewFeedForGroupAction()
    {
        return $this->getEntityManager()
            ->createQueryBuilder()
            ->select('DISTINCT u.id')
            ->from('AppBundle:NewFeed', 'nf')
            ->join('nf.user', 'u')
            ->where('nf.goal IS NOT NULL')
            ->getQuery()
            ->getScalarResult();
    }

    /**
     * This function is used to get userGoals by ids
     *
     * @param $id
     * @return mixed
     */
    public function findNewFeedByActionAndIds($id)
    {
        return $this->getEntityManager()
            ->createQuery("SELECT nf, g, u
                           FROM AppBundle:NewFeed nf
                           JOIN nf.goal g
                           JOIN nf.user u
                           WHERE u.id = :id AND nf.action IN (:action) AND nf.goal IS NOT NULL
                           ORDER BY nf.datetime DESC")
            ->setParameter('id', $id)
            ->setParameter('action', NewFeed::$groupedActions)
            ->getResult();
    }
}