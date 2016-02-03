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
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;

/**
 * @Rest\RouteResource("Activity")
 * @Rest\Prefix("/api/v1.0")
 */
class NewsFeedController extends FOSRestController
{
    /**
     * @Rest\Get("/activities/{first}/{count}", requirements={"first"="\d+", "count"="\d+"}, name="app_rest_newsfeed_get", options={"method_prefix"=false})
     * @ApiDoc(
     *  resource=true,
     *  section="Activity",
     *  description="This function is used to get goal",
     *  statusCodes={
     *         200="Returned when goals was returned",
     *  }
     *
     * )
     *
     * @Rest\View(serializerGroups={"new_feed", "goal", "images", "user", "success_story", "comment"})
     *
     * @param $first
     * @param $count
     *
     * @return Response
     */
    public function getAction($first, $count)
    {
        if (!$this->getUser()){
            return new Response('User not found', Response::HTTP_UNAUTHORIZED);
        }

        $em = $this->getDoctrine()->getManager();
        $this->get('bl_news_feed_service')->updateNewsFeed();

        //If user is logged in then show news feed
        $newsFeed = $em->getRepository('AppBundle:NewFeed')->findNewFeedByCount($this->getUser()->getId());

        if (is_numeric($first) && is_numeric($count)) {
            $newsFeed = array_slice($newsFeed, $first, $count);
        }
        return $newsFeed;
    }
}