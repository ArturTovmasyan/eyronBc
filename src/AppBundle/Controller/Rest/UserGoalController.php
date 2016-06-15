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
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * @Rest\RouteResource("UserGoal")
 * @Rest\Prefix("/api/v1.0")
 * @Rest\NamePrefix("rest_")
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
     * @Rest\View(serializerGroups={"userGoal", "userGoal_location", "userGoal_goal", "goal", "goal_author", "user"})
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
     * @Security("has_role('ROLE_USER')")
     * @Rest\View(serializerGroups={"userGoal", "userGoal_location", "userGoal_goal", "goal", "goal_author", "tiny_user"})
     *
     * @param Goal $goal
     * @param Request $request
     * @return Response
     */
    public function putAction(Goal $goal, Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        if($request->getContentType() == 'application/json' || $request->getContentType() == 'json'){
            $content = $request->getContent();
            $request->request->add(json_decode($content, true));
        }
        
        $userGoal = $em->getRepository("AppBundle:UserGoal")->findByUserAndGoal($this->getUser()->getId(), $goal->getId());

        if (!$userGoal) {
            $userGoal = new UserGoal();
            $userGoal->setGoal($goal);
            $userGoal->setUser($this->getUser());
        }

        $userGoal->setStatus($request->get('goal_status') ? UserGoal::COMPLETED : UserGoal::ACTIVE);
        $userGoal->setIsVisible($request->get('is_visible') ? true : false);
        $userGoal->setSteps($request->get('steps') ? $request->get('steps') : []);
        $userGoal->setNote($request->get('note') ? $request->get('note') : null);

        $location = $request->get('location');
        if(isset($location['address']) && isset($location['latitude']) && isset($location['longitude'])){
            $userGoal->setAddress($location['address']);
            $userGoal->setLat($location['latitude']);
            $userGoal->setLng($location['longitude']);
        }

        if($goal->isAuthor($this->getUser())  && $goal->getReadinessStatus() == Goal::DRAFT ){
            // set status to publish
            $goal->setReadinessStatus(Goal::TO_PUBLISH);
            $em->persist($goal);
        }

        $userGoal->setListedDate(new \DateTime());

        $userGoal->setUrgent($request->get('urgent') ? true : false);
        $userGoal->setImportant($request->get('important') ? true : false);

        $doDate = $request->get('do_date');
        if($doDate){
            try {
                $doDate= \DateTime::createFromFormat('d/m/Y', $doDate);
            }
            catch(\Exception $e){
                try {
                    $doDate= \DateTime::createFromFormat('m-d-Y', $doDate);
                }
                catch(\Exception $e) {
                    return new Response($e->getMessage(), Response::HTTP_BAD_REQUEST);
                }
            }

            $userGoal->setDoDate($doDate);
        }

        $em->persist($userGoal);
        $em->flush();

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
     * @Security("has_role('ROLE_USER')")
     * @param $userGoal
     * @return Response
     */
    public function deleteAction(UserGoal $userGoal)
    {
        if ($userGoal->getUser()->getId() != $this->getUser()->getId()){
            return new Response("It isn't current user's userGoal", Response::HTTP_BAD_REQUEST);
        }

        $em = $this->getDoctrine()->getManager();
        $em->remove($userGoal);

        $em->flush();

        return new Response('', Response::HTTP_OK);
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
     * }
     *
     * )
     *
     * @Rest\View(serializerGroups={"userGoal", "userGoal_goal", "goal", "goal_author", "tiny_user"})
     * @Security("has_role('ROLE_USER')")
     *
     * @return Response
     */
    public function postBucketlistAction(Request $request)
    {
        //get entity manager
        $em = $this->getDoctrine()->getManager();

        //get userId in request
        $userId = $request->get('userId');

        //check if userId don't sent
        if($userId) {
            $user = $em->getRepository('ApplicationUserBundle:User')->find($userId);
        }
        else{
            $user = $this->getUser();
        }

        //get userGoals
        $userGoals = $this->getUserGoalsForBucketList($request, $user);

        //generate user stats
        $em->getRepository('ApplicationUserBundle:User')->setUserStats($user);

        // return user goals
        return [
            'user_goals' => $userGoals, 'user' => $user];
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
     * @Rest\View(serializerGroups={"userGoal_location", "tiny_user", "userGoal_goal", "tiny_goal"})
     * @Security("has_role('ROLE_USER')")
     *
     * @return Response
     */
    public function postLocationsAction(Request $request)
    {
        //get entity manager
        $em = $this->getDoctrine()->getManager();

        //get userId in request
        $userId = $request->get('userId');

        //check if userId don't sent
        if($userId) {
            $user = $em->getRepository('ApplicationUserBundle:User')->find($userId);
        }
        else{
            $user = $this->getUser();
        }

        //get userGoals
        $userGoals = $this->getUserGoalsForBucketList($request, $user);

        // return user goals
        return $userGoals;
    }

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
     * @Security("has_role('ROLE_USER')")
     *
     * @param Goal $goal
     * @param $isDone
     * @return Response
     */
    public function getDoneAction(Goal $goal, $isDone = null)
    {
        $em = $this->getDoctrine()->getManager();

        if($isDone){
            $status = UserGoal::COMPLETED;
            $completionDate = new \DateTime('now');
        }
        else {
            $status = UserGoal::ACTIVE;
            $completionDate = null;
        }

        // get user goal
        $userGoal = $em->getRepository("AppBundle:UserGoal")->findByUserAndGoal($this->getUser()->getId(), $goal->getId());

        // check user goal and create if noc exist
        if(!$userGoal){
            $userGoal = new UserGoal();
            $userGoal->setGoal($goal);
            $userGoal->setUser($this->getUser());
        }

        $userGoal->setStatus($status);
        $userGoal->setCompletionDate($completionDate);

        $em->persist($userGoal);
        $em->flush();

        return new Response('', Response::HTTP_OK);
    }

    /**
     * This function is used to get user goals data for bucket list page
     */
    private function getUserGoalsForBucketList($request, $user)
    {
        // check conditions
        switch($request->get('condition')){
            case UserGoal::ACTIVE:
                $condition = UserGoal::ACTIVE;
                break;
            case UserGoal::COMPLETED:
                $condition = UserGoal::COMPLETED;
                break;
            default:
                $condition = null;
        }

        //get entity manager
        $em = $this->getDoctrine()->getManager();

        //check isDream
        $dream = $request->get('isDream') == true ? true : false;
        $first = $request->get('first');
        $count = $request->get('count');

        $requestFilter = [];
        $requestFilter[UserGoal::URGENT_IMPORTANT]          = $request->get('urgentImportant')       ? true : false;
        $requestFilter[UserGoal::URGENT_NOT_IMPORTANT]      = $request->get('urgentNotImportant')    ? true : false;
        $requestFilter[UserGoal::NOT_URGENT_IMPORTANT]      = $request->get('notUrgentImportant')    ? true : false;
        $requestFilter[UserGoal::NOT_URGENT_NOT_IMPORTANT]  = $request->get('notUrgentNotImportant') ? true : false;

        $userGoals = $em->getRepository('AppBundle:UserGoal')
            ->findAllByUser($user->getId(), $condition, $dream, $requestFilter, false, $first, $count);

        //This part is used to calculate goal stats
        $goalIds = [];
        foreach($userGoals as $userGoal){
            $goalIds[$userGoal->getGoal()->getId()] = 1;
        }

        $stats = $em->getRepository("AppBundle:Goal")->findGoalStateCount($goalIds, true);

        foreach($userGoals as $userGoal){
            $userGoal->getGoal()->setStats([
                'listedBy' => $stats[$userGoal->getGoal()->getId()]['listedBy'],
                'doneBy'   => $stats[$userGoal->getGoal()->getId()]['doneBy'],
            ]);
        }

        return $userGoals;
    }
}