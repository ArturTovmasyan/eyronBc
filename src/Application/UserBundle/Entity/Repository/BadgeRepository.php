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
            ->createQuery("SELECT b, u
                           FROM ApplicationUserBundle:Badge b
                           JOIN b.user u
                           WHERE b.type = :types
                           ORDER BY b.score DESC")
            ->setParameter('types', $type)
            ->setMaxResults($count)
            ->getResult();
    }

    /**
     * @param $user
     * @param $type
     * @return mixed
     */
    public function findBadgeByUserAndType($user, $type)
    {
        return $this->getEntityManager()
            ->createQuery("SELECT b
                           FROM ApplicationUserBundle:Badge b
                           JOIN b.user u
                           WHERE b.user = :user AND b.type = :type")
            ->setParameter('type', $type)
            ->setParameter('user', $user->getUser())
            ->getOneOrNullResult();
    }
}
