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
     */
    public function testGetAll()
    {
        // get user goal
        $url = sprintf('/api/v1.0/goals/%s/%s', 1, 2);

        // try to get goal by id
        $this->client->request('GET', $url);

        $this->assertEquals($this->client->getResponse()->getStatusCode(), Response::HTTP_OK, "can not get goal by id in getsAction rest!");

        $this->assertTrue(
            $this->client->getResponse()->headers->contains('Content-Type', 'application/json'),
            $this->client->getResponse()->headers
        );

        if ($profile = $this->client->getProfile()) {
            // check the number of requests
            $this->assertLessThan(10, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on group list page!");
        }
    }

    /**
     * @dataProvider goalProvider
     */
    public function testGet($goalId)
    {
        // get user goal
        $url = sprintf('/api/v1.0/goals/%s', $goalId);
        // try to get goal by id
        $this->client->request('GET', $url);

        $this->assertEquals($this->client->getResponse()->getStatusCode(), Response::HTTP_OK, "can not get goal by id in getsAction rest!");

        $this->assertTrue(
            $this->client->getResponse()->headers->contains('Content-Type', 'application/json'),
            $this->client->getResponse()->headers
        );

        if ($profile = $this->client->getProfile()) {
            // check the number of requests
            $this->assertLessThan(10, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on group list page!");
        }
    }

    /**
     *
     */
    public function testGetCategories()
    {

        $url = sprintf('/api/v1.0/goal/categories');
        // try to get goal by id
        $this->client->request('GET', $url);

        $this->assertEquals($this->client->getResponse()->getStatusCode(), Response::HTTP_OK, "can not get goal by id in getsAction rest!");

        $this->assertTrue(
            $this->client->getResponse()->headers->contains('Content-Type', 'application/json'),
            $this->client->getResponse()->headers
        );

        if ($profile = $this->client->getProfile()) {
            // check the number of requests
            $this->assertLessThan(10, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on group list page!");
        }

    }

    /**
     */
    public function testPut()
    {
        $url = sprintf('/api/v1.0/goals');
        // try to get goal by id
        $this->client->request('PUT', $url, array('is_public'=>true, 'title'=>'from rest', 'description'=>'from rest description', 'video_links[0]'=>'www.google.com'));

        $this->assertEquals($this->client->getResponse()->getStatusCode(), Response::HTTP_OK, "can not get goal by id in getsAction rest!");

        $this->assertTrue(
            $this->client->getResponse()->headers->contains('Content-Type', 'application/json'),
            $this->client->getResponse()->headers
        );

        if ($profile = $this->client->getProfile()) {
            // check the number of requests
            $this->assertLessThan(10, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on group list page!");
        }
    }

    /**
     * @dataProvider goalProvider
     * @depends testPut
     */
    public function testAddImages($golId)
    {
        $url = sprintf('/api/v1.0/goals/add-images/%s', $golId);
        // try to get goal by id

        $maidir = $this->container->getParameter('kernel.root_dir');

        $oldPhotoPath = $maidir.'/../src/AppBundle/Tests/Controller/old_photo.jpg';
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

        $this->client->request('POST', $url, array(), array('file' => $photo));

        $this->assertEquals($this->client->getResponse()->getStatusCode(), Response::HTTP_OK, "can not get goal by id in getsAction rest!");

        $this->assertTrue(
            $this->client->getResponse()->headers->contains('Content-Type', 'application/json'),
            $this->client->getResponse()->headers
        );

        if ($profile = $this->client->getProfile()) {
            // check the number of requests
            $this->assertLessThan(10, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on group list page!");
        }
    }

    /**
     * @dataProvider allFileProvider
     * @depends testAddImages
     */
    public function testRemoveImage($goalImageId)
    {
        if($goalImageId) {

            $url = sprintf('/api/v1.0/goals/remove-images/%s', $goalImageId);
            // try to get goal by id

            $this->client->request('POST', $url);

            $this->assertEquals($this->client->getResponse()->getStatusCode(), Response::HTTP_OK, "can not get goal by id in getsAction rest!");

            $this->assertTrue(
                $this->client->getResponse()->headers->contains('Content-Type', 'application/json'),
                $this->client->getResponse()->headers
            );

            if ($profile = $this->client->getProfile()) {
                // check the number of requests
                $this->assertLessThan(10, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on group list page!");
            }
        }
    }

    public function testGetDrafts()
    {
        $url = sprintf('/api/v1.0/goals/drafts/%s/%s', 1,2 );
        // try to get goal by id
        $this->client->request('GET', $url);

        $this->assertEquals($this->client->getResponse()->getStatusCode(), Response::HTTP_OK, "can not get goal by id in getsAction rest!");

        $this->assertTrue(
            $this->client->getResponse()->headers->contains('Content-Type', 'application/json'),
            $this->client->getResponse()->headers
        );

        if ($profile = $this->client->getProfile()) {
            // check the number of requests
            $this->assertLessThan(10, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on group list page!");
        }
    }

    public function testGetFriends()
    {
        // GET /api/v1.0/goals/{first}/friends/{count}
        $url = sprintf('/api/v1.0/goals/%s/friends/%s', 1,2 );
        // try to get goal by id
        $this->client->request('GET', $url);

        $this->assertEquals($this->client->getResponse()->getStatusCode(), Response::HTTP_OK, "can not get goal by id in getsAction rest!");

        $this->assertTrue(
            $this->client->getResponse()->headers->contains('Content-Type', 'application/json'),
            $this->client->getResponse()->headers
        );

        if ($profile = $this->client->getProfile()) {
            // check the number of requests
            $this->assertLessThan(10, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on group list page!");
        }
    }

    /**
     * @dataProvider goalProvider
     */
    public function testPutComment($goalId)
    {
        $url = sprintf('/api/v1.0/goals/%s/comment', $goalId);
        // try to get goal by id
        $this->client->request('PUT', $url, array('commentBody'=>'from rest test comment create'));

        $this->assertEquals($this->client->getResponse()->getStatusCode(), Response::HTTP_OK, "can not get goal by id in getsAction rest!");

        $this->assertTrue(
            $this->client->getResponse()->headers->contains('Content-Type', 'application/json'),
            $this->client->getResponse()->headers
        );

        if ($profile = $this->client->getProfile()) {
            // check the number of requests
            $this->assertLessThan(10, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on group list page!");
        }

    }

    /**
     * @dataProvider goalProvider
     */
    public function testPutSuccessStory($goalId)
    {
        $url = sprintf('/api/v1.0/goals/%s/successstory', $goalId);
        // try to get goal by id
        $this->client->request('PUT', $url, array('story'=>'from rest test Success Story create'));

        $this->assertEquals($this->client->getResponse()->getStatusCode(), Response::HTTP_OK, "can not get goal by id in getsAction rest!");

        $this->assertTrue(
            $this->client->getResponse()->headers->contains('Content-Type', 'application/json'),
            $this->client->getResponse()->headers
        );

        if ($profile = $this->client->getProfile()) {
            // check the number of requests
            $this->assertLessThan(10, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on group list page!");
        }

    }

}