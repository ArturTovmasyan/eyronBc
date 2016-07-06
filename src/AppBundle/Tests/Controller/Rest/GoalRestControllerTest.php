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
        $goals = json_decode($this->client->getResponse()->getContent());

        //set default array
        $allListedBy = array();

        foreach($goals as $goal)
        {
            $allListedBy[] = $goal->stats->listedBy;
        }

        //set listed goal
        $listedGoal = $allListedBy;

        //sort array
         arsort($allListedBy);

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

        $this->assertEquals($this->client->getResponse()->getStatusCode(), Response::HTTP_OK, "can not get goal by id in getAction rest!");

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
     * This function test GetCategoriesAction
     */
    public function testGetCategories()
    {

        $url = sprintf('/api/v1.0/goal/categories');
        // try to get goal by id
        $this->client->request('GET', $url);

        $this->assertEquals($this->client->getResponse()->getStatusCode(), Response::HTTP_OK, "can not get GetCategoriesAction rest!");

        $this->assertTrue(
            $this->client->getResponse()->headers->contains('Content-Type', 'application/json'),
            $this->client->getResponse()->headers
        );

        if ($profile = $this->client->getProfile()) {
            // check the number of requests
            $this->assertLessThan(15, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on GetCategoriesAction rest!");
        }

    }

    /**
     * This function test putAction
     *
     */
    public function testPut()
    {
        $url = sprintf('/api/v1.0/goals/create');
        // try to get goal by id
        $this->client->request('PUT', $url, array('is_public'=>true, 'title'=>'from rest', 'description'=>'from rest description', 'video_links[0]'=>'www.google.com', 'language' => 'en'));

        $this->assertEquals($this->client->getResponse()->getStatusCode(), Response::HTTP_OK, "can not get goal putAction rest!");

        $this->assertTrue(
            $this->client->getResponse()->headers->contains('Content-Type', 'application/json'),
            $this->client->getResponse()->headers
        );

        if ($profile = $this->client->getProfile()) {
            // check the number of requests
            $this->assertLessThan(15, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on goal putAction rest!");
        }
    }

    /**
     * This function test goal AddImagesAction
     *
     * @dataProvider goalByIdProvider
     * @depends testPut
     */
    public function testAddImages($golId)
    {
        //get goal by id
        $goal = $this->em->getRepository('AppBundle:Goal')->find($golId);

        //get goal author id
        $authorId = $goal->getAuthor()->getId();

        //get current user id
        $currentUser = $this->em->getRepository('ApplicationUserBundle:User')->findOneBy(array('email' => 'user4@user.com'));

        $currentUserId = $currentUser->getId();

        $url = sprintf('/api/v1.0/goals/add-images/%s/%s', $golId, $currentUserId);
        // try to get goal by id

        $maindir = $this->container->getParameter('kernel.root_dir');

        $oldPhotoPath = $maindir.'/../src/AppBundle/Tests/Controller/old_photo.jpg';
        $photoPath = __DIR__ . '/photo.jpg';
        // copy photo path
        copy($oldPhotoPath, $photoPath);

        // new uploaded file
        $photo = new UploadedFile(
            $photoPath,
            'photo.jpg',
            'image/jpeg',
            123
        );

        $this->client4->request('POST', $url, array(), array('file' => $photo));

        //check if goal author is current user
        if($authorId == $currentUserId && !$goal->getPublish()) {
            $this->assertEquals($this->client4->getResponse()->getStatusCode(), Response::HTTP_OK, "can not get goal AddImagesAction rest!");

        }
        else {
            $this->assertEquals($this->client4->getResponse()->getStatusCode(), Response::HTTP_FORBIDDEN, "can not get goal AddImagesAction rest!");
        }

        $this->assertTrue(
            $this->client4->getResponse()->headers->contains('Content-Type', 'application/json'),
            $this->client4->getResponse()->headers
        );

        if ($profile = $this->client4->getProfile()) {
            // check the number of requests
            $this->assertLessThan(15, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on goal AddImagesAction rest!");
        }
    }

    /**
     * This function test RemoveImageAction
     *
     * @dataProvider allFileProvider
     */
    public function testRemoveImage($goalImageId)
    {
        if($goalImageId) {

            $url = sprintf('/api/v1.0/goals/remove-images/%s', $goalImageId);
            // try to get goal by id

            $this->client->request('POST', $url);

            $this->assertEquals($this->client->getResponse()->getStatusCode(), Response::HTTP_OK, "can not remove goal image in RemoveImageAction rest!");

            $this->assertTrue(
                $this->client->getResponse()->headers->contains('Content-Type', 'application/json'),
                $this->client->getResponse()->headers
            );

            if ($profile = $this->client->getProfile()) {
                // check the number of requests
                $this->assertLessThan(15, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on group RemoveImageAction rest!");
            }
        }
    }

    /**
     * THis function use to test GetDraftsAction
     */
    public function testGetDrafts()
    {
        $url = sprintf('/api/v1.0/goals/drafts/%s/%s', 1,2 );
        // try to get goal by id
        $this->client->request('GET', $url);

        $this->assertEquals($this->client->getResponse()->getStatusCode(), Response::HTTP_OK, "can not get goal in GetDraftsAction rest!");

        $this->assertTrue(
            $this->client->getResponse()->headers->contains('Content-Type', 'application/json'),
            $this->client->getResponse()->headers
        );

        if ($profile = $this->client->getProfile()) {
            // check the number of requests
            $this->assertLessThan(15, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on goal GetDraftsAction rest!");
        }
    }

    /**
     * This function try to test GetFriendsAction rest
     */
    public function testGetFriends()
    {
        // GET /api/v1.0/goals/{first}/friends/{count}
        $url = sprintf('/api/v1.0/goals/%s/friends/%s', 1,2 );
        
        // try to get goal by id
        $this->client->request('GET', $url);

        $this->assertEquals($this->client->getResponse()->getStatusCode(), Response::HTTP_OK, "can not get goal in GetFriendsAction rest!");

        $this->assertTrue(
            $this->client->getResponse()->headers->contains('Content-Type', 'application/json'),
            $this->client->getResponse()->headers
        );

        if ($profile = $this->client->getProfile()) {
            // check the number of requests
            $this->assertLessThan(15, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on goal GetFriendsAction rest!");
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