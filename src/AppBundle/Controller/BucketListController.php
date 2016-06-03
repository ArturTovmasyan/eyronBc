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
     * @Route("/profile/{status}", defaults={"status" = null}, name="user_profile_single", requirements={"status"="active-goals|completed-goals|all"})
     * @Route("/profile/{user}/{status}", defaults={"status" = null}, requirements={"status"="active-goals|completed-goals|all|", "user"="[A-Za-z0-9]+"}, name="user_profile")
     * @Template()
     * @param User $user
     * @param $status
     * @param Request $request
     * @return array
     * @Secure(roles="ROLE_USER")
     */
    public function myListAction($user = null , $status = null , Request $request)
    {
        $this->container->get('bl.doctrine.listener')->disableIsMyGoalLoading();

        // get entity manager
        $em = $this->getDoctrine()->getManager();
        $isCurrentUser = true;

        // get user by id
        if($user){
            $user = $em->getRepository('ApplicationUserBundle:User')->findOneBy(array('uId' => $user));
        }
        else {
            $this->container->get('bl.doctrine.listener')->disableUserStatsLoading();
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

        //if it is self page
        if($user == $this->getUser()){
            $isCurrentUser = false;
        }

        // check statuses
        switch($status) {
            case 'active-goals':
                $status = 1;
                break;
            case 'completed-goals':
                $status = 2;
                break;
            default:
                $status = 0;
        }

        // find all goals
        $userGoals = $em->getRepository("AppBundle:UserGoal")
            ->findAllByUser($user, $status, $dream, $requestFilters, $isCurrentUser);

        $paginator  = $this->get('knp_paginator');
        $pagination = $paginator->paginate(
            $userGoals,
            $request->query->getInt('page', 1)/*page number*/,
            5/*limit per page*/
        );


        // create filter
        $filters = array(
            UserGoal::URGENT_IMPORTANT => 'filter.import_urgent',
            UserGoal::URGENT_NOT_IMPORTANT => 'filter.not_import_urgent',
            UserGoal::NOT_URGENT_IMPORTANT => 'filter.import_not_urgent',
            UserGoal::NOT_URGENT_NOT_IMPORTANT => 'filter.not_import_not_urgent',
        );

        //This part is used for profile completion percent calculation
        if ($this->getUser()->getProfileCompletedPercent() != 100) {
            $em->getRepository("ApplicationUserBundle:User")->updatePercentStatuses($this->getUser());
        }

        // get drafts
        $draftsCount =  $em->getRepository("AppBundle:Goal")->findMyDraftsCount($user);

        return array(
            'profileUser' => $user,
            'userGoals'   => $pagination,
            'draftsCount' => $draftsCount,
            'filters'     => $filters,
            'currentUser' => $this->getUser()
            );
    }
}