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
     * @dataProvider goalByIdProvider
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
     * @dataProvider goalByIdProvider
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
            $this->assertLessThan(11, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on user-goal create rest!");
        }

    }

    /**
     * This function use to test getDoneAction
     *
     *  @dataProvider goalByIdProvider
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
     * This function use to test user-goal delete action
     *
     * @dataProvider userGoalProvider
     * @depends testPostBucketlist
     */
    public function testDelete($userGoalId)
    {
        // calculate url for delete user-goal rest
        $url = sprintf('/api/v1.0/usergoals/%s', $userGoalId);

        // try to delete user goals
        $this->client4->request('DELETE', $url);

        //get user goal by id
        $userGoal = $this->em->getRepository('AppBundle:UserGoal')->find($userGoalId);

        //get goal
        $goal = $userGoal->getGoal();

        //get current user
        $currentUser = $this->em->getRepository('ApplicationUserBundle:User')->findOneBy(array('email' => 'user4@user.com'));

        //check if goal published and author current user
        if($goal->isAuthor($currentUser) && !$goal->getPublish()) {

            // check page opened status code
            $this->assertEquals($this->client4->getResponse()->getStatusCode(), Response::HTTP_OK, "can not delete user-goal rest!");
        }

        // check response result content type
        $this->assertTrue(
            $this->client4->getResponse()->headers->contains('Content-Type', 'application/json'),
            $this->client4->getResponse()->headers
        );


        // check database query count
        if ($profile = $this->client4->getProfile()) {
            // check the number of requests
            $this->assertLessThan(10, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on delete user-goal rest!");
        }
    }


    /**
     * This function use to test get top ideas action
     *
     */
    public function testGetTopIdeas()
    {
        $url = sprintf('/api/v1.0/top-ideas/%s', 1);

        // try to get goal by id
        $this->client2->request('GET', $url);

        $this->assertEquals($this->client2->getResponse()->getStatusCode(), Response::HTTP_OK, "can not get top ideas rest!");

        $this->assertTrue(
            $this->client2->getResponse()->headers->contains('Content-Type', 'application/json'),
            $this->client2->getResponse()->headers
        );

        if ($profile = $this->client2->getProfile()) {
            // check the number of requests
            $this->assertLessThan(11, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on testGetTopIdeas rest!");
        }

        //get response content
        $responseResults = json_decode($this->client2->getResponse()->getContent(), true);

        foreach ($responseResults as $responseData)
        {
            $imageSizeKey = array_key_exists('image_size', $responseResults);

            //check if imageSizeKey exists in array
            if($imageSizeKey){

                $imageSize = $responseData['image_size'];

                $width = array_key_exists('width', $imageSize);

                $height = array_key_exists('height', $imageSize);

                if($width && $height) {

                    $this->assertArrayHasKey('width', $imageSize, 'Invalid width key in top ideas rest json structure');

                    $this->assertArrayHasKey('height', $imageSize, 'Invalid height key in top ideas rest json structure');
                }

                unset($responseResults['image_size']);
            }

                $this->assertArrayHasKey('id', $responseData, 'Invalid id key in top ideas rest json structure');

                $this->assertArrayHasKey('title', $responseData, 'Invalid title key in top ideas rest json structure');

                $this->assertArrayHasKey('status', $responseData, 'Invalid status key in top ideas rest json structure');

                $this->assertArrayHasKey('is_my_goal', $responseData, 'Invalid is_my_goal key in top ideas rest json structure');

                $this->assertArrayHasKey('share_link', $responseData, 'Invalid share_link key in top ideas rest json structure');

                $this->assertArrayHasKey('slug', $responseData, 'Invalid slug key in top ideas rest json structure');

                if(array_key_exists('cached_image', $responseData)) {
                    $this->assertArrayHasKey('cached_image', $responseData, 'Invalid cached_image key in top ideas rest json structure');
                }

                if(array_key_exists('image_path', $responseData)) {
                    $this->assertArrayHasKey('image_path', $responseData, 'Invalid image_path key in top ideas rest json structure');
                }
        }
    }
}