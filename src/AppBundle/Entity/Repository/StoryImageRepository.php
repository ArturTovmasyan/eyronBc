<?php

namespace AppBundle\Entity\Repository;

use Doctrine\ORM\EntityRepository;


/**
 * Class StoryImageRepository
 * @package AppBundle\Entity\Repository
 */
class StoryImageRepository extends EntityRepository
{
    /**
     * @param $ids
     * @return array
     */
    public function findByIDs($ids)
    {
        $query =  $this->getEntityManager()
            ->createQuery(" SELECT i
                            FROM AppBundle:StoryImage i
                            WHERE i.id in (:ids)
                            ")
            ->setParameter('ids', $ids)
            ->getResult()
        ;

        return $query;
    }

    /**
     * @return array
     */
    public function findAllOlder()
    {
        // create new dae
        $date = new \DateTime('now');
        $query =  $this->getEntityManager()
            ->createQuery(" SELECT i, s
                            FROM AppBundle:StoryImage i
                            LEFT JOIN i.story s
                            WHERE s.id is null and TIMESTAMPDIFF( HOUR ,  i.updated,  :date ) > 1
                            ")
            ->setParameter('date', $date)
            ->getResult()
        ;

        return $query;
    }
}
