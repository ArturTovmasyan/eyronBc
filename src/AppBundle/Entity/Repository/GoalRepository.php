<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 10/15/15
 * Time: 3:27 PM
 */

namespace AppBundle\Entity\Repository;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query;

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
                ->addSelect('g', 'i', 'count(ug) as HIDDEN  cnt')
                ->from('AppBundle:Goal', 'g')
                ->leftJoin('g.images', 'i')
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
     * @param $category
     * @param $search
     * @return mixed
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function findAllByCategory($category = null, $search = null)
    {
        //COUNT(lead) as HIDDEN cnt

        $query =
            $this->getEntityManager()
                ->createQueryBuilder()
                ->addSelect('g', 'i', 'count(ug) as HIDDEN  cnt')
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