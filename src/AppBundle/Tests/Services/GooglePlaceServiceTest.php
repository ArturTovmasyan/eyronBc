<?php

namespace AppBundle\Tests\Services;

use AppBundle\Tests\Controller\BaseClass;

/**
 * Class GooglePlaceServiceTest
 * @package AppBundle\Tests\Service
 */
class GooglePlaceServiceTest extends BaseClass
{
    /**
     * This function is used to test getPlace() method in google place service
     * 
     * @dataProvider placeData
     *
     * @param $latitude
     * @param $longitude
     * @param $save
     * @param $placeName
     */
    public function testGetPlace($latitude, $longitude, $save, $placeName)
    {
        //get google server key in parameter
        $googlePlaceService = $this->container->get('app.google_place');

        //get place by service
        $googlePlace = $googlePlaceService->getPlace($latitude, $longitude, $save);

        $this->assertEquals($placeName, $googlePlace, 'getPlace() method don\'t work correctly');

        //check if save value is true
        if ($save) {

            //get place value in assoc. array
            $place = array_values($googlePlace);

            //get place in by name in DB
            $placeInDb = $this->em->getRepository('AppBundle:Place')->findByName($place);

            $this->assertEquals(2, count($placeInDb), 'getPlace method by param save don\'t work correctly');
        }
    }
}