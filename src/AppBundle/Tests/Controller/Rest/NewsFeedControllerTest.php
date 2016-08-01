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
        $url = sprintf('/api/v2.0/activities/%s/%s', 0, 1);

        // try to get news-feed
        $this->client11->request('GET', $url);

        $this->assertEquals($this->client11->getResponse()->getStatusCode(), Response::HTTP_OK, "can not get news-feed in getAction rest!");

        $this->assertTrue(
            $this->client11->getResponse()->headers->contains('Content-Type', 'application/json'),
            $this->client11->getResponse()->headers
        );

        if ($profile = $this->client11->getProfile()) {
            // check the number of requests
            $this->assertLessThan(15, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on $url api");
        }

        //get response content
        $responseResults = json_decode($this->client11->getResponse()->getContent(), true);

        $responseResult = $responseResults[0];

        $this->assertArrayHasKey('id', $responseResult, 'Invalid id key in news-feed getAction rest json structure');
        $this->assertArrayHasKey('action', $responseResult, 'Invalid action key in news-feed getAction rest json structure');
        $this->assertArrayHasKey('datetime', $responseResult, 'Invalid datetime key in news-feed getAction rest json structure');

        if(array_key_exists('goal', $responseResult)) {

            $goals = $responseResult['goal'];

            $goal = reset($goals);

            $this->assertArrayHasKey('id', $goal, 'Invalid id key in news-feed getAction rest json structure');
            $this->assertArrayHasKey('title', $goal, 'Invalid title key in news-feed getAction rest json structure');
            $this->assertArrayHasKey('status', $goal, 'Invalid status key in news-feed getAction rest json structure');
            $this->assertArrayHasKey('publish', $goal, 'Invalid publish key in news-feed getAction rest json structure');
            $this->assertArrayHasKey('is_my_goal', $goal, 'Invalid is_my_goal key in news-feed getAction rest json structure');
            $this->assertArrayHasKey('slug', $goal, 'Invalid slug key in news-feed getAction rest json structure');
            $this->assertArrayHasKey('stats', $goal, 'Invalid slug key in news-feed getAction rest json structure');

            $goalStats = $goal['stats'];

            $this->assertArrayHasKey('listedBy', $goalStats, 'Invalid slug key in news-feed getAction rest json structure');
            $this->assertArrayHasKey('doneBy', $goalStats, 'Invalid slug key in news-feed getAction rest json structure');

            if(array_key_exists('image_path', $goal)) {
                $this->assertArrayHasKey('image_path', $goal, 'Invalid slug key in news-feed getAction rest json structure');
            }

            if(array_key_exists('cached_image', $goal)) {
                $this->assertArrayHasKey('cached_image', $goal, 'Invalid slug key in news-feed getAction rest json structure');
            }
        }

        if(array_key_exists('user', $responseResult)) {

            $user = $responseResult['user'];

            $this->assertArrayHasKey('id', $user, 'Invalid slug key in news-feed getAction rest json structure');
            $this->assertArrayHasKey('first_name', $user, 'Invalid first_name key in testGetGoal rest json structure');
            $this->assertArrayHasKey('last_name', $user, 'Invalid last_name key in testGetGoal rest json structure');
            $this->assertArrayHasKey('show_name', $user, 'Invalid show_name key in testGetGoal rest json structure');
            $this->assertArrayHasKey('is_admin', $user, 'Invalid is_admin key in testGetGoal rest json structure');
            $this->assertArrayHasKey('u_id', $user, 'Invalid u_id key in testGetGoal rest json structure');

            if(array_key_exists('image_size', $user)) {
                $this->assertArrayHasKey('image_size', $user, 'Invalid image_size key in news-feed getAction rest json structure');
            }
        }
    }
}