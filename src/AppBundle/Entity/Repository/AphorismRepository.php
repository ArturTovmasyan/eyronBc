<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 10/14/15
 * Time: 4:37 PM
 */

namespace AppBundle\Entity\Repository;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query;


/**
 * Class AphorismRepository
 * @package AppBundle\Entity\Repository
 */
class AphorismRepository extends EntityRepository
{
    /**
     * @param $goal
     * @return array|null
     */
    public function findOneRandom($goal)
    {
        $ids = [];
        foreach($goal->getTags() as $tag){
            $ids[] = $tag->getId();
        }

        if(count($ids) == 0){
            return [];
        }

        //May be will be random :)
        shuffle($ids);

        return $this->getEntityManager()
            ->createQuery("SELECT a
                           FROM AppBundle:Aphorism a
                           JOIN a.tags t WITH t.id IN (:tags)")
            ->setParameter('tags', $ids)
            ->getResult();
    }
}