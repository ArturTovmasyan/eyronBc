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
     * @return mixed
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function findAllByCategory($category = null)
    {
        $query =
            $this->getEntityManager()
                ->createQueryBuilder()
                ->addSelect('g', 'i')
                ->from('AppBundle:Goal', 'g')
                ->leftJoin('g.images', 'i')
                ->leftJoin('g.tags', 'gt');

        if($category){
            $query
                ->leftJoin('AppBundle:Category', 'c', 'WITH', 'c.id = 1')
            ;
        }
        return $query->getQuery()->getResult();
    }
}