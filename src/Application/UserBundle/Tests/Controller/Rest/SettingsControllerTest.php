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

class SettingsControllerTest extends BaseClass
{
    /**
     * This function is used to check postSettingsAction in rest
     *
     * @dataProvider userSettingsProvider
     */
    public function testPostSettings($data)
    {
        // try to POST create user settings
        $this->clientSecond->request('POST', '/api/v1.0/settings/settings', $data['request']);
        // check response status code
        $this->assertEquals($this->clientSecond->getResponse()->getStatusCode(), $data['response']['statusCode'], "can not post user-settings in postSettingsAction rest!");
        // check database query count
        if ($profile = $this->clientSecond->getProfile()) {
            // check the number of requests
            $this->assertLessThan(10, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on POST postSettingsAction rest!");
        }
    }

    /**
     * This function test postChangePasswordAction
     *
     * @dataProvider userChangePasswordProvider
     */
    public function testPostChangePassword($data)
    {
        // try to POST change password
        $data['client']->request('POST', '/api/v1.0/settings/changes/passwords', $data['request']);
        // check response status code
        $this->assertEquals($data['client']->getResponse()->getStatusCode(), $data['response']['statusCode'], "can not POST in postChangePasswordAction rest!");
        // check response content type
        $this->assertTrue(
            $data['client']->getResponse()->headers->contains('Content-Type', 'application/json'),
            $data['client']->getResponse()->headers
        );
        // check database query count
        if ($profile = $data['client']->getProfile()) {
            // check the number of requests
            $this->assertLessThan(10, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on POST postChangePasswordAction rest!");
        }
    }

    /**
     * This function test getUserFromSettingsAction
     */
    public function testGetUserFromSettings()
    {
        // get user
        $userId = $this->em->getRepository('ApplicationUserBundle:User')->findOneByUsername('user@user.com')->getId();
        // calculate url by user4
        $url = sprintf('/api/v1.0/settings/%s/user/from/settings', $userId);

        // try to get user-settings
        $this->clientSecond->request('GET', $url, array());
        // check response status code
        $this->assertEquals($this->clientSecond->getResponse()->getStatusCode(), Response::HTTP_OK, "can not get user-settings in getUserFromSettingsAction rest!");
        // check response content type
        $this->assertTrue(
            $this->clientSecond->getResponse()->headers->contains('Content-Type', 'application/json'),
            $this->clientSecond->getResponse()->headers
        );
        // check database query count
        if ($profile = $this->clientSecond->getProfile()) {
            // check the number of requests
            $this->assertLessThan(10, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on user-settings getUserFromSettingsAction rest!");
        }
    }

    /**
     * This function test deleteEmailAction
     */
    public function testDeleteEmail()
    {
        // try to delete user-emails
        $this->clientSecond->request('DELETE', '/api/v1.0/settings/email', array('email'=>'test@test.ru'));
        // check response status code
        $this->assertEquals($this->clientSecond->getResponse()->getStatusCode(), Response::HTTP_OK, "can not delete user-emails in deleteEmailAction rest!");
        // check response content type
        $this->assertTrue(
            $this->clientSecond->getResponse()->headers->contains('Content-Type', 'application/json'),
            $this->clientSecond->getResponse()->headers
        );
        // check database query count
        if ($profile = $this->clientSecond->getProfile()) {
            // check the number of requests
            $this->assertLessThan(10, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on delete user-emails rest!");
        }
    }
}