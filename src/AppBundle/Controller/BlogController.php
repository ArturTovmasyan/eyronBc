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
//        $em = $this->getDoctrine()->getManager();
//        $user = $this->getUser();
//        $url = 'homepage';

        return new Response('BLOG LIST page');
    }

    /**
     * @Route("/{slug}", name="blog_show")
     */
    public function showAction($slug)
    {
//        $em = $this->getDoctrine()->getManager();
//        $user = $this->getUser();
//        $url = 'homepage';

        return new Response('BLOG SHOW  '.$slug.'  PAGE');
    }
}


