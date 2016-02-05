<?php

namespace AppBundle\Tests\Controller;


use AppBundle\Entity\UserGoal;
use Symfony\Component\HttpFoundation\Response;

class BucketListControllerTest extends BaseClass
{

    /**
     * @dataProvider filterProvider
     */
    public function testMyList($filter)
    {
        // try to open goal view page
        $this->client->request('GET', '/user-profile/1/' . UserGoal::ACTIVE, $filter);

        $this->assertEquals($this->client->getResponse()->getStatusCode(), Response::HTTP_OK, 'can not open goal view page!');

        if ($profile = $this->client->getProfile()) {
            // check the number of requests
            $this->assertLessThan(10, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on group list page!");
        }
    }
}