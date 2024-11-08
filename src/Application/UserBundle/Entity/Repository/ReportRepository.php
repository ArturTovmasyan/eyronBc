<?php

namespace Application\UserBundle\Entity\Repository;
use Application\UserBundle\Entity\Report;

/**
 * ReportRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class ReportRepository extends \Doctrine\ORM\EntityRepository
{
    /**
     * @return array
     */
    public function findCommentAndSuccessStoriesIds()
    {
        $commentIds = $this->getEntityManager()
            ->createQuery("SELECt cmt.id
                           FROM ApplicationUserBundle:Report r
                           JOIN ApplicationCommentBundle:Comment cmt WITH cmt.id = r.contentId and r.contentType = :commentType")
            ->setParameter('commentType', Report::COMMENT)
            ->getScalarResult();

        $successStoryIds = $this->getEntityManager()
            ->createQuery("SELECt ss.id
                           FROM ApplicationUserBundle:Report r
                           JOIN AppBundle:SuccessStory ss WITH ss.id = r.contentId and r.contentType = :storyType")
            ->setParameter('storyType', Report::SUCCESS_STORY)
            ->getScalarResult();

        return [
           'commentIds'      => $commentIds,
           'successStoryIds' => $successStoryIds
        ];
    }
}
