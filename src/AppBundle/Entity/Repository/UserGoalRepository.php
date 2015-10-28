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
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query;


/**
 * Class UserGoalRepository
 * @package AppBundle\Entity\Repository
 */
class UserGoalRepository extends EntityRepository
{
    /**
     * @param $user
     * @param $goal
     * @return array
     */
    public function findByUserAndGoal($user, $goal)
    {
        $query =  $this->getEntityManager()
            ->createQuery("SELECT ug
                             FROM AppBundle:UserGoal ug
                             LEFT JOIN ug.user u
                             LEFT JOIN ug.goal g
                             WHERE u.id = :uid and g.id = :gid
                            ")
            ->setParameter('uid', $user->getId())
            ->setParameter('gid', $goal->getId())
            ->getOneOrNullResult()
        ;

        return $query;
    }

    /**
     * @param $user
     * @param $status
     * @param $dream
     * @param $filter
     * @return array
     */
    public function findAllByUser($user, $status, $dream, $filter)
    {
        $query =
            $this->getEntityManager()
                ->createQueryBuilder()
                ->addSelect('ug')
                ->from('AppBundle:UserGoal', 'ug')
                ->leftJoin('ug.goal', 'g')
                ->leftJoin('g.images', 'i')
                ->leftJoin('ug.user', 'ugu')
                ->where('ugu.id = :user ')
                ->setParameter('user', $user)
        ;

        // check status
        if($status){
            $query
                ->andWhere('ug.status =:status')
                ->setParameter('status', $status);
        }

        // check filter
        if($filter){
            $query
                ->andWhere('ug.urgent is null OR ug.urgent =:urgent')
                ->andWhere('ug.important is null OR  ug.important = :important')
            ;

            // switch for filter
            switch($filter){
                case UserGoal::URGENT_IMPORTANT:
                    $query
                        ->setParameter('urgent' , UserGoal::URGENT )
                        ->setParameter('important' , UserGoal::IMPORTANT);
                    break;
                case UserGoal::NOT_URGENT_IMPORTANT:
                    $query
                        ->setParameter('urgent' , UserGoal::NOT_URGENT)
                        ->setParameter('important',UserGoal::IMPORTANT);
                    break;
                case UserGoal::URGENT_NOT_IMPORTANT:
                    $query
                        ->setParameter('urgent' , UserGoal::URGENT)
                        ->setParameter('important' , UserGoal::NOT_IMPORTANT);
                    break;
                case UserGoal::NOT_URGENT_NOT_IMPORTANT:
                    $query
                        ->setParameter('urgent' , UserGoal::NOT_URGENT)
                        ->setParameter('important', UserGoal::NOT_IMPORTANT);
                    break;

            }
        }
        // check dream
        if($dream){
            $query
                ->andWhere('ug.doDate is null');
        }

        return $query->getQuery()->getResult();
    }
}
