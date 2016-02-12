<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 10/26/15
 * Time: 5:34 PM
 */

namespace AppBundle\Controller;

use AppBundle\Entity\UserGoal;
use Application\UserBundle\Entity\User;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use JMS\SecurityExtraBundle\Annotation\Secure;

/**
 * Class BucketListController
 * @package AppBundle\Controller
 */
class BucketListController extends Controller
{
    /**
     * @Route("/user-profile/{user}/{status}", defaults={"status" = null}, requirements={"status"="active-goals|completed-goals|all|", "user"="\d+"}, name="user_profile")
     * @Route("/user-profile/{status}", name="user_profile_single")
     * @Template()
     * @param User $user
     * @param $status
     * @param Request $request
     * @return array
     * @Secure(roles="ROLE_USER")
     */
    public function myListAction($user = null , $status = null , Request $request)
    {
        // check route status
        if(is_numeric($status) )
        {
            $user = $status;
            $status = 'all';
        }

        // get entity manager
        $em = $this->getDoctrine()->getManager();

        // get user by id
        if($user)
        {
            $user = $em->getRepository('ApplicationUserBundle:User')->find($user);
        }

        // get dream
        $dream = $request->get('d');

        $requestFilters = array(
            UserGoal::URGENT_IMPORTANT         => $request->get('f_' . UserGoal::URGENT_IMPORTANT)         ? true : false,
            UserGoal::URGENT_NOT_IMPORTANT     => $request->get('f_' . UserGoal::URGENT_NOT_IMPORTANT)     ? true : false,
            UserGoal::NOT_URGENT_IMPORTANT     => $request->get('f_' . UserGoal::NOT_URGENT_IMPORTANT)     ? true : false,
            UserGoal::NOT_URGENT_NOT_IMPORTANT => $request->get('f_' . UserGoal::NOT_URGENT_NOT_IMPORTANT) ? true : false,
        );


        if (!$user) {
            // get current user
            $user = $this->getUser();
        }

        // check statuses
        if($status === 'active-goals')
        {
            $status = 1;
        }
        elseif ($status === 'completed-goals')
        {
            $status = 2;
        }
        else {
            $status = 0;
        }

        // find all goals
        $userGoals = $em->getRepository("AppBundle:UserGoal")
            ->findAllByUser($user, $status, $dream, $requestFilters);

        $paginator  = $this->get('knp_paginator');
        $pagination = $paginator->paginate(
            $userGoals,
            $request->query->getInt('page', 1)/*page number*/,
            10/*limit per page*/
        );


        // create filter
        $filters = array(
            UserGoal::URGENT_IMPORTANT => 'filter.import_urgent',
            UserGoal::URGENT_NOT_IMPORTANT => 'filter.not_import_urgent',
            UserGoal::NOT_URGENT_IMPORTANT => 'filter.import_not_urgent',
            UserGoal::NOT_URGENT_NOT_IMPORTANT => 'filter.not_import_not_urgent',
        );

        // get current user with relations, for db optimization
        $currentUser = $em->getRepository("ApplicationUserBundle:User")->findWithRelationsById($this->getUser()->getId());

        // get drafts
        $draftsCount =  $em->getRepository("AppBundle:Goal")->findMyDraftsCount($user);

        return array(
            'profileUser' => $user,
            'userGoals' => $pagination,
            'draftsCount' => $draftsCount,
            'filters' => $filters,
            'currentUser' => $currentUser
            );
    }
}