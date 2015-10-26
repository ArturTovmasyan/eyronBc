<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 10/26/15
 * Time: 5:34 PM
 */

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use JMS\SecurityExtraBundle\Annotation\Secure;
use Symfony\Component\HttpFoundation\Response;


/**
 * Class BucketListController
 * @package AppBundle\Controller
 */
class BucketListController extends Controller
{
    /**
     * @Route("/my-list", name="my_list")
     * @param Request $request
     * @param $category
     * @Template()
     * @return array
     */
    public function myListAction(Request $request, $category = null)
    {
        // get entity manager
        $em = $this->getDoctrine()->getManager();


//        // find all goals
//        $goals = $em->getRepository("AppBundle:Goal")->findAllByCategory($category, $search);
//
//        // get paginator
//        $paginator  = $this->get('knp_paginator');
//
//        // paginate data
//        $pagination = $paginator->paginate(
//            $goals,
//            $request->query->getInt('page', 1)/*page number*/,
//            7/*limit per page*/
//        );

//        return array('goals' => $pagination, 'categories' => $categories);
        return array();
    }
}