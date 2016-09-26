<?php

namespace AppBundle\Tests\Services;

use AppBundle\Tests\Controller\BaseClass;

/**
 * Class GooglePlaceServiceTest
 * @package AppBundle\Tests\Service
 */
class GooglePlaceServiceTest extends BaseClass
{
    //set constant coordinate for Armenia Yerevan
    const LATITUDE_ARMENIA = 40.1794197;
    const LONGITUDE_ARMENIA = 44.5408414;

    //set constant coordinate for Russia Moscow
    const LATITUDE_RUSSIA = 55.75583;
    const LONGITUDE_RUSSIA = 37.61730;
    
    /**
     * This data provider create data for place
     *
     * @return array
     */
    public function placeData()
    {
        $data = array(
            array('latitude' => self::LATITUDE_ARMENIA,
                'longitude' => self::LONGITUDE_ARMENIA,
                'save' => false,
                'placeName' => array('city' => 'yerevan', 'country' => 'armenia')),

            array('latitude' => self::LATITUDE_RUSSIA,
                'longitude' => self::LONGITUDE_RUSSIA,
                'save' => true,
                'placeName' => array('city' => 'moscow', 'country' => 'russia')));

        return $data;
    }
    
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