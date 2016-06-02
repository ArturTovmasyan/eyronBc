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

        //If user is logged in then show news feed
        $newsFeedsQuery = $em->getRepository('AppBundle:NewFeed')->findNewFeed($this->getUser()->getId());

        $paginator  = $this->get('knp_paginator');
        $pagination = $paginator->paginate(
            $newsFeedsQuery,
            $first / $count + 1,
            $count
        );

        $newsFeeds = $pagination->getItems();


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
     * @Rest\Get("/goal-friends", name="app_rest_goal_friends", options={"method_prefix"=false})
     * @ApiDoc(
     *  resource=true,
     *  section="Activity",
     *  description="This function is used to get goal friends",
     *  statusCodes={
     *         200="Returned when goals was returned",
     *  }
     * )
     *
     * @Rest\View(serializerGroups={"user", "tiny_goal"})
     * @Security("has_role('ROLE_USER')")
     *
     * @return array
     */
    public function getGoalFriendsAction()
    {
        $em = $this->getDoctrine()->getManager();

        $goalFriends = $em->getRepository("AppBundle:Goal")->findGoalFriends($this->getUser()->getId(), false);

        $length = count($goalFriends) - 1;

        //keys for random 3 items
        $i = 0;$j = 1;$k = 2;$count = 0;
        $friends = [];
        $friends['length'] = $length + 1;

        if($length > 2){
            $i = rand(0, $length);
            $j = rand(0, $length);
            $k = rand(0, $length);
            while($i == $j || $i == $k || $k == $j){
                $j = rand(0, $length);
                $k = rand(0, $length);
            }
        }

        $liipManager = $this->get('liip_imagine.cache.manager');

        foreach($goalFriends as $goalFriend){

            if($goalFriend->getImagePath()){
                $goalFriend->setCachedImage($liipManager->getBrowserPath($goalFriend->getImagePath(), 'user_icon'));
            }else{
                $name = $goalFriend->getFirstName()[0].$goalFriend->getLastName()[0];
                $goalFriend->setCachedImage($name);
            }

            switch ($count) {
                case $i:
                    $friends[1][] = $goalFriend;
                    break;
                case $j:
                    $friends[1][] = $goalFriend;
                    break;
                case $k:
                    $friends[1][] = $goalFriend;
                    break;
            }
            $count++;

        }

        return $friends;
    }

    /**
     * @Rest\Get("/top-ideas/{count}", requirements={"count"="\d+"}, name="app_rest_top_ideas", options={"method_prefix"=false})
     * @ApiDoc(
     *  resource=true,
     *  section="Activity",
     *  description="This function is used to get top ideas",
     *  statusCodes={
     *         200="Returned when goals was returned",
     *  }
     * )
     *
     * @Rest\View(serializerGroups={"goal", "image_path", "tiny_goal"})
     * @Security("has_role('ROLE_USER')")
     *
     * @param $count
     * @return array
     */
    public function getTopIdeasAction($count)
    {
        $em = $this->getDoctrine()->getManager();

        $topIdeas = $em->getRepository("AppBundle:Goal")->findPopular($this->getUser(), $count);
        $em->getRepository("AppBundle:Goal")->findGoalStateCount($topIdeas);

        $liipManager = $this->get('liip_imagine.cache.manager');
        foreach($topIdeas as $topIdea){

            if($topIdea->getListPhotoDownloadLink()){
                $topIdea->setCachedImage($liipManager->getBrowserPath($topIdea->getListPhotoDownloadLink(), 'goal_list_small'));
            }

        }

        return $topIdeas;
    }
}