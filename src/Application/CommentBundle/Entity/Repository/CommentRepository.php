<?php

namespace Application\CommentBundle\Entity\Repository;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Tools\Pagination\Paginator;

/**
 * CommentRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class CommentRepository extends EntityRepository
{
    /**
     * @param $threadId
     * @param null $first
     * @param null $count
     * @return array
     */
    public function findThreadComments($threadId, $first = null, $count = null)
    {
        $query = $this->getEntityManager()
            ->createQuery("SELECT cmt, a, ch
                           FROM ApplicationCommentBundle:Comment cmt
                           LEFT JOIN cmt.author a
                           LEFT JOIN cmt.children ch
                           WHERE cmt.thread = :threadId AND cmt.parent IS NULL")
            ->setParameter('threadId', $threadId);

        if (is_numeric($first) && is_numeric($count)){
            $query
                ->setFirstResult($first)
                ->setMaxResults($count);

            $paginator = new Paginator($query, $fetchJoinCollection = true);
            return $paginator->getIterator()->getArrayCopy();
        }

        return $query->getResult();
    }

    /**
     * @param $commentId
     * @return mixed
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function findCommentWithAuthor($commentId)
    {
        return $this->getEntityManager()
            ->createQuery("SELECT cmt, a
                           FROM ApplicationCommentBundle:Comment cmt
                           LEFT JOIN cmt.author a
                           WHERE cmt.id = :commentId")
            ->setParameter('commentId', $commentId)
            ->getOneOrNullResult();
    }
}

