<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 9/10/15
 * Time: 9:53 AM
 */

namespace AppBundle\Controller;

use AppBundle\Entity\Goal;
use AppBundle\Entity\Tag;
use AppBundle\Form\GoalType;
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
        $goal = new Goal();

        // create goal form
        $form  = $this->createForm(new GoalType(), $goal);

        $bucketService = $this->get('bl_service');

        // check request method
        if($request->isMethod("POST")){

            // get data from request
            $form->handleRequest($request);

            // check valid
            if($form->isValid()){

                // get entity manager
                $em = $this->getDoctrine()->getManager();

                //get images
                $images = $goal->getImages();

                // check images
                if($images) {

                    // loop for images
                    foreach($images as $image) {

                        $bucketService->uploadFile($image);

                        // ad image to goal
                        $goal->addImage($image);

                        // persist goal
                        $em->persist($goal);
                    }
                }

                // get gags
                $this->getAndAddTags($goal);

                $em->persist($goal);
                $em->flush();

                // redirect to view
                return $this->redirectToRoute('view_goal', array('id' => $goal->getId()));

            }
        }

        return array('form' => $form->createView());
    }

    /**
     * @Route("/view/{id}", name="view_goal")
     * @Template()
     * @ParamConverter("goal", class="AppBundle:Goal")
     * @param Goal $goal
     * @return array
     */
    public function viewAction(Goal $goal)
    {
        return array('goal' => $goal);
    }


    /**
     * @Route("/list", name="goals_list")
     * @Template()
     * @return array
     */
    public function listAction()
    {
        // get entity manager
        $em = $this->getDoctrine()->getManager();

        // find all goals
        $goals = $em->getRepository("AppBundle:Goal")->findAll();

        return array('goals' => $goals);
    }


    /**
     * @param $object
     */
    private function getAndAddTags(&$object)
    {
        // get entity manager
        $em = $this->getDoctrine()->getManager();

        // get content
        $content = $object->getDescription();

        // get tags from description
        $tags = $this->getHashTags($content);

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

                $title = strtolower($tagString);

                // replace ',' symbols
                $title = str_replace(',', '', $title);

                // replace ':' symbols
                $title = str_replace(':', '', $title);

                // replace '.' symbols
                $title = str_replace('.', '', $title);

                // set tag title
                $tag->setTag($title);

                // add tag
                $object->addTag($tag);

                // persist tag
                $em->persist($tag);

            }

            // loop for tags n database
            foreach($oldTags as $oldTag){

                // check tag in collection
                if(!$object->getTags()->contains($oldTag)){

                    // add tag
                    $object->addTag($oldTag);

                    // persist tag
                    $em->persist($oldTag);
                }
            }
        }
    }

    /**
     * @param $text
     * @return mixed
     */
    private function getHashTags($text)
    {
        // get description
        $content = strtolower($text);

        // get hash tags
        preg_match_all("/#(\w+)/", $content, $hashTags);

        // return hash tags
        return $hashTags[1];
    }
}
