<?php

namespace AppBundle\Tests\Controller;

use Symfony\Component\HttpFoundation\Response;

class MainControllerTest extends BaseClass
{
    /**
     * This function is used to check homepage
     */
    public function testIndex()
    {
        // try to open homepage
        $crawler = $this->client->request('GET', '/');

        $this->assertEquals( $this->client->getResponse()->getStatusCode(), Response::HTTP_FOUND, 'can not open homepage!');

        // get goal2
        $goal2 = $this->em->getRepository('AppBundle:Goal')->findOneByTitle('goal2');

        // check is exist goal 2
        if ($goal2) {
            // count goals
            $countGoals = count($crawler->filter('#main_row1 a[id="main_goalTitle1"]'));
            $this->assertEquals(1, $countGoals, 'can not find goal2 in homepage!');
        }

        // check is exist goal 2
        if ($goal2) {
            // click in goal1 title link
            $link = $crawler->filter('#main_row1 a[id="main_goalTitle1"]')->link();
            $this->client->click($link);

            $this->assertEquals( $this->client->getResponse()->getStatusCode(), Response::HTTP_FOUND, 'can not click in goal2 link in homepage!');
        }
    }

    /**
     * This function is used to check page page
     */
    public function testPage()
    {

        // get page
        $page = $this->em->getRepository('AppBundle:Page')->findOneByName('page');
        // get page slug
        $slug = $page->getSlug();

        // try to open page
        $this->client->request('GET', '/page/' . $slug);

        $this->assertEquals( $this->client->getResponse()->getStatusCode(), Response::HTTP_OK, 'can not open page page!');

        // check db request count
        if ($profile = $this->client->getProfile()) {
            // check the number of requests
            $this->assertLessThan(10, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on group list page!");
        }

    }

    /**
     * This function is used to check goal friends page
     */
    public function testGoalFriends()
    {

        // try to open goal add-to-me page
        $this->clientSecond->request('GET', '/goal-friends', array('search'=>'goal3'));

        $this->assertEquals($this->clientSecond->getResponse()->getStatusCode(), Response::HTTP_OK, 'can not open goal goal friends page!');

    }

    /**
     * This function is used to check Goal Users page
     *
     * @dataProvider goalProvider
     */
    public function testGoalUsers($goalId)
    {

        // try to open goal add-to-me page
        $this->clientSecond->request('GET', '/listed-users/'.$goalId);

        $this->assertEquals($this->clientSecond->getResponse()->getStatusCode(), Response::HTTP_OK, 'can not open goal users page!');

    }

    /**
     * This function is used to check goal Activities page
     *
     */
    public function testActivities()
    {

        // try to open goal add-to-me page
        $this->clientSecond->request('GET', '/activity');

        $this->assertEquals($this->clientSecond->getResponse()->getStatusCode(), Response::HTTP_OK, 'can not open goal activities page!');

    }

    /**
     * This function is used to check goal Registration Confirmed page
     *
     */
    public function testRegistrationConfirmed()
    {

        // try to open goal add-to-me page
        $this->clientSecond->request('GET', '/register/confirmed');

        $this->assertEquals($this->clientSecond->getResponse()->getStatusCode(), Response::HTTP_FOUND, 'can not open Registration Confirmed page!');

    }
}
