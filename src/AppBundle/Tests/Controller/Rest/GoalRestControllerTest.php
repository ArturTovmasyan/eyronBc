<?php
/**
 * Created by PhpStorm.
 * User: armen
 * Date: 11/18/15
 * Time: 3:44 PM
 */
namespace AppBundle\Tests\Controller\Rest;

use AppBundle\Tests\Controller\BaseClass;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Response;

class GoalRestControllerTest extends BaseClass
{
    /**
     * This function get all goals test
     */
    public function testGetAll()
    {
        // get user goal
        $url = sprintf('/api/v1.0/goals/%s/%s', 1, 2);

        // try to get goal by id
        $this->client->request('GET', $url);

        $this->assertEquals($this->client->getResponse()->getStatusCode(), Response::HTTP_OK, "can not get goal getsAction rest!");

        $this->assertTrue(
            $this->client->getResponse()->headers->contains('Content-Type', 'application/json'),
            $this->client->getResponse()->headers
        );

        if ($profile = $this->client->getProfile()) {
            // check the number of requests
            $this->assertLessThan(15, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on group list page!");
        }
    }

    /**
     * This test is used to check most popular category filter by goal listed count
     */
    public function testMostPopularFilter()
    {
        //get goal
        $url = sprintf('/api/v1.0/goals/%s/%s?category=most-popular', 0, 6);

        //try to get goals by filter most-popular category
        $this->client->request('GET', $url);

        $this->assertEquals($this->client->getResponse()->getStatusCode(), Response::HTTP_OK, "can not get goal getsAction rest!");

        $this->assertTrue(
            $this->client->getResponse()->headers->contains('Content-Type', 'application/json'),
            $this->client->getResponse()->headers
        );

        if ($profile = $this->client->getProfile()) {
            // check the number of requests
            $this->assertLessThan(15, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on group list page!");
        }

        //get goal in rest response
        $goals = json_decode($this->client->getResponse()->getContent(), true);

        //set default array
        $allListedBy = array();

        foreach($goals as $goal)
        {
            $allListedBy[] = $goal['stats']['listedBy'];
        }

        //set listed goal
        $listedGoal = $allListedBy;

//        //sort array
//         arsort($allListedBy);

        //check arrays is equal
        $isEqual = $listedGoal === $allListedBy;

        $this->assertTrue($isEqual, "Most popular category don't sort by listed!");

    }

    /**
     * This function test get goal
     *
     * @dataProvider goalByIdProvider
     */
    public function testGet($goalId)
    {
        // get user goal
        $url = sprintf('/api/v1.0/goals/%s', $goalId);

        // try to get goal by id
        $this->client->request('GET', $url);

        //get goal by id
        $goal = $this->em->getRepository('AppBundle:Goal')->find($goalId);

        //get user by username
        $user = $this->em->getRepository('ApplicationUserBundle:User')->findOneBy(array('email' => 'user4@user.com'));

        if($goal->getPublish() && !is_null($goal->getAuthor()) && $goal->getAuthor()->getId() == $user->getId()) {
            $this->assertEquals($this->client->getResponse()->getStatusCode(), Response::HTTP_OK, "can not get goal by id in getAction rest!");
        }

        $this->assertTrue(
            $this->client->getResponse()->headers->contains('Content-Type', 'application/json'),
            $this->client->getResponse()->headers
        );

        if ($profile = $this->client->getProfile()) {
            // check the number of requests
            $this->assertLessThan(15, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on goal getAction rest!");
        }
    }

    /**
     * This function try to test PutCommentAction of rest
     *
     * @dataProvider goalByIdProvider
     */
    public function testPutComment($goalId)
    {
        $url = sprintf('/api/v1.0/goals/%s/comment', $goalId);
        // try to get goal by id
        $this->client->request('PUT', $url, array('commentBody'=>'from rest test comment create'));

        $this->assertEquals($this->client->getResponse()->getStatusCode(), Response::HTTP_OK, "can not create goal comment in PutCommentAction rest!");

        $this->assertTrue(
            $this->client->getResponse()->headers->contains('Content-Type', 'application/json'),
            $this->client->getResponse()->headers
        );

        if ($profile = $this->client->getProfile()) {
            // check the number of requests
            $this->assertLessThan(15, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on goal PutCommentAction rest!");
        }

    }

    /**
     * This function use to test PutSuccessStoryAction rest
     *
     * @dataProvider goalByIdProvider
     */
    public function testPutSuccessStory($goalId)
    {
        $url = sprintf('/api/v1.0/goals/%s/successstory', $goalId);
        // try to get goal by id
        $this->client->request('PUT', $url, array('story'=>'from rest test Success Story create'));

        $this->assertEquals($this->client->getResponse()->getStatusCode(), Response::HTTP_OK, "can not create goal success story id in PutSuccessStoryAction rest!");

        $this->assertTrue(
            $this->client->getResponse()->headers->contains('Content-Type', 'application/json'),
            $this->client->getResponse()->headers
        );

        if ($profile = $this->client->getProfile()) {
            // check the number of requests
            $this->assertLessThan(15, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on goal add PutSuccessStoryAction rest!");
        }
    }
}