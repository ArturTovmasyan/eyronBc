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
     * This function is used to get comment by goal(thread) id
     *
     * @param $id
     * @return array
     */
    public function findCommentsById($id)
    {
        return $this->getEntityManager()
            ->createQuery("SELECT c
                           FROM ApplicationCommentBundle:Comment c
                           JOIN c.thread t
                           WHERE t.id  = :id")
            ->setParameter('id', $id)
            ->getResult();
    }

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

    /**
     * @param $threadId
     * @return array
     */
    public function findThreadComments($threadId)
    {
        return $this->getEntityManager()
            ->createQuery("SELECT cmt
                           FROM ApplicationCommentBundle:Comment cmt
                           JOIN cmt.thread th WITH th.id = :threadId")
            ->setParameter('threadId', $threadId)
            ->getResult();
    }
}

