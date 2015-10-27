<?php

namespace AppBundle\Tests\Controller;

use Symfony\Component\HttpFoundation\File\UploadedFile;

class GoalControllerTest extends BaseClass
{
    /**
     * This function is used to check goal list
     */
    public function testList()
    {
        // try to open goal list page
        $crawler = $this->client->request('GET', '/goal/list');

        $this->assertEquals( $this->client->getResponse()->getStatusCode(), BaseClass::HTTP_STATUS_OK);

        // Assert that the response content contains a string goal1
        $this->assertContains('goal1', $this->client->getResponse()->getContent());

        // click in goal title link
        $link = $crawler->filter('#row a[id="goalTitle"]')->link();
        $this->client->click($link);

        $this->assertEquals( $this->client->getResponse()->getStatusCode(), BaseClass::HTTP_STATUS_OK);

//search
        // get goal1
        $goal1 = $this->em->getRepository('AppBundle:Goal')->findOneByTitle('goal1');
        // get goal1 Title
        $goal1Title = $goal1->getTitle();

        // try to search goal1
        $this->client->request('GET', '/goal/list?search=' . $goal1Title);

        $this->assertEquals( $this->client->getResponse()->getStatusCode(), BaseClass::HTTP_STATUS_OK);

        // Assert that the response content contains a string goal1
        $this->assertContains('goal1', $this->client->getResponse()->getContent());
    }

    /**
     * This function is used to check goal image
     *
     * @depends testList
     */
    public function testAddImages()
    {
        $oldPhotoPath = __DIR__. '/old_photo.jpg';
        $photoPath = __DIR__. '/photo.jpg';

        // copy photo path
        copy($oldPhotoPath, $photoPath);

        // new uploaded file
        $photo = new UploadedFile(
            $photoPath,
            'photo.jpg',
            'image/jpeg',
            123
        );

        // try to open goal add images page
        $this->client->request(
            'POST',
            '/goal/add-images',
            array(),
            array('file' => $photo)
        );

        $this->assertEquals( $this->client->getResponse()->getStatusCode(), BaseClass::HTTP_STATUS_OK);
    }

    /**
     * This function is used to check goal add page
     *
     * @depends testAddImages
     */
    public function testAdd()
    {
        // try to open goal view page
        $crawler = $this->client->request('GET', '/goal/add');

        $this->assertEquals( $this->client->getResponse()->getStatusCode(), BaseClass::HTTP_STATUS_OK);

        // get file
        $file = $this->em->getRepository('AppBundle:GoalImage')->findOneByFileOriginalName('photo.jpg');
        // get file id
        $fileId = $file->getId();
        // file ids array
        $images =  array($fileId);

        // get form
        $form = $crawler->selectButton('PUBLISH')->form(array(
            'app_bundle_goal[title]' => 'goal2',
            'app_bundle_goal[description]' => 'goalDescription',
            'app_bundle_goal[files]' =>  json_encode($images),
            'app_bundle_goal[videoLink]' => 'www.google.com',
            'app_bundle_goal[status]' => 1,

        ));

        // submit form
        $this->client->submit($form);

        // get goal
        $goal = $this->em->getRepository('AppBundle:Goal')->findOneByTitle('goal2');

        // get goal id
        $id = $goal->getId();

        // Assert that the response is a redirect to goal add-to-me page
        $this->assertTrue(
            $this->client->getResponse()->isRedirect('/goal/add-to-me/' . $id)
        );
    }

    /**
     * This function is used to check goal view page
     *
     * @depends testAdd
     */
    public function testView()
    {
        // get goal
        $goal = $this->em->getRepository('AppBundle:Goal')->findOneByTitle('goal1');

        // get goal id
        $id = $goal->getId();

        // try to open goal view page
        $crawler = $this->client->request('GET', '/goal/view/' . $id);

        $this->assertEquals( $this->client->getResponse()->getStatusCode(), BaseClass::HTTP_STATUS_OK);

        $count = $crawler->filter('html:contains("goal1")');

        $this->assertCount(1, $count);
    }
}
