<?php

namespace AppBundle\Tests\Controller;

use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class GoalControllerTest
 * @package AppBundle\Tests\Controller
 *
 * todo must be added actions : This action not have a route because i'm can't create UI tests .
 *  innerContentAction
 */
class GoalControllerTest extends BaseClass
{
    /**
     * This function is used to check goal list
     */
    public function testList()
    {

        // try to open goal list page
        $crawler = $this->client->request('GET', '/goal/list');

        $this->assertEquals($this->client->getResponse()->getStatusCode(), Response::HTTP_OK, 'can not open goal list page!');

        // Assert that the response content contains a string goal1
        $this->assertContains('goal1', $this->client->getResponse()->getContent(), 'can not find goal1!');

        // click in goal title link
        $link = $crawler->filter('#row a[id="goalTitle"]')->link();
        $this->client->click($link);

        $this->assertEquals($this->client->getResponse()->getStatusCode(), Response::HTTP_OK, 'can not open goal inner page!');

        //search
        // get goal1
        $goal1 = $this->em->getRepository('AppBundle:Goal')->findOneByTitle('goal1');
        // get goal1 Title
        $goal1Title = $goal1->getTitle();

        // try to search goal1
        $this->client->request('GET', '/goal/list?search=' . $goal1Title);

        $this->assertEquals($this->client->getResponse()->getStatusCode(), Response::HTTP_OK, 'can not find a goal with this title!');

        // Assert that the response content contains a string goal1
        $this->assertContains('goal1', $this->client->getResponse()->getContent(), 'can not search goal1!');

        if ($profile = $this->client->getProfile()) {
            // check the number of requests
            $this->assertLessThan(10, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on group list page!");
        }
    }


    /**
     * This function is used to check goal add page
     */
    public function testAdd()
    {
        // try to open goal view page
        $crawler = $this->client->request('GET', '/goal/add');

        $this->assertEquals($this->client->getResponse()->getStatusCode(), Response::HTTP_OK, 'can not open goal add page!');

        // get form
        $form = $crawler->selectButton('btn_publish')->form(array(
            'app_bundle_goal[title]' => 'goal2',
            'app_bundle_goal[description]' => 'goalDescription',
            'app_bundle_goal[files]' => '',
            'app_bundle_goal[status]' => 1,
            'app_bundle_goal[hashTags]' => null,

        ));

        // submit form
        $this->client->submit($form);
        // get goal
        $goal = $this->em->getRepository('AppBundle:Goal')->findOneByTitle('goal2');

        if ($profile = $this->client->getProfile()) {
            // check the number of requests
            $this->assertLessThan(10, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on group list page!");
        }
        // get goal id
       return $goal;
    }

    /**
     * @depends testAdd
     */
    public function testAddToMe($goal)
    {
        // try to open goal view page
        $crawler = $this->client->request('GET', '/goal/add-to-me/'.$goal->getId());
        // check response status code
        $this->assertEquals($this->client->getResponse()->getStatusCode(), Response::HTTP_OK, 'can not open goal add to me!');
        // create location
        $location = array('location' => array('latitude' => 40.1773312, 'longitude' => 44.52747790000001), 'address' => 'Charents St, Yerevan, Armenia');
        // get form and set data
        $form = $crawler->selectButton('btn_save')->form(array(
            'app_bundle_user_goal[birthday]' => '10/14/2015',
            'app_bundle_user_goal[location]' => json_encode($location),
            'app_bundle_user_goal[note]' => 1,
            'test' => true,
            'app_bundle_user_goal[isVisible]' => true

        ));

        // submit form
        $this->client->submit($form);
        // check database request count
        if ($profile = $this->client->getProfile()) {
            // check the number of requests
            $this->assertLessThan(10, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on group list page!");
        }
        // return goal Id
        return $goal->getId();
    }

    /**
     * This function is used to check goal view page
     * @depends testAddToMe
     */
    public function testView($goalId)
    {
        // try to open goal view page
        $crawler = $this->client->request('GET', '/goal/view/' . $goalId);
        // check response status code
        $this->assertEquals($this->client->getResponse()->getStatusCode(), Response::HTTP_OK, 'can not open goal view page!');

        $this->assertEquals(1, $crawler->filter('.inner-content')->count());

        if ($profile = $this->client->getProfile()) {
            // check the number of requests
            $this->assertLessThan(10, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on group list page!");
        }

        return $goalId;
    }


    /**
     * This function is used to check goal showAction page
     * @depends testView
     */
    public function testShow($goalId)
    {
        // try to open goal inner page
        $crawler = $this->client->request('GET', '/goal/' . $goalId);
        // check response status code
        $this->assertEquals($this->client->getResponse()->getStatusCode(), Response::HTTP_OK, 'can not open goal inner page!');

        // check data in page
        $this->assertEquals(1, $crawler->filter('.inner-content')->count());

        if ($profile = $this->client->getProfile()) {
            // check the number of requests
            $this->assertLessThan(10, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on group list page!");
        }

        return $goalId;
    }

    /**
     * @depends testShow
     */
    public function testDone($goalId)
    {
        // open goal Done page
        $this->client->request('GET', '/goal/done/' . $goalId);
        // check response status code
        $this->assertEquals($this->client->getResponse()->getStatusCode(), Response::HTTP_FOUND, 'can not open goal done page!');

        $this->assertTrue(
            $this->client->getResponse()->isRedirect('/user-profile', 'can not create a goal!')
        );
        // check db request count
        if ($profile = $this->client->getProfile()) {
            // check the number of requests
            $this->assertLessThan(10, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on group list page!");
        }

        return $goalId;

    }

    /**
     * This function test draftAction
     * @depends testDone
     */
    public function testDraft($goalId)
    {
        // try to open draft page
        $crawler = $this->client->request('GET', '/goal/drafts');


        $this->assertEquals($this->client->getResponse()->getStatusCode(), Response::HTTP_OK, 'can not open goal inner page!');

        $this->assertEquals(0, $crawler->filter('.col-sm-6 col-md-4')->count());

        if ($profile = $this->client->getProfile()) {
            // check the number of requests
            $this->assertLessThan(10, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on group list page!");
        }

        return $goalId;
    }

    /**
     * @depends testDraft
     */
    public function testAddSuccessStory($goalId)
    {
        // open Add Success Story page
        $this->client->request('GET', '/goal/add-story/' . $goalId);

        // check response status code
        $this->assertEquals($this->client->getResponse()->getStatusCode(), Response::HTTP_OK, 'can not open goal add story page!');
        // check db request count
        if ($profile = $this->client->getProfile()) {
            // check the number of requests
            $this->assertLessThan(10, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on group list page!");
        }

        return $goalId;
    }


    /**
     * test remove goal
     *
     * @depends testAddSuccessStory
     */
    public function testRemoveGoal($goalId)
    {
        // get user id
        $user = $this->em->getRepository('ApplicationUserBundle:User')->findOneByUsername('admin@admin.com');
        // open remove goal page
        $this->client->request('GET', '/goal/remove-goal/'. $goalId .'/' . $user->getId());


        $this->assertEquals($this->client->getResponse()->getStatusCode(), Response::HTTP_FOUND, 'can not open goal remove page!');

        // check db request count
        if ($profile = $this->client->getProfile()) {
            // check the number of requests
            $this->assertLessThan(10, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on group list page!");
        }
    }


    /**
     * @depends testAddSuccessStory
     * test add success story image
     */
    public function testAddSuccessStoryImage()
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

        $this->client->request('POST', '/goal/add-story-images' , array(), array('file' => $photo));

        $this->assertEquals($this->client->getResponse()->getStatusCode(), Response::HTTP_OK, 'can not add goal image!');

        // check db request count
        if ($profile = $this->client->getProfile()) {
            // check the number of requests
            $this->assertLessThan(10, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on group list page!");
        }
    }

    /**
     * @dataProvider fileProvider
     */
    public function testRemoveImage($fileName)
    {
        $this->markTestIncomplete(
            'This test has not been implemented yet.'
        );

        if($fileName)
        {
            $this->client->request('GET', '/goal/remove-image/' . $fileName);

            $this->assertEquals($this->client->getResponse()->getStatusCode(), Response::HTTP_OK, 'can not add goal image!');

            if ($profile = $this->client->getProfile()) {
                // check the number of requests
                $this->assertLessThan(10, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on group list page!");
            }
        }

    }
}
