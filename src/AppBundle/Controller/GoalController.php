<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 9/10/15
 * Time: 9:53 AM
 */

namespace AppBundle\Controller;

use AppBundle\Entity\GoalImage;
use AppBundle\Entity\Tag;
use AppBundle\Entity\UserGoal;
use AppBundle\Form\GoalType;
use AppBundle\Form\UserGoalType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use JMS\SecurityExtraBundle\Annotation\Secure;


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
     *  @Secure(roles="ROLE_USER")
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

                // get entity manager
                $em = $this->getDoctrine()->getManager();

                // get goal
                $goal = $userGoal->getGoal();

                //get images
                $images = $goal->getImages();

                // check images
                if($images) {

                    // loop for images
                    foreach($images as $image) {

                        // upload file
                        $image->uploadFile();

                        // ad image to goal
                        $goal->addImage($image);

                        // persist goal
                        $em->persist($goal);
                    }
                }

                // set user
                $userGoal->setUser($this->getUser());

                // get tags from description
                $tags = $goal->getHashTags();

                // check tags
                if($tags){

                    // get tags from db
                    $dbTags = $em->getRepository("AppBundle:Tag")->getTagTitles();

                    // get new tags
                    $newTags = array_diff($tags, $dbTags);

                    // tags that is already exist in database
                    $existTags = array_diff($tags, $newTags);

                    // get tags from database
                    $oldTags = $em->getRepository("AppBundle:Tag")->findTagsByTitles($existTags);

                    // loop for array
                    foreach($newTags as $tagString){

                        // create new tag
                        $tag = new Tag();

                        // set tag title
                        $tag->setTag(strtolower($tagString));

                        // add tag
                        $goal->addTag($tag);
                    }

                    // loop for tags n database
                    foreach($oldTags as $oldTag){

                        // add tag
                        $goal->addTag($oldTag);
                    }
                }

                $em->persist($userGoal);
                $em->flush();

                // redirect to view
                return $this->redirectToRoute('view_goal', array('id' => $userGoal->getId()));

            }
        }

        return array('form' => $form->createView());
    }

    /**
     * @Route("/view/{id}", name="view_goal")
     * @Template()
     * @ParamConverter("userGoal", class="AppBundle:UserGoal")
     * @param UserGoal $userGoal
     * @return array
     */
    public function viewAction(UserGoal $userGoal)
    {
        return array('userGoal' => $userGoal);
    }
}
