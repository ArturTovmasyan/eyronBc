<?php

namespace Application\CommentBundle\Entity\Repository;

use AppBundle\Model\loggableEntityRepositoryInterface;
use Doctrine\ORM\EntityRepository;

/**
 * CommentRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class CommentRepository extends EntityRepository implements loggableEntityRepositoryInterface
{
    /**
     * @param $ids
     * @return array|null
     */
    public function findByIdsWithRelations($ids)
    {
        if (!count($ids)){
            return null;
        }

        return $this->getEntityManager()
            ->createQuery("SELECT cmt, author
                           FROM ApplicationCommentBundle:Comment cmt
                           INDEX BY cmt.id
                           JOIN cmt.author author
                           WHERE cmt.id IN (:commentIds)")
            ->setParameter('commentIds', $ids)
            ->getResult();
    }
}