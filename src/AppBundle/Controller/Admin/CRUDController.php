<?php
/**
 * Created by PhpStorm.
 * User: artur
 * Date: 05/05/16
 * Time: 17:12 PM
 */
namespace AppBundle\Controller\Admin;

use AppBundle\Entity\Goal;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sonata\AdminBundle\Controller\CRUDController as Controller;
use Sonata\AdminBundle\Form\FormMapper;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class CRUDController extends Controller
{

    /**
     * @return \Symfony\Component\HttpFoundation\Response
     * @ParamConverter("goal", class="AppBundle:Goal")
     */

    public function mergeAction(Request $request, Goal $goal)
    {
        //get current goal
//        $object = $this->admin->getSubject();

        dump($goal);exit;
        //get entity manager
        $em = $this->get('doctrine')->getEntityManager();

        if (!$object) {
            throw new NotFoundHttpException(sprintf('unable to find the object with id : test'));
        }

//        // create goal form
//        $form = $this->createForm(new GoalSelectType);
//
//        // check request method
//        if($request->isMethod("POST")) {
//
//            // get data from request
//            $form->handleRequest($request);
//
//            // check valid
//            if ($form->isValid()) {
//
//            }
//        }

        //get all goal
        $allGoals = $em->getRepository('AppBundle:Goal')->findAll();

        return $this->render('AppBundle:Admin:goal_merge.html.twig', array(
          'mergeGoal' => $goal, 'allGoal' => $allGoals
        ));
    }

}