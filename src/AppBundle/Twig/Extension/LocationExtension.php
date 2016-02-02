<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 10/28/15
 * Time: 11:59 AM
 */

namespace AppBundle\Twig\Extension;

use AppBundle\Entity\Goal;
use AppBundle\Entity\UserGoal;

class LocationExtension extends \Twig_Extension
{
    /**
     * @return array
     */
    public function getFunctions()
    {
        return array(
            new \Twig_SimpleFunction('locations', array($this, 'locations'))
        );
    }

    /**
     * @param $goals
     * @return array
     */
    public function locations($goals)
    {
        // empty data for return result
        $result = array();

        // check data
        if($goals && is_array($goals)){

            // loop for goals
            foreach($goals as $goal){

                // is user goal
                if($goal instanceof UserGoal){
                    $result[$goal->getGoal()->getId()] = array(
                        'title' => $goal->getGoal()->getTitle(),
                        'latitude' => $goal->getLat(),
                        'longitude' => $goal->getLng(),
                        'image' => $goal->getGoal()->getListPhotoDownloadLink(),
                        'status' => $goal->getGoal()->getIsMyGoal()
                    );
                }
                // is goal
                else{
                    $result[$goal->getId()] = array(
                        'title' => $goal->getTitle(),
                        'latitude' => $goal->getLat(),
                        'longitude' => $goal->getLng(),
                        'image' => $goal->getListPhotoDownloadLink(),
                        'status' => $goal->getGoal()->getIsMyGoal()
                    );
                }
            }
        }


        return $result;
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'bl_location_extension';
    }
}