<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Page;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class MainController
 * @package AppBundle\Controller
 */
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
     * @Route("/page/{slug}", name="page")
     * @param slug
     * @Template()
     * @return array
     */
    public function pageAction($slug)
    {
        // get entity manager
        $em = $this->getDoctrine()->getManager();

        // get page
        $page = $em->getRepository("AppBundle:Page")->findOneBy(array('slug' => $slug));

        // check page
        if(!$page){
            throw $this->createNotFoundException("Page not found");
        }

        return array('page' => $page);
    }

    /**
     * @Route("/news_feed", name="news_feed")
     * @Template()
     * @return array
     */
    public function newsFeedAction()
    {
        $em = $this->getDoctrine()->getManager();
        $allLogs = $em->getRepository('Gedmo\Loggable\Entity\LogEntry')->findAll();

        $this->get('bl_news_feed_service')->getNewsFeed($allLogs);

        dump($allLogs); exit;
        return array();
    }
}
