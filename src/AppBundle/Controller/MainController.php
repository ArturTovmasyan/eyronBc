<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class MainController extends Controller
{
    /**
     * @Route("/", name="homepage")
     * @Template()
     */
    public function indexAction()
    {
        // get entity manager
        $em = $this->getDoctrine()->getManager();

        // find goals
        $goals = $em->getRepository("AppBundle:Goal")->findAllWithCount(7);

        return array('goals' => $goals);
    }

    /**
     * @Route("/how-it-works", name="how_it_works")
     * @Template()
     */
    public function howItWorksAction()
    {
        $t = strtoupper('how it works');

        return $this->render('AppBundle:Main:how_it_works.html.twig', array('t' => $t));
    }

    /**
     * @Route("/about", name="about_bl")
     * @Template()
     */
    public function aboutBLAction()
    {
        $t = strtoupper('about bL127');

        return $this->render('AppBundle:Main:about_bl.html.twig', array('t' => $t));
    }

    /**
     * @Route("/contact-us", name="contact_us")
     * @Template()
     */
    public function contactUsAction()
    {
        $t = strtoupper('contact us');

        return $this->render('AppBundle:Main:about_bl.html.twig', array('t' => $t));
    }
}
