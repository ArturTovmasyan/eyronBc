<?php

namespace AppBundle\Tests\Controller;

class MainControllerTest extends BaseClass
{
    /**
     * This function is used to check homepage
     */
    public function testIndex()
    {
        $this->markTestIncomplete(
            'This test has not been implemented yet.'
        );

        // try to open homepage
        $crawler = $this->client->request('GET', '/');

        $this->assertEquals( $this->client->getResponse()->getStatusCode(), BaseClass::HTTP_STATUS_OK, 'can not open homepage!');

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

            $this->assertEquals( $this->client->getResponse()->getStatusCode(), BaseClass::HTTP_STATUS_OK, 'can not click in goal2 link in homepage!');
        }
    }

    /**
     * This function is used to check page page
     */
    public function testPage()
    {
        $this->markTestIncomplete(
            'This test has not been implemented yet.'
        );
        // get page
        $page = $this->em->getRepository('AppBundle:Page')->findOneByName('page');
        // get page slug
        $slug = $page->getSlug();

        // try to open page
        $this->client->request('GET', '/page/' . $slug);

        $this->assertEquals( $this->client->getResponse()->getStatusCode(), BaseClass::HTTP_STATUS_OK, 'can not open page page!');
    }

    /**
     * This function is used to check news-feed page
     */
    public function testNewsFeed()
    {
        $this->markTestIncomplete(
            'This test has not been implemented yet.'
        );

        // try to open news-feed page
        $crawler = $this->client->request('GET', '/news-feed');

        $this->assertEquals( $this->client->getResponse()->getStatusCode(), BaseClass::HTTP_STATUS_OK, 'can not open news-feed page!');

        // click in goal1 title link
        $link = $crawler->selectLink('Show all')->link();
        $this->client->click($link);

        $this->assertEquals( $this->client->getResponse()->getStatusCode(), BaseClass::HTTP_STATUS_OK, 'can not click link in news-feed page!');
    }

    /**
     * This function is used to check goalFriends page
     */
    public function testGoalFriends()
    {
        $this->markTestIncomplete(
            'This test has not been implemented yet.'
        );

        // get goal
        $goal = $this->em->getRepository('AppBundle:Goal')->findOneByTitle('goal3');

        // get goal id
        $id = $goal->getId();

        // try to open goal add-to-me page
        $crawler = $this->clientSecond->request('POST', '/goal/add-to-me/' . $id);

        $this->assertEquals($this->clientSecond->getResponse()->getStatusCode(), BaseClass::HTTP_STATUS_OK, 'can not open goal add-to-me page!');

        // location array
        $location = array('location' => array('latitude' => 40.1773312, 'longitude' => 44.52747790000001), 'address' => 'Charents St, Yerevan, Armenia');

        // get form
        $form = $crawler->selectButton('DISCOVER MORE')->form(array(
            'app_bundle_user_goal[birthday]' => '10/14/2015',
            'app_bundle_user_goal[location]' => json_encode($location),
            'app_bundle_user_goal[note]' => 'goal note2',

        ));

        // submit form
        $this->clientSecond->submit($form);

        $this->assertEquals($this->clientSecond->getResponse()->getStatusCode(), BaseClass::HTTP_STATUS_REDIRECT, 'can not create user2 goal in add-to-me page!');

        // get user2
        $user = $this->em->getRepository('ApplicationUserBundle:User')->findOneByEmail('user@user.com');

        // try to search user2
        $this->client->request('GET', '/goal-friends?search=' . $user->getFirstName());

        $this->assertEquals( $this->client->getResponse()->getStatusCode(), BaseClass::HTTP_STATUS_OK, 'can not find a user with this firstName in goal-friends page!');

        // Assert that the response content contains a string user firstName
        $this->assertContains($user->getFirstName(), $this->client->getResponse()->getContent(), 'can not search user in goal-friends page!');
    }
}
