<?php

namespace AppBundle\Tests\Controller;

use Symfony\Component\HttpFoundation\Response;

class MainControllerTest extends BaseClass
{
    /**
     * This function is used to check goal description content in web and meta tag
     */
    public function testDescriptionContent()
    {
        //try to open goal inner page
        $crawler = $this->client2->request('GET', '/goal/goal8');

        //get meta desc content
        $metaContent = $crawler->filterXPath("//meta[@name='description']/@content");

        //get meta description text
        $metaDescription = $metaContent->text();

        //get description content in page
        $descContent = $crawler->filterXPath("//div[@class='text-dark-grey goal-info']//p");

        //get description text
        $description = $descContent->text();

        //set default value
        $hashTag = true;

        if (strpos($metaDescription, '#') !== false || strpos($description, '#') !== false) {
            $hashTag = false;
        }

        $this->assertTrue($hashTag, "Goal description contains # tag");

        $this->assertEquals($this->client2->getResponse()->getStatusCode(), Response::HTTP_OK, 'can not open goal page!');

        if ($profile = $this->client2->getProfile()) {
            // check the number of requests
            $this->assertLessThan(10, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on goal inner page!");
        }
    }

//    /**
//     * This function is used to check homepage
//     */
//    public function testIndex()
//    {
//        // try to open homepage
//        $this->client->request('GET', '/');
//
//        $this->assertEquals( $this->client->getResponse()->getStatusCode(), Response::HTTP_FOUND, 'can not open homepage!');
//
//        if ($profile = $this->client->getProfile()) {
//            // check the number of requests
//            $this->assertLessThan(10, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on group list page!");
//        }
//    }
//
//    /**
//     * This function is used to check page page
//     */
//    public function testPage()
//    {
//
//        // get page
//        $page = $this->em->getRepository('AppBundle:Page')->findOneByName('page');
//        // get page slug
//        $slug = $page->getSlug();
//
//        // try to open page
//        $this->client->request('GET', '/page/' . $slug);
//
//        $this->assertEquals( $this->client->getResponse()->getStatusCode(), Response::HTTP_OK, 'can not open page page!');
//
//        $crawler = $this->client->request('GET', '/page/contact-us');
//
//        $this->assertEquals( $this->client->getResponse()->getStatusCode(), Response::HTTP_OK, 'can not open page page!');
//
//        $form = $crawler->selectButton('Send')->form(array(
//            'app_bundle_contact_us[fullName]' => '10/14/2015',
//            'app_bundle_contact_us[email]' => 'koko@ko.com',
//            'app_bundle_contact_us[subject]' => 'Bl test',
//            'app_bundle_contact_us[message]' => 'Bl Test message description.'
//
//        ));
//
//        // submit form
//        $this->client->submit($form);
//
//        // check db request count
//        if ($profile = $this->client->getProfile()) {
//            // check the number of requests
//            $this->assertLessThan(10, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on group list page!");
//        }
//
//    }
//
//    /**
//     * This function is used to check goal friends page
//     */
//    public function testGoalFriends()
//    {
//
//        // try to open goal add-to-me page
//        $this->clientSecond->request('GET', '/goal-friends', array('search'=>'goal3'));
//
//        $this->assertEquals($this->clientSecond->getResponse()->getStatusCode(), Response::HTTP_OK, 'can not open goal goal friends page!');
//
//        // check db request count
//        if ($profile = $this->clientSecond->getProfile()) {
//            // check the number of requests
//            $this->assertLessThan(10, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on group list page!");
//        }
//    }
//
//    /**
//     * This function is used to check Goal Users page
//     *
//     * @dataProvider goalProvider
//     */
//    public function testGoalUsers($goalSlug)
//    {
//
//        // try to open goal add-to-me page
//        $this->clientSecond->request('GET', '/listed-users/' . $goalSlug);
//
//        $this->assertEquals($this->clientSecond->getResponse()->getStatusCode(), Response::HTTP_OK, 'can not open goal users page!');
//
//        // check db request count
//        if ($profile = $this->clientSecond->getProfile()) {
//            // check the number of requests
//            $this->assertLessThan(10, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on group list page!");
//        }
//    }
//
//    /**
//     * This function is used to check goal Activities page
//     *
//     */
//    public function testActivities()
//    {
//
//        // try to open goal add-to-me page
//        $this->clientSecond->request('GET', '/activity');
//
//        $this->assertEquals($this->clientSecond->getResponse()->getStatusCode(), Response::HTTP_OK, 'can not open goal activities page!');
//
//        // check db request count
//        if ($profile = $this->clientSecond->getProfile()) {
//            // check the number of requests
//            $this->assertLessThan(17, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on group list page!");
//        }
//    }
//
//    /**
//     * This function is used to check goal Registration Confirmed page
//     *
//     */
//    public function testRegistrationConfirmed()
//    {
//
//        // try to open goal add-to-me page
//        $this->clientSecond->request('GET', '/register/confirmed');
//
//        $this->assertEquals($this->clientSecond->getResponse()->getStatusCode(), Response::HTTP_FOUND, 'can not open Registration Confirmed page!');
//
//        // check db request count
//        if ($profile = $this->clientSecond->getProfile()) {
//            // check the number of requests
//            $this->assertLessThan(10, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on group list page!");
//        }
//    }
}
