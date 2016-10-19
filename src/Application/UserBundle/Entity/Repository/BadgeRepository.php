<?php

namespace Application\UserBundle\Entity\Repository;

use Application\UserBundle\Entity\Badge;
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
     * @param $userId
     * @param $type
     * @return mixed
     */
    public function findBadgeByUserAndType($userId, $type)
    {
        return $this->getEntityManager()
            ->createQuery("SELECT b
                           FROM ApplicationUserBundle:Badge b
                           JOIN b.user u
                           WHERE b.user = :user AND b.type = :type")
            ->setParameter('type', $type)
            ->setParameter('user', $userId)
            ->getOneOrNullResult();
    }

    /**
     * @return mixed
     */
    public function getMaxScores()
    {
        $stmt = $this->getEntityManager()
            ->getConnection()
            ->prepare('
                        SELECT * FROM
                        (
                          SELECT MAX(badge.score) as traveller FROM badge WHERE badge.type = :traveller
                        ) as traveller,
                        
                       (
                          SELECT MAX(badge.score) as motivator FROM badge WHERE badge.type = :motivator
                        ) as motivator,
                        
                         (
                          SELECT MAX(badge.score) as innovator FROM badge WHERE badge.type = :innovator
                        ) as innovator

                        ');
        $stmt->bindValue('traveller', Badge::TYPE_TRAVELLER);
        $stmt->bindValue('motivator', Badge::TYPE_MOTIVATOR);
        $stmt->bindValue('innovator', Badge::TYPE_INNOVATOR);
        $stmt->execute();
        $result = $stmt->fetchAll();

        if($result){
            $result = reset($result);
        }

        return $result ;
    }
}
