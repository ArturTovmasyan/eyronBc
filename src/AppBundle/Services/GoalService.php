<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 10/20/16
 * Time: 3:01 PM
 */

namespace AppBundle\Services;

/**
 * Class GoalService
 * @package AppBundle\Services
 */
class GoalService extends AbstractProcessService
{
    /**
     * @param $service
     * @param $function
     * @param array $arguments
     */
    public function addBadgeForPublish($service, $function, array $arguments)
    {
        // add score for innovator
        $this->runAsProcess($service, $function, $arguments);

    }

}
