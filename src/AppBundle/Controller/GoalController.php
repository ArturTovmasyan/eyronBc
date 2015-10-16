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
use AppBundle\Entity\UserGoal;
use AppBundle\Form\GoalType;
use AppBundle\Form\UserGoalType;
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

                    // get json from request
                    $images = json_decode($images);

                    // remove duplicate
                    $images = array_unique($images);

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

                // generate url
                $url = !is_null($request->get("btn_publish")) ? "add_to_me_goal" : "view_goal";

                // redirect to view
                return $this->redirectToRoute($url, array('id'=> $goal->getId()));
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
        $images = $result =  array();

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

        if($images){
            foreach($images as $image){
                $result[] = $image->getId();
            }
        }

        return new JsonResponse($result, Response::HTTP_OK);

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
        return array('goal' => $goal);
    }

    /**
     * @Template("AppBundle:Blocks:goalInner.html.twig")
     * @ParamConverter("goal", class="AppBundle:Goal")
     * @param Goal $goal
     * @param $page
     * @return array
     */
    public function innerContentAction(Goal $goal, $page = Goal::INNER)
    {
        // get entity manager
        $em = $this->getDoctrine()->getManager();

        // get users that done this goal
        $doneByUsers = $em->getRepository("ApplicationUserBundle:User")->findDoneBy($goal);

        // get users that listed this goal
        $listedByUsers = $em->getRepository("ApplicationUserBundle:User")->findListedBy($goal);

        // get aphorism by goal
        $aphorism = $em->getRepository('AppBundle:Aphorism')->findOneRandom($goal);

        return array(
            'goal' => $goal,
            'page' => $page,
            'aphorism' => $aphorism,
            'doneByUsers' => $doneByUsers,
            'listedByUsers' => $listedByUsers
        );
    }

    /**
     * @Route("/done/{id}", name="done_goal")
     * @Template()
     * @ParamConverter("goal", class="AppBundle:Goal")
     * @param Goal $goal
     * @return array
     * @Secure(roles="ROLE_USER")
     */
    public function doneAction(Goal $goal)
    {
        // get current user
        $user = $this->getUser();

        //get entity manager
        $em = $this->getDoctrine()->getManager();

        // get user goal
        $userGoal = $em->getRepository("AppBundle:UserGoal")->findByUserAndGoal($user, $goal);

        // check user goal and create if noc exist
        if(!$userGoal){
            $userGoal = new UserGoal();
            $userGoal->setGoal($goal);
            $userGoal->setUser($user);
        }

        // set status to done
        $userGoal->setStatus(UserGoal::COMPLETED);

        $em->persist($userGoal);
        $em->flush();

        return $this->redirect($_SERVER["HTTP_REFERER"]);
    }

    /**
     * @Route("/add-to-me/{id}", name="add_to_me_goal")
     * @Template()
     * @ParamConverter("goal", class="AppBundle:Goal")
     * @param Goal $goal
     * @param Request $request
     * @return array
     * @Secure(roles="ROLE_USER")
     */
    public function addToMeAction(Goal $goal, Request $request)
    {
        // get current user
        $user = $this->getUser();

        //get entity manager
        $em = $this->getDoctrine()->getManager();

        // empty data
        $steps = array();

        $userGoal = new UserGoal();

        // create goal form
        $form  = $this->createForm(new UserGoalType(), $userGoal);

        // check method
        if($request->isMethod("POST")){

            // get data
            $form->handleRequest($request);

            // check form
            if($form->isValid()){

                // get step text
                $stepTexts = $request->get('stepText');

                // if step text
                if($stepTexts){

                    // get switch
                    $switch = $request->get('switch');

                    // loop for step text
                    foreach($stepTexts as $key => $stepText){

                        // check step text
                        if(strlen($stepText) > 0 ){
                            // get step
                            $name = $stepText;

                            // get status
                            $status = is_array($switch) && array_key_exists($key, $switch) ? UserGoal::DONE : UserGoal::TO_DO;

                            $steps[$name] = $status;
                        }
                    }
                }

                // get location
                $location = json_decode($form->get('location')->getData());

                if($location){
                    $userGoal->setAddress($location->address);
                    $userGoal->setLat($location->location->latitude);
                    $userGoal->setLng($location->location->longitude);
                }

                // check goal status
                if(!$goal->getPublish()){

                    // set to publish
                    $goal->setPublish(Goal::PUBLISH);
                }


                // set status
                $userGoal->setStatus(UserGoal::ACTIVE);

                // set user
                $userGoal->setUser($user);

                //set goal
                $userGoal->setGoal($goal);

                // set step
                $userGoal->setSteps($steps);

                // todo:: chaje to date
                $doDate = new \DateTime();

                // set do date
                $userGoal->setDoDate($doDate);

                $em->persist($userGoal);
                $em->flush();

                return $this->redirectToRoute("goals_list");
            }
        }

        return  array('form' => $form->createView());
    }


    /**
     * @Route("/list/{category}", defaults={"category" = null} ,name="goals_list")
     * @param Request $request
     * @param $category
     * @Template()
     * @return array
     */
    public function listAction(Request $request, $category = null)
    {
        // get entity manager
        $em = $this->getDoctrine()->getManager();

        // get search key
        $search = $request->get('search');

        // get categories
        $categories  = $em->getRepository('AppBundle:Category')->findAll();

        // find all goals
        $goals = $em->getRepository("AppBundle:Goal")->findAllByCategory($category, $search);

        // get paginator
        $paginator  = $this->get('knp_paginator');

        // paginate data
        $pagination = $paginator->paginate(
            $goals,
            $request->query->getInt('page', 1)/*page number*/,
            7/*limit per page*/
        );

        return array('goals' => $pagination, 'categories' => $categories);
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

            // tags that is already exist in database
            $existTags = array_diff($tags, $newTags);

            // get tags from database
            $oldTags = $em->getRepository("AppBundle:Tag")->findTagsByTitles($existTags);

            // loop for tags n database
            foreach($oldTags as $oldTag){

                // check tag in collection
                if(!$object->getTags() || !  $object->getTags()->contains($oldTag)){

                    // add tag
                    $object->addTag($oldTag);

                    // persist tag
                    $em->persist($oldTag);
                }
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
