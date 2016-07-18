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
    const TopIdeasCount = 100;

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
     * @param $user
     * @param $count
     * @return mixed
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function findPopular($user, $count)
    {
        $ids = $this->getEntityManager()
                ->createQueryBuilder()
                ->select('DISTINCT g.id', '(SELECT COUNT(ug2) FROM AppBundle:UserGoal ug2 WHERE ug2.goal = g) as HIDDEN cnt')
                ->from('AppBundle:Goal', 'g')
                ->leftJoin('g.userGoal', 'ug', 'WITH', 'ug.user = :user')
                ->where('g.publish = true AND ug.id IS NULL')
                ->orderBy('cnt', 'desc')
                ->setParameter('user', $user->getId())
                ->setMaxResults(self::TopIdeasCount)
                ->getQuery()
                ->getScalarResult();


        $ids = array_map(function($v){ return $v['id']; }, $ids);
        shuffle($ids);
        $ids = array_slice($ids, 0, $count);

        if (count($ids) == 0){
            return [];
        }

        return $this->getEntityManager()
            ->createQueryBuilder()
            ->select('g', 'i')
            ->from('AppBundle:Goal', 'g', 'g.id')
            ->leftJoin('g.images', 'i')
            ->where('g.id IN (:ids)')
            ->setParameter('ids', $ids)
            ->getQuery()
            ->getResult();
    }

    /**
     * @param $user
     * @param null $first
     * @param null $count
     * @return Query
     */
    public function findMyDrafts($user, $first = null, $count = null)
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

        if (!is_null($first) && !is_null($count)){
            $query
                ->setFirstResult($first)
                ->setMaxResults($count);

            $paginator = new Paginator($query, $fetchJoinCollection = true);
            return $paginator->getIterator()->getArrayCopy();
        }


        return $query->getQuery();
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
     * @param $user
     * @return array
     */
    public function findMyIdeasCount(&$user)
    {
        $query =
            $this->getEntityManager()
                ->createQueryBuilder()
                ->addSelect('COUNT(g)')
                ->from('AppBundle:Goal', 'g')
                ->leftJoin('g.author', 'a')
                ->where('a.id = :user')
                ->andWhere('g.readinessStatus = :readinessStatus OR g.status = :status')
                ->setParameter('user', $user)
                ->setParameter('readinessStatus', Goal::DRAFT)
                ->setParameter('status', Goal::PRIVATE_PRIVACY)
        ;

        $myIdeasCount = $query->getQuery()->getSingleScalarResult();
        $user->setDraftCount($myIdeasCount);

        return $myIdeasCount;
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
                ->from('AppBundle:Goal', 'g', 'g.id')
                ->leftJoin('g.images', 'i', 'with', 'i.list = true')
                ->where('g.publish = :publish')
                ->setParameter('publish', PublishAware::PUBLISH)
        ;

        $isRandom = (!$search && !$category);

        if($search){
            $sortSelect = "MATCH_AGAINST(g.title, :search) * 10 + MATCH_AGAINST(g.description, :search) as HIDDEN cnt";

            $query
                ->andWhere('MATCH_AGAINST(g.title, g.description, :search) > 0.5')
                ->setParameter('search', $search);
        }
        else {
            if($category && $category != 'most-popular'){
                $query
                    ->leftJoin('g.tags', 'gt')
                    ->andWhere('gt.id in (SELECT ct.id
                                          FROM AppBundle:Category c
                                          LEFT JOIN c.tags ct
                                          WHERE c.slug = :catId)')
                    ->setParameter('catId', $category);
            }

            if($locale){
                $query
                    ->andWhere('g.language  = :lng OR g.language is null')
                    ->setParameter('lng', $locale);
            }

            $sortSelect = "(SELECT count(cug) FROM AppBundle:UserGoal cug WHERE cug.goal = g) as HIDDEN cnt";
        }

        if (!$isRandom){
            $query
                ->addSelect($sortSelect)
                ->orderBy('cnt', 'desc');
        }

        if (is_numeric($first) && is_numeric($count)){

            $idsQuery = clone $query;

            $ids = $idsQuery
                ->addSelect('g.id')
                ->getQuery()
                ->getResult();

            if($isRandom){
              $ids = $this->shuffle_goal($ids);
            }

            $allIds = $ids;
            $ids = array_slice($ids, $first, $count);

            if (count($ids) == 0){
                return [];
            }

            $query
                ->andWhere('g.id IN (:ids)')
                ->setParameter('ids', $ids);
        }

        $query->addSelect('g, i');

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
     * @param $search
     * @param $getAll
     * @return array
     * @throws \Doctrine\DBAL\DBALException
     */
    public function findGoalFriendIds($userId, $search = null, $getAll = false)
    {
        $search = str_replace(' ', '', $search);

        $sqlJoin = "";
        if ($search){
            $search = '%' . $search . '%';
            $sqlJoin = " AND (u.firstname LIKE :search
                           OR u.lastname LIKE :search
                           OR u.email LIKE :search
                           OR CONCAT(u.firstname, u.lastname) LIKE :search) ";
        }

        $roleFilter = "";
        if (!$getAll){
            $roleFilter = " AND u.roles = :roles ";
        }

        //TODO roles in query must be changed
        $connection = $this->getEntityManager()->getConnection();
        $statement = $connection->prepare("SELECT DISTINCT ug.user_id
                                           FROM users_goals AS ug
                                           JOIN fos_user as u ON u.id = ug.user_id $roleFilter
                                           $sqlJoin
                                           WHERE ug.goal_id IN (SELECT ug1.goal_id
                                                                FROM users_goals AS ug1
                                                                WHERE ug1.user_id = :userId)
                                           AND ug.user_id != :userId AND ug.is_visible = true");
        $statement->bindValue('userId', $userId);

        if (!$getAll){
            $statement->bindValue('roles', 'a:0:{}');
        }

        if ($search){
            $statement->bindValue('search', $search);
        }
        $statement->execute();

        $userIds = $statement->fetchAll(\PDO::FETCH_COLUMN);

        return $userIds;
    }

    /**
     * @param $userId
     * @param bool|false $getOnlyIds
     * @param null $search
     * @param bool|false $getOnlyQuery
     * @param null $first
     * @param null $count
     * @return array
     */
    public function findGoalFriends($userId, $getOnlyIds = false, $search = null, $getOnlyQuery = false, $first = null, $count = null)
    {
        if ($getOnlyIds){
            $goalFriendIds = $this->findGoalFriendIds($userId, $search);

            return $goalFriendIds;
        }

        return $this->findGoalFriendsDoctrine($userId, null, $search, $getOnlyQuery, $first, $count);
    }


    /**
     * @param $userId
     * @param $count
     * @return array
     */
    public function findRandomGoalFriends($userId, $count, &$allCount)
    {
        $goalFriendIds = $this->findGoalFriendIds($userId);
        $allCount = count($goalFriendIds);
        shuffle($goalFriendIds);
        $goalFriendIds = array_slice($goalFriendIds, 0, $count);

        if (count($goalFriendIds) == 0){
            return [];
        }

        return $this->getEntityManager()
            ->createQuery("SELECT u
                           FROM ApplicationUserBundle:User u
                           WHERE u.id IN (:ids)")
            ->setParameter('ids', $goalFriendIds)
            ->getResult();
    }

    /**
     * @param $userId
     * @return array
     */
    public function findGoalFriendsDoctrine($userId, $getOnlyIds = false, $search = null, $getOnlyQuery = false, $first = null, $count = null)
    {
        $search = str_replace(' ', '', $search);

        //TODO roles in query must be changed
        $query = $this
                    ->getEntityManager()
                    ->createQueryBuilder()
                    ->select('DISTINCT u, ug')
                    ->from('ApplicationUserBundle:User', 'u', 'u.id')
                    ->join('u.userGoal', 'ug')
                    ->join('ug.goal', 'g')
                    ->where("g.id IN (SELECT g1.id FROM AppBundle:UserGoal ug1 JOIN ug1.user u1 WITH u1.id = :userId JOIN ug1.goal g1)
                             AND u.id != :userId")
                    ->andWhere('u.roles = :roles')
                    ->setParameter('userId', $userId)
                    ->setParameter('roles', 'a:0:{}')
                    ;

        if ($search){
            $query->andWhere("u.firstname LIKE :search
                           or u.lastname LIKE :search
                           or u.email LIKE :search
                           or CONCAT(u.firstname, u.lastname) LIKE :search")
                ->setParameter('search', '%' . $search . '%');
        }

        if (!is_null($first) && !is_null($count)){

            $query
                ->setFirstResult($first)
                ->setMaxResults($count)
            ;
        }

        if ($getOnlyQuery){
            return $query->getQuery();
        }

        if (!is_null($first) && !is_null($count)){
            $paginator = new Paginator($query, $fetchJoinCollection = true);
            return $paginator->getIterator()->getArrayCopy();
        }

        return $query->getQuery()->getResult();
    }

    /**
     * @param $id
     * @return mixed
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function findWithRelations($id)
    {
        return $this->getEntityManager()
            ->createQuery("SELECT g, i, a, ss
                           FROM AppBundle:Goal g
                           LEFT JOIN g.images i
                           LEFT JOIN g.author a
                           LEFT JOIN g.successStories ss
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
            ->createQuery("SELECT g, i, t, au, ug, gs, f, gsu
                           FROM AppBundle:Goal g
                           LEFT JOIN g.tags t
                           LEFT JOIN g.images i
                           LEFT JOIN g.author au
                           LEFT JOIN au.userGoal ug
                           LEFT JOIN g.successStories gs
                           LEFT JOIN gs.user gsu
                           LEFT JOIN gs.files f
                           WHERE g.slug = :slug")
            ->setParameter('slug', $slug['slug'])
            ->getOneOrNullResult();
    }

    /**
     * @param $goalId
     * @param $status
     * @param null $first
     * @param null $count
     * @param null $search
     * @return array|Query
     */
    public function findGoalUsers($goalId, $status, $first = null, $count = null, $search = null)
    {
        $query = $this->getEntityManager()
            ->createQueryBuilder()
            ->select('u, ug')
            ->from('ApplicationUserBundle:User', 'u', 'u.id')
            ->join('u.userGoal', 'ug', 'WITH', 'ug.status = :status OR :status IS NULl')
            ->join('ug.goal', 'g', 'WITH', 'g.id = :goalId')
            ->setParameter('status', $status)
            ->setParameter('goalId', $goalId);

        if ($search){
            $query->andWhere("u.firstname LIKE :search
                           or u.lastname LIKE :search
                           or u.email LIKE :search
                           or CONCAT(u.firstname, u.lastname) LIKE :search")
                ->setParameter('search', '%' . $search . '%');
        }

        if (is_numeric($first) && is_numeric($count)){
            $query
                ->setFirstResult($first)
                ->setMaxResults($count);

            $paginator = new Paginator($query, $fetchJoinCollection = true);
            return $paginator->getIterator()->getArrayCopy();
        }

        return $query->getQuery()->getResult();
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

    /**
     * This function is used to do random data in array
     *
     * @param $ids
     * @return array
     */
    public function shuffle_goal($ids) {

        //check if ids not exist
        if(!is_array($ids)) {

            return $ids;
        }

        //get key in array
        $keys = array_keys($ids);

        //random array by key
        shuffle($keys);

        //set random default array
        $random = array();

        foreach ($keys as $key) {
            $random[$key] = $ids[$key];
        }

        return $random;
    }

    /**
     * @param $id
     * @return mixed
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function findGoalWithAuthor($id)
    {
        return $this->getEntityManager()
            ->createQuery("SELECT g, a
                           FROM AppBundle:Goal g
                           LEFT JOIN g.author a
                           WHERE g.id = :id")
            ->setParameter('id', $id)
            ->getOneOrNullResult();
    }

    /**
     * @param $user
     * @return array
     */
    public function findMyPrivateGoals($user)
    {
        $query = $this->getEntityManager()
            ->createQueryBuilder()
            ->select('g, i')
            ->from('AppBundle:Goal', 'g')
            ->leftJoin('g.images', 'i')
            ->leftJoin('g.author', 'a')
            ->where('a.id = :user')
            ->andWhere('g.status = :status')
            ->andWhere('g.readinessStatus = :readinessStatus')
            ->orderBy('g.id', 'desc')
            ->setParameter('user', $user)
            ->setParameter('status', Goal::PRIVATE_PRIVACY)
            ->setParameter('readinessStatus', Goal::TO_PUBLISH)
        ;

        return $query->getQuery();
    }

    /**
     * @param $user1Id
     * @param $user2Id
     * @return array
     */
    public function findCommonGoals($user1Id, $user2Id)
    {
        return $this->getEntityManager()
            ->createQuery("SELECT g
                           FROM AppBundle:Goal g
                           INDEX BY g.id
                           JOIN g.userGoal ug WITH ug.user = :user1Id
                           JOIN g.userGoal ug1 WITH ug1.user = :user2Id")
            ->setParameter('user1Id', $user1Id)
            ->setParameter('user2Id', $user2Id)
            ->getResult();
    }

    /**
     * @param $userId
     * @param $userIds
     * @return array
     */
    public function findCommonCounts($userId, $userIds)
    {
        if (count($userIds) == 0){
            return [];
        }

        return $this->getEntityManager()
            ->createQuery("SELECT u.id, COUNT(mug.id) as commonGoals
                           FROM ApplicationUserBundle:User u
                           INDEX BY u.id
                           LEFT JOIN u.userGoal ug
                           LEFT JOIN AppBundle:UserGoal mug WITH mug.goal = ug.goal AND mug.user = :userId
                           WHERE u.id IN (:userIds)
                           GROUP BY u.id")
            ->setParameter('userId', $userId)
            ->setParameter('userIds', $userIds)
            ->getResult();
    }
}