<?php

namespace Application\UserBundle\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class RegistrationControllerTest extends WebTestCase
{
    const HTTP_STATUS_OK = 200;
    const HTTP_STATUS_REDIRECT = 302;

    /**
     * @var null
     */
    private $client = null;

    /**
     * {@inheritDoc}
     */
    public function setUp()
    {
        self::bootKernel();
        $this->client = static::createClient();
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
        $form = $crawler->selectButton('Sign Up')->form(array(
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

        $this->assertEquals($this->client->getResponse()->getStatusCode(), self::HTTP_STATUS_OK);

        // get form(invalid email)
        $form = $crawler->selectButton('Sign Up')->form(array(
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

        $this->assertEquals($this->client->getResponse()->getStatusCode(), self::HTTP_STATUS_OK);

        // get form(invalid password)
        $form = $crawler->selectButton('Sign Up')->form(array(
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

        $this->assertEquals($this->client->getResponse()->getStatusCode(), self::HTTP_STATUS_OK);

        // get form(invalid password confirm)
        $form = $crawler->selectButton('Sign Up')->form(array(
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

        $this->assertEquals($this->client->getResponse()->getStatusCode(), self::HTTP_STATUS_OK);
////////////////////////

        // get form(valid form)
        $form = $crawler->selectButton('Sign Up')->form(array(
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

        $this->assertEquals($this->client->getResponse()->getStatusCode(), self::HTTP_STATUS_REDIRECT);
////////////////////////
// check form validation
        // get form(this email already registered)
        $form = $crawler->selectButton('Sign Up')->form(array(
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

        $this->assertEquals($this->client->getResponse()->getStatusCode(), self::HTTP_STATUS_OK);
    }

    /**
     * This function is used to check password resetting
     *
     * @depends testSignUp
     */
    public function testResetting()
    {
        // try to open login page
        $crawler = $this->client->request('GET', '/login');

        $this->assertEquals($this->client->getResponse()->getStatusCode(), self::HTTP_STATUS_OK);

        // click in resetting link
        $link = $crawler->selectLink('Forgot password')->link();
        $this->client->click($link);

        // Assert that the response is a redirect to /resetting/request
        $this->assertTrue(
            $this->client->getResponse()->isRedirect('/resetting/request')
        );

        // try to open resetting request page
        $crawler = $this->client->request('GET', '/resetting/request');

        $this->assertEquals($this->client->getResponse()->getStatusCode(), self::HTTP_STATUS_OK);

        // get form
        $form = $crawler->selectButton('Reset password')->form(array(
            'username' => 'admin@admin.com',

        ));

        // submit form
        $this->client->submit($form);

        $this->assertEquals($this->client->getResponse()->getStatusCode(), self::HTTP_STATUS_REDIRECT);
    }
}
