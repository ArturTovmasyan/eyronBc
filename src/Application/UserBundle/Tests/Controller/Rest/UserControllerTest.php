<?php
/**
 * Created by PhpStorm.
 * User: armen
 * Date: 1/25/16
 * Time: 1:46 PM
 */

namespace Application\UserBundle\Tests\Controller\Rest;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class UserControllerTest extends WebTestCase
{
    const HTTP_STATUS_BAD_REQUEST = 400;

    /**
     * @var \Doctrine\ORM\EntityManager
     */
    protected $em;

    /**
     * @var null
     */
    protected $client = null;

    /**
     * @var null
     */
    protected $clientAuthorized = null;

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
        $this->clientAuthorized = static::createClient(array(), array(
            'PHP_AUTH_USER' => 'admin@admin.com',
            'PHP_AUTH_PW'   => 'Test1234',
        ));
        $this->clientAuthorized->enableProfiler();
    }

    /**
     * This function is used to check Post function in rest
     */
    public function testPostBlankEmail()
    {
        $url = '/api/v1.0/users';

        // try to register new user
        $this->client->request('POST', $url,
            array(
                'email' => '',
                'plainPassword' => 'Test1234',
                'firstName' => 'Test',
                'lastName' => 'Testyan',
                'birthday' => '01/12/1990',
            )
        );

        $this->assertEquals($this->client->getResponse()->getStatusCode(), self::HTTP_STATUS_BAD_REQUEST, "can not register new user with blank email in postAction rest!");

        $this->assertTrue(
            $this->client->getResponse()->headers->contains('Content-Type', 'application/json'),
            $this->client->getResponse()->headers
        );
    }

    /**
     * This function is used to check Post function in rest
     */
    public function testPostBlankPassword()
    {
        $url = '/api/v1.0/users';

        // try to register new user
        $this->client->request('POST', $url,
            array(
                'email' => 'test@test.com',
                'plainPassword' => '',
                'firstName' => 'Test',
                'lastName' => 'Testyan',
                'birthday' => '01/12/1990',
            )
        );

        $this->assertEquals($this->client->getResponse()->getStatusCode(), self::HTTP_STATUS_BAD_REQUEST, "form submit with blank password in postAction(user registration) rest!");

        $this->assertTrue(
            $this->client->getResponse()->headers->contains('Content-Type', 'application/json'),
            $this->client->getResponse()->headers
        );
    }

    /**
     * This function is used to check Post function in rest
     */
    public function testPostInvalidPasswordMinLength()
    {
        $url = '/api/v1.0/users';

        // try to register new user
        $this->client->request('POST', $url,
            array(
                'email' => 'test@test.com',
                'plainPassword' => 'Test',
                'firstName' => 'Test',
                'lastName' => 'Testyan',
                'birthday' => '01/12/1990',
            )
        );

        $this->assertEquals($this->client->getResponse()->getStatusCode(), self::HTTP_STATUS_BAD_REQUEST, "form submit with invalid password min length in postAction(user registration) rest!");

        $this->assertTrue(
            $this->client->getResponse()->headers->contains('Content-Type', 'application/json'),
            $this->client->getResponse()->headers
        );
    }

    /**
     * This function is used to check Post function in rest
     */
    public function testPostBlankFirstName()
    {
        $url = '/api/v1.0/users';

        // try to register new user
        $this->client->request('POST', $url,
            array(
                'email' => 'test@test.com',
                'plainPassword' => 'Test1234',
                'firstName' => '',
                'lastName' => 'Testyan',
                'birthday' => '01/12/1990',
            )
        );

        $this->assertEquals($this->client->getResponse()->getStatusCode(), self::HTTP_STATUS_BAD_REQUEST, "form submit with blank firstName in postAction(user registration) rest!");

        $this->assertTrue(
            $this->client->getResponse()->headers->contains('Content-Type', 'application/json'),
            $this->client->getResponse()->headers
        );
    }

    /**
     * This function is used to check Post function in rest
     */
    public function testPostBlankLastName()
    {
        $url = '/api/v1.0/users';

        // try to register new user
        $this->client->request('POST', $url,
            array(
                'email' => 'test@test.com',
                'plainPassword' => 'Test1234',
                'firstName' => 'Test',
                'lastName' => '',
                'birthday' => '01/12/1990',
            )
        );

        $this->assertEquals($this->client->getResponse()->getStatusCode(), self::HTTP_STATUS_BAD_REQUEST, "form submit with blank lastName in postAction(user registration) rest!");

        $this->assertTrue(
            $this->client->getResponse()->headers->contains('Content-Type', 'application/json'),
            $this->client->getResponse()->headers
        );
    }

    /**
     * This function is used to check Post function in rest
     */
    public function testPostBlankBirthday()
    {
        $url = '/api/v1.0/users';

        // try to register new user
        $this->client->request('POST', $url,
            array(
                'email' => 'test@test.com',
                'plainPassword' => 'Test1234',
                'firstName' => 'Test',
                'lastName' => 'Testyan',
                'birthday' => '',
            )
        );

        $this->assertEquals($this->client->getResponse()->getStatusCode(), self::HTTP_STATUS_BAD_REQUEST, "form submit with blank birthday in postAction(user registration) rest!");

        $this->assertTrue(
            $this->client->getResponse()->headers->contains('Content-Type', 'application/json'),
            $this->client->getResponse()->headers
        );
    }

    /**
     * This function is used to check Post function in rest
     */
    public function testPostAlreadyRegisteredEmail()
    {
        // get user
        $user = $this->em->getRepository('ApplicationUserBundle:User')->findOneByEmail('admin@admin.com');

        $url = '/api/v1.0/users';

        // try to register new user
        $this->client->request('POST', $url,
            array(
                'email' => $user->getEmail(),
                'plainPassword' => 'Test1234',
                'firstName' => 'Test',
                'lastName' => 'Testyan',
                'birthday' => '01/12/1990',
            )
        );

        $this->assertEquals($this->client->getResponse()->getStatusCode(), self::HTTP_STATUS_BAD_REQUEST, "form submit with already registered email in postAction(user registration) rest!");

        $this->assertTrue(
            $this->client->getResponse()->headers->contains('Content-Type', 'application/json'),
            $this->client->getResponse()->headers
        );
    }

    /**
     * This function is used to check Post function in rest
     */
    public function testPost()
    {
        $url = '/api/v1.0/users';

        // try to register new user
        $this->client->request('POST', $url,
            array(
                'email' => 'test@test.com',
                'plainPassword' => 'Test1234',
                'firstName' => 'Test',
                'lastName' => 'Testyan',
                'birthday' => '01/12/1990',
            )
        );

        // Assert that the response status code is 2xx
        $this->assertTrue($this->client->getResponse()->isSuccessful(), "can not register new user in postAction(user registration) rest!");

        $this->assertTrue(
            $this->client->getResponse()->headers->contains('Content-Type', 'application/json'),
            $this->client->getResponse()->headers
        );
    }

    /**
     * This function is used to check postLogin function in rest
     */
    public function testPostLogin()
    {
        $url = '/api/v1.0/users/logins';

        // try to login
        $this->clientAuthorized->request('POST', $url,
            array(
                'username' => 'admin@admin.com',
                'password' => 'Test1234',
            )
        );

        // Assert that the response status code is 2xx
        $this->assertTrue($this->clientAuthorized->getResponse()->isSuccessful(), "can not login in postLoginAction rest!");

        $this->assertTrue(
            $this->clientAuthorized->getResponse()->headers->contains('Content-Type', 'application/json'),
            $this->clientAuthorized->getResponse()->headers
        );
    }

    /**
     * This function is used to check getRegistered function in rest
     */
    public function testGetRegistered()
    {
        // get user
        $user = $this->em->getRepository('ApplicationUserBundle:User')->findOneByEmail('admin@admin.com');

        $url = sprintf('/api/v1.0/users/%s/registered', $user->getEmail());

        // try to get user registered status
        $this->clientAuthorized->request('GET', $url);

        // Assert that the response status code is 2xx
        $this->assertTrue($this->clientAuthorized->getResponse()->isSuccessful(), "can not get user registered status in getRegisteredAction rest!");

        // assert that user registered status is true
        $this->assertContains(
            'true',
            $this->clientAuthorized->getResponse()->getContent()
        );

        $this->assertTrue(
            $this->clientAuthorized->getResponse()->headers->contains('Content-Type', 'application/json'),
            $this->clientAuthorized->getResponse()->headers
        );

        $url = sprintf('/api/v1.0/users/%s/registered', 'nonExistentEmail');

        // try to get user registered status
        $this->clientAuthorized->request('GET', $url);

        // assert that user registered status is false
        $this->assertContains(
            'false',
            $this->clientAuthorized->getResponse()->getContent()
        );
    }
}