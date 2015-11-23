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
 * @Rest\NamePrefix("rest_")
 */
class NewsFeedController extends FOSRestController
{
    /**
     * @Rest\Get("/news_feed_rest")
     * @Rest\View(serializerGroups={"new_feed", "goal", "images", "user", "success_story", "comment"})
     * @Security("has_role('ROLE_USER')")
     * @return Response
     */
    public function getAction()
    {
        $em = $this->getDoctrine()->getManager();
//        $allLogs = $em->getRepository('AppBundle:Goal')->findNewsFeeds($this->getUser()->getUsername());
        $allLogs = $em->getRepository('Gedmo\\Loggable\\Entity\\LogEntry')->findAll();
        $newsFeed = $this->get('bl_news_feed_service')->getNewsFeed($allLogs);

        return $newsFeed;
    }
}