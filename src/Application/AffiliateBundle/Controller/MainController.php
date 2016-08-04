<?php

namespace Application\AffiliateBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class MainController extends Controller
{
    /**
     * @Route("/")
     */
    public function indexAction()
    {
//        return $this->render('ApplicationAffiliateBundle:Default:index.html.twig');
    }
}
