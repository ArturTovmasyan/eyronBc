<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 10/14/15
 * Time: 8:21 PM
 */

namespace AppBundle\Entity\Repository;

use AppBundle\Entity\Goal;
use AppBundle\Entity\UserGoal;
use AppBundle\Model\loggableEntityRepositoryInterface;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query;
use Doctrine\ORM\Tools\Pagination\Paginator;


/**
 * Class UserGoalRepository
 * @package AppBundle\Entity\Repository
 */
class UserGoalRepository extends EntityRepository implements loggableEntityRepositoryInterface
{
    /**
     * @param $userId
     * @param $goalId
     * @return mixed
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function findByUserAndGoal($userId, $goalId)
    {
        $query =  $this->getEntityManager()
            ->createQuery("SELECT ug, u, g, a, i
                             FROM AppBundle:UserGoal ug
                             LEFT JOIN ug.user u
                             LEFT JOIN ug.goal g
                             LEFT JOIN g.images i
                             LEFT JOIN g.author a
                             WHERE u.id = :uid and g.id = :gid
                            ")
            ->setParameter('uid', $userId)
            ->setParameter('gid', $goalId)
            ->getOneOrNullResult()
        ;

        return $query;
    }

    /**
     * This function is used to get user goals by user and goal id
     *
     * @param $userIds
     * @param $goalId
     * @return array
     */
    public function findUserGoalsByUserId($userIds, $goalId)
    {
        $query =  $this->getEntityManager()
            ->createQuery("SELECT ug
                             FROM AppBundle:UserGoal ug
                             LEFT JOIN ug.user u
                             LEFT JOIN ug.goal g
                             WHERE u.id IN (:uid) and g.id = :gid
                            ")
            ->setParameter('uid', $userIds)
            ->setParameter('gid', $goalId)
            ->getResult()
        ;

        return $query;
    }

    /**
     * @param $userId
     * @param $status
     * @param $dream
     * @param $requestFilters
     * @param bool|false $isCurrentUser
     * @param null $first
     * @param null $count
     * @return array
     */
    public function findAllByUser($userId, $status, $dream, $requestFilters, $isCurrentUser = false, $first = null, $count = null)
    {
        $query =
            $this->getEntityManager()
                ->createQueryBuilder()
                ->addSelect('ug, g, a, i, ss')
                ->from('AppBundle:UserGoal', 'ug')
                ->join('ug.goal', 'g')
                ->join('ug.user', 'ugu')
                ->leftJoin('g.author', 'a')
                ->leftJoin('g.successStories', 'ss')
                ->leftJoin('g.images', 'i')
                ->where('ugu.id = :user ')
                ->orderBy('ug.id', 'desc')
                ->setParameter('user', $userId)
        ;

        // check status
        if($status){
            $query
                ->andWhere('ug.status =:status')
                ->setParameter('status', $status);
        }
        //if it is not self page
        if($isCurrentUser){
            $query
                ->andWhere('ug.isVisible = true');
        }


        $subQuery = $this->getEntityManager()
            ->createQueryBuilder()
            ->addSelect('ug')
            ->from('AppBundle:UserGoal', 'ug')
            ->leftJoin('ug.goal', 'g');


        foreach($requestFilters as $id => $requestFilter){
            if ($requestFilter) {
                switch ($id) {
                    case UserGoal::URGENT_IMPORTANT:
                        $subQuery->orWhere('ug.urgent = true and ug.important = true');
                        break;
                    case UserGoal::NOT_URGENT_IMPORTANT:
                        $subQuery->orWhere('ug.urgent = false and ug.important = true');
                        break;
                    case UserGoal::URGENT_NOT_IMPORTANT:
                        $subQuery->orWhere('ug.urgent = true and ug.important = false');
                        break;
                    case UserGoal::NOT_URGENT_NOT_IMPORTANT:
                        $subQuery->orWhere('ug.urgent = false and ug.important = false');
                        break;
                }
            }
        }

        // check dream
        if($dream){
            $subQuery->orWhere('ug.doDate is null');
        }

        $query->andWhere($subQuery->getDQLPart('where'));

        if (is_numeric($first) && is_numeric($count)){
            $query
                ->setFirstResult($first)
                ->setMaxResults($count);

            $paginator = new Paginator($query, $fetchJoinCollection = true);
            return $paginator->getIterator()->getArrayCopy();
        }

        return $query->getQuery();
    }

    /**
     * @param $ids
     * @return array|null
     */
    public function findByIdsWithRelations($ids)
    {
        if (!count($ids)){
            return null;
        }

        return $this->getEntityManager()
            ->createQuery("SELECT ug, u, g, author
                           FROM AppBundle:UserGoal ug
                           INDEX BY ug.id
                           JOIN ug.user u
                           JOIN ug.goal g
                           LEFT JOIN g.author author
                           WHERE ug.id IN (:userGoalIds)")
            ->setParameter('userGoalIds', $ids)
            ->getResult();
    }

    /**
     * @param $userId
     * @return array
     */
    public function findUserGoals($userId)
    {
        return $this->getEntityManager()
            ->createQuery("SELECT g.id, ug.status
                           FROM AppBundle:Goal g
                           INDEX BY g.id
                           JOIN g.userGoal ug
                           WHERE ug.user = :userId")
            ->useResultCache(true, 24 * 3600, 'user_goal_' . $userId)
            ->setParameter('userId', $userId)
            ->getResult();
    }
}
