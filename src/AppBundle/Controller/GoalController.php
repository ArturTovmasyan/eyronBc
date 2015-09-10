<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 9/10/15
 * Time: 9:53 AM
 */

namespace AppBundle\Controller;

use AppBundle\Entity\Goal;
use AppBundle\Entity\UserGoal;
use AppBundle\Form\GoalType;
use AppBundle\Form\UserGoalType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

/**
 * @Route("/goal")
 *
 * Class GoalController
 * @package AppBundle\Controller
 */
class GoalController extends Controller
{
    /**
     * @Route("/add", name="add_goal")
     * @Template()
     * @param Request $request
     * @return array
     */
    public function addAction(Request $request)
    {
        // create new object
        $userGoal = new UserGoal();

        // create goal form
        $form  = $this->createForm(new UserGoalType(), $userGoal);

        // check request method
        if($request->isMethod("POST")){

            // get data from request
            $form->handleRequest($request);

            // check valid
            if($form->isValid()){

                dump($userGoal);
                exit;
            }
        }

        return array('form' => $form->createView());
    }
}
