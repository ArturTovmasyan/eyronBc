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
use AppBundle\Services\BucketListService;
use Doctrine\ORM\Event\OnFlushEventArgs;
use Symfony\Component\DependencyInjection\Container;

class DoctrineListener
{
    /**
     * @var
     */
    public $container;


    /**
     * @param Container $container
     */
    function __construct(Container $container)
    {
        $this->container = $container;
    }


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
            // check entity
            if($entity instanceof GoalImage){
                $this->setList($entity);
                $this->setCover($entity);
            }
        }

        // for update
        foreach ($uow->getScheduledEntityUpdates() as $entity) {

            // check entity
            if($entity instanceof GoalImage){
                $this->setList($entity);
                $this->setCover($entity);
            }
        }
    }


    /**
     * @param $entity
     */
    private function setList($entity)
    {
        // get bl service
        $blService = $this->container->get('bl_service');

        // get goal
        $goal = $entity instanceof Goal ? $entity : $entity->getGoal();

        if($goal){
            // get all images
            $images = $goal->getImages();

            // check images
            if($images){

                // loop for images
                foreach($images as $image){

                    // if cover is selected return
                    if($image->getList() == true){
                        $blService->generateFileForList($image);
                        return;
                    }
                }

                // else set cover first
                $images->first()->setList(true);
                $blService->generateFileForList($images->first());
            }
        }
        elseif($entity->getList() == true){
            $blService->generateFileForList($entity);
        }
    }

    /**
     * @param $entity
     */
    private function setCover($entity)
    {
        // get bl service
        $blService = $this->container->get('bl_service');

        // get goal
        $goal = $entity instanceof Goal ? $entity : $entity->getGoal();

        if($goal){
            // get all images
            $images = $goal->getImages();

            // check images
            if($images){

                // loop for images
                foreach($images as $image){

                    // if cover is selected return
                    if($image->getCover() == true){
                        $blService->generateFileForCover($image);
                        return;
                    }
                }

                // else set cover first
                $images->first()->setCover(true);
                $blService->generateFileForCover($images->first());
            }
        }
        elseif($entity->getCover() == true){
            $blService->generateFileForCover($entity);
        }
    }
}