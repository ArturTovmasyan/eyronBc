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
 * @Rest\RouteResource("NewFeed")
 * @Rest\Prefix("/api/v1.0")
 * @Rest\NamePrefix("rest_")
 */
class NewsFeedController extends FOSRestController
{
    /**
     *
     * @ApiDoc(
     *  resource=true,
     *  section="NewFeed",
     *  description="This function is used to get goal",
     *  statusCodes={
     *         200="Returned when goals was returned",
     *  }
     *
     * )
     *
     * @Rest\View(serializerGroups={"new_feed", "goal", "images", "user", "success_story", "comment"})
     * @Security("has_role('ROLE_USER')")
     *
     * @param $first
     * @param $count
     *
     * @return Response
     */
    public function getActivityAction($first, $count)
    {
        $em = $this->getDoctrine()->getManager();
        $this->get('bl_news_feed_service')->updateNewsFeed();

        //If user is logged in then show news feed
        $newsFeed = $em->getRepository('AppBundle:NewFeed')->findNewFeedByCount($this->getUser()->getId(), $first, $count);

        return $newsFeed;
    }
}