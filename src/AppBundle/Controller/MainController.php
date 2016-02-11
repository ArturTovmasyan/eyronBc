<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Goal;
use AppBundle\Entity\Page;
use AppBundle\Entity\UserGoal;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
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
    public function indexAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        if (!$this->getUser()){
            $goals = $em->getRepository("AppBundle:Goal")->findAllWithCount(7);
            $em->getRepository("AppBundle:Goal")->findGoalStateCount($goals);

            return array('goals' => $goals);
        }

        // get current user
        $currentUser = $this->getUser();

        // check user is have a goal
        if (count($currentUser->getUserGoal()) > 0) {
            $url = 'activity';
        } else {
            $url = 'goals_list';
        }

        return $this->redirectToRoute($url);
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
     * @Route("/goal-friends", name="goal_friends")
     * @Template()
     * @Security("has_role('ROLE_USER')")
     * @return array
     */
    public function goalFriendsAction(Request $request)
    {
        $search = $request->get('search') ? $request->get('search') : null;
        $em = $this->getDoctrine()->getManager();
        $goalFriends = $em->getRepository('AppBundle:Goal')->findGoalFriends($this->getUser()->getId(), false, null, $search, true);

        $paginator  = $this->get('knp_paginator');
        $pagination = $paginator->paginate(
            $goalFriends,
            $request->query->getInt('page', 1)/*page number*/,
            30/*limit per page*/
        );

        return array('pagination' => $pagination);
    }

    /**
     * @Route("/listed-users/{slug}", name="listed_users")
     * @Route("/done-users/{slug}", name="done_users")
     * @ParamConverter("goal", class="AppBundle:Goal",  options={
     *   "mapping": {"slug": "slug"},
     *   "repository_method" = "findOneBySlug" })
     * @Template()
     *
     * @param Goal $goal
     * @param Request $request
     * @return array
     */
    public function goalUsersAction(Goal $goal, Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $users = $em->getRepository('AppBundle:Goal')
            ->findGoalUsers($goal->getId(), $request->get('_route') == 'listed_users' ? null : UserGoal::COMPLETED);

        $paginator  = $this->get('knp_paginator');
        $pagination = $paginator->paginate(
            $users,
            $request->query->getInt('page', 1)/*page number*/,
            30/*limit per page*/
        );

        return array('pagination' => $pagination);
    }

    /**
     * @Route("/activity", name="activity")
     * @Template()
     * @Security("has_role('ROLE_USER')")
     * @return array
     */
    public function activitiesAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $this->get('bl_news_feed_service')->updateNewsFeed();

        //If user is logged in then show news feed
        $result = $em->getRepository('AppBundle:NewFeed')->findNewFeed($this->getUser()->getId());

        $paginator  = $this->get('knp_paginator');
        $pagination = $paginator->paginate(
            $result,
            $request->query->getInt('page', 1)/*page number*/,
            5/*limit per page*/
        );

        return array('pagination' => $pagination);
    }



    /**
     * @Route("/register/confirmed", name="registration_confirmed")
     * @Security("has_role('ROLE_USER')")
     * @return array
     */
    public function registrationConfirmedAction()
    {
        return $this->redirectToRoute('activity');
    }
}
