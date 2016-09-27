<?php

namespace AppBundle\Traits;

/**
 * Class Mock
 * @package AppBundle\Traits
 */
trait Mock
{
    /**
     * This function is used to create mock for Google place service
     */
    public function createGooglePlaceServiceMock()
    {
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

        return $mock;
    }
}