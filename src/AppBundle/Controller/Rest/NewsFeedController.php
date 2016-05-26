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
use Symfony\Component\HttpFoundation\JsonResponse;

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
     * @Rest\View(serializerGroups={"new_feed", "tiny_goal", "images", "tiny_user", "successStory", "comment", "successStory_storyImage", "storyImage"})
     * @Security("has_role('ROLE_USER')")
     *
     * @param $first
     * @param $count
     *
     * @return Response
     */
    public function getAction($first, $count)
    {
        $this->container->get('bl.doctrine.listener')->disableUserStatsLoading();
        $em = $this->getDoctrine()->getManager();
        $this->get('bl_news_feed_service')->updateNewsFeed();

        //If user is logged in then show news feed
        $newsFeeds = $em->getRepository('AppBundle:NewFeed')->findNewFeedByCount($this->getUser()->getId());

        if (is_numeric($first) && is_numeric($count)) {
            $newsFeeds = array_slice($newsFeeds, $first, $count);
        }

        $goalIds = [];
        foreach($newsFeeds as $newsFeed){
            $goalIds[$newsFeed->getGoal()->getId()] = 1;
        }

        $stats = $em->getRepository("AppBundle:Goal")->findGoalStateCount($goalIds, true);

        foreach($newsFeeds as $newsFeed){
            $newsFeed->getGoal()->setStats([
                'listedBy' => $stats[$newsFeed->getGoal()->getId()]['listedBy'],
                'doneBy'   => $stats[$newsFeed->getGoal()->getId()]['doneBy'],
            ]);
        }

        $liipManager = $this->get('liip_imagine.cache.manager');
        foreach($newsFeeds as $newsFeed){
            $newsFeed->getGoal()->setCachedImage($liipManager->getBrowserPath($newsFeed->getGoal()->getListPhotoDownloadLink(), 'goal_list_horizontal'));
        }

        return $newsFeeds;
    }

    /**
     * @Rest\Get("/goal-friends/{id}", requirements={"id"="\d+"}, name="app_rest_goal_friends", options={"method_prefix"=false})
     * @ApiDoc(
     *  resource=true,
     *  section="Activity",
     *  description="This function is used to get goal friends",
     *  statusCodes={
     *         200="Returned when goals was returned",
     *  }
     * )
     *
     * @Rest\View(serializerGroups={"user"})
     * @Security("has_role('ROLE_USER')")
     *
     * @param $id
     * @return array
     */
    public function getGoalFriendsAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $goalFriends = $em->getRepository("AppBundle:Goal")->findGoalFriends($id, false);

//        foreach($newsFeeds as $newsFeed){
//            $newsFeed->getGoal()->setStats([
//                'listedBy' => $stats[$newsFeed->getGoal()->getId()]['listedBy'],
//                'doneBy'   => $stats[$newsFeed->getGoal()->getId()]['doneBy'],
//            ]);
//        }

//        $liipManager = $this->get('liip_imagine.cache.manager');
//        foreach($newsFeeds as $newsFeed){
//            $newsFeed->getGoal()->setCachedImage($liipManager->getBrowserPath($newsFeed->getGoal()->getListPhotoDownloadLink(), 'goal_list_horizontal'));
//        }

        return $goalFriends;
    }
}