<?php

namespace Application\UserBundle\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class RegistrationControllerTest extends WebTestCase
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
     * This function is used to check user sign up form
     */
    public function testSignUp()
    {
        // try to open register page
        $crawler = $this->client->request('GET', '/register/');

        // check crawler
        $this->assertTrue(is_object($crawler), "crawler is null for user create!");

// check form validation
        // get form(wrong password confirm)
        $form = $crawler->selectButton('SIGN UP')->form(array(
            'fos_user_registration_form[firstName]' => 'Armen',
            'fos_user_registration_form[lastName]' => 'Vardanyan',
            'fos_user_registration_form[email]' => 'armen@armen.com',
            'fos_user_registration_form[plainPassword][first]' => 'Test1234',
            'fos_user_registration_form[plainPassword][second]' => 'Test',
            'fos_user_registration_form[birthDate][month]' => 10,
            'fos_user_registration_form[birthDate][day]' => 1,
            'fos_user_registration_form[birthDate][year]' => 2015,

        ));

        // submit form
        $this->client->submit($form);

        // Assert that the response status code is 2xx
        $this->assertTrue($this->client->getResponse()->isSuccessful(), "form submit with wrong password confirm in user registration!");

        // get form(invalid email)
        $form = $crawler->selectButton('SIGN UP')->form(array(
            'fos_user_registration_form[firstName]' => 'Armen',
            'fos_user_registration_form[lastName]' => 'Vardanyan',
            'fos_user_registration_form[email]' => '',
            'fos_user_registration_form[plainPassword][first]' => 'Test1234',
            'fos_user_registration_form[plainPassword][second]' => 'Test1234',
            'fos_user_registration_form[birthDate][month]' => 10,
            'fos_user_registration_form[birthDate][day]' => 1,
            'fos_user_registration_form[birthDate][year]' => 2015,

        ));

        // submit form
        $this->client->submit($form);

        // Assert that the response status code is 2xx
        $this->assertTrue($this->client->getResponse()->isSuccessful(), "form submit with blank email in user registration!");

        // get form(invalid password)
        $form = $crawler->selectButton('SIGN UP')->form(array(
            'fos_user_registration_form[firstName]' => 'Armen',
            'fos_user_registration_form[lastName]' => 'Vardanyan',
            'fos_user_registration_form[email]' => 'armen@armen.com',
            'fos_user_registration_form[plainPassword][first]' => '',
            'fos_user_registration_form[plainPassword][second]' => 'Test1234',
            'fos_user_registration_form[birthDate][month]' => 10,
            'fos_user_registration_form[birthDate][day]' => 1,
            'fos_user_registration_form[birthDate][year]' => 2015,

        ));

        // submit form
        $this->client->submit($form);

        // Assert that the response status code is 2xx
        $this->assertTrue($this->client->getResponse()->isSuccessful(), "form submit with blank password in user registration!");

        // get form(invalid password confirm)
        $form = $crawler->selectButton('SIGN UP')->form(array(
            'fos_user_registration_form[firstName]' => 'Armen',
            'fos_user_registration_form[lastName]' => 'Vardanyan',
            'fos_user_registration_form[email]' => 'armen@armen.com',
            'fos_user_registration_form[plainPassword][first]' => 'Test1234',
            'fos_user_registration_form[plainPassword][second]' => '',
            'fos_user_registration_form[birthDate][month]' => 10,
            'fos_user_registration_form[birthDate][day]' => 1,
            'fos_user_registration_form[birthDate][year]' => 2015,

        ));

        // submit form
        $this->client->submit($form);

        // Assert that the response status code is 2xx
        $this->assertTrue($this->client->getResponse()->isSuccessful(), "form submit with blank password confirm in user registration!");

        // get form(invalid password min length)
        $form = $crawler->selectButton('SIGN UP')->form(array(
            'fos_user_registration_form[firstName]' => 'Armen',
            'fos_user_registration_form[lastName]' => 'Vardanyan',
            'fos_user_registration_form[email]' => 'armen@armen.com',
            'fos_user_registration_form[plainPassword][first]' => 'Test',
            'fos_user_registration_form[plainPassword][second]' => 'Test',
            'fos_user_registration_form[birthDate][month]' => 10,
            'fos_user_registration_form[birthDate][day]' => 1,
            'fos_user_registration_form[birthDate][year]' => 2015,

        ));

        // submit form
        $this->client->submit($form);

        // Assert that the response status code is 2xx
        $this->assertTrue($this->client->getResponse()->isSuccessful(), "form submit with invalid password min length in user registration!");

        // get form(invalid firstName)
        $form = $crawler->selectButton('SIGN UP')->form(array(
            'fos_user_registration_form[firstName]' => '',
            'fos_user_registration_form[lastName]' => 'Vardanyan',
            'fos_user_registration_form[email]' => 'armen@armen.com',
            'fos_user_registration_form[plainPassword][first]' => 'Test1234',
            'fos_user_registration_form[plainPassword][second]' => 'Test1234',
            'fos_user_registration_form[birthDate][month]' => 10,
            'fos_user_registration_form[birthDate][day]' => 1,
            'fos_user_registration_form[birthDate][year]' => 2015,

        ));

        // submit form
        $this->client->submit($form);

        // Assert that the response status code is 2xx
        $this->assertTrue($this->client->getResponse()->isSuccessful(), "form submit with blank firstName in user registration!");

        // get form(invalid lastName)
        $form = $crawler->selectButton('SIGN UP')->form(array(
            'fos_user_registration_form[firstName]' => 'Armen',
            'fos_user_registration_form[lastName]' => '',
            'fos_user_registration_form[email]' => 'armen@armen.com',
            'fos_user_registration_form[plainPassword][first]' => 'Test1234',
            'fos_user_registration_form[plainPassword][second]' => 'Test1234',
            'fos_user_registration_form[birthDate][month]' => 10,
            'fos_user_registration_form[birthDate][day]' => 1,
            'fos_user_registration_form[birthDate][year]' => 2015,

        ));

        // submit form
        $this->client->submit($form);

        // Assert that the response status code is 2xx
        $this->assertTrue($this->client->getResponse()->isSuccessful(), "form submit with blank lastName in user registration!");
////////////////////////

        // get form(valid form)
        $form = $crawler->selectButton('SIGN UP')->form(array(
            'fos_user_registration_form[firstName]' => 'Armen',
            'fos_user_registration_form[lastName]' => 'Vardanyan',
            'fos_user_registration_form[email]' => 'armen@armen.com',
            'fos_user_registration_form[plainPassword][first]' => 'Test1234',
            'fos_user_registration_form[plainPassword][second]' => 'Test1234',
            'fos_user_registration_form[birthDate][month]' => 10,
            'fos_user_registration_form[birthDate][day]' => 1,
            'fos_user_registration_form[birthDate][year]' => 1990,

        ));

        // submit form
        $this->client->submit($form);

        $this->assertTrue($this->client->getResponse()->isRedirect(), "can not create user in user registration!");
        ////////////////////////
// check form validation
        // get form(this email already registered)
        $form = $crawler->selectButton('SIGN UP')->form(array(
            'fos_user_registration_form[firstName]' => 'Armen',
            'fos_user_registration_form[lastName]' => 'Vardanyan',
            'fos_user_registration_form[email]' => 'armen@armen.com',
            'fos_user_registration_form[plainPassword][first]' => 'Test1234',
            'fos_user_registration_form[plainPassword][second]' => 'Test1234',
            'fos_user_registration_form[birthDate][month]' => 10,
            'fos_user_registration_form[birthDate][day]' => 1,
            'fos_user_registration_form[birthDate][year]' => 2015,

        ));

        // submit form
        $this->client->submit($form);

        // Assert that the response status code is 2xx
        $this->assertTrue($this->client->getResponse()->isSuccessful(), "form submit with already registered email in user registration!");
    }

    /**
     * This function is used to check confirm email button when user registered but yet did not confirm email
     */
    public function testCheckConfirmEmailButton()
    {
        $this->client = static::createClient(array(), array(
            'PHP_AUTH_USER' => 'armen@armen.com',
            'PHP_AUTH_PW'   => 'Test1234',
        ));
        $this->client->enableProfiler();

        // try to open goal list page
        $crawler = $this->client->request('GET', '/goal/list');

        // Assert that there is at least one a tag with the id "resend_message"
        $this->assertGreaterThan(
            0, $crawler->filter('a[id="resend_message"]')->count(), "can not find confirm email button on goal list page!"
        );
    }

    /**
     * This function is used to check user registration token
     */
    public function testCheckRegistrationToken()
    {
        $this->client = static::createClient(array(), array(
            'PHP_AUTH_USER' => 'armen@armen.com',
            'PHP_AUTH_PW'   => 'Test1234',
        ));
        $this->client->enableProfiler();

        // get user
        $user = $this->em->getRepository('ApplicationUserBundle:User')->findOneByEmail('armen@armen.com');

        // try to open registration-confirm page
        $this->client->request('GET', '/registration-confirm/' . $user->getRegistrationToken());

        // Assert that the response status code is 2xx
        $this->assertTrue($this->client->getResponse()->isSuccessful(), "can not confirm email on registration-confirm page!");

        $this->client->reload();

        // Assert that the response status code is 404
        $this->assertTrue($this->client->getResponse()->isNotFound(), "can not confirm email on registration-confirm page!");

        // try to open goal list page
        $crawler = $this->client->request('GET', '/goal/list');

        // Assert that there is not a tag with the id "resend_message"
        $this->assertLessThan(
            1, $crawler->filter('a[id="resend_message"]')->count(), "after email confirmation 'confirm email' button will not appear on goal list page!"
        );
    }

    /**
     * This function is used to check password resetting
     */
    public function testResetting()
    {
        // try to open login page
        $crawler = $this->client->request('GET', '/login');

        // Assert that the response status code is 2xx
        $this->assertTrue($this->client->getResponse()->isSuccessful(), "cannot open login page!");

        // click in resetting link
        $link = $crawler->selectLink('Forgot password?')->link();
        $this->client->click($link);

        $this->assertTrue($this->client->getResponse()->isRedirect(), "can not redirect in resetting page from login page!");

        // try to open resetting page
        $crawler = $this->client->request('GET', '/resetting/request');

        // Assert that the response status code is 2xx
        $this->assertTrue($this->client->getResponse()->isSuccessful(), "can not open resetting page!");

        // get form
        $form = $crawler->selectButton('Send')->form(array(
            'username' => 'armen@armen.com',

        ));

        // submit form
        $this->client->submit($form);

        $this->assertTrue($this->client->getResponse()->isRedirect(), "cannot reset password!");

        // get user
        $user = $this->em->getRepository('ApplicationUserBundle:User')->findOneByEmail('armen@armen.com');

        // try to open resetting-reset page
        $crawler = $this->client->request('GET', '/resetting/reset/' . $user->getConfirmationToken());

        // Assert that the response status code is 2xx
        $this->assertTrue($this->client->getResponse()->isSuccessful(), "can not open password resetting-reset-confirmationToken page!");

        // get form
        $form = $crawler->selectButton('Done')->form(array(
            'fos_user_resetting_form[new][first]' => 'test12',
            'fos_user_resetting_form[new][second]' => 'test12',

        ));

        // submit form
        $this->client->submit($form);

        $this->assertTrue($this->client->getResponse()->isRedirect(), "cannot reset password!");

        // try to login with new changes password
        $this->client = static::createClient(array(), array(
            'PHP_AUTH_USER' => 'armen@armen.com',
            'PHP_AUTH_PW'   => 'test12',
        ));

        // try to open goal list page
        $this->client->request('GET', '/goal/list');

        // Assert that the response status code is 2xx
        $this->assertTrue($this->client->getResponse()->isSuccessful(), "cannot open goal list page!");
    }
}
