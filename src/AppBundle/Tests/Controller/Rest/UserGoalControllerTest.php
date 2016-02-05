<?php
/**
 * Created by PhpStorm.
 * User: tigran
 * Date: 2/5/16
 * Time: 8:54 PM
 */

namespace AppBundle\Tests\Controller\Rest;


use AppBundle\Tests\Controller\BaseClass;
use Symfony\Component\HttpFoundation\Response;

class UserGoalControllerTest extends BaseClass
{
    /**
     * @dataProvider goalProvider
     */
    public function testGet($goalId)
    {

        // GET // /api/v1.0/usergoals/{goal}
        $url = sprintf('/api/v1.0/usergoals/%s', $goalId);

        // try to get news-feed
        $this->client->request('GET', $url);

        $this->assertEquals($this->client->getResponse()->getStatusCode(), Response::HTTP_OK, "can not get news-feed in getAction rest!");

        $this->assertTrue(
            $this->client->getResponse()->headers->contains('Content-Type', 'application/json'),
            $this->client->getResponse()->headers
        );

        if ($profile = $this->client->getProfile()) {
            // check the number of requests
            $this->assertLessThan(10, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on group list page!");
        }
    }

    /**
     * @dataProvider goalProvider
     */
    public function testPut($goalId)
    {

        // PUT /api/v1.0/usergoals/{goal}
        $url = sprintf('/api/v1.0/usergoals/%s', $goalId);

        // try to get news-feed
        $this->client->request('PUT', $url, array('goal_status'=>true, 'is_visible'=>true, 'note'=>'userGoal note',
                                'steps[write step text here]'=>true, "location['address']"=>'Armenia Yerevan',
                                "location['latitude']"=>43.222, "location['longitude']"=>40.44, 'urgent'=>true,
                                'important'=>true, 'do_date'=>'01/01/2016'));

        $this->assertEquals($this->client->getResponse()->getStatusCode(), Response::HTTP_OK, "can not get news-feed in getAction rest!");

        $this->assertTrue(
            $this->client->getResponse()->headers->contains('Content-Type', 'application/json'),
            $this->client->getResponse()->headers
        );

        if ($profile = $this->client->getProfile()) {
            // check the number of requests
            $this->assertLessThan(10, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on group list page!");
        }
    }

}