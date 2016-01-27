<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 10/15/15
 * Time: 3:46 PM
 */


namespace Application\UserBundle\Entity\Repository;

use AppBundle\Entity\UserGoal;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query;

/**
 * Class UserRepository
 * @package Application\UserBundle\Entity\Repository
 */
class UserRepository extends EntityRepository
{
    /**
     * @param $goal
     * @return array
     */
    public function findDoneBy($goal)
    {

        $result = $this->getEntityManager()
            ->createQuery("SELECT u
                           FROM ApplicationUserBundle:User u
                           LEFT JOIN u.userGoal ug
                           LEFT JOIN ug.goal g
                           WHERE g.id = :goal and ug.status = :status
                           ")
            ->setHint(Query::HINT_FORCE_PARTIAL_LOAD, true)
            ->setParameter('goal',  $goal->getId())
            ->setParameter('status',  UserGoal::COMPLETED)

            ->getResult();

        return $result;

    }

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
     * @param $goal
     * @return array
     */
    public function findListedBy($goal)
    {

        $result = $this->getEntityManager()
            ->createQuery("SELECT u
                           FROM ApplicationUserBundle:User u
                           LEFT JOIN u.userGoal ug
                           LEFT JOIN ug.goal g
                           WHERE g.id = :goal and ug.status = :status
                           ")
            ->setHint(Query::HINT_FORCE_PARTIAL_LOAD, true)
            ->setParameter('goal',  $goal->getId())
            ->setParameter('status',  UserGoal::ACTIVE)

            ->getResult();

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
                $query->andWhere('u.facebookId =:id');
                break;
            case 'twitter':
                $query->andWhere('u.twitterId =:id');
                break;
            case 'google':
                $query->andWhere('u.googleId =:id');
                break;
        }

        return $query
            ->setParameter('id', $id)
            ->getQuery()
            ->setMaxResults(1)
            ->getOneOrNullResult();
    }
}