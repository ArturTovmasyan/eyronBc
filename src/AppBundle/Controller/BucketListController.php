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
     * @Route("/my-list/{status}", defaults={"status" = null },  name="my_list")
     * @Route("/user-profile/{user}/{status}", defaults={"status" = null},  name="user_profile")
     * @Template()
     * @param $user
     * @param $status
     * @return array
     * @Secure(roles="ROLE_USER")
     */
    public function myListAction(User $user = null, $status, Request $request)
    {
        // get entity manager
        $em = $this->getDoctrine()->getManager();

        // get dream
        $dream = $request->get('d');

        // get urgent filter
        $filter = $request->get('f');


        if (!$user) {
            // get current user
            $user = $this->getUser();
        }

        // find all goals
        $userGoals = $em->getRepository("AppBundle:UserGoal")
            ->findAllByUser($user, $status, $dream, $filter);

        // create filter
        $filters = array(
            UserGoal::URGENT_IMPORTANT => 'filter.import_urgent',
            UserGoal::URGENT_NOT_IMPORTANT => 'filter.not_import_urgent',
            UserGoal::NOT_URGENT_IMPORTANT => 'filter.import_not_urgent',
            UserGoal::NOT_URGENT_NOT_IMPORTANT => 'filter.not_import_not_urgent',
            );


        // get drafts
        $draftsCount =  $em->getRepository("AppBundle:Goal")->findMyDraftsCount($user);

        return array(
            'profile_user' => $user,
            'userGoals' => $userGoals,
            'draftsCount' => $draftsCount,
            'filters' => $filters
            );
    }
}