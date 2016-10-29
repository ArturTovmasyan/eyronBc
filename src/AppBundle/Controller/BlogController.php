<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class BlogController
 * @package AppBundle\Controller
 */
class BlogController extends Controller
{
    const LIMIT = 3;

    /**
     * @Route("/blog", name="blog_list")
     * @return Response
     * @param Request $request
     */
    public function listAction(Request $request)
    {
        //get entity manager
        $em = $this->getDoctrine()->getManager();

        //get page number
        $page = $request->query->get('page');

        //generate first number by page
        if($page > 1) {
            $first = ($page - 1) * self::LIMIT;
        }
        else {
            $first = 0;
        }

        //get last updated date for caching
        $lastModifiedDate = $em->getRepository('AppBundle:Blog')->findLastUpdated($first, self::LIMIT);

        //new response
        $response = new Response();

        // set last modified data
        $response->setLastModified($lastModifiedDate);

        // Set response as public. Otherwise it will be private by default.
        $response->setPublic();

        // Check that the Response is not modified for the given Request
        if ($response->isNotModified($request)) {
            // return the 304 Response immediately
            return $response;
        }

        //get all blog
        $blog = $em->getRepository('AppBundle:Blog')->findAllBlog();

        //get paginator
        $paginator = $this->get('knp_paginator');

        $pagination = $paginator->paginate(
            $blog,
            $request->query->getInt('page', 1)/*page number*/,
            self::LIMIT
        );

        return $this->render('AppBundle:Blog:list.html.twig', ['blogs' => $pagination], $response);
    }

    /**
     * @param $slug
     * @param Request $request
     * @Template()
     * @Route("/{slug}", name="blog_show")
     * @return Response
     */
    public function showAction(Request $request, $slug)
    {
        //get entity manager
        $em = $this->getDoctrine()->getManager();

        //get blog
        $blog = $em->getRepository('AppBundle:Blog')->findOneBy(['slug' => $slug]);

        if(is_null($blog)){
            throw $this->createNotFoundException("Blog not found");
        }

        //new response
        $response = new Response();

        // set last modified data
        $response->setLastModified($blog->getUpdated());

        // Set response as public. Otherwise it will be private by default.
        $response->setPublic();

        // Check that the Response is not modified for the given Request
        if ($response->isNotModified($request)) {
            // return the 304 Response immediately
            return $response;
        }

        //add goals in arrayCollection
        $goalIds = $blog->getRelatedGoalIds();
        $relatedGoals = $em->getRepository('AppBundle:Goal')->findGoalByIds($goalIds);
        $blog->addGoals($relatedGoals);

        return $this->render('AppBundle:Blog:show.html.twig', ['blog' => $blog], $response);
    }
}


