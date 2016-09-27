<?php

namespace AppBundle\Tests\Services;

use AppBundle\Services\PlaceService;
use AppBundle\Tests\Controller\BaseClass;

/**
 * Class PlaceServiceTest
 * @package AppBundle\Tests\Service
 */
class PlaceServiceTest extends BaseClass
{
    /**
     * This function is used to test getAllGoalsByPlace() method in place service
     */
    public function testGetAllGoalsByPlace()
    {
        //get user
        $user = $this->em->getRepository('ApplicationUserBundle:User')->findOneByUsername('user5@user.com');

        //set place array data
        $placeData = array('city' => 'armenia', 'country' => 'yerevan');

        //create mock for getPlace() method in google place service
        $mock = $this
            ->getMockBuilder('\AppBundle\Services\GooglePlaceService')
            ->disableOriginalConstructor()
            ->getMock();
        
        $mock->expects($this->once())
            ->method('getPlace')
            ->will($this->returnValue($placeData));

        //get place service and inject mock it in
        $placeService = new PlaceService($mock, $this->em);

        //get place by service
        $goals = $placeService->getAllGoalsByPlace(GooglePlaceServiceTest::LATITUDE_ARMENIA, GooglePlaceServiceTest::LONGITUDE_ARMENIA, $user);

        //get goals count
        $goalsCount = count($goals);

        //get all userPlace
        $userPlaces = $this->em->getRepository('AppBundle:UserPlace')->findBy(array('latitude' => GooglePlaceServiceTest::LATITUDE_ARMENIA, 'longitude' => GooglePlaceServiceTest::LONGITUDE_ARMENIA));

        //get userPlace count
        $userPlacesCount = count($userPlaces);

        $this->assertNotEquals(0, $goalsCount, 'getAllGoalsByPlace() method in PlaceService don\'t work correctly');
        $this->assertEquals(4, $userPlacesCount, 'createUserPlace() method in PlaceService don\'t work correctly');
    }
}