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
                ->addSelect('g', 'i')
                ->from('AppBundle:Goal', 'g')
                ->leftJoin('g.images', 'i');

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
        $query =
            $this->getEntityManager()
                ->createQueryBuilder()
                ->addSelect('g', 'i')
                ->from('AppBundle:Goal', 'g')
                ->leftJoin('g.images', 'i')
                ->leftJoin('g.tags', 'gt')
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
            ;
        }


        return $query->getQuery()->getResult();
    }
}