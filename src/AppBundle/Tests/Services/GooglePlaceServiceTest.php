<?php

namespace AppBundle\Tests\Services;

use AppBundle\Tests\Controller\BaseClass;
use AppBundle\Traits\Mock\MockGooglePlaceServiceTrait;

/**
 * Class GooglePlaceServiceTest
 * @package AppBundle\Tests\Service
 */
class GooglePlaceServiceTest extends BaseClass
{
    /**
     * This data provider create data for place
     *
     * @return array
     */
    public function placeData()
    {
        //get places data from parameter
        $placesData = static::createClient()->getContainer()->getParameter('places');

        $latitudeArmenia = $placesData[0]['latitude'];
        $longitudeArmenia = $placesData[0]['longitude'];

        $armenia = $placesData[0]['country'];
        $yerevan = $placesData[0]['city'];

        $latitudeRussia = $placesData[1]['latitude'];
        $longitudeRussia = $placesData[1]['longitude'];

        $russia = $placesData[1]['country'];
        $moscow = $placesData[1]['city'];

        $typeCity = $placesData[2]['type_city'];
        $typeCountry = $placesData[2]['type_country'];


        $data = array(
            array('latitude' => $latitudeArmenia,
                'longitude' => $longitudeArmenia,
                'save' => false,
                'placeName' => array($typeCity => $yerevan, $typeCountry => $armenia)),

            array('latitude' => $latitudeRussia,
                'longitude' => $longitudeRussia,
                'save' => true,
                'placeName' => array($typeCity => $moscow, $typeCountry => $russia)));

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
        //get google place service
        $googlePlaceService = $this->container->get('app.google_place');

        //get place by service
        $googlePlace = $googlePlaceService->getPlace($latitude, $longitude, $save);

        $this->assertEquals($placeName, $googlePlace, 'Places don\'t found, please check your google server key');

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