<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 10/6/15
 * Time: 2:59 PM
 */

namespace AppBundle\Listener;

use AppBundle\Entity\Goal;
use Doctrine\ORM\Event\OnFlushEventArgs;

class DoctrineListener
{
    /**
     * @param OnFlushEventArgs $args
     */
    public function onFlush(OnFlushEventArgs $args)
    {
        // get entity manager
        $em = $args->getEntityManager();

        // get unit work
        $uow = $em->getUnitOfWork();

        // for insert
        foreach ($uow->getScheduledEntityInsertions() as $entity) {

            // check entity
            if($entity instanceof Goal){
                $this->setPrimary($entity);
            }
        }

        // for update
        foreach ($uow->getScheduledEntityUpdates() as $entity) {

            // check entity
            if($entity instanceof Goal){
                $this->setPrimary($entity);
            }
        }

        // for delete
        foreach ($uow->getScheduledEntityDeletions() as $entity) {

            // check entity
            if($entity instanceof Goal){
                $this->setPrimary($entity);
            }
//            elseif($entity instanceof )
        }
    }


    private function setPrimary(&$entity)
    {
//        // get all images
//        $images = $entity->getImages();
//
//        // check count
//        if(count($images )== 1){
//
//            // and set primary to the first images, is images as one
//            $images->first()->setPrimary(true);
//        }

    }
}