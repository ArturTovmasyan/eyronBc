<?php
/**
 * Created by PhpStorm.
 * User: armen
 * Date: 11/18/15
 * Time: 3:44 PM
 */
namespace Application\UserBundle\Tests\Controller\Rest;

use AppBundle\Tests\Controller\BaseClass;
use Symfony\Component\HttpFoundation\Response;

class NotificationControllerTest extends BaseClass
{
    /**
     * 
     */

    public function getActionTest()
    {
        // try to POST create user settings
        $this->client2->request('GET', '/api/v1.0/notifications/0/10/');

        // check response status code
        $this->assertEquals($this->client2->getResponse()->getStatusCode(), Response::HTTP_OK, "can not get note in getAction rest!");

        // check database query count
        if ($profile = $this->client2->getProfile()) {
            // check the number of requests
            $this->assertLessThan(15, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on POST postSettingsAction rest!");
        }

        //get response content
        $responseResults = json_decode($this->client2->getResponse()->getContent(), true);

        dump($responseResults);exit;
    }


//    /**
//     * This function test getUserFromSettingsAction
//     */
//    public function testGetUserFromSettings()
//    {
//        $url = '/api/v1.0/settings/user/from/settings';
//
//        // try to get user-settings
//        $this->client2->request('GET', $url, array());
//
//        // check response status code
//        $this->assertEquals($this->client2->getResponse()->getStatusCode(), Response::HTTP_OK, "can not get user-settings in getUserFromSettingsAction rest!");
//
//        // check response content type
//        $this->assertTrue(
//            $this->client2->getResponse()->headers->contains('Content-Type', 'application/json'),
//            $this->client2->getResponse()->headers
//        );
//
//        // check database query count
//        if ($profile = $this->client2->getProfile()) {
//            // check the number of requests
//            $this->assertLessThan(15, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on user-settings getUserFromSettingsAction rest!");
//        }
//
//        //get response content
//        $responseResults = json_decode($this->client2->getResponse()->getContent(), true);
//
//        $this->assertArrayHasKey('birth_date', $responseResults, 'Invalid birth_date in get user settings rest json structure');
//        $this->assertArrayHasKey('first_name', $responseResults, 'Invalid first_name key in get user settings rest json structure');
//        $this->assertArrayHasKey('last_name', $responseResults, 'Invalid last_name key in get user settings rest json structure');
//        $this->assertArrayHasKey('is_comment_notify', $responseResults, 'Invalid is_comment_notify key in get user settings rest json structure');
//        $this->assertArrayHasKey('is_success_story_notify', $responseResults, 'Invalid is_success_story_notify key in get user settings rest json structure');
//        $this->assertArrayHasKey('is_comment_push_note', $responseResults, 'Invalid is_comment_push_note key in get user settings rest json structure');
//        $this->assertArrayHasKey('is_success_story_push_note', $responseResults, 'Invalid is_success_story_push_note key in get user settings rest json structure');
//        $this->assertArrayHasKey('is_progress_push_note', $responseResults, 'Invalid is_progress_push_note key in get user settings rest json structure');
//        $this->assertArrayHasKey('lastUserEmail', $responseResults, 'Invalid is_progress_push_note key in get user settings rest json structure');
//
//        if(array_key_exists('lastUserEmail', $responseResults)) {
//
//            $lastUserEmail = $responseResults['lastUserEmail'];
//            $this->assertArrayHasKey('lastUserEmail', $responseResults, 'Invalid image_path key in Login rest json structure');
//            $this->assertArrayHasKey('userEmails', $lastUserEmail, 'Invalid userEmails key in get user settings rest json structure');
//            $this->assertArrayHasKey('token', $lastUserEmail, 'Invalid token key in get user settings rest json structure');
//            $this->assertArrayHasKey('primary', $lastUserEmail, 'Invalid primary key in get user settings rest json structure');
//        }
//
//        if(array_key_exists('image_path', $responseResults)) {
//
//            $this->assertArrayHasKey('image_path', $responseResults, 'Invalid image_path key in Login rest json structure');
//        }
//    }

  
}