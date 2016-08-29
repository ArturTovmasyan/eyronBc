<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 10/14/15
 * Time: 8:21 PM
 */

namespace AppBundle\Entity\Repository;

use AppBundle\Entity\UserGoal;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query;
use Doctrine\ORM\Tools\Pagination\Paginator;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;


/**
 * Class UserGoalRepository
 * @package AppBundle\Entity\Repository
 */
class UserGoalRepository extends EntityRepository
{
    /**
     * @param $userId
     * @param $goalId
     * @return mixed
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function findByUserAndGoal($userId, $goalId)
    {
        $query =  $this->getEntityManager()
            ->createQuery("SELECT ug, u, g, a, i
                             FROM AppBundle:UserGoal ug
                             LEFT JOIN ug.user u
                             LEFT JOIN ug.goal g
                             LEFT JOIN g.images i
                             LEFT JOIN g.author a
                             WHERE u.id = :uid and g.id = :gid
                            ")
            ->setParameter('uid', $userId)
            ->setParameter('gid', $goalId)
            ->getOneOrNullResult()
        ;

        return $query;
    }

    /**
     * This function is used to get user goals by user and goal id
     *
     * @param $userIds
     * @param $goalId
     * @return array
     */
    public function findUserGoalsByUserId($userIds, $goalId)
    {
        $query =  $this->getEntityManager()
            ->createQuery("SELECT ug
                             FROM AppBundle:UserGoal ug
                             LEFT JOIN ug.user u
                             LEFT JOIN ug.goal g
                             WHERE u.id IN (:uid) and g.id = :gid
                            ")
            ->setParameter('uid', $userIds)
            ->setParameter('gid', $goalId)
            ->getResult()
        ;

        return $query;
    }

    /**
     * @param $userId
     * @param $status
     * @param $dream
     * @param $requestFilters
     * @param null $first
     * @param null $count
     * @param bool|false $getLastDate
     * @return array
     */
    public function findAllByUser($userId, $status, $dream, $requestFilters, $first, $count, $getLastDate = false)
    {
        $query =
            $this->getEntityManager()
                ->createQueryBuilder()
                ->addSelect('ug, g, a, i, ss')
                ->from('AppBundle:UserGoal', 'ug')
                ->join('ug.goal', 'g')
                ->join('ug.user', 'ugu')
                ->leftJoin('g.author', 'a')
                ->leftJoin('g.successStories', 'ss')
                ->leftJoin('g.images', 'i')
                ->where('ugu.id = :user')
                ->setParameter('user', $userId)
        ;

        // check status
        if($status){
            $query
                ->andWhere('ug.status =:status')
                ->setParameter('status', $status);
        }

        if ($status && $status == UserGoal::COMPLETED){
            $query->orderBy('ug.completionDate', 'desc');
        }
        else {
            $query->orderBy('ug.id', 'desc');
        }


        $subQuery = $this->getEntityManager()
            ->createQueryBuilder()
            ->addSelect('ug')
            ->from('AppBundle:UserGoal', 'ug')
            ->leftJoin('ug.goal', 'g');


        foreach($requestFilters as $id => $requestFilter){
            if ($requestFilter) {
                switch ($id) {
                    case UserGoal::URGENT_IMPORTANT:
                        $subQuery->orWhere('ug.urgent = true and ug.important = true');
                        break;
                    case UserGoal::NOT_URGENT_IMPORTANT:
                        $subQuery->orWhere('ug.urgent = false and ug.important = true');
                        break;
                    case UserGoal::URGENT_NOT_IMPORTANT:
                        $subQuery->orWhere('ug.urgent = true and ug.important = false');
                        break;
                    case UserGoal::NOT_URGENT_NOT_IMPORTANT:
                        $subQuery->orWhere('ug.urgent = false and ug.important = false');
                        break;
                }
            }
        }

        // check dream
        if($dream){
            $subQuery->orWhere('ug.doDate is null');
        }

        $query->andWhere($subQuery->getDQLPart('where'));

        $query
            ->setFirstResult($first)
            ->setMaxResults($count);


        if ($getLastDate){

            $query
                ->select('ug.updated as updated')
                ->groupBy('ug.id');


            $conn = $this->getEntityManager()->getConnection();
            $sql = str_replace('.id = ?', '.id = :userId', $query->getQuery()->getSql());
            $sql = str_replace('.status = ?', '.status = :status', $sql);

            $smtp = $conn->prepare($sql);
            $smtp->bindValue('userId', $userId);

            if ($status) {
                $smtp->bindValue('status', $status);
            }

            $smtp->execute();

            $dates = $smtp->fetchAll();

            if (count($dates) == 0){
                return null;
            }

            $maxDate = new \DateTime(array_pop($dates[0]));
            for($i = 1; $i < count($dates); $i++){
                $tmp = new \DateTime(array_pop($dates[$i]));
                if ($maxDate < $tmp){
                    $maxDate = $tmp;
                }
            }


            return $maxDate;
            //http://bucketlist.loc/app_dev.php/api/v2.0/usergoals/bucketlists?condition=0&count=10&first=0&isDream=false&notUrgentImportant=false&notUrgentNotImportant=false&urgentImportant=false&urgentNotImportant=false&userId=120
        }


        $paginator = new Paginator($query, $fetchJoinCollection = true);
        return $paginator->getIterator()->getArrayCopy();
    }

    /**
     * @param $userGoal
     * @return mixed
     * @throws \Doctrine\ORM\NoResultException
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function findByIdWithRelations($userGoal)
    {
        return $this->getEntityManager()
            ->createQuery("SELECT ug, g, author
                           FROM AppBundle:UserGoal ug
                           JOIN ug.goal g
                           LEFT JOIN g.author author
                           WHERE ug.id = :userGoalId")
            ->setParameter('userGoalId', $userGoal)
            ->getSingleResult();
    }
    
    /**
     * @param $userId
     * @return array
     */
    public function findUserGoals($userId)
    {
        return $this->getEntityManager()
            ->createQuery("SELECT g.id, ug.status
                           FROM AppBundle:Goal g
                           INDEX BY g.id
                           JOIN g.userGoal ug
                           WHERE ug.user = :userId")
            ->useResultCache(true, 24 * 3600, 'user_goal_' . $userId)
            ->setParameter('userId', $userId)
            ->getResult();
    }

    /**
     * This function is used to get userGoals by ids
     *
     * @param $ids
     * @return mixed
     */
    public function findUserGoalsByIds($ids)
    {
        return $this->getEntityManager()
            ->createQuery("SELECT ug, g, u
                           FROM AppBundle:UserGoal ug
                           JOIN ug.goal g
                           JOIN ug.user u
                           WHERE ug.id IN (:ids)")
            ->setParameter('ids', $ids)
            ->getResult();
    }


    /**
     * @param $currentUserId
     * @param null $userGoalId
     * @param null $userId
     * @param null $goalId
     * @return bool|HttpException
     */
    public function removeUserGoal($currentUserId, $userGoalId = null, $userId = null, $goalId = null)
    {
        if (!(is_null($userGoalId) ^ (is_null($goalId) && is_null($userId)))){
            throw new HttpException(Response::HTTP_BAD_REQUEST);
        }

        $em = $this->getEntityManager();

        if (is_null($userGoalId)){
            $userGoal = $this->findByUserAndGoal($userId, $goalId);
        }
        else {
            $userGoal = $this->findByIdWithRelations($userGoalId);
        }

        if(is_null($userGoal)) {
            return new HttpException(Response::HTTP_NOT_FOUND, "User goal not found");
        }

        $goal = $userGoal->getGoal();
        $user = $userGoal->getUser();

        if($user->getId() != $currentUserId){
            return new HttpException(Response::HTTP_FORBIDDEN, "It isn't your user goal");
        }

        $em->remove($userGoal);
        $message = UserGoal::UNLISTED;

        if ($goal->isAuthor($user) && !$goal->getPublish()){
            $em->remove($goal);
            $message = UserGoal::DELETE;
        }

        $em->flush();

        return $message;
    }

    public function findAllByUserId($userId)
    {
        return $this->getEntityManager()
            ->createQuery("SELECT ug, u, g
                           FROM AppBundle:UserGoal ug
                           JOIN ug.user u
                           JOIN ug.goal g
                           WHERE u.id = :userId
                           AND (ug.status = :active OR ug.status = :completed)
                           ORDER BY ug.id")
            ->setParameter('userId', $userId)
            ->setParameter('active', UserGoal::ACTIVE)
            ->setParameter('completed', UserGoal::COMPLETED)
            ->getResult();
    }
}
