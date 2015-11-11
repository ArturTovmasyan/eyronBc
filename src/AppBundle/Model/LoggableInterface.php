<?php
/**
 * Created by PhpStorm.
 * User: pc-4
 * Date: 11/11/15
 * Time: 5:18 PM
 */
namespace AppBundle\Model;

/**
 * This interface is used to create userActivity object
 *
 * Interface LoggableInterface
 * @package AppBundl\Model
 */
interface LoggableInterface
{
    /**
     * This function will return the goal related with current entity which created or updated
     *
     * @return mixed
     */
    public function getGoal();

    /**
     * This function is used to get performed action return null if want't save activity
     *
     * @return mixed
     */
    public function getAction();
}