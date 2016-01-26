<?php
/**
 * Created by PhpStorm.
 * User: andranik
 * Date: 1/25/16
 * Time: 5:46 PM
 */
namespace AppBundle\Controller\Rest;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;

/**
 * @Rest\RouteResource("Goal")
 * @Rest\Prefix("/api/v1.0")
 * @Rest\NamePrefix("rest_")
 */
class GoalController extends FOSRestController
{
    /**
     * @Rest\Get(defaults={"page"=1}, requirements={"countPerPage"="\d+", "page"="\d+"})
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
     * @param int $countPerPage
     * @param int $page
     * @param Request $request
     * @return mixed
     * @Rest\View(serializerGroups={"goal"})
     */
    public function getAllAction($countPerPage = 7, $page = 1, Request $request)
    {
        if ($page < 1){
            $page = 1;
        }

        $em = $this->getDoctrine()->getManager();
        $category = $request->get('category');
        $search = $request->get('search');

        $goals = $em->getRepository("AppBundle:Goal")->findAllByCategory($category, $search);
        $em->getRepository("AppBundle:Goal")->findGoalStateCount($goals);

        $paginator  = $this->get('knp_paginator');

        // paginate data
        $pagination = $paginator->paginate(
            $goals,
            $page,
            $countPerPage
        );

        return $pagination->getItems();
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
}