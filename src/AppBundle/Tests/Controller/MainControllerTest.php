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
        // count goals
        $countGoals1 = count($crawler->filter('#main_row1 a[id="main_goalTitle1"]'));
        $this->assertEquals(2, $countGoals1);

        // get goal2
        $goal2 = $this->em->getRepository('AppBundle:Goal')->findOneByTitle('goal2');

        // check is exist goal 2
        if ($goal2) {
            $countGoals2 = count($crawler->filter('#main_row2 a[id="main_goalTitle2"]'));
            $this->assertEquals(1, $countGoals2);
        }

        // click in goal1 title link
        $link = $crawler->filter('#main_row1 a[id="main_goalTitle1"]')->eq(0)->link();
        $this->client->click($link);

        $this->assertEquals( $this->client->getResponse()->getStatusCode(), BaseClass::HTTP_STATUS_OK);

        $crawler = $this->client->back();

        // click in goal3 title link
        $link = $crawler->filter('#main_row1 a[id="main_goalTitle1"]')->eq(1)->link();
        $this->client->click($link);

        $this->assertEquals( $this->client->getResponse()->getStatusCode(), BaseClass::HTTP_STATUS_OK);

        // check is exist goal 2
        if ($goal2) {
            $crawler = $this->client->back();

            // click in goal2 title link
            $link = $crawler->filter('#main_row2 a[id="main_goalTitle2"]')->link();
            $this->client->click($link);

            $this->assertEquals( $this->client->getResponse()->getStatusCode(), BaseClass::HTTP_STATUS_OK);
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

        $this->assertEquals( $this->client->getResponse()->getStatusCode(), BaseClass::HTTP_STATUS_OK);
    }
}
