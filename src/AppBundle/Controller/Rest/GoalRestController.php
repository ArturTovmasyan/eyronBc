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
use Symfony\Component\HttpFoundation\Response;

/**
 * @Rest\RouteResource("Goal")
 * @Rest\Prefix("/goals")
 * @Rest\NamePrefix("rest_")
 */
class GoalRestController extends FOSRestController
{
    /**
     * @Rest\Get("/get-by-id/{id}")
     * @Rest\View(serializerGroups={"map"})
     * @param $id
     * @return Response
     */
    public function getsAction($id)
    {
        // get entity manager
        $em = $this->getDoctrine()->getManager();

        // get goal
        $goal = $em->getRepository('AppBundle:UserGoal')->find($id);

        // check id
        if(!$goal){
            return new Response('UserGoal not found', Response::HTTP_NOT_FOUND);
        }
        return $goal;
    }
}