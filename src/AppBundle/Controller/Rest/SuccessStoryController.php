<?php
/**
 * Created by PhpStorm.
 * User: andranik
 * Date: 6/27/16
 * Time: 6:20 PM
 */
namespace AppBundle\Controller\Rest;

use AppBundle\Entity\Goal;
use AppBundle\Entity\StoryImage;
use AppBundle\Entity\SuccessStory;
use Application\UserBundle\Entity\User;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * @Rest\RouteResource("Goal")
 * @Rest\Prefix("/api/v1.0")
 */
class SuccessStoryController extends FOSRestController
{
    /**
     * This function create success story.
     *
     * @ApiDoc(
     *  resource=true,
     *  section="Goal",
     *  description="This function success story by goal",
     *  statusCodes={
     *         200="Returned when created",
     *         400="Return when content not correct",
     *         401="Return when user not found",
     *         404="Return when goal by goalId not found",
     *     },
     *  parameters={
     *      {"name"="story", "dataType"="text", "required"=true, "description"="story body"},
     *      {"name"="videoLink[0]", "dataType"="string", "required"=false, "description"="video link"},
     * }
     * )
     *
     * @Security("has_role('ROLE_USER')")
     * @ParamConverter("goal", class="AppBundle:Goal", options={"repository_method" = "findGoalWithAuthor"})
     *
     * @param Goal $goal
     * @param Request $request
     * @return JsonResponse|Response
     * @deprecated
     * TODO will be changed after mobile changes
     */
    public function putSuccessstoryAction(Goal $goal, Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $validator = $this->container->get('validator');

        // get date from request parameters
        $story = $request->get('story');
        $videoLink = $request->get('videoLink');

        // create new SuccessStory
        $successStory = new SuccessStory();
        $successStory->setVideoLink($videoLink);
        $successStory->setGoal($goal);
        $successStory->setUser($this->getUser());
        $successStory->setStory($story);


        $errors = $validator->validate($successStory);
        if(count($errors) > 0) {
            $errorsString = (string)$errors;

            return new JsonResponse("Success Story can't created {$errorsString}", Response::HTTP_BAD_REQUEST);
        }

        //check if goal author not admin and not null
        if($goal->hasAuthorForNotify($this->getUser()->getId())) {
            //send success story notify
            $this->container->get('user_notify')->sendNotifyAboutNewSuccessStory($goal, $this->getUser(), $story);
        }

        $em->persist($successStory);
        $em->flush();

        return new JsonResponse($successStory->getId(), Response::HTTP_OK);
    }


    /**
     * TODO: Will be change all to this
     *
     * @ApiDoc(
     *  resource=true,
     *  section="Goal",
     *  description="This function create/edit success story",
     *  statusCodes={
     *         200="Returned when created",
     *         400="Return when content not correct",
     *         401="Return when user not found",
     *         404="Return when goal by goalId not found",
     *     },
     *  parameters={
     *      {"name"="story", "dataType"="text", "required"=true, "description"="story body"},
     *      {"name"="videoLink[0]", "dataType"="string", "required"=false, "description"="video link"},
     * }
     * )
     *
     * @Security("has_role('ROLE_USER')")
     * @ParamConverter("goal", class="AppBundle:Goal", options={"repository_method" = "findGoalWithAuthor"})
     *
     * @param Goal $goal
     * @param Request $request
     * @return JsonResponse|Response
     */
    public function putStoryAction(Goal $goal, Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $validator = $this->container->get('validator');

        $content = json_decode($request->getContent());
        if (!isset($content->story)){
            return new JsonResponse("story is empty", Response::HTTP_BAD_REQUEST);
        }

        $story     = $content->story;
        $videoLink = $content->videoLink;
        $videoLink = array_values($videoLink);
        $videoLink = array_filter($videoLink);

        $lastStory = $em->getRepository('AppBundle:SuccessStory')->findUserGoalStory($this->getUser()->getId(), $goal->getId());

        $imageIds = $content->files;
        if (count($lastStory) == 0){
            $successStory = new SuccessStory();
            $successStory->setGoal($goal);
            $successStory->setUser($this->getUser());
        }
        else {
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

        //check if goal author not admin and not null
        if($goal->hasAuthorForNotify($this->getUser()->getId()) && is_null($successStory->getId())) {
            $this->container->get('user_notify')->sendNotifyAboutNewSuccessStory($goal, $this->getUser(), $story);
        }

        $em->persist($successStory);
        $em->flush();



        return new JsonResponse($successStory->getId(), Response::HTTP_OK);
    }

    /**
     * @ApiDoc(
     *  resource=true,
     *  section="Goal",
     *  description="This action is used for upload image for a success story",
     *  statusCodes={
     *         200="Returned when image was uploaded",
     *         400="Returned when there are validation error",
     *         403="Returned when adding image to success story which author isn't current user",
     *         404="Returned when there aren't file, or success story not found",
     *  },
     *  parameters={
     *      {"name"="file", "dataType"="file", "required"=false, "description"="Goal's images"},
     *      {"name"="id", "dataType"="integer", "required"=true, "description"="Success story id"},
     *      {"name"="userId", "dataType"="integer", "required"=true, "description"="User id"},
     *  }
     * )
     * )
     *
     * @Rest\Post("/success-story/{id}/add-images/{userId}", requirements={"id"="\d+", "userId"="\d+"}, name="app_rest_success_story_addimages", options={"method_prefix"=false})
     * @Rest\Post("/success-story/add-images")
     * @ParamConverter("user", class="ApplicationUserBundle:User", options={"mapping" = {"userId" = "id"}})
     * @ParamConverter("successStory", class="AppBundle:SuccessStory", options={"mapping" = {"id" = "id"}})
     * @param $successStory
     * @param $user
     * @param Request $request
     * @return JsonResponse
     * @Rest\View()
     */
    public function addSuccessStoryImagesAction(Request $request, SuccessStory $successStory = null, User $user = null)
    {
        $em = $this->getDoctrine()->getManager();

        if (is_null($user)){
            $user = $this->getUser();
            if (is_null($user) || !is_object($user)){
                return new Response("there aren't any user", Response::HTTP_FORBIDDEN);
            }
        }

        if (!is_null($successStory)){
            $this->denyAccessUnlessGranted('edit', $successStory, $this->get('translator')->trans('success_story.edit_access_denied'));
        }

        $file = $request->files->get('file');

        if (is_null($file)) {
            return new Response('', Response::HTTP_NOT_FOUND);
        }

        $storyImage = new StoryImage();
        $storyImage->setFile($file);

        if (!is_null($successStory)){
            $storyImage->setStory($successStory);
            $successStory->addFile($storyImage);
        }

        $validator = $this->get('validator');
        $error = $validator->validate($storyImage, null, null);

        if (count($error) > 0) {
            return new JsonResponse($error[0]->getMessage(), Response::HTTP_BAD_REQUEST);
        }

        $this->get('bl_service')->uploadFile($storyImage);

        $em->persist($storyImage);
        $em->flush();

        return $storyImage->getId();
    }

    /**
     * @ApiDoc(
     *  resource=true,
     *  section="Goal",
     *  description="This action is used to get goal success story by current user",
     *  statusCodes={
     *         200="Returned when return success story",
     *         404="Returned when goal not found",
     *  },
     * )
     *
     * @Rest\Get("/story/{id}", requirements={"id"="\d+"}, name="app_rest_goal_getsuccessstory", options={"method_prefix"=false})
     * @ParamConverter("goal", class="AppBundle:Goal", options={"repository_method" = "findGoalWithAuthor"})
     * @Rest\View(serializerGroups={"tiny_goal", "goal_author", "tiny_user", "successStory", "successStory_storyImage", "goal_description", "storyImage", "image"})
     *
     * @param Goal $goal
     * @return array
     */
    public function getSuccessStoryAction(Goal $goal)
    {
//        $this->denyAccessUnlessGranted('view', $goal, $this->get('translator')->trans('goal.view_access_denied'));

        $em = $this->getDoctrine()->getManager();
        $story = $em->getRepository('AppBundle:SuccessStory')->findUserGoalStory($this->getUser()->getId(), $goal->getId());

        $em->getRepository("AppBundle:Goal")->findGoalStateCount($goal);

        $liipManager = $this->get('liip_imagine.cache.manager');
        if ($goal->getListPhotoDownloadLink()) {
            $goal->setCachedImage($liipManager->getBrowserPath($goal->getListPhotoDownloadLink(), 'goal_list_big'));
        }

        return [
            'goal' => $goal,
            'story' => count($story) ? $story[0] : null
        ];
    }

}