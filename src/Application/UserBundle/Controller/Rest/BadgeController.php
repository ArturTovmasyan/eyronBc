<?php

namespace Application\UserBundle\Controller\Rest;

use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class BadgeController
 * @package Application\UserBundle\Controller\Rest
 *
 * @Rest\RouteResource("Badge")
 * @Rest\Prefix("/api/v1.0")
 */

class BadgeController extends Controller
{
    /**
     * @ApiDoc(
     *  resource=true,
     *  section="Badge",
     *  description="This function is used to get TOP 100 users by badge score",
     *  statusCodes={
     *         200="Returned when goals was returned",
     *         400="Bad request"
     *  }
     * )
     *
     * @Rest\View(serializerGroups={"badge"})
     * @param $type
     * @param $count
     * @return mixed
     */
    public function getTopuserAction($type, $count)
    {
        //check if one is parameters not exists
        if(!is_numeric($type) || !is_numeric($count) ) {
            return new Response('Invalid link parameter', Response::HTTP_BAD_REQUEST);
        }

        //check if count great then 100
        $count = $count > 100 ? 100 : $count;
        
        //get entity manager
        $em = $this->getDoctrine()->getManager();

        // get listener
        $this->get('bl.doctrine.listener')->disableUserStatsLoading();

        //get top users
        $users = $em->getRepository('ApplicationUserBundle:Badge')->findTopUsersByType($type, $count);

        return $users;
    }
}