<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 10/28/15
 * Time: 12:15 PM
 */

namespace AppBundle\Controller\Rest;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;

/**
 * @Rest\RouteResource("NewFeed")
 * @Rest\Prefix("/api/v1.0")
 * @Rest\NamePrefix("rest_")
 */
class NewsFeedController extends FOSRestController
{
    /**
     * @Rest\View(serializerGroups={"new_feed", "goal", "images", "user", "success_story", "comment"})
     * @Security("has_role('ROLE_USER')")
     * @return Response
     */
    public function getAction()
    {
        $em = $this->getDoctrine()->getManager();
        $this->get('bl_news_feed_service')->updateNewsFeed();

        //If user is logged in then show news feed
        $newsFeed = $em->getRepository('AppBundle:NewFeed')->findNewFeed($this->getUser()->getId());

        return $newsFeed;
    }
}