<?php
/**
 * Created by PhpStorm.
 * User: pc-4
 * Date: 11/13/15
 * Time: 2:58 PM
 */
namespace AppBundle\Model;

/**
 * Interface loggableEntityRepositoryInterface
 * @package AppBundle\Model
 */
interface loggableEntityRepositoryInterface
{
    /**
     * @param $ids
     * @return mixed
     */
    public function findByIdsWithRelations($ids);
}