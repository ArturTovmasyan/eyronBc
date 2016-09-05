<?php
/**
 * Created by PhpStorm.
 * User: gevor
 * Date: 8/31/16
 * Time: 5:11 PM
 */
namespace AppBundle\Services;

use Symfony\Component\DependencyInjection\Container;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;

class SuccessStoryService
{
    protected $container;

    public function __construct(Container $container)
    {
        $this->container = $container;
    }

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
        $userLink = $this->container->get('router')->generate('user_profile', ['user' => $user->getUid()]);
        $body = $this->container->get('translator')->trans('notification.success_story_vote', ['%user%' => $user->showName(), '%profile_link%' => $userLink], null, 'en');
        $this->container->get('bl_notification')->sendNotification($user, $link, $successStory->getGoal()->getId(), $body, $successStory->getUser());

        return new JsonResponse();
    }
}