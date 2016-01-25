<?php
/**
 * Created by PhpStorm.
 * User: armen
 * Date: 11/18/15
 * Time: 3:44 PM
 */
namespace AppBundle\Tests\Controller\Rest;

use AppBundle\Tests\Controller\BaseClass;

class NewsFeedControllerTest extends BaseClass
{
    /**
     * This function is used to check Get function in rest
     */
    public function testGet()
    {
        $this->markTestIncomplete(
            'This test has not been implemented yet.'
        );

        $url = sprintf('api/news_feed_rest');

        // try to get news-feed
        $this->client->request('GET', $url);

        $this->assertEquals($this->client->getResponse()->getStatusCode(), self::HTTP_STATUS_OK, "can not get news-feed in getAction rest!");

        $this->assertTrue(
            $this->client->getResponse()->headers->contains('Content-Type', 'application/json'),
            $this->client->getResponse()->headers
        );
    }
}