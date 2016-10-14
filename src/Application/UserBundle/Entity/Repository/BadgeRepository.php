<?php

namespace Application\UserBundle\Entity\Repository;

use Doctrine\ORM\EntityRepository;

/**
 * Class BadgeRepository
 * @package Application\UserBundle\Entity\Repository
 */
class BadgeRepository extends EntityRepository
{
    /**
     * This function is used to get TOP users by score rating
     * 
     * @param $type
     * @param $count
     * @return mixed
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function findTopUsersByType($type, $count)
    {
        return $this->getEntityManager()
            ->createQuery("SELECT u, b
                           FROM ApplicationUserBundle:User u
                           JOIN u.badges b
                           WHERE b.type = :types
                           ORDER BY b.score DESC")
            ->setParameter('types', $type)
            ->setMaxResults($count)
            ->getResult();
    }
}
