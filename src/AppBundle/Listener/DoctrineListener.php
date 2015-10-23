<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 10/6/15
 * Time: 2:59 PM
 */

namespace AppBundle\Listener;

use AppBundle\Entity\Goal;
use AppBundle\Entity\GoalImage;
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
                $this->setList($entity);
                $this->setCover($entity);
            }
        }

        // for update
        foreach ($uow->getScheduledEntityUpdates() as $entity) {

            // check entity
            if($entity instanceof Goal){
                $this->setList($entity);
                $this->setCover($entity);
            }
        }
    }


    /**
     * @param $entity
     */
    private function setList(&$entity)
    {
        // get all images
        $images = $entity->getImages();

        // check images
        if($images){

            // loop for images
            foreach($images as $image){

                // if cover is selected return
                if($image->getList() == true){
                    return;
                }
            }

            // else set cover first
            $images->first()->setList(true);
        }
    }

    /**
     * @param $entity
     */
    private function setCover(&$entity)
    {
        // get all images
        $images = $entity->getImages();

        // check images
        if($images){

            // loop for images
            foreach($images as $image){

                // if cover is selected return
                if($image->getCover() == true){
                    return;
                }
            }

            // else set cover first
            $images->first()->setCover(true);
        }

    }
}