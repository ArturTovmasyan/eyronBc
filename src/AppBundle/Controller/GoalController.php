<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 9/10/15
 * Time: 9:53 AM
 */

namespace AppBundle\Controller;

use AppBundle\Entity\Goal;
use AppBundle\Entity\GoalImage;
use AppBundle\Entity\Tag;
use AppBundle\Form\GoalType;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\SerializerBuilder;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use JMS\SecurityExtraBundle\Annotation\Secure;
use Symfony\Component\HttpFoundation\Response;


/**
 * @Route("/goal")
 *
 * Class GoalController
 * @package AppBundle\Controller
 */
class GoalController extends Controller
{
    /**
     * @Route("/add/{id}", defaults={"id" = null}, name="add_goal")
     * @Template()
     * @param Request $request
     * @param $id
     * @return array
     */
    public function addAction(Request $request, $id = null)
    {
        // get entity manager
        $em = $this->getDoctrine()->getManager();

        // check id
        if($id){

            // get goal
            $goal = $em->getRepository("AppBundle:Goal")->find($id);

            // check goal and return not found
            if(!$goal){

                throw $this->createNotFoundException("Goal $id not found");
            }

        }
        else{

            // create new object
            $goal = new Goal();
        }

        // create goal form
        $form  = $this->createForm(new GoalType(), $goal);

        // check request method
        if($request->isMethod("POST")){

            // get data from request
            $form->handleRequest($request);

            // check valid
            if($form->isValid()){

                // get tags from form
                $tags = $form->get('hashTags')->getData();

                // add tags
                $this->getAndAddTags($goal, $tags);

                // get images ids
                $images = $form->get('files')->getData();

                // remove all images that older one day
                $this->removeAllGoalImage();

                if($images){
                    $images = json_decode($images);

                    // get goal images form bd
                    $goalImages = $em->getRepository('AppBundle:GoalImage')->findByIDs($images);

                    // check goal images
                    if($goalImages){

                        // loop for goal images
                        foreach($goalImages as $goalImage){

                            // add to goal
                            $goal->addImage($goalImage);
                        }
                    }

                }
                $em->persist($goal);
                $em->flush();

                // redirect to view
                return $this->redirectToRoute('view_goal', array('id'=> $goal->getId()));
            }
        }

        return array('form' => $form->createView());
    }


    /**
     *  This function is used to remove files and goal images from db
     */
    private function removeAllGoalImage()
    {
        // get entity manager
        $em = $this->getDoctrine()->getManager();

        // get all old images
        $goalImages = $em->getRepository('AppBundle:GoalImage')->findAllOlder();

        // loop for images
        if($goalImages){

            // loop for images
            foreach($goalImages as $goalImage){
                $em->remove($goalImage);
            }
        }
    }

    /**
     * This action is used for upload images from drag and drop
     *
     * @Route("/add-images", name="add_images")
     * @Method({"POST"})
     * @param Request $request
     * @return array
     */
    public function addImagesAction(Request $request)
    {
        // empty data fro all images
        $images = array();

        // get all files form request
        $files = $request->files->get('file');

        // check file
        if($files){

            // get entity manager
            $em = $this->getDoctrine()->getManager();

            // get bucket list service
            $bucketService = $this->get('bl_service');

            // loop for files
            foreach($files as $file){

                // create new goal image object
                $goalImage = new GoalImage();

                // set file
                $goalImage->setFile($file);

                // upload file
                $bucketService->uploadFile($goalImage);

                $em->persist($goalImage);

                // add to array
                $images[] = $goalImage;
            }
            // flush data
            $em->flush();
        }


        // create json context
        $context = SerializationContext::create()->setGroups(array('images'));

        // create serializer
        $serializer = SerializerBuilder::create()->build();

        // get json content
        $jsonContent = $serializer->serialize($images, 'json', $context);

        return new Response($jsonContent, Response::HTTP_OK);

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
     * @Route("/inner/{id}", name="inner_goal")
     * @Template()
     * @ParamConverter("goal", class="AppBundle:Goal")
     * @param Goal $goal
     * @return array
     */
    public function innerAction(Goal $goal)
    {
        // get entity manager
        $em = $this->getDoctrine()->getManager();

        // get aphorism by goal
        $aphorism = $em->getRepository('AppBundle:Aphorism')->findOneRandom($goal);

        return array('goal' => $goal, 'aphorism' => $aphorism);
    }

    /**
     * @Route("/end/{id}", name="end_goal")
     * @Template()
     * @ParamConverter("goal", class="AppBundle:Goal")
     * @param Goal $goal
     * @return array
     */
    public function endAction(Goal $goal)
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
     * @param $tags
     */
    private function getAndAddTags(&$object, $tags)
    {
        // get entity manager
        $em = $this->getDoctrine()->getManager();

        // get environment
        $env = $this->container->getParameter("kernel.environment");

        // check environment
        if($env == "test") {
            $tags = array();
        }

        // check tags
        if($tags){

            // remove # from json
            $tags = str_replace('#', '', $tags);

            // get array
            $tags = json_decode($tags);

            // get tags from db
            $dbTags = $em->getRepository("AppBundle:Tag")->getTagTitles();

            // get new tags
            $newTags = array_diff($tags, $dbTags);

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
        }
    }

    /**
     * @Route("/remove-image/{filename}", name="remove_image")
     * @ParamConverter("goalImage", class="AppBundle:GoalImage",  options={
     *   "mapping": {"filename": "fileName"},
     *   "repository_method" = "findOneByFileName" })
     */
    public  function removeImage(GoalImage $goalImage)
    {
        // get entity manager
        $em = $this->getDoctrine()->getManager();

        // remove goal image files
        $goalImage->preRemove();

        // remove from bd
        $em->remove($goalImage);

        $em->flush();

        return $this->redirect($_SERVER['HTTP_REFERER']);
    }
}
