<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 10/15/15
 * Time: 3:27 PM
 */

namespace AppBundle\Entity\Repository;

use AppBundle\Entity\Goal;
use AppBundle\Entity\UserGoal;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query;
use Doctrine\ORM\Tools\Pagination\Paginator;

/**
 * Class GoalRepository
 * @package AppBundle\Entity\Repository
 */
class GoalRepository extends EntityRepository
{
    /**
     * @param $count
     * @return mixed
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function findAllWithCount($count = null)
    {
        $query =
            $this->getEntityManager()
                ->createQueryBuilder()
                ->addSelect('g', 'count(ug) as HIDDEN  cnt')
                ->from('AppBundle:Goal', 'g')
//                ->leftJoin('g.images', 'i')
                ->leftJoin('g.userGoal', 'ug')
                ->groupBy('g.id')
                ->orderBy('cnt', 'desc')
        ;

        if($count){
            $query
                ->setMaxResults($count);
        }
        return $query->getQuery()->getResult();
    }

    /**
     * @param $user
     * @return array
     */
    public function findMyDrafts($user)
    {
        $query =
            $this->getEntityManager()
                ->createQueryBuilder()
                ->addSelect('g')
                ->from('AppBundle:Goal', 'g')
                ->leftJoin('g.images', 'i')
                ->leftJoin('g.userGoal', 'ug')
                ->leftJoin('ug.user', 'ugu')
                ->leftJoin('g.author', 'a')
                ->where('a.id = :user or ugu.id = :user ')
                ->andWhere('g.readinessStatus = :status')
                ->setParameter('user', $user)
                ->setParameter('status', Goal::DRAFT)
        ;

        return $query->getQuery()->getResult();
    }

    /**
     * @param $user
     * @return array
     */
    public function findMyDraftsCount($user)
    {
        $query =
            $this->getEntityManager()
                ->createQueryBuilder()
                ->addSelect('COUNT(g)')
                ->from('AppBundle:Goal', 'g')
                ->leftJoin('g.images', 'i')
                ->leftJoin('g.userGoal', 'ug')
                ->leftJoin('ug.user', 'ugu')
                ->leftJoin('g.author', 'a')
                ->where('a.id = :user or ugu.id = :user ')
                ->andWhere('g.readinessStatus = :status')
                ->setParameter('user', $user)
                ->setParameter('status', Goal::DRAFT)
        ;

        return $query->getQuery()->getSingleScalarResult();
    }

    /**
     * @param $category
     * @param $search
     * @return mixed
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function findAllByCategory($category = null, $search = null)
    {
        $query =
            $this->getEntityManager()
                ->createQueryBuilder()
                ->addSelect('g', 'count(ug) as HIDDEN  cnt')
                ->from('AppBundle:Goal', 'g')
                ->leftJoin('g.images', 'i')
                ->leftJoin('g.tags', 'gt')
                ->leftJoin('g.userGoal', 'ug')
                ->groupBy('g.id')
                ->orderBy('cnt', 'desc')
        ;

        if($category){
            $query
                ->andWhere('gt.id in (
                SELECT ct.id FROM AppBundle:Category c
                LEFT JOIN c.tags ct
                WHERE c.slug = :catId
                )')
                ->setParameter('catId', $category)
            ;
        }

        if($search){
            $query
                ->andWhere('g.title LIKE :search')
                ->setParameter('search', '%' . $search . '%')
                ->groupBy('g.id')
            ;
        }

        return $query->getQuery()->getResult();
    }
}