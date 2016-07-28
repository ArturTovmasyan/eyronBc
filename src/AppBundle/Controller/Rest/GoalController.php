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
use AppBundle\Entity\UserGoal;
use Application\CommentBundle\Entity\Comment;
use Application\CommentBundle\Entity\Thread;
use Application\UserBundle\Entity\User;
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
     * @ApiDoc(
     *  resource=true,
     *  section="Goal",
     *  description="This function is used to get common goals",
     *  statusCodes={
     *         200="Returned when goals was returned",
     *  },
     *
     * )
     *
     * @param int $userId
     * @param Request $request
     * @return mixed
     * @Rest\View(serializerGroups={"tiny_goal"})
     */
    public function getCommonAction($userId, Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $commonGoals = $em->getRepository('AppBundle:Goal')->findCommonGoals($this->getUser()->getId(), $userId);
        $em->getRepository("AppBundle:Goal")->findGoalStateCount($commonGoals);

        $liipManager = $this->get('liip_imagine.cache.manager');

        foreach($commonGoals as $goal) {
            if ($goal->getListPhotoDownloadLink()) {
                try {
                    $goal->setCachedImage($liipManager->getBrowserPath($goal->getListPhotoDownloadLink(), 'goal_list_horizontal'));
                } catch (\Exception $e) {
                    $goal->setCachedImage("");
                }
            }
        }

        return  ['goals' => array_values($commonGoals) ];
    }

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
     * @Rest\Get("/goals/{count}/suggest", requirements={"count"="\d+"})
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

        $topIdeas = $em->getRepository("AppBundle:Goal")->findPopular($count, $this->getUser());
        $em->getRepository("AppBundle:Goal")->findGoalStateCount($topIdeas);

        $liipManager = $this->get('liip_imagine.cache.manager');
        foreach($topIdeas as $topIdea){

            if($topIdea->getListPhotoDownloadLink()){
                $topIdea->setCachedImage($liipManager->getBrowserPath($topIdea->getListPhotoDownloadLink(), 'goal_list_small'));
            }

        }

        return array_values($topIdeas);
    }

    /**
     * @ApiDoc(
     *  resource=true,
     *  section="Activity",
     *  description="This function is used to get featured ideas",
     *  statusCodes={
     *         200="Returned when goals was returned",
     *  }
     * )
     *
     * @Rest\View(serializerGroups={"tiny_goal"})
     * @Security("has_role('ROLE_USER')")
     *
     * @return array
     */
    public function getFeaturedAction()
    {
        $em = $this->getDoctrine()->getManager();

        $topIdeas = $em->getRepository("AppBundle:Goal")->findFeatured($this->getUser());
        $em->getRepository("AppBundle:Goal")->findGoalStateCount($topIdeas);

        $liipManager = $this->get('liip_imagine.cache.manager');
        foreach($topIdeas as $topIdea){

            if($topIdea->getListPhotoDownloadLink()){
                $topIdea->setCachedImage($liipManager->getBrowserPath($topIdea->getListPhotoDownloadLink(), 'goal_list_small'));
            }
        }

        return array_values($topIdeas);
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
        $this->denyAccessUnlessGranted('view', $goal, $this->get('translator')->trans('goal.view_access_denied'));

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

            $this->denyAccessUnlessGranted('edit', $goal, $this->get('translator')->trans('goal.edit_access_denied'));
        }
        else {
            $goal = new Goal();
        }

        $goal->setStatus(array_key_exists('is_public', $data) && $data['is_public']  ? Goal::PUBLIC_PRIVACY : Goal::PRIVATE_PRIVACY);
        $goal->setTitle(array_key_exists('title', $data)                             ? $data['title']       : null);
        $goal->setDescription(array_key_exists('description', $data)                 ? $data['description'] : null);
        $goal->setVideoLink(array_key_exists('video_links', $data)                   ? $data['video_links'] : null);
        $goal->setLanguage(array_key_exists('language', $data)                       ? $data['language']    : "en");
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
     * @ParamConverter("user", class="ApplicationUserBundle:User", options={"id" = "userId"})
     * @param $goal
     * @param $user
     * @param Request $request
     * @return JsonResponse
     * @Rest\View()
     */
    public function addImagesAction(Request $request, Goal $goal = null, User $user = null)
    {
        //TODO this rest non secured will be changed after tokens strategy
        $em = $this->getDoctrine()->getManager();

        if (is_null($user)){
            $user = $this->getUser();
            if (is_null($user) || !is_object($user)){
                return new Response("there aren't any user", Response::HTTP_FORBIDDEN);
            }
        }

        if (!is_null($goal)){
            $this->denyAccessUnlessGranted('edit', $goal, $this->get('translator')->trans('goal.edit_access_denied'));
        }

        $file = $request->files->get('file');

        if(is_null($file)) {
            return new Response('', Response::HTTP_NOT_FOUND);
        }

        $goalImage = new GoalImage();
        $goalImage->setFile($file);

        if (!is_null($goal)){
            $goalImage->setGoal($goal);
            $goal->addImage($goalImage);
        }

        $validator = $this->get('validator');
        $error = $validator->validate($goalImage, null, array('goal'));

        if(count($error) > 0){
            return new JsonResponse($error[0]->getMessage(), Response::HTTP_BAD_REQUEST);
        }

        $this->get('bl_service')->uploadFile($goalImage);

        $em->persist($goalImage);
        $em->flush();

        return $goalImage->getId();
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
     * @Rest\Get("/goals/remove-images/{id}", requirements={"id"="\d+"}, name="app_get_rest_goal_removeimage", options={"method_prefix"=false})
     * @Security("has_role('ROLE_USER')")
     *
     * @param GoalImage $goalImage
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function removeImageAction(GoalImage $goalImage, Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        if (!is_null($goal = $goalImage->getGoal()))
        {
            $this->denyAccessUnlessGranted('edit', $goal, $this->get('translator')->trans('goal.edit_access_denied'));

            $goal->removeImage($goalImage);
            $goalImages = $goal->getImages();
            if ($goalImage->getList() && $goalImages->first()){
                $goalImages->first()->setList(true);
            }
            if ($goalImage->getCover() && $goalImages->first()){
                $goalImages->first()->setCover(true);
            }
        }

        $em->remove($goalImage);
        $em->flush();

        if ($request->get('_route') == 'app_get_rest_goal_removeimage' && isset($_SERVER['HTTP_REFERER'])){
            return $this->redirect($_SERVER['HTTP_REFERER']);
        }

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
     * @param $request
     * @param $goal
     * @param $slug
     * @return array
     *
     * @Rest\Delete("/goals/{goal}/drafts", requirements={"goal"="\d+"}, name="delete_goal_drafts", options={"method_prefix"=false})
     * @Rest\Get("/goal/remove-ideas/{goal}/{slug}", requirements={"goal"="\d+"}, defaults={"slug" = null}, name="remove_my_ideas", options={"method_prefix"=false})
     */
    public function deleteDraftsAction(Request $request, Goal $goal, $slug = null)
    {
        $em = $this->getDoctrine()->getManager();
        $userGoal = $em->getRepository('AppBundle:UserGoal')->findByUserAndGoal($this->getUser()->getId(), $goal->getId());

        if(!is_null($userGoal)){
            $em->remove($userGoal);
        }

        $this->denyAccessUnlessGranted('delete', $goal, $this->get('translator')->trans('goal.delete_access_denied'));
        $em->remove($goal);
        $em->flush();

        if ($request->get('_route') == "remove_my_ideas") {
            if ($slug == "drafts") {
                $request->getSession()
                    ->getFlashBag()
                    ->set('draft', 'Delete my draft from Web');
            } else {
                $request->getSession()
                    ->getFlashBag()
                    ->set('private', 'Delete my private idea from Web');
            }

            return $this->redirectToRoute("my_ideas", array('slug' => $slug));
        }

        return new Response('', Response::HTTP_OK);
    }


    /**
     * @Rest\Get("/goals/{first}/friends/{count}/{type}", defaults={"type"="all"}, requirements={"first"="\d+", "count"="\d+", "type"="all|recently|match|active"}, name="get_goal_friends", options={"method_prefix"=false})
     * @Rest\Get("/user-list/{first}/{count}/{goalId}/{slug}", defaults={"goalId"=null, "slug"=null}, requirements={"first"="\d+", "count"="\d+", "goalId"="\d+", "slug"="1|2"}, name="get_goal_user_list")
     *
     * @ApiDoc(
     *  resource=true,
     *  section="Goal",
     *  description="This function is used to get user goal friends",
     *  statusCodes={
     *         200="Returned when goals was returned",
     *  },
     * )
     * @Rest\View(serializerGroups={"user"})
     *
     * @param Request $request
     * @param $first
     * @param $count
     * @param $type
     * @param null $goalId
     * @param null $slug
     * @return array
     */
    public function getFriendsAction(Request $request, $first, $count, $type = 'all', $goalId = null, $slug = null)
    {
        if ($request->get('route_') == 'get_goal_friends' && !is_object($this->getUser())){
            throw new HttpException(401);
        }

        $this->container->get('bl.doctrine.listener')->disableUserStatsLoading();
        $search = $request->get('search') ? $request->get('search') : null;
        $em = $this->getDoctrine()->getManager();

        if (!is_null($goalId)){
            $users = $em->getRepository('AppBundle:Goal')
                ->findGoalUsers($goalId, $slug == 1 ? null : UserGoal::COMPLETED, $first, $count, $search);
        }
        else {
            $users = $em->getRepository('AppBundle:Goal')->findGoalFriends($this->getUser()->getId(), $type, $search, $first, $count);
        }

        $userIds = array_keys($users);
        $stats = $em->getRepository('ApplicationUserBundle:User')->findUsersStats($userIds);

        if (is_object($this->getUser())) {
            $commonCounts = $em->getRepository('AppBundle:Goal')->findCommonCounts($this->getUser()->getId(), $userIds);
        }

        foreach($users as &$user) {
            if (is_object($this->getUser())) {
                $user->setCommonGoalsCount($commonCounts[$user->getId()]['commonGoals']);
            }

            $user->setStats([
                "listedBy" => $stats[$user->getId()]['listedBy'] + $stats[$user->getId()]['doneBy'],
                "active"   => $stats[$user->getId()]['listedBy'],
                "doneBy"   => $stats[$user->getId()]['doneBy']
            ]);
        }

        return array_values($users);
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
     * @param Goal $goal
     * @return array
     */
    public function getImageAction(Goal $goal)
    {
        return $goal;
    }
}