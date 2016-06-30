<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 10/15/15
 * Time: 3:46 PM
 */


namespace Application\UserBundle\Entity\Repository;

use AppBundle\Entity\Goal;
use AppBundle\Entity\UserGoal;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query;
use Doctrine\ORM\Tools\Pagination\Paginator;

/**
 * Class UserRepository
 * @package Application\UserBundle\Entity\Repository
 */
class UserRepository extends EntityRepository
{
    /**
     * This function is used to get user by email token
     *
     * @param $emailToken
     * @return array
     */
    public function findUserByEmailToken($emailToken)
    {
        $result = $this->getEntityManager()
            ->createQuery("SELECT u
                           FROM ApplicationUserBundle:User u
                           WHERE u.activationEmailToken = :emailToken
                           ")
            ->setHint(Query::HINT_FORCE_PARTIAL_LOAD, true)
            ->setParameter('emailToken',  $emailToken )
            ->getOneOrNullResult();

        return $result;

    }

    /**
     * @param $usernames
     * @return array|null
     */
    public function findByUsernames($usernames)
    {
        if (!count($usernames)){
            return null;
        }

        return $this->getEntityManager()
            ->createQuery("SELECT u
                           FROM ApplicationUserBundle:User u
                           INDEX BY u.username
                           WHERE u.username IN (:usernames)")
            ->setParameter('usernames', $usernames)
            ->getResult();
    }

    /**
     * @param $email
     * @return array
     */
    public  function findByEmail($email)
    {
        return $this->getEntityManager()
            ->createQuery("SELECT u
                           FROM ApplicationUserBundle:User u
                           WHERE u.username = :email")
            ->setParameter('email', $email)
            ->getResult();
    }
    /**
     * @param $userId
     * @return mixed
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function findWithRelationsById($userId)
    {
        return $this->getEntityManager()
            ->createQuery("SELECT u , ug, g, ss
                           FROM ApplicationUserBundle:User u
                           LEFT JOIN u.userGoal ug
                           LEFT JOIN ug.goal g
                           LEFT JOIN g.successStories ss
                           WHERE u.id = :userId")
            ->setParameter('userId', $userId)
            ->getOneOrNullResult();
    }

    /**
     * @param $userId
     */
    public function findUserCompletionFields($userId)
    {
        return $this->getEntityManager()
            ->createQuery("SELECT COUNT(ug) deadLineCount,
                              (SELECT COUNT(ss) FROM AppBundle:SuccessStory ss WHERE ss.user = u) as storyCount,
                              (SELECT COUNT(ug1) FROM AppBundle:UserGoal ug1 WHERE ug1.user = u AND ug1.status = :completedStatus) as completedCount,
                              (SELECT COUNT(ug2) FROM AppBundle:UserGoal ug2 WHERE ug2.user = u) as userGoalCount
                           FROM ApplicationUserBundle:User u
                           LEFT JOIN u.userGoal ug WITH ug.doDate IS NOT NULL
                           WHERE u.id = :userId")
            ->setParameter('userId', $userId)
            ->setParameter('completedStatus', UserGoal::COMPLETED)
            ->getOneOrNullResult();
    }

    /**
     * @param $type
     * @param $id
     * @return mixed
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function findBySocial($type, $id)
    {
        $query = $this->getEntityManager()
            ->createQueryBuilder()
            ->select('u')
            ->from('ApplicationUserBundle:User', 'u');

        switch ($type) {
            case 'facebook':
                $query->andWhere('u.facebookUId =:id');
                break;
            case 'twitter':
                $query->andWhere('u.twitterUId =:id');
                break;
            case 'google':
                $query->andWhere('u.gplusUid =:id');
                break;
        }

        return $query
            ->setParameter('id', $id)
            ->getQuery()
            ->setMaxResults(1)
            ->getOneOrNullResult();
    }

    /**
     * @param $userId
     * @return mixed
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function findUserStats($userId)
    {
        return $this->getEntityManager()
            ->createQuery("SELECT COUNT(ug) as listedBy,
                            (SELECT COUNT(ug1)
                             FROM ApplicationUserBundle:User u1
                             LEFT JOIN u1.userGoal ug1 WITH ug1.status = :completed
                             WHERE u1.id = :userId) as doneBy
                           FROM ApplicationUserBundle:User u
                           LEFT JOIN u.userGoal ug WITH ug.status = :active
                           WHERE u.id = :userId")
            ->setParameter('completed', UserGoal::COMPLETED)
            ->setParameter('active', UserGoal::ACTIVE)
            ->setParameter('userId', $userId)
            ->getOneOrNullResult();

    }

    /**
     * @param $user
     */
    public function setUserStats($user)
    {
        $stats = $this->findUserStats($user->getId());

        $user->setStats([
            "listedBy" => $stats['listedBy'] + $stats['doneBy'],
            "active"   => $stats['listedBy'],
            "doneBy"   => $stats['doneBy']
        ]);
    }

    public function findUsersStats($userIds)
    {
        if (count($userIds) < 1){
            return null;
        }

        return $this->getEntityManager()
            ->createQuery("SELECT u.id,
                            (SELECT COUNT(ug1)
                             FROM ApplicationUserBundle:User u1
                             LEFT JOIN u1.userGoal ug1 WITH ug1.status = :completed
                             WHERE u1.id = u.id) as doneBy,
                            (SELECT COUNT(ug2)
                             FROM ApplicationUserBundle:User u2
                             LEFT JOIN u2.userGoal ug2 WITH ug2.status = :active
                             WHERE u2.id = u.id) as listedBy
                           FROM ApplicationUserBundle:User u
                           INDEX BY u.id
                           WHERE u.id IN (:userIds)")
            ->setParameter('completed', UserGoal::COMPLETED)
            ->setParameter('active', UserGoal::ACTIVE)
            ->setParameter('userIds', $userIds)
            ->getResult();
    }

    public function findAdmins($role)
    {
        return $this->getEntityManager()
            ->createQuery("SELECT u.id as id, u.email as email, CONCAT(COALESCE(u.firstName, ''), ' ', COALESCE(u.lastName, '')) as fullName, u.locale
                            FROM ApplicationUserBundle:User u
                            WHERE u.roles LIKE :role ")
            ->setParameter('role', '%' . 'ROLE_SUPER_ADMIN' . '%')
            ->getResult()
            ;
    }

    /**
     * This repository find unique users by id limit
     *
     * @param $begin
     * @param $limit
     * @return array
     */
    public function findByUIdAndLimit($begin, $limit)
    {
        return $this->getEntityManager()
            ->createQuery("SELECT u
                            FROM ApplicationUserBundle:User u
                            WHERE u.uId LIKE ''
                            OR u.uId is NULL
                            ORDER BY u.id ASC ")
            ->setFirstResult($begin)
            ->setMaxResults($limit)
            ->getResult()
            ;
    }
    /**
     * This repository find unique users by id limit
     *
     * @param $begin
     * @param $limit
     * @return array
     */
    public function findByLimit($begin, $limit)
    {
        $query = $this->getEntityManager()
            ->createQuery("SELECT u, ug, ss
                           FROM ApplicationUserBundle:User u
                           LEFT JOIN u.userGoal ug
                           LEFT JOIN u.SuccessStories ss
                           ORDER BY u.id ASC ")
            ->setFirstResult($begin)
            ->setMaxResults($limit);

        $paginator = new Paginator($query, $fetchJoinCollection = true);

        return $paginator->getIterator()->getArrayCopy();
    }


    /**
     * @return array
     */
    public function findAllForMandrill()
    {
        return $this->getEntityManager()
            ->createQuery("SELECT u.email, u.firstName, u.lastName
                            FROM ApplicationUserBundle:User u")
            ->setMaxResults()
            ->getResult()
            ;
    }

    /**
     * @param $user
     * @return mixed
     */
    public function updatePercentStatuses($user)
    {
        if($user->getProfileCompletedPercent() == 100){
            return $user;
        }

        $em = $this->getEntityManager();

        $statuses = $this->findUserCompletionFields($user->getId());
        $user->setHasDeadLines($statuses['deadLineCount']);
        $user->setHasCompletedGoal($statuses['completedCount']);
        $user->setHasSuccessStory($statuses['storyCount']);
        $user->setUserGoalCount($statuses['userGoalCount']);
        $percent = $user->getCompletedPercent();

        if ($percent == 100) {
            $user->setProfileCompletedPercent(100);
            $em->flush();
        }

        return $user;
    }

    /**
     * @return mixed
     */
    public function findAllCount()
    {
        return $this->getEntityManager()
            ->createQuery("SELECT COUNT(u)
                           FROm ApplicationUserBundle:User u")
            ->getSingleScalarResult();
    }


    public function findPushNoteUsers()
    {
        return $this->getEntityManager()
            ->createQuery("SELECT u
                           FROM ApplicationUserBundle:User u
                           WHERE DATE_DIFF(CURRENT_DATE(), DATE(u.lastPushNoteDate)) >= 7
                           AND u.activeTime = HOUR(CURRENT_TIME())
                           AND u.activeDayOfWeek = DAYOFWEEK(CURRENT_DATE()) - 1")
            ->getResult();
    }
}