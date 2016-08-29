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
     *This function is used to check notification getAction rest
     *
     */
    public function testGetAction()
    {
        //get user notification last id
        $lastId = $this->em->getRepository('ApplicationUserBundle:UserNotification')->findOneBy(array('isRead' => false));

        //change last id ++
        $lastId = $lastId->getId() + 2;

        // get user goal
        $url = sprintf('/api/v1.0/notifications/%s/%s/%s', 0, 5, $lastId);

        // try to POST create user settings
        $this->client2->request('GET', $url);

        // check response status code
        $this->assertEquals($this->client2->getResponse()->getStatusCode(), Response::HTTP_OK, "can not get note in notification getAction rest!");

        // check database query count
        if ($profile = $this->client2->getProfile()) {
            // check the number of requests
            $this->assertLessThan(15, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on POST postSettingsAction rest!");
        }

        //get response content
        $responseResults = json_decode($this->client2->getResponse()->getContent(), true);

        if(array_key_exists('userNotifications', $responseResults)) {

            //get user notification in array
            $userNotifications = $responseResults['userNotifications'];
            $userNotification = reset($userNotifications);

            $this->assertArrayHasKey('id', $userNotification, 'Invalid id key in notification getAction rest json structure');
            $this->assertArrayHasKey('is_read', $userNotification, 'Invalid is_read key in notification getAction rest json structure');

            if(array_key_exists('notification', $userNotification)) {

                //get notification in array
                $notification = $userNotification['notification'];

                $this->assertArrayHasKey('id', $notification, 'Invalid id key in notification getAction rest json structure');
                $this->assertArrayHasKey('created', $notification, 'Invalid created key in notification getAction rest json structure');
                $this->assertArrayHasKey('body', $notification, 'Invalid body key in notification getAction rest json structure');
                $this->assertArrayHasKey('link', $notification, 'Invalid link key in notification getAction rest json structure');
            }
        }
    }
}