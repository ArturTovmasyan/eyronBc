<?php
/**
 * Created by PhpStorm.
 * User: andranik
 * Date: 1/25/16
 * Time: 5:46 PM
 */
namespace AppBundle\Controller\Rest;

use AppBundle\Entity\Goal;
use AppBundle\Entity\GoalImage;
use AppBundle\Entity\SuccessStory;
use Application\CommentBundle\Entity\Comment;
use Application\CommentBundle\Entity\Thread;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\SerializerBuilder;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;

/**
 * @Rest\RouteResource("Goal")
 * @Rest\Prefix("/api/v1.0")
 */
class GoalController extends FOSRestController
{
    /**
     * @Rest\Get("/goals/{first}/{count}", requirements={"first"="\d+", "count"="\d+"}, name="app_rest_goal_getall", options={"method_prefix"=false})
     * @ApiDoc(
     *  resource=true,
     *  section="Goal",
     *  description="This function is used to get goal",
     *  statusCodes={
     *         200="Returned when goals was returned",
     *  },
     *  parameters={
     *      {"name"="category", "dataType"="string", "required"=false, "description"="Goals category slug"},
     *      {"name"="search", "dataType"="string", "required"=false, "description"="search data"}
     *  }
     *
     *
     * )
     *
     * @param int $first
     * @param int $count
     * @param Request $request
     * @return mixed
     * @Rest\View(serializerGroups={"tiny_goal"})
     */
    public function getAllAction($first, $count, Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $category = $request->get('category');
        $search = $request->get('search');

        $goals = $em->getRepository("AppBundle:Goal")->findAllByCategory($category, $search, $first, $count);
        $em->getRepository("AppBundle:Goal")->findGoalStateCount($goals);

        $goals = array_values($goals);

        return  $goals;
    }

    /**
     * @ApiDoc(
     *  resource=true,
     *  section="Goal",
     *  description="This function is used to get goal by id",
     *  statusCodes={
     *         200="Returned when goal was found",
     *         404="Returned when goal was not found",
     *  },
     * )
     *
     * @Rest\View(serializerGroups={"goal", "goal_image", "image", "goal_author", "tiny_user",
     *                              "goal_successStory", "successStory", "successStory_user", "successStory_storyImage",
     *                              "successStory_user", "tiny_user", "storyImage", "comment", "comment_author"})
     *
     * @param $id
     * @return Goal|null|object|Response
     */
    public function getAction($id)
    {
        $em = $this->getDoctrine()->getManager();
        $goal = $em->getRepository('AppBundle:Goal')->findWithRelations($id);
        $em->getRepository("AppBundle:Goal")->findGoalStateCount($goal);
        $shareLink = $this->generateUrl('inner_goal', array('id' => $id));
        $goal->setShareLink($shareLink);

        $goalComments = $em->getRepository('ApplicationCommentBundle:Comment')->findThreadComments($id);

        if ((!$goal->getLat() || !$goal->getLng()) && $this->getUser()){
            $userGoals = $this->getUser()->getUserGoal();

            if($userGoals->count() > 0) {
                $userGoalsArray = $userGoals->toArray();
                if (array_key_exists($id, $userGoalsArray)) {
                    $userGoal = $userGoalsArray[$id];
                    $goal->setLat($userGoal->getLat());
                    $goal->setLng($userGoal->getLng());
                }
            }
        }

        if (!$goal){
            return new Response('Goal not found', Response::HTTP_NOT_FOUND);
        }

        return [
            'goal'     => $goal,
            'comments' => $goalComments
        ];
    }

    /**
     * @ApiDoc(
     *  resource=true,
     *  section="Goal",
     *  description="This function is used to get all categories",
     *  statusCodes={
     *         200="Returned when goals was returned",
     *  },
     * )
     *
     * @Rest\View(serializerGroups={"category"})
     */
    public function getCategoriesAction()
    {
        $em = $this->getDoctrine()->getManager();
        $categories  = $em->getRepository('AppBundle:Category')->findAll();

        return $categories;
    }

    /**
     * @ApiDoc(
     *  resource=true,
     *  section="Goal",
     *  description="This function is used to create a goal",
     *  statusCodes={
     *         200="Returned when goals was returned",
     *         404="Returned when goal was not found",
     *  },
     *  parameters={
     *      {"name"="is_public", "dataType"="boolean", "required"=true, "description"="Goal's status"},
     *      {"name"="title", "dataType"="string", "required"=true, "description"="Goal's title"},
     *      {"name"="description", "dataType"="string", "required"=false, "description"="Goal's description"},
     *      {"name"="video_links[0]", "dataType"="string", "required"=false, "description"="Goal's video links"}
     *  }
     * )
     *
     * @param Request $request
     * @param $id
     * @return mixed
     * @Rest\Put("/goals/{id}", defaults={"id"=null}, requirements={"id"="\d+"}, name="app_rest_goal_put", options={"method_prefix"=false})
     * @Rest\View()
     */
    public function putAction(Request $request, $id = null)
    {
        if (!$this->getUser()){
            return new Response('User not found', Response::HTTP_UNAUTHORIZED);
        }

        $em = $this->getDoctrine()->getManager();
        $data = $request->request->all();

        if ($id){
            $goal = $em->getRepository('AppBundle:Goal')->find($id);
            if (!$goal){
                return new Response("Goal wasn't found", Response::HTTP_NOT_FOUND);
            }
        }
        else {
            $goal = new Goal();
        }

        $goal->setStatus(array_key_exists('is_public', $data) && $data['is_public']  ? Goal::PUBLIC_PRIVACY : Goal::PRIVATE_PRIVACY);
        $goal->setTitle(array_key_exists('title', $data) ? $data['title'] : null);
        $goal->setDescription(array_key_exists('description', $data) ? $data['description'] : null);
        $goal->setVideoLink(array_key_exists('video_links', $data) ? $data['video_links'] : null);
        $goal->setReadinessStatus(Goal::DRAFT);
        $goal->setAuthor($this->getUser());

        $validator = $this->get('validator');
        $error = $validator->validate($goal, null, array('goal'));

        if(count($error) > 0){
            return new JsonResponse($error[0]->getMessage(), Response::HTTP_BAD_REQUEST);
        }

        $em->persist($goal);
        $em->flush();

        return array('goalId' => $goal->getId());
    }

    /**
     * @ApiDoc(
     *  resource=true,
     *  section="Goal",
     *  description="This action is used for upload image for a goal",
     *  statusCodes={
     *         200="Returned when image was uploaded",
     *         400="Returned when there are validation error",
     *         403="Returned when adding image to goal which author isn't current user",
     *         404="Returned when there aren't file, or goal not found",
     *  },
     *  parameters={
     *      {"name"="file", "dataType"="file", "required"=false, "description"="Goal's images"}
     *  }
     * )
     *
     * @Rest\Post("/goals/add-images/{id}", defaults={"id"=null}, requirements={"id"="\d+"}, name="app_rest_goal_addimages", options={"method_prefix"=false})
     * @param $id
     * @param Request $request
     * @return JsonResponse
     * @Rest\View()
     */
    public function addImagesAction($id = null, Request $request)
    {
        // get entity manager
        $em = $this->getDoctrine()->getManager();

        if (!$this->getUser()){
            return new Response('User not found', Response::HTTP_UNAUTHORIZED);
        }

        if ($id){
            $goal = $em->getRepository('AppBundle:Goal')->find($id);
            if (!$goal){
                return new Response('Goal not found', Response::HTTP_NOT_FOUND);
            }

            if ($this->getUser() != $goal->getAuthor()){
                return new Response("Goal isn't a goal of current user", Response::HTTP_FORBIDDEN);
            }
        }

        // get all files form request
        $file = $request->files->get('file');

        // check file
        if($file){

            // get bucket list service
            $bucketService = $this->get('bl_service');

            // create new goal image object
            $goalImage = new GoalImage();
            $goalImage->setFile($file);

            // validate goal image
            $validator = $this->get('validator');
            $error = $validator->validate($goalImage, null, array('goal'));

            if(count($error) > 0){
                return new JsonResponse($error[0]->getMessage(), Response::HTTP_BAD_REQUEST);
            }
            else { // upload image id there is no error

                // upload file
                $bucketService->uploadFile($goalImage);

                if (isset($goal)){
                    $images = $goal->getImages();

                    if($images->count() == 0) {
                        $blService = $this->container->get('bl_service');
                        $goalImage->setList(true);
                        $goalImage->setCover(true);
                        $blService->generateFileForCover($goalImage);
                        $blService->generateFileForList($goalImage);
                    }

                    $goalImage->setGoal($goal);
                    $goal->addImage($goalImage);
                }

                $em->persist($goalImage);
                $em->flush();
            }

            return $goalImage->getId();
        }

        return new Response('', Response::HTTP_NOT_FOUND);
    }

    /**
     * @ApiDoc(
     *  resource=true,
     *  section="Goal",
     *  description="This function is used to remove goal image",
     *  statusCodes={
     *         200="Returned when image was removed",
     *         400="Returned when image hasn't goal or it's goal isn't current user's goal",
     *         404="Returned when goalImage not found",
     *  },
     * )
     *
     * @Rest\Post("/goals/remove-images/{id}", requirements={"id"="\d+"}, name="app_rest_goal_removeimage", options={"method_prefix"=false})
     *
     * @param GoalImage $goalImage
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function removeImageAction(GoalImage $goalImage)
    {
        if (!$this->getUser()){
            return new Response('User not found', Response::HTTP_UNAUTHORIZED);
        }

        if(!$goalImage->getGoal() || $this->getUser()->getId() != $goalImage->getGoal()->getAuthor()->getId()){
            return new Response("Goal image hasn't goal or it isn't an image of current user", Response::HTTP_BAD_REQUEST);
        }

        $em = $this->getDoctrine()->getManager();
        $em->remove($goalImage);
        $em->flush();

        return new Response('', Response::HTTP_OK);
    }

    /**
     * @ApiDoc(
     *  resource=true,
     *  section="Goal",
     *  description="This function is used to get user draft goals",
     *  statusCodes={
     *         200="Returned when goals was returned",
     *  },
     * )
     *
     * @Rest\View(serializerGroups={"goal_draft"})
     *
     * @Rest\Get("/goals/drafts/{first}/{count}", requirements={"first"="\d+", "count"="\d+"}, name="app_rest_goal_getdrafts", options={"method_prefix"=false})
     *
     * @param $first
     * @param $count
     * @return array
     */
    public function getDraftsAction($first, $count)
    {
        if (!$this->getUser()){
            return new Response('User not found', Response::HTTP_UNAUTHORIZED);
        }

        $em = $this->getDoctrine()->getManager();

        // find all drafts goal
        $draftGoals = $em->getRepository("AppBundle:Goal")->findMyDrafts($this->getUser());

        if (is_numeric($first) && is_numeric($count)) {
            $draftGoals = array_slice($draftGoals, $first, $count);
        }

        return $draftGoals;
    }

    /**
     * @ApiDoc(
     *  resource=true,
     *  section="Goal",
     *  description="This function is used to get user goal friends",
     *  statusCodes={
     *         200="Returned when goals was returned",
     *  },
     * )
     * @Rest\View(serializerGroups={"user"})
     * @return array
     */
    public function getFriendsAction(Request $request, $first, $count)
    {
        if (!$this->getUser()){
            return new Response('User not found', Response::HTTP_UNAUTHORIZED);
        }

        // check search data
        $search = $request->get('search') ? $request->get('search') : null;
        // get entity manager
        $em = $this->getDoctrine()->getManager();
        // get goal friends
        $goalFriends = $em->getRepository('AppBundle:Goal')->findGoalFriends($this->getUser()->getId(), false, null, $search, false);

        if (is_numeric($first) && is_numeric($count)) {
            $goalFriends = array_slice($goalFriends, $first, $count);
        }

        return $goalFriends;
    }

    /**
     * This function create comment.
     *
     * @ApiDoc(
     *  resource=true,
     *  section="Goal",
     *  description="This function create comment by goal",
     *  statusCodes={
     *         200="Returned when created",
     *         400="Return when content not correct",
     *         401="Return when user not found",
     *         404="Return when goal not found",
     *     },
     *  parameters={
     *      {"name"="commentBody", "dataType"="text", "required"=true, "description"="comment body"},
     * }
     * )
     * @param Goal $goal
     * @param Request $request
     * @return Comment|JsonResponse|Response
     */
    public function putCommentAction(Goal $goal, Request $request)
    {
        // check user
        if (!$this->getUser()){
            return new Response('User not found', Response::HTTP_UNAUTHORIZED);
        }

        $em = $this->getDoctrine()->getManager();
        $validator = $this->container->get('validator');

        $commentBody = $request->get('commentBody');


        // check thread by goal id
        $thread = $this->container->get('fos_comment.manager.thread')->findThreadById($goal->getId());
            // create thread for goal
            if(!$thread)
            {
                // generate url by goal id for goal thread
                $url = $this->container->get('router')->generate('inner_goal', array('id' => $goal->getId()), true);

                $thread = new Thread();
                $thread->setPermalink($url);
                $thread->setLastCommentAt(new \DateTime('now'));
                $thread->setId($goal->getId());

                // check validator
                $errors = $validator->validate($thread);

                if(count($errors) > 0)
                {
                    $errorsString = (string)$errors;
                    return new JsonResponse("Comment can't created {$errorsString}", Response::HTTP_BAD_REQUEST);
                }

                // persist and flush thread
                $em->persist($thread);
            }

            // create comment
            $comment= new Comment();
            $comment->setAuthor($this->getUser());
            $comment->setBody($commentBody);
            $comment->setThread($thread);
            $comment->setCreatedAt(new \DateTime('now'));
            $comment->setState(0);

            // validate new comment
            $errors = $validator->validate($comment);

            if(count($errors) > 0){
                $errorsString = (string)$errors;

                return new JsonResponse("Comment can't created {$errorsString}", Response::HTTP_BAD_REQUEST);
            }

            // persist new comment end flush objects
            $em->persist($comment);
            $em->flush();

        return new Response('', Response::HTTP_OK);
    }

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
     * @param Goal $goal
     * @param Request $request
     * @return JsonResponse|Response
     */
    public function putSuccessstoryAction(Goal $goal, Request $request)
    {
        // check user
        if(!$this->getUser()) {
            return new Response('User not found', Response::HTTP_UNAUTHORIZED);
        }

        // get entity manager
        $em = $this->getDoctrine()->getManager();
        // get validator
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

        // check validation
        $errors = $validator->validate($successStory);

        if(count($errors) > 0) {
            $errorsString = (string)$errors;

            return new JsonResponse("Success Story can't created {$errorsString}", Response::HTTP_BAD_REQUEST);
        }

        // persist and flush object
        $em->persist($successStory);
        $em->flush();


        return new Response('', Response::HTTP_OK);
    }
}