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

    /**
     * @param $ids
     * @return array
     */
    public function findByIds($ids)
    {
        if (count($ids) == 0){
            return [];
        }

        return $this->getEntityManager()
            ->createQuery("SELECT cmt
                           FROM ApplicationCommentBundle:Comment cmt
                           INDEX BY cmt.id
                           WHERE cmt.id IN (:ids)")
            ->setParameter('ids', $ids)
            ->getResult();
    }

    /**
     * This function is used to get comment by goal(thread) id
     *
     * @param $id
     * @return array
     */
    public function findCommentsByGoalId($id)
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
     * This function is used to get thread by thread id
     *
     * @param $threadId
     * @return array
     */
    public function findThreadByGoalId($threadId)
    {
        return $this->getEntityManager()
            ->createQuery("SELECT tr
                           FROM ApplicationCommentBundle:Thread tr
                           WHERE tr.id  = :id")
            ->setParameter('id', $threadId)
            ->getResult();
    }
}

