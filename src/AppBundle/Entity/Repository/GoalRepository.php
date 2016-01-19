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
                ->from('AppBundle:Goal', 'g')
                ->join('g.images', 'i', 'with', 'i.list = true')
                ->leftJoin('g.userGoal', 'ug')
                ->addGroupBy('g.id')
                ->orderBy('cnt', 'desc')
        ;

        // check count
        if($count){
            $query
                ->setMaxResults($count);
        }
        return $query->getQuery()->getResult();
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
        $query =
            $this->getEntityManager()
                ->createQueryBuilder()
                ->addSelect('g')
                ->from('AppBundle:Goal', 'g')
                ->leftJoin('g.images', 'i')
                ->leftJoin('g.userGoal', 'ug')
                ->leftJoin('ug.user', 'ugu')
                ->leftJoin('g.author', 'a')
                ->where('a.id = :user or ugu.id = :user ')
                ->andWhere('g.readinessStatus = :status')
                ->setParameter('user', $user)
                ->setParameter('status', Goal::DRAFT)
        ;

        return $query->getQuery()->getResult();
    }

    /**
     * @param $user
     * @return array
     */
    public function findMyDraftsCount($user)
    {
        $query =
            $this->getEntityManager()
                ->createQueryBuilder()
                ->addSelect('COUNT(g)')
                ->from('AppBundle:Goal', 'g')
                ->leftJoin('g.images', 'i')
                ->leftJoin('g.userGoal', 'ug')
                ->leftJoin('ug.user', 'ugu')
                ->leftJoin('g.author', 'a')
                ->where('a.id = :user or ugu.id = :user ')
                ->andWhere('g.readinessStatus = :status')
                ->setParameter('user', $user)
                ->setParameter('status', Goal::DRAFT)
        ;

        return $query->getQuery()->getSingleScalarResult();
    }

    /**
     * @param $category
     * @param $search
     * @return mixed
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function findAllByCategory($category = null, $search = null)
    {
        $query =
            $this->getEntityManager()
                ->createQueryBuilder()
                ->addSelect('g', 'i', 'count(ug) as HIDDEN  cnt')
                ->from('AppBundle:Goal', 'g')
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
}