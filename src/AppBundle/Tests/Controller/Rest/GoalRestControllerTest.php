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

    }

//    /**
//     * This function is used to check goal image
//     */
//    public function testAddImages()
//    {
////        $this->markTestIncomplete(
////            'This test has not been implemented yet.'
////        );
//
//        $oldPhotoPath = __DIR__ . '/old_photo.jpg';
//        $photoPath = __DIR__ . '/photo.jpg';
//
//        // copy photo path
//        copy($oldPhotoPath, $photoPath);
//
//        // new uploaded file
//        $photo = new UploadedFile(
//            $photoPath,
//            'photo.jpg',
//            'image/jpeg',
//            123
//        );
//
//        // try to open goal add images page
//        $this->client->request(
//            'POST',
//            '/api/v1.0/goals/add-images/5',
//            array(),
//            array('file' => $photo)
//        );
//
//        $this->assertEquals($this->client->getResponse()->getStatusCode(), BaseClass::HTTP_STATUS_OK, 'can not add goal image!');
//    }

}