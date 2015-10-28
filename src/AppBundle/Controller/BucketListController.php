<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 10/26/15
 * Time: 5:34 PM
 */

namespace AppBundle\Controller;

use AppBundle\Entity\UserGoal;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class BucketListController
 * @package AppBundle\Controller
 */
class BucketListController extends Controller
{
    /**
     * @Route("/my-list/{status}", defaults={"status" = null, "filter" = null },  name="my_list")
     * @Template()
     * @param $status
     * @return array
     */
    public function myListAction($status, Request $request)
    {
        // get entity manager
        $em = $this->getDoctrine()->getManager();

        // get dream
        $dream = $request->get('d');

        // get urgent filter
        $filter = $request->get('f');

        // get current user
        $user = $this->getUser();

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

        // get popular goals
        $popularGoals = $em->getRepository("AppBundle:Goal")->findPopular($user, 2);

        return array(
            'userGoals' => $userGoals,
            'draftsCount' => $draftsCount,
            'popularGoals' => $popularGoals,
            'filters' => $filters
            );
    }
}