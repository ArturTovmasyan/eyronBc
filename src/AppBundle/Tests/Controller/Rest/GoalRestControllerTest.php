<?php
/**
 * Created by PhpStorm.
 * User: armen
 * Date: 11/18/15
 * Time: 3:44 PM
 */
namespace AppBundle\Tests\Controller\Rest;

use AppBundle\Tests\Controller\BaseClass;

class GoalRestControllerTest extends BaseClass
{
    /**
     * This function is used to check Gets function in rest
     */
    public function testGets()
    {
        $this->markTestIncomplete(
            'This test has not been implemented yet.'
        );

        // get goal
        $goal3 = $this->em->getRepository('AppBundle:Goal')->findOneByTitle('goal3');

        // get user goal
        $userGoal =  $this->em->getRepository('AppBundle:UserGoal')->findOneByGoal($goal3);

        $url = sprintf('api/goals/get-by-id/%s', $userGoal->getId());

        // try to get goal by id
        $this->client->request('GET', $url);

        $this->assertEquals($this->client->getResponse()->getStatusCode(), self::HTTP_STATUS_OK, "can not get goal by id in getsAction rest!");

        $this->assertTrue(
            $this->client->getResponse()->headers->contains('Content-Type', 'application/json'),
            $this->client->getResponse()->headers
        );
    }

    /**
     * This function is used to check goal image
     */
    public function testAddImages()
    {
//        $this->markTestIncomplete(
//            'This test has not been implemented yet.'
//        );

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
            '/api/v1.0/goals/add-images/5',
            array(),
            array('file' => $photo)
        );

        $this->assertEquals($this->client->getResponse()->getStatusCode(), BaseClass::HTTP_STATUS_OK, 'can not add goal image!');
    }

}