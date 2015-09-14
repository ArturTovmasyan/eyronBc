<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 9/11/15
 * Time: 10:23 AM
 */

namespace AppBundle\Entity\Repository;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query;


class TagRepository extends EntityRepository
{
    /**
     * @return array
     */
    public function getTagTitles()
    {
        $result = array();

        $query =  $this->getEntityManager()
            ->createQuery("SELECT t.tag
                           FROM AppBundle:Tag t ")
            ->getResult(Query::HYDRATE_ARRAY)
            ;

        if($query){
            $result =  array_map(function($value) { return $value['tag']; }, $query);
        }
        return $result;
    }


    /**
     * @param $titles
     * @return array
     */
    public function findTagsByTitles($titles)
    {
        $result = array();

        if(count($titles) > 0){
            $result =  $this->getEntityManager()
                ->createQuery("SELECT t
                           FROM AppBundle:Tag t WHERE t.tag in (:titles)")
                ->setParameter('titles', $titles)
                ->getResult()
            ;
        }


        return $result;
    }

}
