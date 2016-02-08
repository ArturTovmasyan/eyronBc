<?php
/**
 * Created by PhpStorm.
 * User: tigran
 * Date: 2/5/16
 * Time: 8:54 PM
 */

namespace AppBundle\Tests\Controller\Rest;


use AppBundle\Tests\Controller\BaseClass;
use Symfony\Component\HttpFoundation\Response;

class UserGoalControllerTest extends BaseClass
{
    /**
     * This function test getAction
     *
     * @dataProvider goalProvider
     */
    public function testGet($goalId)
    {
        // create url for test
        $url = sprintf('/api/v1.0/usergoals/%s', $goalId);

        // try to get user goal
        $this->client->request('GET', $url);
        // check page is opened
        $this->assertEquals($this->client->getResponse()->getStatusCode(), Response::HTTP_OK, "can not get user-goal in getAction rest!");
        // check page response content type
        $this->assertTrue(
            $this->client->getResponse()->headers->contains('Content-Type', 'application/json'),
            $this->client->getResponse()->headers
        );
        // check database query count
        if ($profile = $this->client->getProfile()) {
            // check the number of requests
            $this->assertLessThan(10, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on get user goal page!");
        }
    }

    /**
     * this function try to test putAction
     *
     * @dataProvider goalProvider
     */
    public function testPut($goalId)
    {
        // create putAction url
        $url = sprintf('/api/v1.0/usergoals/%s', $goalId);

        // try to put date
        $this->client->request('PUT', $url, array('goal_status'=>true, 'is_visible'=>true, 'note'=>'userGoal note',
                                'steps[write step text here]'=>true, "location['address']"=>'Armenia Yerevan',
                                "location['latitude']"=>43.222, "location['longitude']"=>40.44, 'urgent'=>true,
                                'important'=>true, 'do_date'=>'01/01/2016'));
        // check page opened status code
        $this->assertEquals($this->client->getResponse()->getStatusCode(), Response::HTTP_OK, "can not create user-goal in putAction rest!");
        // check response result content type
        $this->assertTrue(
            $this->client->getResponse()->headers->contains('Content-Type', 'application/json'),
            $this->client->getResponse()->headers
        );
        // check database query count
        if ($profile = $this->client->getProfile()) {
            // check the number of requests
            $this->assertLessThan(10, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on user-goal create rest!");
        }

    }

    /**
     * This function use to test getDoneAction
     *
     *  @dataProvider goalProvider
     */
    public function testGetDone($goalId)
    {
        // generate url for test getDoneAction
        $url = sprintf('/api/v1.0/usergoals/%s/dones/%s', $goalId, 1);

        // try to get done Action
        $this->client->request('GET', $url);
        // check page opened status code
        $this->assertEquals($this->client->getResponse()->getStatusCode(), Response::HTTP_OK, "can not in getDoneAction rest!");
        // check response result content type
        $this->assertTrue(
            $this->client->getResponse()->headers->contains('Content-Type', 'application/json'),
            $this->client->getResponse()->headers
        );
        // check database query count
        if ($profile = $this->client->getProfile()) {
            // check the number of requests
            $this->assertLessThan(10, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on user-goal getDoneAction rest!");
        }
    }
    /**
     * this function try to test postBucketlistAction
     *
     * @depends testGetDone
     */
    public function testPostBucketlist()
    {
        // generate postBucketlistAction rest url
        $url = sprintf('/api/v1.0/usergoals/bucketlists');

        // try to post BucketlistAction
        $this->client->request('POST', $url, array('condition'=>1, 'first'=>1, 'count'=>1,
            'isDream'=>false, "urgentImportant"=> false, 'urgentNotImportant'=>'on',
            "notUrgentImportant"=>false, "notUrgentNotImportant"=>false));
        // check page opened status code
        $this->assertEquals($this->client->getResponse()->getStatusCode(), Response::HTTP_OK, "can not user-goal postBucketlistAction rest!");
        // check response result content type
        $this->assertTrue(
            $this->client->getResponse()->headers->contains('Content-Type', 'application/json'),
            $this->client->getResponse()->headers
        );
        // check database query count
        if ($profile = $this->client->getProfile()) {
            // check the number of requests
            $this->assertLessThan(10, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on  user-goal postBucketlistAction rest!");
        }

    }


    /**
     * this function use to test user-goal delete action
     *
     * @dataProvider userGoalProvider
     * @depends testPostBucketlist
     */
    public function testDelete($userGoalId)
    {
        // calculate url for delete user-goal rest
        $url = sprintf('/api/v1.0/usergoals/%s', $userGoalId);

        // try to delete user goals
        $this->client->request('DELETE', $url);
        // check page opened status code
        $this->assertEquals($this->client->getResponse()->getStatusCode(), Response::HTTP_OK, "can not delete user-goal rest!");
        // check response result content type
        $this->assertTrue(
            $this->client->getResponse()->headers->contains('Content-Type', 'application/json'),
            $this->client->getResponse()->headers
        );
        // check database query count
        if ($profile = $this->client->getProfile()) {
            // check the number of requests
            $this->assertLessThan(10, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on delete user-goal rest!");
        }

    }

}