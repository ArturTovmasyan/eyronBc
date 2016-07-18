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
        $this->container->get('bl.doctrine.listener')->disableUserStatsLoading();

        // get entity manager
        $em = $this->getDoctrine()->getManager();

        // get user by id
        if($user){
            $user = $em->getRepository('ApplicationUserBundle:User')->findOneBy(array('uId' => $user));
        }
        else {
            $user = $this->getUser();
        }

        $em->getRepository('ApplicationUserBundle:User')->setUserStats($user);

        // get dream
        $dream = $request->get('d');

        $requestFilters = array(
            UserGoal::URGENT_IMPORTANT         => $request->get('f_' . UserGoal::URGENT_IMPORTANT)         ? true : false,
            UserGoal::URGENT_NOT_IMPORTANT     => $request->get('f_' . UserGoal::URGENT_NOT_IMPORTANT)     ? true : false,
            UserGoal::NOT_URGENT_IMPORTANT     => $request->get('f_' . UserGoal::NOT_URGENT_IMPORTANT)     ? true : false,
            UserGoal::NOT_URGENT_NOT_IMPORTANT => $request->get('f_' . UserGoal::NOT_URGENT_NOT_IMPORTANT) ? true : false,
        );

        // check statuses
        switch($status) {
            case 'active-goals':
                $status = 1;
                break;
            case 'completed-goals':
                $status = 2;
                break;
            case 'common-goals':
                $status = 3;
                break;
            default:
                $status = 0;
        }

        // create filter
        $filters = array(
            UserGoal::URGENT_IMPORTANT         => 'filter.import_urgent',
            UserGoal::URGENT_NOT_IMPORTANT     => 'filter.not_import_urgent',
            UserGoal::NOT_URGENT_IMPORTANT     => 'filter.import_not_urgent',
            UserGoal::NOT_URGENT_NOT_IMPORTANT => 'filter.not_import_not_urgent',
        );

        //This part is used for profile completion percent calculation
        if ($this->getUser()->getProfileCompletedPercent() != 100) {
            $em->getRepository("ApplicationUserBundle:User")->updatePercentStatuses($this->getUser());
        }

        // get drafts
        $myIdeasCount =  $em->getRepository("AppBundle:Goal")->findMyIdeasCount($user);

        return array(
            'profileUser'  => $user,
            'myIdeasCount' => $myIdeasCount,
            'filters'      => $filters
        );
    }
}