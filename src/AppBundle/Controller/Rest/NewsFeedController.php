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
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * @Rest\RouteResource("Activity")
 */
class NewsFeedController extends FOSRestController
{

    /**
     * @Rest\Get("/api/v2.0/activities/{first}/{count}", requirements={"first"="\d+", "count"="\d+"}, name="app_rest_newsfeed_get", options={"method_prefix"=false})
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
     * @Rest\View(serializerGroups={"new_feed", "tiny_goal", "images", "tiny_user", "successStory", "comment", "successStory_storyImage", "storyImage"})
     * @Security("has_role('ROLE_USER')")
     *
     * @param $first
     * @param $count
     * @param $request
     *
     * @return Response
     */
    public function getAction($first, $count, Request $request)
    {
        $this->container->get('bl.doctrine.listener')->disableUserStatsLoading();
        $em = $this->getDoctrine()->getManager();

        $lastId = $request->query->get('id', null);

        //If user is logged in then show news feed
        $newsFeeds = $em->getRepository('AppBundle:NewFeed')->findNewFeed($this->getUser()->getId(), null, $first, $count, $lastId);

        $liipManager = $this->get('liip_imagine.cache.manager');
        foreach($newsFeeds as $newsFeed){
            /** @var  $newsFeed \AppBundle\Entity\NewFeed */
            try {
                $newsFeed->getGoal()->setCachedImage($liipManager->getBrowserPath($newsFeed->getGoal()->getListPhotoDownloadLink(), 'goal_list_horizontal'));
            } catch (\Exception $e){
                $newsFeed->getGoal()->setCachedImage("");
            }

            try {
                $newsFeed->getUser()->setCachedImage($liipManager->getBrowserPath($newsFeed->getUser()->getImagePath(), 'user_icon'));
            } catch (\Exception $e){
                $newsFeed->getUser()->setCachedImage("");
            }
        }

        return $newsFeeds;
    }

    /**
     * @Rest\Get("/api/v1.0/activities/{first}/{count}", requirements={"first"="\d+", "count"="\d+"}, name="app_rest_newsfeed_get", options={"method_prefix"=false})
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
     * @Rest\View(serializerGroups={"new_feed", "tiny_goal", "images", "tiny_user", "successStory", "comment", "successStory_storyImage", "storyImage"})
     * @Security("has_role('ROLE_USER')")
     *
     * @param $first
     * @param $count
     * @param $request
     *
     * @return Response
     */
    public function getOldAction($first, $count, Request $request)
    {
        $this->container->get('bl.doctrine.listener')->disableUserStatsLoading();
        $em = $this->getDoctrine()->getManager();

        $lastId = $request->query->get('id', null);

        //If user is logged in then show news feed
        $newsFeeds = $em->getRepository('AppBundle:NewFeed')->findNewFeed($this->getUser()->getId(), null, $first, $count, $lastId);

        $liipManager = $this->get('liip_imagine.cache.manager');
        foreach($newsFeeds as $newsFeed){
            /** @var  $newsFeed \AppBundle\Entity\NewFeed */
            try {
                $newsFeed->getGoal()->setCachedImage($liipManager->getBrowserPath($newsFeed->getGoal()->getListPhotoDownloadLink(), 'goal_list_horizontal'));
            } catch (\Exception $e){
                $newsFeed->getGoal()->setCachedImage("");
            }

            try {
                $newsFeed->getUser()->setCachedImage($liipManager->getBrowserPath($newsFeed->getUser()->getImagePath(), 'user_icon'));
            } catch (\Exception $e){
                $newsFeed->getUser()->setCachedImage("");
            }
        }

        return $newsFeeds;
    }
}