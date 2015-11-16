<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Page;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
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
     * @Security("has_role('ROLE_USER')")
     * @return array
     */
    public function newsFeedAction()
    {
        $em = $this->getDoctrine()->getManager();

        // get popular goals
        $popularGoals = $em->getRepository("AppBundle:Goal")->findPopular($this->getUser(), 2);

        return array(
            'popularGoals' => $popularGoals
        );
    }

    /**
     * @Route("/goal_friends", name="goal_friends")
     * @Template()
     * @Security("has_role('ROLE_USER')")
     * @return array
     */
    public function goalFriendsAction()
    {
        $em = $this->getDoctrine()->getManager();

        // get popular goals
        $popularGoals = $em->getRepository("AppBundle:Goal")->findPopular($this->getUser(), 2);

        return array(
            'popularGoals' => $popularGoals
        );
    }
}
