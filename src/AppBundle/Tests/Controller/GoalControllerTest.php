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

        $this->assertEquals($this->client->getResponse()->getStatusCode(), BaseClass::HTTP_STATUS_OK, 'can not open goal list page!');

        // Assert that the response content contains a string goal1
        $this->assertContains('goal1', $this->client->getResponse()->getContent(), 'can not find goal1!');

        // click in goal title link
        $link = $crawler->filter('#row a[id="goalTitle"]')->link();
        $this->client->click($link);

        $this->assertEquals($this->client->getResponse()->getStatusCode(), BaseClass::HTTP_STATUS_OK, 'can not open goal inner page!');

//search
        // get goal1
        $goal1 = $this->em->getRepository('AppBundle:Goal')->findOneByTitle('goal1');
        // get goal1 Title
        $goal1Title = $goal1->getTitle();

        // try to search goal1
        $this->client->request('GET', '/goal/list?search=' . $goal1Title);

        $this->assertEquals($this->client->getResponse()->getStatusCode(), BaseClass::HTTP_STATUS_OK, 'can not find a goal with this title!');

        // Assert that the response content contains a string goal1
        $this->assertContains('goal1', $this->client->getResponse()->getContent(), 'can not search goal1!');
    }

    /**
     * This function is used to check goal image
     *
     * @depends testList
     */
    public function testAddImages()
    {
        $oldPhotoPath = __DIR__ . '/old_photo.jpg';
        $photoPath = __DIR__ . '/photo.jpg';

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

        $this->assertEquals($this->client->getResponse()->getStatusCode(), BaseClass::HTTP_STATUS_OK, 'can not add goal image!');
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

        $this->assertEquals($this->client->getResponse()->getStatusCode(), BaseClass::HTTP_STATUS_OK, 'can not open goal add page!');

        // get file
        $file = $this->em->getRepository('AppBundle:GoalImage')->findOneByFileOriginalName('photo.jpg');
        // get file id
        $fileId = $file->getId();
        // file ids array
        $images = array($fileId);

        // get form
        $form = $crawler->selectButton('PUBLISH')->form(array(
            'app_bundle_goal[title]' => 'goal2',
            'app_bundle_goal[description]' => 'goalDescription',
            'app_bundle_goal[files]' => json_encode($images),
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
            $this->client->getResponse()->isRedirect('/goal/add-to-me/' . $id, 'can not create a goal!')
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

        $this->assertEquals($this->client->getResponse()->getStatusCode(), BaseClass::HTTP_STATUS_OK, 'can not open goal view page!');

        $count = $crawler->filter('html:contains("goal1")');

        $this->assertCount(1, $count, 'can not find goal1 in goal view page!');
    }

    /**
     * This function is used to check goal inner page
     *
     * @depends testView
     */
    public function testInner()
    {
        // get goal
        $goal = $this->em->getRepository('AppBundle:Goal')->findOneByTitle('goal3');

        // get goal id
        $id = $goal->getId();

        // try to open goal inner page
        $crawler = $this->client->request('GET', '/goal/inner/' . $id);

        $this->assertEquals($this->client->getResponse()->getStatusCode(), BaseClass::HTTP_STATUS_OK, 'can not open goal inner page!');

        $count = $crawler->filter('html:contains("goal3")');

        $this->assertCount(1, $count, 'can not find goal3 in goal inner page!');

// ADD GOAL
        // click in add link
        $link = $crawler->selectLink('ADD')->link();
        $this->client->click($link);

        $this->assertEquals($this->client->getResponse()->getStatusCode(), BaseClass::HTTP_STATUS_OK, 'can not click in ADD link in goal inner page!');

        // try to open goal add-to-me page
        $crawler = $this->client->request('POST', '/goal/add-to-me/' . $id);

        $this->assertEquals($this->client->getResponse()->getStatusCode(), BaseClass::HTTP_STATUS_OK, 'can not open goal add-to-me page!');

        // location array
        $location = array('location' => array('latitude' => 40.1773312, 'longitude' => 44.52747790000001), 'address' => 'Charents St, Yerevan, Armenia');

        // get form
        $form = $crawler->selectButton('DISCOVER MORE')->form(array(
            'app_bundle_user_goal[birthday]' => '10/14/2015',
            'app_bundle_user_goal[location]' => json_encode($location),
            'app_bundle_user_goal[note]' => 'goal note',

        ));

        // submit form
        $this->client->submit($form);

        $this->assertEquals($this->client->getResponse()->getStatusCode(), BaseClass::HTTP_STATUS_REDIRECT, 'can not create user goal in add-to-me page!');
// check user page
        // get user goal
        $userGoal = $this->em->getRepository('AppBundle:UserGoal')->findOneByNote('goal note');

        // check user goal status
        $this->assertEquals($userGoal->getStatus(), BaseClass::ACTIVE, 'user goal status is not active!');

        // try to open goal profile page
        $crawler = $this->client->request('GET', '/user-profile');

        $this->assertEquals($this->client->getResponse()->getStatusCode(), BaseClass::HTTP_STATUS_OK, 'can not open goal profile page!');

        // get user
        $user = $this->em->getRepository('ApplicationUserBundle:User')->findOneByUsername('admin@admin.com');

        // Assert that the response content contains a user first_name
        $this->assertContains($user->getfirstName(), $this->client->getResponse()->getContent(), 'can not find user first name in profile page!');

        // Assert that the response content contains a goal title
        $this->assertContains($goal->getTitle(), $this->client->getResponse()->getContent(), 'can not find goal title in profile page!');
// check done
        // click in done link
        $link = $crawler->filter('#check_status a[id="done"]')->link();
        $this->client->click($link);

        $this->assertEquals($this->client->getResponse()->getStatusCode(), BaseClass::HTTP_STATUS_REDIRECT, 'can not click in DONE link in profile page!');

        $this->em->clear();

        // get user goal
        $userGoal = $this->em->getRepository('AppBundle:UserGoal')->findOneByNote('goal note');

        // check user goal status
        $this->assertEquals($userGoal->getStatus(), BaseClass::COMPLETED, 'user goal status is not COMPLETED!');
// check manage
        // get user goal id
        $userGoalId = $userGoal->getId();

        // try to manage user goal
        $crawler = $this->client->request('GET', '/goal/manage/' . $id . '/' . $userGoalId);

        $this->assertEquals($this->client->getResponse()->getStatusCode(), BaseClass::HTTP_STATUS_OK, 'can not open user goal manage page!');

        // get form
        $form = $crawler->selectButton('Save')->form(array(
            'goal_status' => '1',
            'app_bundle_user_goal[note]' => 'goal note edited',

        ));

        // submit form
        $this->client->submit($form);

        $this->assertEquals($this->client->getResponse()->getStatusCode(), BaseClass::HTTP_STATUS_REDIRECT, 'can not manage user goal!');
// check success story
        // try to open user goal list page
        $crawler = $this->client->request('GET', '/user-profile');

        // click in done link
        $link = $crawler->filter('#check_status a[id="done"]')->link();
        $this->client->click($link);

        $this->assertEquals($this->client->getResponse()->getStatusCode(), BaseClass::HTTP_STATUS_REDIRECT, 'can not click in DONE link in profile page!');

        // try to open user goal list page
        $crawler = $this->client->request('GET', '/user-profile');

        // Assert that the response content contains a 'Success story'
        $this->assertContains('Success story', $this->client->getResponse()->getContent(), 'can not find Success story link in profile page!');

        // click in success story link
        $link = $crawler->filter('#check_status a[id="successtory"]')->link();
        $crawler = $this->client->click($link);

        $this->assertEquals($this->client->getResponse()->getStatusCode(), BaseClass::HTTP_STATUS_OK, 'can not open Success story page!');

        // get form
        $form = $crawler->selectButton('Save')->form(array(
            'app_bundle_success_story_type[story]' => 'about success story',
            'app_bundle_success_story_type[files]' => null,
        ));

        // submit form
        $this->client->submit($form);
        $this->assertEquals($this->client->getResponse()->getStatusCode(), BaseClass::HTTP_STATUS_REDIRECT, 'can not create Success story!');
    }
}
