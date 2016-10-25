<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;


/**
 * Class BlogController
 * @package AppBundle\Controller
 */
class BlogController extends Controller
{
    /**
     * @Route("/blog", name="blog_list")
     */
    public function listAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        $lastModifiedDate = $em->getRepository('AppBundle:Blog')->findLastUpdated();

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

        $blog = $em->getRepository('AppBundle:Blog')->findAll();

        return $this->render('AppBundle:Blog:list.html.twig', ['blog' => $blog], $response);
    }

    /**
     * @param $slug
     * @Template()
     * @Route("/{slug}", name="blog_show")
     * @return Response
     */
    public function showAction($slug)
    {
        $em = $this->getDoctrine()->getManager();
        $blog = $em->getRepository('AppBundle:Blog')->findOneBy(['slug' => $slug]);

        return $this->render('AppBundle:Blog:show.html.twig', ['blog' => $blog]);
    }
}


