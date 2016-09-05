<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 10/28/15
 * Time: 12:15 PM
 */

namespace AppBundle\Controller\Rest;

use AppBundle\Entity\Goal;
use AppBundle\Entity\UserGoal;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use JMS\Serializer\SerializationContext;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * @Rest\RouteResource("UserGoal")
 */
class UserGoalController extends FOSRestController
{
    /**
     * @ApiDoc(
     *  resource=true,
     *  section="UserGoal",
     *  description="This function is used to get userGoal",
     *  statusCodes={
     *         200="Returned when userGoal was returned",
     *         401="Returned when user not found",
     *         404="UserGoal not found"
     *     },
     *
     * )
     *
     * @Rest\Get("/api/v1.0/usergoals/{goal}", name="rest_get_usergoal", options={"method_prefix"=false})
     * @Rest\View(serializerGroups={"userGoal", "userGoal_location", "userGoal_goal", "goal", "goal_author", "user", "tiny_goal"})
     * @Security("has_role('ROLE_USER')")
     *
     * @param $goal Goal
     * @return Response
     */
    public function getAction(Goal $goal)
    {
        $em = $this->getDoctrine()->getManager();
        $em->getRepository("AppBundle:Goal")->findGoalStateCount($goal);
        $userGoal = $em->getRepository("AppBundle:UserGoal")->findByUserAndGoal($this->getUser()->getId(), $goal->getId());

        if(!$userGoal){
            $userGoal = new UserGoal();
            $userGoal->setGoal($goal);
        }

        $liipManager = $this->get('liip_imagine.cache.manager');
        if ($userGoal->getGoal()->getListPhotoDownloadLink()){
            $userGoal->getGoal()->setCachedImage($liipManager->getBrowserPath($userGoal->getGoal()->getListPhotoDownloadLink(), 'goal_list_big'));
        }

        return $userGoal;
    }

    /**
     * @ApiDoc(
     *  resource=true,
     *  section="UserGoal",
     *  description="This function is used to create or update userGoal",
     *  statusCodes={
     *         200="Returned when userGoal was returned",
     *         401="Returned when user not found",
     *         404="Goal not found"
     *     },
     *  parameters={
     *      {"name"="goal_status", "dataType"="boolean", "required"=false, "description"="ACTIVE:false or COMPLETED:true"},
     *      {"name"="is_visible", "dataType"="boolean", "required"=false, "description"="true / false"},
     *      {"name"="note", "dataType"="string", "required"=false, "description"="note"},
     *      {"name"="steps[write step text here]", "dataType"="boolean", "required"=false, "description"="steps"},
     *      {"name"="location[address]", "dataType"="string", "required"=false, "description"="address"},
     *      {"name"="location[latitude]", "dataType"="float", "required"=false, "description"="latitude"},
     *      {"name"="location[longitude]", "dataType"="float", "required"=false, "description"="longitude"},
     *      {"name"="urgent", "dataType"="boolean", "required"=false, "description"="Urgent boolean"},
     *      {"name"="important", "dataType"="boolean", "required"=false, "description"="Important boolean"},
     *      {"name"="do_date", "dataType"="date", "required"=false, "description"="do date with m/d/Y format"},
     * }
     * )
     *
     * @Rest\Put("/api/v1.0/usergoals/{goal}", name="rest_put_usergoal", options={"method_prefix"=false})
     * @Security("has_role('ROLE_USER')")
     * @ParamConverter("goal", class="AppBundle:Goal", options={"repository_method" = "findWithRelations"})
     * @Rest\View(serializerGroups={"userGoal", "userGoal_location", "userGoal_goal", "goal", "goal_author", "tiny_goal", "tiny_user"})
     *
     * @param Goal $goal
     * @param Request $request
     * @return Response
     */
    public function putAction(Goal $goal, Request $request)
    {

        $this->denyAccessUnlessGranted('add', $goal, $this->get('translator')->trans('goal.add_access_denied'));

        $em = $this->getDoctrine()->getManager();
        if($request->getContentType() == 'application/json' || $request->getContentType() == 'json'){
            $content = $request->getContent();
            $request->request->add(json_decode($content, true));
        }
        
        $userGoal = $em->getRepository("AppBundle:UserGoal")->findByUserAndGoal($this->getUser()->getId(), $goal->getId());

        $suggestAsVisible = false;
        if (!$userGoal) {
            $userGoal = new UserGoal();
            $userGoal->setGoal($goal);
            $userGoal->setUser($this->getUser());
            $suggestAsVisible = true;
        }

        if (!is_null($request->get('goal_status'))){
            $userGoal->setStatus($request->get('goal_status') ? UserGoal::COMPLETED : UserGoal::ACTIVE);

            if($userGoal->getStatus() == UserGoal::COMPLETED)
            {
                $this->denyAccessUnlessGranted('done', $goal, $this->get('translator')->trans('goal.add_access_denied'));

                $completionDateRaw = $request->get('completion_date');
                if($completionDateRaw){
                    $completionDate = \DateTime::createFromFormat('d/m/Y', $completionDateRaw);

                    if(!$completionDate){
                        $completionDate = \DateTime::createFromFormat('m-d-Y', $completionDateRaw);
                    }

                    if(!$completionDate){
                        return new Response('Error completed date', Response::HTTP_BAD_REQUEST);
                    }

                    $currentDate = new \DateTime();
//                    if ($currentDate < $completionDate){
//                        return new Response('Future completed date', Response::HTTP_BAD_REQUEST);
//                    }
                }
                else {
                    $completionDate = new \DateTime();
                }

                $userGoal->setCompletionDate($completionDate);
            }
            elseif($userGoal->getStatus() == UserGoal::ACTIVE){
                $userGoal->setCompletionDate(null);
            }
        }

        if(!is_null($dateStatus = $request->get('date_status'))){
            $userGoal->setDateStatus($dateStatus);
        }

        if(!is_null($doDateStatus = $request->get('do_date_status'))){
            $userGoal->setDoDateStatus($doDateStatus);
        }

        if (!is_null($request->get('is_visible'))){
            $userGoal->setIsVisible($request->get('is_visible') ? true : false);
        }

        if (!is_null($steps = $request->get('steps')) && (is_array($steps) || is_array($steps = json_decode($steps)) )){
            $userGoal->setSteps($steps);
        }

        if (!is_null($request->get('note'))){
            $userGoal->setNote($request->get('note'));
        }

        if (!is_null($request->get('urgent'))){
            $userGoal->setUrgent($request->get('urgent') ? true : false);
        }

        if (!is_null($request->get('important'))){
            $userGoal->setImportant($request->get('important') ? true : false);
        }

        $location = $request->get('location');
        if(isset($location['address']) && isset($location['latitude']) && isset($location['longitude'])){
            $userGoal->setAddress($location['address']);
            $userGoal->setLat($location['latitude']);
            $userGoal->setLng($location['longitude']);
        }

        if($goal->isAuthor($this->getUser())  && $goal->getReadinessStatus() == Goal::DRAFT){
            // set status to publish
            $goal->setReadinessStatus(Goal::TO_PUBLISH);
            $em->persist($goal);
        }

        $doDateRaw = $request->get('do_date');
        if($doDateRaw){
            $doDate = \DateTime::createFromFormat('d/m/Y', $doDateRaw);

            if(!$doDate){
                $doDate = \DateTime::createFromFormat('m-d-Y', $doDateRaw);
            }

            if(!$doDate){
                return new Response('Error do date', Response::HTTP_BAD_REQUEST);
            }

            $userGoal->setDoDate($doDate);
        }

        $liipManager = $this->get('liip_imagine.cache.manager');
        if ($userGoal->getGoal()->getListPhotoDownloadLink()){
            $userGoal->getGoal()->setCachedImage($liipManager->getBrowserPath($userGoal->getGoal()->getListPhotoDownloadLink(), 'goal_list_big'));
        }

        $em->persist($userGoal);
        $em->flush();

        if ($suggestAsVisible){
            $userGoal->setIsVisible(true);
        }
        
        return $userGoal;
    }

    /**
     * @ApiDoc(
     *  resource=true,
     *  section="UserGoal",
     *  description="This function is used to remove userGoal",
     *  statusCodes={
     *         200="Returned when userGoal was removed",
     *         401="User not found else it isn't users userGoal",
     *         404="UserGoal not found"
     *     },
     *
     * )
     *
     * @Rest\Delete("/api/v1.0/usergoals/{userGoal}", name="rest_delete_usergoal", options={"method_prefix"=false})
     * @Security("has_role('ROLE_USER')")
     * @param $userGoal
     * @return Response
     */
    public function deleteAction($userGoal)
    {
        $em = $this->getDoctrine()->getManager();
        $msg = $em->getRepository('AppBundle:UserGoal')->removeUserGoal($this->getUser()->getId(), $userGoal);

        return new Response($msg, Response::HTTP_OK);
    }

    /**
     * @param $value
     * @return bool
     */
    private function toBool($value){
        if ($value === 'true' || $value === true || $value === 1){
            return true;
        }

        return false;
    }

    /**
     * @ApiDoc(
     *  resource=true,
     *  section="UserGoal",
     *  description="This function is used to get my bucketlist",
     *  statusCodes={
     *         200="Returned when all ok"
     *     },
     *
     *  parameters={
     *      {"name"="condition", "dataType"="integer", "required"=false, "description"="ACTIVE:1 or COMPLETED:2"},
     *      {"name"="first", "dataType"="integer", "required"=false, "description"="first number of user Goal"},
     *      {"name"="count", "dataType"="integer", "required"=false, "description"="count of userGoals results"},
     *      {"name"="isDream", "dataType"="boolean", "required"=true, "description"="Status boolean"},
     *      {"name"="urgentImportant", "dataType"="boolean", "required"=false, "description"="Status boolean"},
     *      {"name"="urgentNotImportant", "dataType"="boolean", "required"=false, "description"="Status boolean"},
     *      {"name"="notUrgentImportant", "dataType"="boolean", "required"=false, "description"="Status boolean"},
     *      {"name"="notUrgentNotImportant", "dataType"="boolean", "required"=false, "description"="Status boolean"},
     *      {"name"="userId", "dataType"="integer", "required"=false, "description"="User id"},
     * })
     *
     * @Rest\Post("/api/v1.0/usergoals/bucketlists", name="post_usergoal_bucketlist", options={"method_prefix"=false})
     * @Rest\Get("/api/v2.0/usergoals/bucketlists", name="get_usergoal_bucketlist", options={"method_prefix"=false})
     * @Rest\Post("/api/v1.0/usergoals/locations", name="rest_post_usergoal_locations", options={"method_prefix"=false})
     * @Rest\View(serializerGroups={"userGoal", "userGoal_goal", "goal", "goal_author", "tiny_user"})
     * @Security("has_role('ROLE_USER')")
     *
     * @return Response
     */
    public function postBucketlistAction(Request $request)
    {
        $this->container->get('bl.doctrine.listener')->disableUserStatsLoading();

        if($request->getContentType() == 'application/json' || $request->getContentType() == 'json'){
            $content = $request->getContent();
            $request->request->add(json_decode($content, true));
        }

        $em        = $this->getDoctrine()->getManager();
        $userId    = $request->query->get('userId');
        $user      = $userId ? $em->getRepository('ApplicationUserBundle:User')->find($userId) : $this->getUser();

        // check conditions
        switch($request->query->get('condition')){
            case UserGoal::ACTIVE:
                $condition = UserGoal::ACTIVE;
                break;
            case UserGoal::COMPLETED:
                $condition = UserGoal::COMPLETED;
                break;
            default:
                $condition = null;
        }

        $dream = $this->toBool($request->query->get('isDream'));
        $first = $request->query->get('first');
        $count = $request->query->get('count');

        $requestFilter = [];
        $requestFilter[UserGoal::URGENT_IMPORTANT]          = $this->toBool($request->query->get('urgentImportant'));
        $requestFilter[UserGoal::URGENT_NOT_IMPORTANT]      = $this->toBool($request->query->get('urgentNotImportant'));
        $requestFilter[UserGoal::NOT_URGENT_IMPORTANT]      = $this->toBool($request->query->get('notUrgentImportant'));
        $requestFilter[UserGoal::NOT_URGENT_NOT_IMPORTANT]  = $this->toBool($request->query->get('notUrgentNotImportant'));

        $response = new Response();

        if ($request->get('_route') == 'get_usergoal_bucketlist')
        {
            $data = $em->getRepository('AppBundle:UserGoal')
                ->findAllByUser($user->getId(), $condition, $dream, $requestFilter, $first, $count, true);

            if (is_null($data)) {
                return ['user_goals' => [], 'user' => $user];
            }

            $response->setLastModified($data['lastDate']);
            $response->headers->set('ETag', $data['etag']);
            $response->headers->set('cache-control', 'private, must-revalidate');

            if ($response->isNotModified($request)) {
                return $response;
            }
        }


        $userGoals = $em->getRepository('AppBundle:UserGoal')
            ->findAllByUser($user->getId(), $condition, $dream, $requestFilter, $first, $count);

        //This part is used to calculate goal stats
        $goalIds   = [];
        $authorIds = [];
        foreach($userGoals as $userGoal){
            $goalIds[$userGoal->getGoal()->getId()] = 1;
            if ($userGoal->getGoal()->getAuthor()) {
                $authorIds[] = $userGoal->getGoal()->getAuthor()->getId();
            }
        }

        $goalStats = $em->getRepository("AppBundle:Goal")->findGoalStateCount($goalIds, true);
        $authorstats = $em->getRepository("ApplicationUserBundle:User")->findUsersStats($authorIds);

        foreach($userGoals as $userGoal){
            $userGoal->getGoal()->setStats([
                'listedBy' => $goalStats[$userGoal->getGoal()->getId()]['listedBy'],
                'doneBy'   => $goalStats[$userGoal->getGoal()->getId()]['doneBy'],
            ]);

            if ($userGoal->getGoal()->getAuthor()) {
                $stats = $authorstats[$userGoal->getGoal()->getAuthor()->getId()];
                $userGoal->getGoal()->getAuthor()->setStats([
                    "listedBy" => $stats['listedBy'] + $stats['doneBy'],
                    "active"   => $stats['listedBy'],
                    "doneBy"   => $stats['doneBy']
                ]);
            }
        }

        $em->getRepository('ApplicationUserBundle:User')->setUserStats($user);

        $liipManager = $this->get('liip_imagine.cache.manager');
        foreach ($userGoals as $userGoal) {
            if ($userGoal->getGoal()->getListPhotoDownloadLink()) {
                try {
                    $userGoal->getGoal()
                        ->setCachedImage($liipManager->getBrowserPath($userGoal->getGoal()->getListPhotoDownloadLink(),
                                                                      $this->getUser()->getId() == $userId ? 'goal_bucketlist' : 'goal_list_horizontal'));
                } catch (\Exception $e) {
                    $userGoal->getGoal()->setCachedImage("");
                }
            }
        }

        $serializer = $this->get('serializer');

        if ($request->get('_route') != 'rest_post_usergoal_locations'){
            $content = ['user_goals' => $userGoals, 'user' => $user];
            $serializedContent = $serializer->serialize($content, 'json',
                SerializationContext::create()->setGroups(array("userGoal", "userGoal_goal", "goal", "goal_author", "tiny_user")));
        }
        else {
            $serializedContent = $serializer->serialize($userGoals, 'json',
                SerializationContext::create()->setGroups(array("userGoal_location", "tiny_user", "userGoal_goal", "tiny_goal")));
        }

        $response->setContent($serializedContent);

        return $response;
    }

    /**
     * @ApiDoc(
     *  resource=true,
     *  section="UserGoal",
     *  description="This function is used to get bucketlist goals locations",
     *  statusCodes={
     *         200="Returned when all ok"
     *     },
     *
     *  parameters={
     *      {"name"="condition", "dataType"="integer", "required"=false, "description"="ACTIVE:1 or COMPLETED:2"},
     *      {"name"="first", "dataType"="integer", "required"=false, "description"="first number of user Goal"},
     *      {"name"="count", "dataType"="integer", "required"=false, "description"="count of userGoals results"},
     *      {"name"="isDream", "dataType"="boolean", "required"=true, "description"="Status boolean"},
     *      {"name"="urgentImportant", "dataType"="boolean", "required"=false, "description"="Status boolean"},
     *      {"name"="urgentNotImportant", "dataType"="boolean", "required"=false, "description"="Status boolean"},
     *      {"name"="notUrgentImportant", "dataType"="boolean", "required"=false, "description"="Status boolean"},
     *      {"name"="notUrgentNotImportant", "dataType"="boolean", "required"=false, "description"="Status boolean"},
     *      {"name"="userId", "dataType"="integer", "required"=false, "description"="User id"},
     * }
     *
     * )
     *
     * @Rest\Post("/api/v1.0/usergoals/locations", name="rest_post_usergoal_locations", options={"method_prefix"=false})
     * @Rest\View(serializerGroups={"userGoal_location", "tiny_user", "userGoal_goal", "tiny_goal"})
     * @Security("has_role('ROLE_USER')")
     *
     * @return Response
     */
//    public function postLocationsAction(Request $request)
//    {
//        $em        = $this->getDoctrine()->getManager();
//        $userId    = $request->get('userId');
//        $user      = $userId ? $em->getRepository('ApplicationUserBundle:User')->find($userId) : $this->getUser();
//
//        // check conditions
//        switch($request->query->get('condition')){
//            case UserGoal::ACTIVE:
//                $condition = UserGoal::ACTIVE;
//                break;
//            case UserGoal::COMPLETED:
//                $condition = UserGoal::COMPLETED;
//                break;
//            default:
//                $condition = null;
//        }
//
//        $dream = $this->toBool($request->query->get('isDream'));
//        $first = $request->query->get('first');
//        $count = $request->query->get('count');
//
//        $requestFilter = [];
//        $requestFilter[UserGoal::URGENT_IMPORTANT]          = $this->toBool($request->query->get('urgentImportant'));
//        $requestFilter[UserGoal::URGENT_NOT_IMPORTANT]      = $this->toBool($request->query->get('urgentNotImportant'));
//        $requestFilter[UserGoal::NOT_URGENT_IMPORTANT]      = $this->toBool($request->query->get('notUrgentImportant'));
//        $requestFilter[UserGoal::NOT_URGENT_NOT_IMPORTANT]  = $this->toBool($request->query->get('notUrgentNotImportant'));
//
//
//        $userGoals = $em->getRepository('AppBundle:UserGoal')
//            ->findAllByUser($user->getId(), $condition, $dream, $requestFilter, $first, $count);
//
//        return $userGoals;
//    }

    /**
     * @ApiDoc(
     *  resource=true,
     *  section="UserGoal",
     *  description="This function is used to done or active userGoal (isDone = 1 for completed and 0 to set as active)",
     *  statusCodes={
     *         200="Returned when userGoal was done or activated",
     *         401="Returned when user not found",
     *         404="Returned when goal not found"
     *     }
     * )
     *
     * @Rest\Get("/api/v1.0/usergoals/{goal}/dones/{isDone}", name="rest_get_usergoal_done", options={"method_prefix"=false})
     * @Security("has_role('ROLE_USER')")
     *
     * @param Goal $goal
     * @param $isDone
     * @return Response
     */
    public function getDoneAction(Goal $goal, $isDone = null)
    {
        $this->denyAccessUnlessGranted('done', $goal, $this->get('translator')->trans('goal.add_access_denied'));
        $em = $this->getDoctrine()->getManager();

        if($isDone){
            $status = UserGoal::COMPLETED;
            $completionDate = new \DateTime('now');
        }
        else {
            $status = UserGoal::ACTIVE;
            $completionDate = null;
        }

        $newDone = true;
        $userGoal = $em->getRepository("AppBundle:UserGoal")->findByUserAndGoal($this->getUser()->getId(), $goal->getId());

        if(!$userGoal){
            $userGoal = new UserGoal();
            $userGoal->setGoal($goal);
            $userGoal->setUser($this->getUser());
            $userGoal->setIsVisible(true);
        }
        else {
            $newDone = !($userGoal->getStatus() == UserGoal::COMPLETED);
        }

        $userGoal->setStatus($status);
        $userGoal->setCompletionDate($completionDate);

        $em->persist($userGoal);
        $em->flush();

        return new Response((int) $newDone, Response::HTTP_OK);
    }
}