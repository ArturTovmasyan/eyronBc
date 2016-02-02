<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 10/28/15
 * Time: 12:15 PM
 */

namespace AppBundle\Controller\Rest;

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
     * @Rest\View(serializerGroups={"userGoal", "userGoal_goal", "goal"})
     * @param $id
     * @return Response
     */
    public function getAction($id)
    {
        $em = $this->getDoctrine()->getManager();
        $userGoal = $em->getRepository('AppBundle:UserGoal')->find($id);

        if(!$userGoal){
            return new Response('UserGoal not found', Response::HTTP_NOT_FOUND);
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
     *      {"name"="isImportantUrgent", "dataType"="boolean", "required"=true, "description"="Status boolean"},
     *      {"name"="isImportantNotUrgent", "dataType"="boolean", "required"=true, "description"="Status boolean"},
     *      {"name"="isNotImportantUrgent", "dataType"="boolean", "required"=true, "description"="Status boolean"},
     *      {"name"="isNotImportantNotUrgent", "dataType"="boolean", "required"=true, "description"="Status boolean"},
     * }
     *
     * )
     *
     * @Rest\View(serializerGroups={"userGoal"})
     *
     * @return Response
     */
    public function postAction(Request $request)
    {
        if (!$this->getUser()){
            return new Response('User not found', Response::HTTP_UNAUTHORIZED);
        }

        // get entity manager
        $em = $this->getDoctrine()->getManager();

        $condition = null;
        $dream = null;
        $first = null;
        $count = null;
        $requestFilter = array();
        // get user id
        $userId = $this->getUser()->getId();



        // check conditions
        if($request->get('condition') === UserGoal::ACTIVE)
        {
            $condition = UserGoal::ACTIVE;
        }
        elseif($request->get('condition') === UserGoal::COMPLETED)
        {
            $condition = UserGoal::COMPLETED;
        }
        //check isDream
        if($request->get('isDream') == true)
        {
            $dream = true;
        }
        // check first
        if($request->get('first'))
        {
            $first = (int)$request->get('first');
        }
        // check count of result
        if($request->get('count'))
        {
            $count =(int)$request->get('count');
        }

        // check filter parameters
        if($request->get('isImportantUrgent'))
        {
            $requestFilter['isImportantUrgent'] = UserGoal::URGENT_IMPORTANT;
        }

        if($request->get('isNotImportantUrgent'))
        {
            $requestFilter['isNotImportantUrgent'] = UserGoal::URGENT_NOT_IMPORTANT;
        }

        if($request->get('isImportantNotUrgent'))
        {
            $requestFilter['isImportantNotUrgent'] = UserGoal::NOT_URGENT_IMPORTANT;
        }

        if($request->get('isNotImportantNotUrgent'))
        {
            $requestFilter['isImportantNotUrgent'] = UserGoal::NOT_URGENT_NOT_IMPORTANT;
        }

        // get user Goals by existing parameters
        $userGoals = $em->getRepository('AppBundle:UserGoal')->findAllByUser($userId, $condition, $dream, $requestFilter);

        // slice data
        if (is_numeric($first) && is_numeric($count)) {
            $userGoals = array_slice($userGoals, $first, $count);
        }

        // return user goals
        return $userGoals;
    }
}