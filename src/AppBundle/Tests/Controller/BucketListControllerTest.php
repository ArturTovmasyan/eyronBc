<?php

namespace AppBundle\Tests\Controller;


class BucketListControllerTest extends BaseClass
{

    /**
     *
     * @dataProvider filterProvider
     */
    public function testMyList($filters)
    {
        // try to open goal view page
        $this->client->request('GET', '/user-profile/1/' . BaseClass::ACTIVE, $filters[0]);

        $this->assertEquals($this->client->getResponse()->getStatusCode(), BaseClass::HTTP_STATUS_OK, 'can not open goal view page!');

        if ($profile = $this->client->getProfile()){
        // check the number of requests
        $this->assertLessThan(10, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on group list page!");
        }


        // try to open goal view page
        $this->client->request('GET', '/user-profile/1/' . BaseClass::ACTIVE, $filters[1]);

        $this->assertEquals($this->client->getResponse()->getStatusCode(), BaseClass::HTTP_STATUS_OK, 'can not open goal view page!');

        if ($profile = $this->client->getProfile()){
            // check the number of requests
            $this->assertLessThan(10, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on group list page!");
        }

        // try to open goal view page
        $this->client->request('GET', '/user-profile/1/' . BaseClass::ACTIVE, $filters[2]);

        $this->assertEquals($this->client->getResponse()->getStatusCode(), BaseClass::HTTP_STATUS_OK, 'can not open goal view page!');

        if ($profile = $this->client->getProfile()){
            // check the number of requests
            $this->assertLessThan(10, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on group list page!");
        }
        // try to open goal view page
        $this->client->request('GET', '/user-profile/1/' . BaseClass::ACTIVE, $filters[3]);

        $this->assertEquals($this->client->getResponse()->getStatusCode(), BaseClass::HTTP_STATUS_OK, 'can not open goal view page!');

        if ($profile = $this->client->getProfile()){
            // check the number of requests
            $this->assertLessThan(10, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on group list page!");
        }
        // try to open goal view page
        $this->client->request('GET', '/user-profile/1/' . BaseClass::ACTIVE, $filters[4]);

        $this->assertEquals($this->client->getResponse()->getStatusCode(), BaseClass::HTTP_STATUS_OK, 'can not open goal view page!');

        if ($profile = $this->client->getProfile()){
            // check the number of requests
            $this->assertLessThan(10, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on group list page!");
        }
    }
}