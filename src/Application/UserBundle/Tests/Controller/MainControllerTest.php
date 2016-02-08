<?php
/**
 * Created by PhpStorm.
 * User: tigran
 * Date: 2/8/16
 * Time: 6:29 PM
 */

namespace Application\UserBundle\Tests\Controller;


use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Response;

class MainControllerTest extends WebTestCase
{

    /**
     * @var \Doctrine\ORM\EntityManager
     */
    protected $em;

    /**
     * @var null
     */
    protected $client = null;

    /**
     * {@inheritDoc}
     */
    public function setUp()
    {
        self::bootKernel();
        $this->em = static::$kernel->getContainer()
            ->get('doctrine')
            ->getManager();
        $this->client = static::createClient();
        $this->client->enableProfiler();
    }

    /**
     * This function use to test settingsAction
     */
    public function testSettings()
    {
        $this->markTestIncomplete(
            'This test has not been implemented yet.'
        );

        $crawler = $this->client->request('GET', '/settings');

        $this->assertEquals($this->client->getResponse()->getStatusCode(), Response::HTTP_OK, 'can not open goal view page!');

        // Assert that the response content contains a string goal1
        $this->assertContains('user1', $this->client->getResponse()->getContent(), 'can not find goal1!');

        $this->assertGreaterThan(0, $crawler->filter('article')->count());

        if ($profile = $this->client->getProfile()) {
            // check the number of requests
            $this->assertLessThan(10, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on group list page!");
        }

    }

    /**
     * This function use to test activationUserEmailsAction
     */
    public function testActivationUserEmails()
    {
        $this->markTestIncomplete(
            'This test has not been implemented yet.'
        );
        $emailToken = '';
        $email = '';
        $crawler = $this->client->request('GET', '/activation_email/' . $emailToken . '/'. $email);

        $this->assertEquals($this->client->getResponse()->getStatusCode(), Response::HTTP_OK, 'can not open goal view page!');

        // Assert that the response content contains a string goal1
        $this->assertContains('user1', $this->client->getResponse()->getContent(), 'can not find goal1!');

        $this->assertGreaterThan(0, $crawler->filter('article')->count());

        if ($profile = $this->client->getProfile()) {
            // check the number of requests
            $this->assertLessThan(10, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on group list page!");
        }
    }

    /**
     * This function use to test checkLoginAction
     */
    public function testCheckLogin()
    {
        $this->markTestIncomplete(
            'This test has not been implemented yet.'
        );
        $crawler = $this->client->request('GET', '/check-login');

        $this->assertEquals($this->client->getResponse()->getStatusCode(), Response::HTTP_OK, 'can not open goal view page!');

        // Assert that the response content contains a string goal1
        $this->assertContains('user1', $this->client->getResponse()->getContent(), 'can not find goal1!');

        $this->assertGreaterThan(0, $crawler->filter('article')->count());

        if ($profile = $this->client->getProfile()) {
            // check the number of requests
            $this->assertLessThan(10, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on group list page!");
        }
    }

    /**
     * This function use to test confirmAction
     */
    public function testConfirm()
    {
        $this->markTestIncomplete(
            'This test has not been implemented yet.'
        );

        $token = '';
        $crawler = $this->client->request('GET', '/registration-confirm/' . $token);

        $this->assertEquals($this->client->getResponse()->getStatusCode(), Response::HTTP_OK, 'can not open goal view page!');

        // Assert that the response content contains a string goal1
        $this->assertContains('user1', $this->client->getResponse()->getContent(), 'can not find goal1!');

        $this->assertGreaterThan(0, $crawler->filter('article')->count());

        if ($profile = $this->client->getProfile()) {
            // check the number of requests
            $this->assertLessThan(10, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on group list page!");
        }
    }

    /**
     * This function use to test resendMessageAction
     */
    public function testResendMessage()
    {
        $this->markTestIncomplete(
            'This test has not been implemented yet.'
        );

        $crawler = $this->client->request('GET', '/resend-message');

        $this->assertEquals($this->client->getResponse()->getStatusCode(), Response::HTTP_OK, 'can not open goal view page!');

        // Assert that the response content contains a string goal1
        $this->assertContains('user1', $this->client->getResponse()->getContent(), 'can not find goal1!');

        $this->assertGreaterThan(0, $crawler->filter('article')->count());

        if ($profile = $this->client->getProfile()) {
            // check the number of requests
            $this->assertLessThan(10, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on group list page!");
        }
    }

    /**
     * This function use to test updateEmailAction
     */
    public function testUpdateEmail()
    {
        $this->markTestIncomplete(
            'This test has not been implemented yet.'
        );

        $crawler = $this->client->request('GET', '/update-email');

        $this->assertEquals($this->client->getResponse()->getStatusCode(), Response::HTTP_OK, 'can not open goal view page!');

        // Assert that the response content contains a string goal1
        $this->assertContains('user1', $this->client->getResponse()->getContent(), 'can not find goal1!');

        $this->assertGreaterThan(0, $crawler->filter('article')->count());

        if ($profile = $this->client->getProfile()) {
            // check the number of requests
            $this->assertLessThan(10, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on group list page!");
        }
    }
}