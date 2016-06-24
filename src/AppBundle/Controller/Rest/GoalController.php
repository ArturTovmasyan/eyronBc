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
use AppBundle\Entity\StoryImage;
use AppBundle\Entity\SuccessStory;
use AppBundle\Form\GoalType;
use Application\CommentBundle\Entity\Comment;
use Application\CommentBundle\Entity\Thread;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
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
    const RandomGoalFriendCounts = 3;

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

        $filters = [
            0 => 'goal_list_small',
            1 => 'goal_list_small',
            2 => 'goal_list_small',
            3 => 'goal_list_small',
            4 => 'goal_list_horizontal',
            5 => 'goal_list_big',
            6 => 'goal_list_vertical',
        ];

        $liipManager = $this->get('liip_imagine.cache.manager');

        if ($count == 7 || $count == 3){
            for($i = 0; $i < 7; $i++){
                if (isset($goals[$i]) && $goals[$i]->getListPhotoDownloadLink()) {
                    $goals[$i]->setCachedImage($liipManager->getBrowserPath($goals[$i]->getListPhotoDownloadLink(), $filters[$i]));
                }
            }
        }elseif ($count == 9){
            foreach($goals as $goal){
                if (isset($goal) && $goal->getListPhotoDownloadLink()) {
                    $goal->setCachedImage($liipManager->getBrowserPath($goal->getListPhotoDownloadLink(), $filters[0]));
                }
            }
        }

        return  $goals;
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
     * @Rest\View(serializerGroups={"tiny_goal"})
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

        if (!$goal){
            return new Response('Goal not found', Response::HTTP_NOT_FOUND);
        }

        $em->getRepository("AppBundle:Goal")->findGoalStateCount($goal);
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
     *      {"name"="video_links[0]", "dataType"="string", "required"=false, "description"="Goal's video links"},
     *      {"name"="language", "dataType"="string", "required"=false, "description"="Goal's language"}
     *  }
     * )
     *
     * @param Request $request
     * @param $id
     * @return mixed
     * @Rest\Put("/goals/create/{id}", defaults={"id"=null}, requirements={"id"="\d+"}, name="app_rest_goal_put", options={"method_prefix"=false})
     * @Rest\Post("/goals/create/{id}", defaults={"id"=null}, requirements={"id"="\d+"}, name="app_rest_goal_post", options={"method_prefix"=false})
     * @Rest\View()
     * @Security("has_role('ROLE_USER')")
     */
    public function putAction(Request $request, $id = null)
    {
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

        if($request->isMethod('PUT')){
            $goal->setStatus(array_key_exists('is_public', $data) && $data['is_public']  ? Goal::PUBLIC_PRIVACY : Goal::PRIVATE_PRIVACY);
            $goal->setTitle(array_key_exists('title', $data)                             ? $data['title']       : null);
            $goal->setDescription(array_key_exists('description', $data)                 ? $data['description'] : null);
            $goal->setVideoLink(array_key_exists('video_links', $data)                   ? $data['video_links'] : null);
            $goal->setLanguage(array_key_exists('language', $data)                       ? $data['language']    : "en");
        }else{
            $form = $this->createForm(GoalType::class, $goal);

            // get data from request
            $form->handleRequest($request);

            //Delete last empty link
            if ($videoLinks = $goal->getVideoLink()){
                $videoLinks = array_values($videoLinks);
                $videoLinks = array_filter($videoLinks);

                $goal->setVideoLink($videoLinks);
            }

            $tags = $form->get('hashTags')->getData();

            $this->getAndAddTags($goal, $tags);

            $images = $form->get('files')->getData();

            // remove all images that older one day
//            $this->removeAllOldImages();

            if($images){

                $images = json_decode($images);
                $images = array_unique($images);
                $goalImages = $em->getRepository('AppBundle:GoalImage')->findByIDs($images);

                if($goalImages){

                    foreach($goalImages as $goalImage){
                        $goal->addImage($goalImage);
                    }
                }
            }

            $description = $goal->getDescription();

            if($description) {
                $description = str_replace('#', '', $description);
            }

            $goal->setDescription($description);
        }

        $goal->setReadinessStatus(Goal::DRAFT);
        $goal->setAuthor($this->getUser());

        $validator = $this->get('validator');
        $error = $validator->validate($goal, null, array('goal'));

        if(count($error) > 0){
            return new JsonResponse($error[0]->getMessage(), Response::HTTP_BAD_REQUEST);
        }

        $em->persist($goal);
        $em->flush();

        return array('id' => $goal->getId());
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
     * @Rest\Post("/goals/add-images/{id}/{userId}", defaults={"id"=null, "userId"=null}, requirements={"id"="\d+", "userId"="\d+"}, name="app_rest_goal_addimages", options={"method_prefix"=false})
     * @param $id
     * @param $userId
     * @param Request $request
     * @return JsonResponse
     * @Rest\View()
     */
    public function addImagesAction($id = null, $userId = null, Request $request)
    {
        // get entity manager
        $em = $this->getDoctrine()->getManager();

        if ($id){

            //get user goal by goal id
            $goal = $em->getRepository('AppBundle:Goal')->find($id);

            //check ig goal is not exist
            if (!$goal){
                return new Response('Goal not found', Response::HTTP_NOT_FOUND);
            }
        }

        if ($userId) {

            //get user by id
            $user = $em->getRepository('ApplicationUserBundle:User')->find($userId);

            //check if user not exist
            if (!$user){
                return new Response('User not found', Response::HTTP_NOT_FOUND);
            }

            if ($id){
                if ($user != $goal->getAuthor()){
                    return new Response("Goal isn't a goal of current user", Response::HTTP_FORBIDDEN);
                }
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

            // upload file
            $bucketService->uploadFile($goalImage);

            if (isset($goal)){
                $goalImage->setGoal($goal);
                $goal->addImage($goalImage);
            }

            $em->persist($goalImage);
            $em->flush();

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
     * @Security("has_role('ROLE_USER')")
     *
     * @param GoalImage $goalImage
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function removeImageAction(GoalImage $goalImage)
    {
        if(!$goalImage->getGoal() || (!is_null($goalImage->getGoal()->getAuthor()) && $this->getUser()->getId() != $goalImage->getGoal()->getAuthor()->getId())){
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
     * @Security("has_role('ROLE_USER')")
     *
     * @param $first
     * @param $count
     * @return array
     */
    public function getDraftsAction($first, $count)
    {
        $em = $this->getDoctrine()->getManager();
        $draftGoals = $em->getRepository("AppBundle:Goal")->findMyDrafts($this->getUser(), $first, $count);

        return $draftGoals;
    }

    /**
     * @ApiDoc(
     *  resource=true,
     *  section="Goal",
     *  description="This function is used to remove drafts",
     *  statusCodes={
     *         200="Returned when draft was removed",
     *         404="Not found",
     *         403="Returned when removed drafts to goal which author isn't current user",
     *  },
     * )
     * @Rest\View()
     * @Security("has_role('ROLE_USER')")
     * @ParamConverter("goal", class="AppBundle:Goal")
     * @param $goal
     * @return array
     */
    public function deleteDraftsAction(Goal $goal)
    {
        // get entity manager
        $em = $this->getDoctrine()->getManager();

        // get current user
        $user = $this->getUser();

        //check if user not exist
        if (!$user){
            return new Response('User not found', Response::HTTP_NOT_FOUND);
        }

        if ($user != $goal->getAuthor()){
            return new Response("Goal isn't a goal of current user", Response::HTTP_FORBIDDEN);
        }

        // get user goal
        $userGoal = $em->getRepository('AppBundle:UserGoal')->findByUserAndGoal($user->getId(), $goal->getId());

        //check if user goal exist and 1
        if(count($userGoal) == 1){

            // remove from bd
            $em->remove($userGoal);
        }

        //get goal draft by goal id
        $goalDraft = $em->getRepository('AppBundle:Goal')->find($goal);

        //check if success story not exist
        if (!$goalDraft) {
            return new Response('Goal draft not found', Response::HTTP_NOT_FOUND);
        }

        // remove from bd
        $em->remove($goalDraft);
        $em->flush();

        return new Response('', Response::HTTP_OK);
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
     * @Security("has_role('ROLE_USER')")
     * @return array
     */
    public function getFriendsAction(Request $request, $first, $count)
    {
        $this->container->get('bl.doctrine.listener')->disableUserStatsLoading();
        $search = $request->get('search') ? $request->get('search') : null;
        $em = $this->getDoctrine()->getManager();


        $goalFriends = $em->getRepository('AppBundle:Goal')->findGoalFriends($this->getUser()->getId(), false, $search, false, $first, $count);

        $goalFriendsIds = array_keys($goalFriends);
        $stats = $em->getRepository('ApplicationUserBundle:User')->findUsersStats($goalFriendsIds);

        foreach($goalFriends as &$user) {
            $user->setStats([
                "listedBy" => $stats[$user->getId()]['listedBy'] + $stats[$user->getId()]['doneBy'],
                "active" => $stats[$user->getId()]['listedBy'],
                "doneBy" => $stats[$user->getId()]['doneBy']
            ]);
        }

        return $goalFriends;
    }

    /**
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
    public function getRandomFriendsAction()
    {
        $em = $this->getDoctrine()->getManager();
        $allCount = 0;
        $goalFriends = $em->getRepository("AppBundle:Goal")->findRandomGoalFriends($this->getUser()->getId(), self::RandomGoalFriendCounts, $allCount);

        $liipManager = $this->get('liip_imagine.cache.manager');

        foreach($goalFriends as $goalFriend){

            if($goalFriend->getImagePath()){
                $goalFriend->setCachedImage($liipManager->getBrowserPath($goalFriend->getImagePath(), 'user_icon'));
            }
            else {
                $name = $goalFriend->getFirstName()[0] . $goalFriend->getLastName()[0];
                $goalFriend->setCachedImage($name);
            }
        }

        return [
            '1'      => $goalFriends,
            'length' => $allCount
            ];
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
     *
     * @Security("has_role('ROLE_USER')")
     *
     * @param $goalId
     * @param Request $request
     * @return Comment|JsonResponse|Response
     */
    public function putCommentAction($goalId, Request $request)
    {
        $this->container->get('bl.doctrine.listener')->disableIsMyGoalLoading();
        $em = $this->getDoctrine()->getManager();
        $goal = $em->getRepository('AppBundle:Goal')->findGoalWithAuthor($goalId);
        $validator = $this->container->get('validator');

        $commentBody = $request->get('commentBody');

        // check thread by goal id
        $thread = $this->container->get('fos_comment.manager.thread')->findThreadById($goal->getId());

        // create thread for goal
        if(!$thread)
        {
            // generate url by goal id for goal thread
            $url = $this->container->get('router')->generate('inner_goal', array('slug' => $goal->getSlug()), true);

            $thread = new Thread();
            $thread->setPermalink($url);
            $thread->setLastCommentAt(new \DateTime('now'));
            $thread->setId($goal->getId());
            $numCount = $thread->incrementNumComments();
            $thread->setNumComments($numCount);

            // check validator
            $errors = $validator->validate($thread);

            if(count($errors) > 0)
            {
                $errorsString = (string)$errors;
                return new JsonResponse("Comment can't created {$errorsString}", Response::HTTP_BAD_REQUEST);
            }

            // persist and flush thread
            $em->persist($thread);
        }else{
            $numCount = $thread->incrementNumComments();
            $thread->setNumComments($numCount);
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

        //get current user
        $user = $this->getUser();

        //get current user id
        $userId = $user->getId();

        //check if goal author not admin and not null
        if($goal->hasAuthorForNotify($userId)) {
            //send success story notify
            $this->get('user_notify')->sendNotifyAboutNewComment($goal, $user, $commentBody);
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
     * @Security("has_role('ROLE_USER')")
     * @ParamConverter("goal", class="AppBundle:Goal", options={"repository_method" = "findGoalWithAuthor"})
     *
     * @param Goal $goal
     * @param Request $request
     * @return JsonResponse|Response
     */
    public function putSuccessstoryAction(Goal $goal, Request $request)
    {
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

        //get current user
        $user = $this->getUser();

        //get current user id
        $userId = $user->getId();

        //check if goal author not admin and not null
        if($goal->hasAuthorForNotify($userId)) {

            //send success story notify
            $this->container->get('user_notify')->sendNotifyAboutNewSuccessStory($goal, $user, $story);
        }

        // persist and flush object
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
     * @Rest\Post("/success-story/{id}/add-images/{userId}", defaults={"id"=null, "userId"=null}, requirements={"id"="\d+", "userId"="\d+"}, name="app_rest_success_story_addimages", options={"method_prefix"=false})
     * @param $id
     * @param $userId
     * @param Request $request
     * @return JsonResponse
     * @Rest\View()
     */
    public function addSuccessStoryImagesAction($id = null, $userId = null, Request $request)
    {
        // get entity manager
        $em = $this->getDoctrine()->getManager();

        //check if success story id exist
        if ($id && $userId) {

            //get success story by id
            $successStory = $em->getRepository('AppBundle:SuccessStory')->find($id);

            //get user by id
            $user = $em->getRepository('ApplicationUserBundle:User')->find($userId);

            //check if success story not exist
            if (!$successStory) {
                return new Response('Success story not found', Response::HTTP_NOT_FOUND);
            }

            //check if user not exist
            if (!$user) {
                return new Response('User not found', Response::HTTP_NOT_FOUND);
            }

            //check if success story isn`t current user
            if ($user != $successStory->getUser()) {
                return new Response("Success story isn't of current user", Response::HTTP_FORBIDDEN);
            }
        }

        // get all files form request
        $file = $request->files->get('file');

        // check file
        if ($file) {
            // get bucket list service
            $bucketService = $this->get('bl_service');

            // create new goal image object
            $storyImage = new StoryImage();
            $storyImage->setFile($file);
            $storyImage->setStory($successStory);

            // validate goal image
            $validator = $this->get('validator');
            $error = $validator->validate($storyImage, null, null);

            if (count($error) > 0) {
                return new JsonResponse($error[0]->getMessage(), Response::HTTP_BAD_REQUEST);
            }
            else { // upload image id there is no error

                // upload file
                $bucketService->uploadFile($storyImage);

                $em->persist($storyImage);
                $em->flush();
            }

            return new Response('', Response::HTTP_OK);
        }

        return new Response('', Response::HTTP_NOT_FOUND);
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
     * @Rest\View(serializerGroups={"tiny_goal", "goal_author", "tiny_user", "successStory", "successStory_storyImage", "storyImage"})
     *
     * @param Goal $goal
     * @return array
     */
    public function getSuccessStoryAction(Goal $goal)
    {
        $em = $this->getDoctrine()->getManager();
        $story = $em->getRepository('AppBundle:SuccessStory')->findUserGoalStory($this->getUser()->getId(), $goal->getId());

        $liipManager = $this->get('liip_imagine.cache.manager');
        if ($goal->getListPhotoDownloadLink()) {
            $goal->setCachedImage($liipManager->getBrowserPath($goal->getListPhotoDownloadLink(), 'goal_list_big'));
        }

        return [
            'goal' => $goal,
            'story' => count($story) ? $story[0] : null
        ];
    }

    /**
     * @ApiDoc(
     *  resource=true,
     *  section="Goal",
     *  description="This function is used to get goal image path",
     *  statusCodes={
     *         200="Returned when goals was returned",
     *  },
     * )
     *
     * @Rest\View(serializerGroups={"image_link"})
     *
     * @Rest\Get("/goals/image/{id}", requirements={"id"="\d+"}, name="app_rest_goal_image", options={"method_prefix"=false})
     * @Security("has_role('ROLE_ADMIN')")
     *
     * @param $id
     * @return array
     */
    public function getImageAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        // find goal by id
        $goal = $em->getRepository("AppBundle:Goal")->find($id);

        return $goal;
    }

    /**
     * @param $object
     * @param $tags
     */
    private function getAndAddTags(&$object, $tags)
    {
        // get entity manager
        $em = $this->getDoctrine()->getManager();

        // get environment
        $env = $this->container->getParameter("kernel.environment");

        // check environment
        if($env == "test") {
            $tags = array();
        }

        // check tags
        if($tags){

            // remove # from json
            $tags = str_replace('#', '', $tags);

            // get array
            $tags = json_decode($tags);

            // get tags from db
            $dbTags = $em->getRepository("AppBundle:Tag")->getTagTitles();

            // get new tags
            $newTags = array_diff($tags, $dbTags);

            // loop for array
            foreach($newTags as $tagString){

                // create new tag
                $tag = new Tag();

                $title = strtolower($tagString);

                // replace ',' symbols
                $title = str_replace(',', '', $title);

                // replace ':' symbols
                $title = str_replace(':', '', $title);

                // replace '.' symbols
                $title = str_replace('.', '', $title);

                // set tag title
                $tag->setTag($title);

                // add tag
                $object->addTag($tag);

                // persist tag
                $em->persist($tag);

            }

            // tags that is already exist in database
            $existTags = array_diff($tags, $newTags);

            // get tags from database
            $oldTags = $em->getRepository("AppBundle:Tag")->findTagsByTitles($existTags);

            // loop for tags n database
            foreach($oldTags as $oldTag){

                // check tag in collection
                if(!$object->getTags() || !  $object->getTags()->contains($oldTag)){

                    // add tag
                    $object->addTag($oldTag);

                    // persist tag
                    $em->persist($oldTag);
                }
            }
        }
    }
}