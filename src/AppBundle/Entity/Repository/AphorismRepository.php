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
     * @return array
     */
    public function findOneRandom($goal)
    {
        // default value for tags ids
        $ids = array();

        // get tags
        $tags = $goal->getTags()->toArray();

        // check tags
        if($tags){

            // loop for tags
            foreach($tags as $tag){

                // get tags
                $ids[] = $tag->getId();
            }
        }

        // check ids and return null
        if(is_null($ids)){

            return null;
        }

        $result = $this->getEntityManager()
            ->createQuery("SELECT a
                           FROM AppBundle:Aphorism a
                           JOIN a.tags at
                           JOIN AppBundle:Tag t WITH t in (:tags) AND t.id = at.id
                           ")
            ->setParameter('tags', $ids)
            ->getResult();


        // check result
        if($result){

            // get count
//            $count = count($result);

//            return $result[rand(0, $count-1)];
            return $result;
        }

        return null;
    }
}