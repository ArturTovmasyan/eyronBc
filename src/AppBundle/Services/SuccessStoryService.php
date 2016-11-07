<?php
/**
 * Created by PhpStorm.
 * User: gevor
 * Date: 8/31/16
 * Time: 5:11 PM
 */
namespace AppBundle\Services;

use AppBundle\Entity\Goal;
use AppBundle\Entity\SuccessStory;
use Application\UserBundle\Entity\Badge;
use Application\UserBundle\Entity\User;
use Symfony\Component\DependencyInjection\Container;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;

class SuccessStoryService extends AbstractProcessService
{
    /**
     * @var Container
     */
    protected $container;

    /**
     * SuccessStoryService constructor.
     * @param Container $container
     */
    public function __construct(Container $container)
    {
        $this->container = $container;
    }

    /**
     * @param $storyId
     * @param $user
     * @return JsonResponse|Response
     * @throws \Throwable
     */
    public function voteStory($storyId, $user)
    {
        $em = $this->container->get('doctrine')->getManager();
        $successStory = $em->getRepository('AppBundle:SuccessStory')->findStoryWithVotes($storyId);

        if ($successStory->getUser()->getId() == $user->getId()){
            return new Response('', Response::HTTP_BAD_REQUEST);
        }

        if (is_null($successStory)){
            throw new HttpException(Response::HTTP_NOT_FOUND);
        }

        $successStory->addVoter($user);
        $em->flush();

        //Send notification to goal author
        $link = $this->container->get('router')->generate('inner_goal', ['slug' => $successStory->getGoal()->getSlug()]);
        $body = $this->container->get('translator')->trans('notification.success_story_vote', [], null, 'en');
        $this->container->get('bl_notification')->sendNotification($user, $link, $successStory->getGoal()->getId(), $body, $successStory->getUser());

        // get success story author
        $successStoryAuthor = $successStory->getUser();
        // add score for
        $this->runAsProcess('bl.badge.service', 'addScore', array(Badge::TYPE_MOTIVATOR, $successStoryAuthor->getId(), 1));

        return new JsonResponse();
    }

    /**
     * @param $storyId
     * @param $user
     * @return JsonResponse
     */
    public function removeVoteStory($storyId, $user)
    {
        $em = $this->container->get('doctrine')->getManager();
        $successStory = $em->getRepository('AppBundle:SuccessStory')->findStoryWithVotes($storyId);
        if (is_null($successStory)){
            throw new HttpException(Response::HTTP_NOT_FOUND);
        }

        $successStory->removeVoter($user);
        $em->flush();

        // get success story author
        $successStoryAuthor = $successStory->getUser();
        // add score for
        $this->runAsProcess('bl.badge.service', 'removeScore', array(Badge::TYPE_MOTIVATOR, $successStoryAuthor->getId(), 1));

        return new JsonResponse();
    }

    /**
     * @deprecated
     * @param Request $request
     * @param Goal $goal
     * @param User $user
     * @return JsonResponse
     * @throws \Throwable
     */
    public function putSuccessStory(Request $request, Goal $goal, User $user)
    {
        $em = $this->container->get('doctrine')->getManager();
        $validator = $this->container->get('validator');

        // get date from request parameters
        $story = $request->get('story');
        $videoLink = $request->get('videoLink');

        // create new SuccessStory
        $successStory = new SuccessStory();
        $successStory->setVideoLink($videoLink);
        $successStory->setGoal($goal);
        $successStory->setUser($user);
        $successStory->setStory($story);


        $errors = $validator->validate($successStory);
        if(count($errors) > 0) {
            $errorsString = (string)$errors;

            return new JsonResponse("Success Story can't created {$errorsString}", Response::HTTP_BAD_REQUEST);
        }

        $em->persist($successStory);
        $em->flush();

        $this->runAsProcess('bl_story_service', 'sendNotification',
            array($goal->getId(), $user->getId(), $story, true));

        return new JsonResponse($successStory->getId(), Response::HTTP_OK);

    }

    /**
     * @param Request $request
     * @param Goal $goal
     * @param User $user
     * @return JsonResponse
     * @throws \Throwable
     */
    public function putStory(Request $request, Goal $goal, User $user)
    {
        $em = $this->container->get('doctrine')->getManager();
        $this->container->get('bl.doctrine.listener')->disableUserStatsLoading();
        $validator = $this->container->get('validator');

        $content = json_decode($request->getContent());
        if (!isset($content->story)){
            return new JsonResponse("story is empty", Response::HTTP_BAD_REQUEST);
        }
        $story     = $content->story;
        $videoLink = $content->videoLink;
        $videoLink = array_values($videoLink);
        $videoLink = array_filter($videoLink);

        $lastStory = $em->getRepository('AppBundle:SuccessStory')
            ->findUserGoalStory($user->getId(), $goal->getId());

        $imageIds = $content->files;
        if (count($lastStory) == 0){
            $successStory = new SuccessStory();
            $successStory->setGoal($goal);
            $successStory->setUser($user);
            $isNew = true;
        }
        else {
            $isNew = false;
            $successStory = $lastStory[0];
            foreach($successStory->getFiles() as $file){
                if (!in_array($file->getId(), $imageIds)){
                    $em->remove($file);
                    $successStory->removeFile($file);
                }
            }
        }

        $successStory->setVideoLink($videoLink);
        $successStory->setStory($story);

        if($imageIds){

            $imageIds = array_unique($imageIds);
            $storyImages = $em->getRepository('AppBundle:StoryImage')->findByIDs($imageIds);

            if(count($storyImages) != 0){
                foreach($storyImages as $storyImage){
                    $successStory->addFile($storyImage);
                }
            }
        }

        $errors = $validator->validate($successStory);
        if(count($errors) > 0) {
            $errorsString = (string)$errors;

            return new JsonResponse("Success Story can't created {$errorsString}", Response::HTTP_BAD_REQUEST);
        }

        $em->persist($successStory);
        $em->flush();

        $this->runAsProcess('bl_story_service', 'sendNotification',
            array($goal->getId(), $user->getId(), $story, $isNew));

        return new JsonResponse($successStory->getId(), Response::HTTP_OK);

    }


    /**
     * @param $goalId
     * @param $userId
     * @param $story
     * @param $isNew
     * @throws \Throwable
     */
    public function sendNotification($goalId, $userId, $story, $isNew)
    {
        $em = $this->container->get('doctrine')->getManager();
        $goal = $em->getRepository("AppBundle:Goal")->find($goalId);
        $user = $em->getRepository("ApplicationUserBundle:User")->find($userId);

        $this->container->get('bl.doctrine.listener')->disableUserStatsLoading();
        $importantAddedUsers = $em->getRepository('AppBundle:Goal')->findImportantAddedUsers($goal->getId());
        $link = $this->container->get('router')->generate('inner_goal', ['slug' => $goal->getSlug()]);
        $body = $this->container->get('translator')->trans('notification.important_goal_success_story', [], null, 'en');
        $this->container->get('bl_notification')->sendNotification($user, $link, $goal->getId(), $body, $importantAddedUsers);

        //check if goal author not admin and not null
        if($goal->hasAuthorForNotify($user->getId()) && $isNew) {
            $this->container->get('user_notify')->sendNotifyAboutNewSuccessStory($goal, $user, $story);

            //Send notification to goal author
            $body = $this->container->get('translator')->trans('notification.success_story', [], null, 'en');
            $this->container->get('bl_notification')->sendNotification($user, $link, $goal->getId(), $body, $goal->getAuthor());
        }
    }
}