<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 10/14/15
 * Time: 8:21 PM
 */

namespace AppBundle\Entity\Repository;

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
}
