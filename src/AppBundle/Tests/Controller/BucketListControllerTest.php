<?php

namespace AppBundle\Tests\Controller;


use Symfony\Component\HttpFoundation\Response;

class BucketListControllerTest extends BaseClass
{

    /**
     * @dataProvider filterProvider
     */
    public function testMyList($filter)
    {
        // try to open goal view page
        $crawler = $this->client->request('GET', '/user-profile/1', $filter);

        $this->assertEquals($this->client->getResponse()->getStatusCode(), Response::HTTP_OK, 'can not open goal view page!');

//        var_dump($filter);
//        var_dump( $this->client->getResponse()->getContent()); exit;


        // Assert that the response content contains a string goal1
        $this->assertContains('goal1', $this->client->getResponse()->getContent(), 'can not find goal1!');

        // click in goal title link
//        $link = $crawler->filter('#row a[id="goalTitle"]')->link();
//        $this->client->click($link);

//        if ($profile = $this->client->getProfile()) {
//            // check the number of requests
//            $this->assertLessThan(10, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on group list page!");
//        }

        //TODO check results on page based on filter values
    }
}