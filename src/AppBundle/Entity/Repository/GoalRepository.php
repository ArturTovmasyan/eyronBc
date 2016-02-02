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
     * @return mixed
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function findGoalStateCount(&$goals)
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
                ->addSelect('g', 'count(ug) as HIDDEN  cnt')
                ->from('AppBundle:Goal', 'g')
//                ->leftJoin('g.images', 'i')
                ->leftJoin('g.userGoal', 'ug')
                ->leftJoin('ug.user', 'u')
                ->andWhere('ug is null or u.id != :user')
                ->groupBy('g.id')
                ->orderBy('cnt', 'desc')
                ->setParameter('user', $user->getId());

        if($count){
            $query
                ->setMaxResults($count);
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
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function findAllByCategory($category = null, $search = null, $first = null, $count = null, &$allIds = null)
    {
        $query =
            $this->getEntityManager()
                ->createQueryBuilder()
                ->select('g', 'i', 'count(ug) as HIDDEN  cnt')
                ->from('AppBundle:Goal', 'g', 'g.id')
                ->leftJoin('g.images', 'i')
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

        if (is_numeric($first) && is_numeric($count)){

            $idsQuery = clone $query;
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
    public function findGoalFriends($userId, $getOnlyIds = false, $count = null, $search = null, $getOnlyQuery = false, $firstUserId = false)
    {
        $search = str_replace(' ', '', $search);

        $query = $this
                    ->getEntityManager()
                    ->createQueryBuilder()
                    ->select('DISTINCT u')
                    ->from('ApplicationUserBundle:User', 'u')
                    ->join('u.userGoal', 'ug')
                    ->join('ug.goal', 'g')
                    ->where("g.id IN (SELECT g1.id FROM AppBundle:UserGoal ug1 JOIN ug1.user u1 WITH u1.id = :userId JOIN ug1.goal g1)
                             AND u.id != :userId")
                    ->setParameter('userId', $userId)
                    ;

        if($firstUserId)
        {
            $query->andWhere('u.id >= :userId')
                ->setParameter('userId', $firstUserId);
        }

        if ($search){
            $query->andWhere("u.firstName LIKE :search
                           or u.lastName LIKE :search
                           or u.email LIKE :search
                           or CONCAT(u.firstName, u.lastName) LIKE :search")
                ->setParameter('search', '%' . $search . '%');
        }

        if ($count){
            $query->setMaxResults($count);
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
     * @param $goalId
     * @param $type
     * @return array
     */
    public function findGoalUsers($goalId, $type)
    {
        return $this->getEntityManager()
            ->createQuery("SELECT u
                           FROM ApplicationUserBundle:User u
                           JOIN u.userGoal ug
                           JOIN ug.goal g WITH g.id = :goalId
                           WHERE ug.status = :status")
            ->setHint(Query::HINT_FORCE_PARTIAL_LOAD, true)
            ->setParameter('status', $type == "listed" ? UserGoal::ACTIVE : UserGoal::COMPLETED)
            ->setParameter('goalId', $goalId);
    }
}