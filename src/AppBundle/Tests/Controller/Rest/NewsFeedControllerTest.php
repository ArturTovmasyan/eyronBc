<?php
/**
 * Created by PhpStorm.
 * User: armen
 * Date: 11/18/15
 * Time: 3:44 PM
 */
namespace AppBundle\Tests\Controller\Rest;

use AppBundle\Tests\Controller\BaseClass;
use Symfony\Component\HttpFoundation\Response;

class NewsFeedControllerTest extends BaseClass
{
    /**
     * This function is used to check Get function in rest
     */
    public function testGet()
    {
        $url = sprintf('/api/v1.0/activities/%s/%s', 1, 2);

        // try to get news-feed
        $this->client->request('GET', $url);

        $this->assertEquals($this->client->getResponse()->getStatusCode(), Response::HTTP_OK, "can not get news-feed in getAction rest!");

        $this->assertTrue(
            $this->client->getResponse()->headers->contains('Content-Type', 'application/json'),
            $this->client->getResponse()->headers
        );

        if ($profile = $this->client->getProfile()) {
            // check the number of requests
            $this->assertLessThan(18, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on group list page!");
        }
    }
}