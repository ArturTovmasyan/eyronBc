<?php

namespace AppBundle\Entity\Repository;

use Doctrine\ORM\EntityRepository;

/**
 * SuccessStoryRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class SuccessStoryRepository extends EntityRepository
{
    /**
     * @param $userId
     * @param $goalId
     * @return array
     */
    public function findUserGoalStory($userId, $goalId)
    {
        return $this->getEntityManager()
            ->createQuery("SELECT ss, i
                           FROM AppBundle:SuccessStory ss
                           JOIN ss.goal g WITH g.id = :goalId
                           JOIN ss.user u WITH u.id = :userId
                           LEFT JOIN ss.files i")
            ->setParameter('userId', $userId)
            ->setParameter('goalId', $goalId)
            ->setFirstResult(0)
            ->getResult();
    }

    /**
     * @param $storyId
     * @return mixed
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function findStoryWithVotes($storyId)
    {
        return $this->getEntityManager()
            ->createQuery("SELECT ss, v, u, g
                           FROM AppBundle:SuccessStory ss
                           LEFT JOIN ss.voters v
                           LEFT JOIN ss.user u
                           LEFT JOIN ss.goal g
                           WHERE ss.id = :storyId")
            ->setParameter('storyId', $storyId)
            ->getOneOrNullResult();
    }

    /**
     * @param $storyId
     * @return mixed
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function findStoryWithAuthor($storyId)
    {
        return $this->getEntityManager()
            ->createQuery("SELECT ss, u
                           FROM AppBundle:SuccessStory ss
                           LEFT JOIN ss.user u
                           WHERE ss.id = :storyId")
            ->setParameter('storyId', $storyId)
            ->getOneOrNullResult();
    }

    /**
     * @param $ids
     * @return array
     */
    public function findByIds($ids)
    {
        if (count($ids) == 0){
            return [];
        }

        return $this->getEntityManager()
            ->createQuery("SELECT ss
                           FROM AppBundle:SuccessStory ss
                           INDEX BY ss.id
                           WHERE ss.id IN (:ids)")
            ->setParameter('ids', $ids)
            ->getResult();
    }
}
