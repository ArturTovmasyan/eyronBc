<?php

namespace AppBundle\Entity\Repository;

use Doctrine\ORM\EntityRepository;

/**
 * BlogRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class BlogRepository extends EntityRepository
{
    /**
     * @param $first
     * @param $count
     * @return mixed
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function findLastPublishedDate($first, $count)
    {
       $data = $this->getEntityManager()
            ->createQuery("SELECT b.publishedDate
                           FROM AppBundle:Blog b
                           ORDER BY b.publishedDate DESC
                           ")
            ->setFirstResult($first)
            ->setMaxResults($count)
            ->getResult();

        $data = reset($data);
        return $data['publishedDate'];
    }

    /**
     * This function is used to get all blog order by position
     *
     * @return mixed
     * @return array
     */
    public function findAllBlog()
    {
        return $this->getEntityManager()
            ->createQuery("SELECT b 
                           FROM AppBundle:Blog b
                           ORDER BY b.publishedDate DESC
                           ")
            ->getResult();
    }
}
