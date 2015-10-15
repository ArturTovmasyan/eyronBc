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
        $goals = $em->getRepository("AppBundle:Goal")->findAll();

        return array('goals' => $goals);
    }

    /**
     * @Route("/howitworks", name="how_it_works_container")
     * @Template()
     */
    public function howItWorksAction()
    {
        $t = strtoupper('how it works');

        return $this->render('AppBundle:Main:how_it_works.html.twig', array('t' => $t));
    }

    /**
     * @Route("/aboutbl", name="about_bl_container")
     * @Template()
     */
    public function AboutBLAction()
    {
        $t = strtoupper('about bL127');

        return $this->render('AppBundle:Main:about_bl.html.twig', array('t' => $t));
    }

    /**
     * @Route("/contactus", name="contact_us_container")
     * @Template()
     */
    public function ContactUsAction()
    {
        $t = strtoupper('contact us');

        return $this->render('AppBundle:Main:about_bl.html.twig', array('t' => $t));
    }
}
