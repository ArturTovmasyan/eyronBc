<?php
/**
 * Created by PhpStorm.
 * User: artur
 * Date: 05/05/16
 * Time: 17:12 PM
 */
namespace AppBundle\Controller\Admin;

use AppBundle\Entity\Goal;
use AppBundle\Entity\UserGoal;
use Application\CommentBundle\Entity\Thread;
use Doctrine\Common\Collections\ArrayCollection;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sonata\AdminBundle\Controller\CRUDController as Controller;
use Sonata\AdminBundle\Form\FormMapper;
use Symfony\Component\HttpFoundation\RedirectResponse;
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

        //create form
        $form = $this->createFormBuilder()
            ->add('goal', 'genemu_jqueryselect2_entity', array(
                'class' => 'AppBundle\Entity\Goal',
                'property' => 'title',
                'placeholder' => 'Select goal'))
            ->getForm();


        //check if method post
        if($request->isMethod('POST')) {

            // get data from request
            $form->handleRequest($request);

            //get goalId
            $goalId = $goal->getId();

            //get merging goal id in form
            $mergingGoal = $form->get('goal')->getData();

            //merge success story and comment with goal
            $this->mergeSuccessStoryAndComment($goal, $mergingGoal);

            //merge listed an done goal users
//            $this->mergeListedAndDoneUser($goal, $mergingGoal);

            //set flush messages
            $this->addFlash('sonata_flash_success', 'Goal id = '.$goalId.' has been success merged with id = '.$mergingGoal->getId().'');

            return new RedirectResponse($this->admin->generateUrl('list'));

        }

        return $this->render('AppBundle:Admin:goal_merge.html.twig', array(
          'goal' => $goal, 'form' => $form->createView(),
        ));
    }


    /**
     * This function is used to merge goal success story and comments
     *
     * @param $goal
     * @param $mergingGoal
     */
    public function mergeSuccessStoryAndComment($goal, $mergingGoal)
    {
        //get entity manager
        $em = $this->get('doctrine')->getManager();

        //get goal success story
        $goalSuccessStory = $goal->getSuccessStories();

        //get merge goal
        $mergeGoalObject = $em->getRepository('AppBundle:Goal')->find($mergingGoal->getId());

        foreach($goalSuccessStory as $story)
        {
            //add success story in merged goal
            $mergeGoalObject->addSuccessStory($story);
            $em->persist($mergeGoalObject);
        }

        //generate new link for merged comment
        $commentPermalink = $this->generateUrl('inner_goal', array('slug' => $mergeGoalObject->getSlug()), true);

        // get goal comments
        $goalComments = $em->getRepository("ApplicationCommentBundle:Comment")->findCommentsByGoalId($goal->getId());

        //check if goal comments exist
        if(count($goalComments) > 0){

            //get first comment in goal
            $goalComment = reset($goalComments);

            //get goal old thread for remove
            $goalOldThread = $goalComment->getThread();

            //get merged goal thread
            $mergedGoalOldThread = $em->getRepository("ApplicationCommentBundle:Comment")->findThreadByGoalId($mergingGoal->getId());

            //check if merged goal comments exist
            if(count($mergedGoalOldThread ) > 0){

                //get merged goal thread
                $mergedGoalThread = reset($mergedGoalOldThread);
            }
            else{

                //create new thread for merged goal comments
                $mergedGoalThread = new Thread();
                $mergedGoalThread->setId($mergingGoal->getId());
                $mergedGoalThread->setPermalink($commentPermalink);
                $mergedGoalThread->setLastCommentAt(new \DateTime('now'));
                $em->persist($mergedGoalThread);
            }

            foreach($goalComments as $goalComment){

                //set merged goal thread in goal comment
                $goalComment->setThread($mergedGoalThread);
                $em->persist($goalComment);
            }

            //remove goal old thread
            $em->remove($goalOldThread);
        }

        //call flush
        $em->flush();

    }

    /**
     * This function is used to merge listed and done users for goal
     *
     * @param $goal
     * @param $mergingGoal
     */

    public function mergeListedAndDoneUser($goal, $mergingGoal)
    {
        //get entity manager
        $em = $this->get('doctrine')->getManager();

//        $em->getRepository("AppBundle:Goal")->findGoalStateCount($goal);
//        $doneByUsersForGoals = $em->getRepository("AppBundle:Goal")->findGoalUsers($goal->getId(), UserGoal::COMPLETED);
//        $listedByUsersForGoals = $em->getRepository("AppBundle:Goal")->findGoalUsers($goal, UserGoal::ACTIVE);
//        $doneByUsersForMargingGoals = $em->getRepository("AppBundle:Goal")->findGoalUsers($mergingGoal->getId(), UserGoal::COMPLETED);
//        $listedByUsersForMargingGoals = $em->getRepository("AppBundle:Goal")->findGoalUsers($mergingGoal, UserGoal::ACTIVE);

//        $stats = $goal->getStats();
    }

}