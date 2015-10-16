<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 10/16/15
 * Time: 8:48 PM
 */

namespace AppBundle\Entity\Repository;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query;

/**
 * Class PageRepository
 * @package AppBundle\Entity\Repository
 */
class PageRepository extends EntityRepository
{

    /**
     * @return array
     */
    public function findAllByOrdered()
    {
        $query =
            $this->getEntityManager()
                ->createQueryBuilder()
                ->addSelect('p')
                ->from('AppBundle:Page', 'p')
                ->orderBy('p.position', 'ASC')
        ;

        return $query->getQuery()->getResult();
    }
}