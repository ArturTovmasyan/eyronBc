<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 10/15/15
 * Time: 3:27 PM
 */

namespace AppBundle\Entity\Repository;

use AppBundle\Entity\Goal;
use AppBundle\Entity\UserGoal;
use AppBundle\Model\loggableEntityRepositoryInterface;
use AppBundle\Model\PublishAware;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query;
use Doctrine\ORM\Tools\Pagination\Paginator;

/**
 * Class GoalRepository
 * @package AppBundle\Entity\Repository
 */
class GoalRepository extends EntityRepository implements loggableEntityRepositoryInterface
{
    /**
     * @param $count
     * @return mixed
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function findAllWithCount($count = null)
    {
        $query =
            $this->getEntityManager()
                ->createQueryBuilder()
                ->select('g', 'i', 'count(ug) as HIDDEN  cnt')
                ->from('AppBundle:Goal', 'g', 'g.id')
                ->join('g.images', 'i', 'with', 'i.list = true')
                ->leftJoin('g.userGoal', 'ug')
                ->where('g.publish = :publish')
                ->addGroupBy('g.id')
                ->orderBy('cnt', 'desc')
                ->setParameter('publish', PublishAware::PUBLISH)
        ;


        // check count
        if($count){
            $query
                ->setMaxResults($count);
        }
        return $query->getQuery()->getResult();
    }


    /**
     * This function is used to get listedBy, doneBy counts for goal
     *
     * @param $goals
     * @param $getStats
     * @return mixed
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function findGoalStateCount(&$goals, $getStats = false)
    {
        $isSingleObject = 0;
        if ($goals instanceof Goal){
            $isSingleObject = $goals->getId();
            $goals = [$goals->getId() => $goals];
        }

        if (!count($goals)){
            return null;
        }

        $stats = $this->getEntityManager()
            ->createQuery("SELECT g.id as goalId, COUNT(ug) as listedBy,
                          (SELECT COUNT (ug1) from AppBundle:UserGoal ug1
                           WHERE ug1.status != :status and ug1.goal = g) as doneBy
                           FROM AppBundle:Goal g
                           INDEX BY g.id
                           LEFT JOIN g.userGoal ug
                           WHERE g.id IN (:goalIds)
                           GROUP BY g.id
                          ")
            ->setParameter('goalIds', array_keys($goals))
            ->setParameter('status', UserGoal::ACTIVE)
            ->getResult();

        if ($getStats){
            return $stats;
        }

        foreach($goals as &$goal){
            $goal->setStats([
                'listedBy' => $stats[$goal->getId()]['listedBy'],
                'doneBy'   => $stats[$goal->getId()]['doneBy'],
            ]);
        }

        if ($isSingleObject){
            $goals = $goals[$isSingleObject];
            return $goals;
        }

        return $goals;
    }

    /**
     * @param $count
     * @return mixed
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function findPopular($user, $count)
    {
        $query =
            $this->getEntityManager()
                ->createQueryBuilder()
                ->addSelect('g', 'i', '(SELECT COUNT(ug2) FROM AppBundle:UserGoal ug2 WHERE ug2.goal = g) as HIDDEN  cnt')
                ->from('AppBundle:Goal', 'g', 'g.id')
                ->leftJoin('g.images', 'i', 'with', 'i.list = true')
                ->andWhere('g.publish = true and not exists (SELECT ug1 FROM AppBundle:UserGoal ug1 WHERE ug1.goal = g AND ug1.user = :user)')
                ->orderBy('cnt', 'desc')
                ->setParameter('user', $user->getId());

        if($count){
            $query->setMaxResults($count);
        }

        return $query->getQuery()->getResult();
    }

    /**
     * @param $user
     * @return array
     */
    public function findMyDrafts($user)
    {
        $query = $this->getEntityManager()
                ->createQueryBuilder()
                ->select('g, i')
                ->from('AppBundle:Goal', 'g')
                ->leftJoin('g.images', 'i')
                ->leftJoin('g.author', 'a')
                ->where('a.id = :user')
                ->andWhere('g.readinessStatus = :readinessStatus')
                ->orderBy('g.id', 'desc')
                ->setParameter('user', $user)
                ->setParameter('readinessStatus', Goal::DRAFT)
        ;

        return $query->getQuery()->getResult();
    }

    /**
     * @param $user
     * @return array
     */
    public function findMyDraftsCount(&$user)
    {
        $query =
            $this->getEntityManager()
                ->createQueryBuilder()
                ->addSelect('COUNT(g)')
                ->from('AppBundle:Goal', 'g')
                ->leftJoin('g.author', 'a')
                ->where('a.id = :user')
                ->andWhere('g.readinessStatus = :readinessStatus')
                ->setParameter('user', $user)
                ->setParameter('readinessStatus', Goal::DRAFT)
        ;

        $draftCount = $query->getQuery()->getSingleScalarResult();
        $user->setDraftCount($draftCount);

        return $draftCount;
    }

    /**
     * @param $category
     * @param $search
     * @param $first
     * @param $count
     * @param $allIds
     * @return mixed
     * @param null $locale
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function findAllByCategory($category = null, $search = null, $first = null, $count = null, &$allIds = null, $locale = null)
    {
        $query =
            $this->getEntityManager()
                ->createQueryBuilder()
                ->select('g', 'i', 'count(ug) as HIDDEN  cnt')
                ->from('AppBundle:Goal', 'g', 'g.id')
                ->leftJoin('g.images', 'i', 'with', 'i.list = true')
                ->leftJoin('g.tags', 'gt')
                ->leftJoin('g.userGoal', 'ug')
                ->where('g.publish = :publish')
                ->groupBy('g.id')
                ->orderBy('cnt', 'desc')
                ->setParameter('publish', PublishAware::PUBLISH)
        ;

        if($category){
            $query
                ->andWhere('gt.id in (
                SELECT ct.id FROM AppBundle:Category c
                LEFT JOIN c.tags ct
                WHERE c.slug = :catId
                )')
                ->setParameter('catId', $category)
            ;
        }

        if($search){
            $query
                ->andWhere('g.title LIKE :search or g.description LIKE :search')
                ->setParameter('search', '%' . $search . '%')
                ->groupBy('g.id')
            ;
        }

        // show for corresponding language
        if(!$search && $locale){
            $query
                ->andWhere('g.language  = :lng OR g.language is null')
                ->setParameter('lng', $locale);
        }

        if (is_numeric($first) && is_numeric($count)){

            if(!$search && !$category ){

                //set first random data for discover category ideas
                $first = rand(1,50);

                $ids = $this->getEntityManager()
                    ->createQueryBuilder()
                    ->select('g.id', 'count(ug) as HIDDEN  cnt')
                    ->from('AppBundle:Goal', 'g', 'g.id')
                    ->leftJoin('g.userGoal', 'ug')
                    ->leftJoin('g.images', 'i', 'with', 'i.list = true')
                    ->where('g.publish = :publish')
                    ->groupBy('g.id')
                    ->orderBy('cnt', 'desc')
                    ->setParameter('publish', PublishAware::PUBLISH);
                if($locale){
                    $ids->andWhere('g.language  = :lng OR g.language is null')
                        ->setParameter('lng', $locale);
                }
                $idsQuery = clone $ids;
            }else{
                $idsQuery = clone $query;
            }
            $ids = $idsQuery
                ->select('g.id', 'count(ug) as HIDDEN  cnt')
                ->getQuery()
                ->getResult()
            ;

            $allIds = $ids;
            $ids = array_slice($ids, $first, $count);

            if (count($ids) == 0){
                return [];
            }

            $query
                ->andWhere('g.id IN (:ids)')
                ->setParameter('ids', $ids);
            ;
        }


        return $query->getQuery()->getResult();
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
            ->createQuery("SELECT g, i, author
                           FROM AppBundle:Goal g
                           INDEX BY g.id
                           LEFT JOIN g.images i
                           LEFT JOIN g.author author
                           WHERE g.id IN (:goalIds)")
            ->setParameter('goalIds', $ids)
            ->getResult();
    }

    /**
     * @param $userId
     * @return array
     */
    public function findGoalFriends($userId, $getOnlyIds = false, $count = null, $search = null, $getOnlyQuery = false)
    {
        $search = str_replace(' ', '', $search);

        //TODO roles in query must be changed
        $query = $this
                    ->getEntityManager()
                    ->createQueryBuilder()
                    ->select('DISTINCT u')
                    ->from('ApplicationUserBundle:User', 'u')
                    ->join('u.userGoal', 'ug')
                    ->join('ug.goal', 'g')
                    ->where("g.id IN (SELECT g1.id FROM AppBundle:UserGoal ug1 JOIN ug1.user u1 WITH u1.id = :userId JOIN ug1.goal g1)
                             AND u.id != :userId")
                    ->andWhere('u.roles = :roles')
                    ->setParameter('userId', $userId)
                    ->setParameter('roles', 'a:0:{}')
                    ;

        if ($search){
            $query->andWhere("u.firstName LIKE :search
                           or u.lastName LIKE :search
                           or u.email LIKE :search
                           or CONCAT(u.firstName, u.lastName) LIKE :search")
                ->setParameter('search', '%' . $search . '%');
        }

        if ($getOnlyQuery){
            return $query->getQuery();
        }

        $results = $query->getQuery()->getResult();


        if ($getOnlyIds){
            $ids = [];
            foreach($results as $result){
                $ids[] = $result->getId();
            }

            return $ids;
        }

        return $results;
    }

    /**
     * @param $id
     * @return mixed
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function findWithRelations($id)
    {
        return $this->getEntityManager()
            ->createQuery("SELECT g, i
                           FROM AppBundle:Goal g
                           LEFT JOIN g.images i
                           WHERE g.id = :id")
            ->setParameter('id', $id)
            ->getOneOrNullResult();
    }

    /**
     * This is actual only for param converter repository method
     *
     * @param $slug
     * @return mixed
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function findBySlugWithRelations($slug)
    {
        return $this->getEntityManager()
            ->createQuery("SELECT g, i, t
                           FROM AppBundle:Goal g
                           LEFT JOIN g.tags t
                           LEFT JOIN g.images i
                           WHERE g.slug = :slug")
            ->setParameter('slug', $slug['slug'])
            ->getOneOrNullResult();
    }

    /**
     * @param $goalId
     * @param $status
     * @return array
     */
    public function findGoalUsers($goalId, $status)
    {
        return $this->getEntityManager()
            ->createQuery("SELECT u
                           FROM ApplicationUserBundle:User u
                           JOIN u.userGoal ug
                           JOIN ug.goal g
                           WHERE (ug.status = :status OR :status IS NULl) AND g.id = :goalId")
            ->setParameter('status', $status)
            ->setParameter('goalId', $goalId)
            ->getResult();
    }

    /**
     * This function is used to get goal group by created date
     *
     * @param $limit
     * @return array
     */
    public function findGoalGroupByCreationDate($limit)
    {
        return $this->getEntityManager()
            ->createQuery('SELECT DATE(g.created) as dates, COUNT(g.created) as counts
						   FROM AppBundle:Goal g
						   WHERE g.created > :limit
						   GROUP BY dates
						   ORDER BY dates')
            ->setParameter('limit', $limit)
            ->getResult();
    }

    /**
     * This function is used to get published goal group by publishedDate
     *
     * @param $limit
     * @return array
     */
    public function findPublishedGoalGroupByDate($limit)
    {
        return $this->getEntityManager()
            ->createQuery('SELECT DATE(g.publishedDate) as dates,COUNT(g.publishedDate) as counts, g.publishedBy
								   FROM AppBundle:Goal g
								   WHERE g.publish = :publish
                                   AND g.publishedDate is NOT NULL
								   AND g.publishedDate > :limit
								   GROUP BY g.publishedBy, dates
								   ORDER BY dates')
            ->setParameter('publish', Goal::PUBLISH)
            ->setParameter('limit', $limit)
            ->getResult();
    }

    /**
     * This function is used to get goal group by updated dates
     *
     * @param $limit
     * @return array
     */
    public function findGoalGroupByUpdateDate($limit)
    {
        return $this->getEntityManager()
            ->createQuery('SELECT DATE(g.updated ) as dates, COUNT(g.updated) as counts
								   FROM AppBundle:Goal g
								   WHERE g.updated > :limit
								   GROUP BY dates
								   ORDER BY dates')
            ->setParameter('limit', $limit)
            ->getResult();
    }
}