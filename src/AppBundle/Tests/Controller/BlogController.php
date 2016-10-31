<?php

namespace AppBundle\Tests\Controller;


use Symfony\Component\HttpFoundation\Response;

class BlogControllerTest extends BaseClass
{

    /**
     * 
     */
    public function testBlogList()
    {
        // try to open goal view page
        $crawler = $this->client->request('GET', '/blog');

        $this->assertEquals($this->client->getResponse()->getStatusCode(), Response::HTTP_OK, 'can not open goal view page!');

        if ($profile = $this->client->getProfile()) {
            // check the number of requests
            $this->assertLessThan(10, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on group list page!");
        }
    }

    /**
     *
     */
    public function testBlogShow()
    {
        $blog = $this->em->getRepository('AppBundle:Blog')->findOneBy(['title' => 'NEW BLOG']);
        $slug = $blog->getSlug();

        $url = sprintf('/%s', $slug);

        // try to open goal view page
        $crawler = $this->client->request('GET', $url);

        $this->assertEquals($this->client->getResponse()->getStatusCode(), Response::HTTP_OK, 'can not open goal view page!');

        if ($profile = $this->client->getProfile()) {
            // check the number of requests
            $this->assertLessThan(10, $profile->getCollector('db')->getQueryCount(), "number of requests are much more greater than needed on group list page!");
        }

    }
}