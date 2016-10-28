<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Cache;
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
    /**
     * @Route("/blog", name="blog_list")
     * @return Response
     */
    public function listAction()
    {
        return $this->render('AppBundle:Blog:list.html.twig');
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

//        //new response
//        $response = new Response();
//
//        // set last modified data
//        $response->setLastModified($blog->getUpdated());
//
//        // Set response as public. Otherwise it will be private by default.
//        $response->setPublic();
//
//        // Check that the Response is not modified for the given Request
//        if ($response->isNotModified($request)) {
//            // return the 304 Response immediately
//            return $response;
//        }

        //add goals in arrayCollection
        $goalIds = $blog->getRelatedGoalIds();
        $relatedGoals = $em->getRepository('AppBundle:Goal')->findGoalByIds($goalIds);
        $blog->addGoals($relatedGoals);

        return $this->render('AppBundle:Blog:show.html.twig', ['blog' => $blog]);
    }
}


