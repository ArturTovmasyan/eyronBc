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
     *
     * @depends testIndex
     */
    public function testPage()
    {
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
     *
     * @depends testPage
     */
    public function testNewsFeed()
    {
        // try to open news-feed page
        $crawler = $this->client->request('GET', '/news-feed');

        $this->assertEquals( $this->client->getResponse()->getStatusCode(), BaseClass::HTTP_STATUS_OK, 'can not open news-feed page!');

        // click in goal1 title link
        $link = $crawler->selectLink('Show all')->link();
        $this->client->click($link);

        $this->assertEquals( $this->client->getResponse()->getStatusCode(), BaseClass::HTTP_STATUS_OK, 'can not click link in news-feed page!');
    }
}
