<?php

namespace AppBundle\Tests\Controller;

class MainControllerTest extends BaseClass
{
    /**
     * This function is used to check homepage
     */
    public function testIndex()
    {
        // try to open homepage
        $this->client->request('GET', '/');

        $this->assertEquals( $this->client->getResponse()->getStatusCode(), BaseClass::HTTP_STATUS_OK);
    }

    /**
     * This function is used to check how_it_works page
     */
    public function testHowItWorks()
    {
        // try to open how_it_works page
        $this->client->request('GET', '/howitworks');

        $this->assertEquals( $this->client->getResponse()->getStatusCode(), BaseClass::HTTP_STATUS_OK);
    }

    /**
     * This function is used to check about_bl page
     */
    public function testAboutBl()
    {
        // try to open about_bl page
        $this->client->request('GET', '/aboutbl');

        $this->assertEquals( $this->client->getResponse()->getStatusCode(), BaseClass::HTTP_STATUS_OK);
    }

    /**
     * This function is used to check contact_us page
     */
    public function testContactUs()
    {
        // try to open contact_us page
        $this->client->request('GET', '/contactus');

        $this->assertEquals( $this->client->getResponse()->getStatusCode(), BaseClass::HTTP_STATUS_OK);
    }
}
