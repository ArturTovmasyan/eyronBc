<?php

namespace AppBundle\Entity\Repository;

use AppBundle\Controller\Rest\StatisticController;
use AppBundle\Traits\StatisticDataFilterTrait;
use Doctrine\ORM\EntityRepository;

/**
 * SuccessStoryRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class SuccessStoryRepository extends EntityRepository
{
    use StatisticDataFilterTrait;

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
     * @param $first
     * @param $count
     * @return array
     */
    public function findStoryVoters($storyId, $first, $count)
    {
        return $this->getEntityManager()
            ->createQuery("SELECT u
                           FROM ApplicationUserBundle:User u
                           INDEX BY u.id
                           JOIN AppBundle:SuccessStory ss WITH ss.id = :storyId
                           JOIN ss.voters v WITH v.id = u.id")
            ->setParameter('storyId', $storyId)
            ->setFirstResult($first)
            ->setMaxResults($count)
            ->getResult();
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

    /**
     * @return array
     */
    public function findInspireStories()
    {
        return $this->getEntityManager()
            ->createQuery("SELECT ss, si, u, g, gi, v
                           FROM AppBundle:SuccessStory ss
                           JOIN ss.user u
                           JOIN ss.goal g
                           LEFT JOIN ss.voters v
                           LEFT JOIN g.images gi
                           LEFT JOIN ss.files si
                           WHERE ss.isInspire = true")
            ->getResult();
    }

    /**
     * This function is used to get created, liked story statistic data
     *
     * @param $groupBy
     * @param $start
     * @param $end
     * @param $type
     * @return array
     */
    public function getStoryByTypeForStatisticData($groupBy, $start, $end, $type)
    {
        //set default selected date value
        $date = 'ss.created';

        //get created or liked success story statistic data
        $story = $this->getEntityManager()
            ->createQueryBuilder()
            ->select("COUNT(DISTINCT ss.id) as total, DATE(".$date.") as created")
            ->select("DATE(".$date.") as created")
            ->from('AppBundle:SuccessStory', 'ss');

        //check if type is story like
        if ($type == StatisticController::TYPE_STORY_LIKED) {
            $story
                ->addSelect('count(vt.id) AS liked')
                ->leftJoin('ss.voters', 'vt');
        }
        elseif ($type == StatisticController::TYPE_STORY_CREATED) {
            $story
                ->addSelect('count(DISTINCT ss.id) AS total')
                ->leftJoin('ss.voters', 'vt');
        }

        //get filtered statistic data
        $data = $this->filterStatisticData($story, $date, $groupBy, $start, $end);

        return $data;
    }
}
