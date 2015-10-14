<?php

namespace AppBundle\Tests\Controller;

class GoalControllerTest extends BaseClass
{
    /**
     * This function is used to check goal list
     */
    public function testList()
    {
        // try to open goal list page
        $this->client->request('GET', '/goal/list');

        $this->assertEquals( $this->client->getResponse()->getStatusCode(), BaseClass::HTTP_STATUS_OK);

        // Assert that the response content contains a string goal1
        $this->assertContains('goal1', $this->client->getResponse()->getContent());
    }

    /**
     * This function is used to check goal add page
     *
     * @depends testList
     */
    public function testAdd()
    {
        // try to open goal view page
        $crawler = $this->client->request('GET', '/goal/add');

        $this->assertEquals( $this->client->getResponse()->getStatusCode(), BaseClass::HTTP_STATUS_OK);

        // get form
        $form = $crawler->selectButton('PUBLISH')->form(array(
            'app_bundle_goal[title]' => 'goal2',
            'app_bundle_goal[description]' => 'goalDescription',
            'app_bundle_goal[videoLink]' => 'www.google.com',
            'app_bundle_goal[status]' => 1,

        ));

        // submit form
        $this->client->submit($form);

        // get goal
        $goal = $this->em->getRepository('AppBundle:Goal')->findOneByTitle('goal2');

        // get goal id
        $id = $goal->getId();

        // Assert that the response is a redirect to goal view page
        $this->assertTrue(
            $this->client->getResponse()->isRedirect('/goal/view/' . $id)
        );
    }

//    /**
//     * This function is used to check goal view page
//     *
//     * @depends testAdd
//     */
//    public function testView()
//    {
//        // get goal
//        $goal = $this->em->getRepository('AppBundle:Goal')->findOneByTitle('goal1');
//
//        // get goal id
//        $id = $goal->getId();
//
//        // try to open goal view page
//        $crawler = $this->client->request('GET', '/goal/view/' . $id);
//
//        $this->assertEquals( $this->client->getResponse()->getStatusCode(), BaseClass::HTTP_STATUS_OK);
//        dump($this->client->getResponse()->getContent());exit;
//
//        $count = $crawler->filter('html:contains("goal1")');
//
//        $this->assertCount(1, $count);
//    }
}
