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


/**
 * Class UserGoalRepository
 * @package AppBundle\Entity\Repository
 */
class UserGoalRepository extends EntityRepository implements loggableEntityRepositoryInterface
{
    /**
     * @param $userId
     * @param $goalId
     * @return array
     */
    public function findByUserAndGoal($userId, $goalId)
    {
        $query =  $this->getEntityManager()
            ->createQuery("SELECT ug, u, g, a, i
                             FROM AppBundle:UserGoal ug
                             LEFT JOIN ug.user u
                             LEFT JOIN ug.goal g
                             LEFT JOIn g.images i
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
     * @param $userId
     * @param $status
     * @param $dream
     * @param $requestFilters
     * @return array
     */
    public function findAllByUser($userId, $status, $dream, $requestFilters)
    {
        $query =
            $this->getEntityManager()
                ->createQueryBuilder()
                ->addSelect('ug, g, i')
                ->from('AppBundle:UserGoal', 'ug')
                ->leftJoin('ug.goal', 'g')
                ->leftJoin('g.images', 'i')
                ->leftJoin('ug.user', 'ugu')
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

        return $query->getQuery()->getResult();
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
                           JOIN g.author author
                           WHERE ug.id IN (:userGoalIds)")
            ->setParameter('userGoalIds', $ids)
            ->getResult();
    }
}
