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
     *         404="UserGoal not found"
     *     },
     *
     * )
     *
     * @Rest\View(serializerGroups={"userGoal", "userGoal_goal", "goal", "goal_author", "tiny_user"})
     * @param $goal Goal
     * @return Response
     */
    public function getAction(Goal $goal)
    {
        if (!$this->getUser()){
            return new Response('User not found', Response::HTTP_UNAUTHORIZED);
        }

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
     *  description="This function is used to remove userGoal",
     *  statusCodes={
     *         200="Returned when userGoal was removed",
     *         404="UserGoal not found"
     *     },
     *
     * )
     *
     * @param $id
     * @return Response
     */
    public function deleteAction($id)
    {
        $em = $this->getDoctrine()->getManager();
        $userGoal = $em->getRepository('AppBundle:UserGoal')->find($id);

        if(!$userGoal){
            return new Response('UserGoal not found', Response::HTTP_NOT_FOUND);
        }

        $em->remove($userGoal);
        $em->flush();

        return new Response('', Response::HTTP_OK);
    }

    /**
     * @ApiDoc(
     *  resource=true,
     *  section="UserGoal",
     *  description="This function is used to remove userGoal",
     *  statusCodes={
     *         200="Returned when userGoal was removed",
     *         404="UserGoal not found"
     *     },
     *
     *      parameters={
     *      {"name"="condition", "dataType"="integer", "required"=false, "description"="ACTIVE:1 or COMPLETED:2"},
     *      {"name"="first", "dataType"="integer", "required"=false, "description"="first number of user Goal"},
     *      {"name"="count", "dataType"="integer", "required"=false, "description"="count of userGoals results"},
     *      {"name"="isDream", "dataType"="boolean", "required"=true, "description"="Status boolean"},
     *      {"name"="urgentImportant", "dataType"="boolean", "required"=false, "description"="Status boolean"},
     *      {"name"="urgentNotImportant", "dataType"="boolean", "required"=false, "description"="Status boolean"},
     *      {"name"="notUrgentImportant", "dataType"="boolean", "required"=false, "description"="Status boolean"},
     *      {"name"="notUrgentNotImportant", "dataType"="boolean", "required"=false, "description"="Status boolean"},
     * }
     *
     * )
     *
     * @Rest\View(serializerGroups={"userGoal", "userGoal_goal", "goal"})
     *
     * @return Response
     */
    public function postBucketlistAction(Request $request)
    {
        if (!$this->getUser()){
            return new Response('User not found', Response::HTTP_UNAUTHORIZED);
        }

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

        //check isDream
        $dream = $request->get('isDream') == true ? true : false;
        $first = $request->get('first');
        $count = $request->get('count');

        $requestFilter = [];
        $requestFilter[UserGoal::URGENT_IMPORTANT]          = $request->get('urgentImportant')       ? true : false;
        $requestFilter[UserGoal::URGENT_NOT_IMPORTANT]      = $request->get('urgentNotImportant')    ? true : false;
        $requestFilter[UserGoal::NOT_URGENT_IMPORTANT]      = $request->get('notUrgentImportant')    ? true : false;
        $requestFilter[UserGoal::NOT_URGENT_NOT_IMPORTANT]  = $request->get('notUrgentNotImportant') ? true : false;

        $em = $this->getDoctrine()->getManager();
        $userGoals = $em->getRepository('AppBundle:UserGoal')->findAllByUser($this->getUser()->getId(), $condition, $dream, $requestFilter);

        // slice data
        if (is_numeric($first) && is_numeric($count)) {
            $userGoals = array_slice($userGoals, $first, $count);
        }

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


        // return user goals
        return $userGoals;
    }
}