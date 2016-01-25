<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 10/28/15
 * Time: 12:15 PM
 */

namespace AppBundle\Controller\Rest;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
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
}