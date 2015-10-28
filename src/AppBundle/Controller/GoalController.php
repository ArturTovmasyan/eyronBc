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
use AppBundle\Entity\StoryImage;
use AppBundle\Entity\SuccessStory;
use AppBundle\Entity\Tag;
use AppBundle\Entity\UserGoal;
use AppBundle\Form\GoalType;
use AppBundle\Form\SuccessStoryType;
use AppBundle\Form\UserGoalType;
use Application\UserBundle\Entity\User;
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
     * @Secure(roles="ROLE_USER")
     */
    public function addAction(Request $request, $id = null)
    {
        // get entity manager
        $em = $this->getDoctrine()->getManager();

        // get current user
        $currentUser = $this->getUser();

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
                $this->removeAllOldImages();

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

                // set author
                $goal->setAuthor($currentUser);

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
    private function removeAllOldImages()
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

        // get all old story images
        $storyImages = $em->getRepository('AppBundle:StoryImage')->findAllOlder();

        // loop for images
        if($storyImages){

            // loop for images
            foreach($storyImages as $storyImage){
                $em->remove($storyImages);
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
        // get all files form request
        $file = $request->files->get('file');

        // check file
        if($file){

            // get validator
            $validator = $this->get('validator');

            // get entity manager
            $em = $this->getDoctrine()->getManager();

            // get bucket list service
            $bucketService = $this->get('bl_service');

            // create new goal image object
            $goalImage = new GoalImage();

            // set file
            $goalImage->setFile($file);

            // validate goal image
            $error = $validator->validate($goalImage);

            if(count($error) > 0){
                return new JsonResponse($error[0]->getMessage(), Response::HTTP_BAD_REQUEST);

            }
            else{ // upload image id there is no error

                // upload file
                $bucketService->uploadFile($goalImage);

                $em->persist($goalImage);
            }

            // flush data
            $em->flush();
            return new JsonResponse($goalImage->getId(), Response::HTTP_OK);

            }

        return new JsonResponse('', Response::HTTP_NOT_FOUND);
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

        // set date
        $userGoal->setCompletionDate(new \DateTime());

        $em->persist($userGoal);
        $em->flush();

        return $this->redirectToRoute("goals_list");
    }

    /**
     * @Route("/add-story/{id}", name="add_story")
     * @Template()
     * @ParamConverter("goal", class="AppBundle:Goal")
     * @param Goal $goal
     * @param Request $request
     * @return array|\Symfony\Component\HttpFoundation\RedirectResponse
     * @Secure(roles="ROLE_USER")
     */
    public function addSuccessStoryAction(Goal $goal, Request $request)
    {
        // create new success story object
        $story = new SuccessStory();

        // get entity manager
        $em = $this->getDoctrine()->getManager();

        // get users that done this goal
        $doneByUsers = $em->getRepository("ApplicationUserBundle:User")->findDoneBy($goal);

        // get users that listed this goal
        $listedByUsers = $em->getRepository("ApplicationUserBundle:User")->findListedBy($goal);

        // get current user
        $user = $this->getUser();

        // create form
        $form = $this->createForm(new SuccessStoryType(), $story);

        // check method
        if($request->isMethod("POST")) {

            // get data from request
            $form->handleRequest($request);

            // check data
            if($form->isValid()){

                // get images ids
                $images = $form->get('files')->getData();

                // remove all images that older one day
                $this->removeAllOldImages();

                if($images){

                    // get json from request
                    $images = json_decode($images);

                    // remove duplicate
                    $images = array_unique($images);

                    // get goal images form bd
                    $storyImages = $em->getRepository('AppBundle:StoryImage')->findByIDs($images);

                    // check story images
                    if($storyImages){

                        // loop for story images
                        foreach($storyImages as $storyImage){

                            // add to story
                            $story->addFile($storyImage);
                        }
                    }
                }

                // add user
                $story->setUser($user);

                // add success story to goal
                $goal->addSuccessStory($story);
                $em->persist($story);

                $em->flush();

                return $this->redirectToRoute("goals_list");
            }
        }

        return array(
            'form' => $form->createView(),
            'goal' => $goal,
            'doneByUsers' => $doneByUsers,
            'listedByUsers' => $listedByUsers,
        );
    }

    /**
     * This action is used for upload images from drag and drop
     *
     * @Route("/add-story-images", name="add-story_images")
     * @Method({"POST"})
     * @param Request $request
     * @return array
     */
    public function addSuccessStoryImage(Request $request)
    {
        // get all files form request
        $file = $request->files->get('file');

        // check file
        if($file){

            // get validator
            $validator = $this->get('validator');

            // get entity manager
            $em = $this->getDoctrine()->getManager();

            // get bucket list service
            $bucketService = $this->get('bl_service');

            // create new story image object
            $storyImage = new StoryImage();

            // set file
            $storyImage->setFile($file);

            // validate goal image
            $error = $validator->validate($storyImage);

            // check in error
            if(count($error) > 0){
                return new JsonResponse($error[0]->getMessage(), Response::HTTP_BAD_REQUEST);

            }
            else{ // upload image id there is no error

                // upload file
                $bucketService->uploadFile($storyImage);

                $em->persist($storyImage);
            }

            // flush data
            $em->flush();
            return new JsonResponse($storyImage->getId(), Response::HTTP_OK);

        }

        return new JsonResponse('', Response::HTTP_NOT_FOUND);
    }


    /**
     * @Route("/add-to-me/{id}/{userGoalId}", defaults={"userGoalId" = null}, name="add_to_me_goal")
     * @Template()
     * @ParamConverter("goal", class="AppBundle:Goal")
     * @param Goal $goal
     * @param Request $request
     * @param Request $userGoalId
     * @return array
     * @Secure(roles="ROLE_USER")
     */
    public function addToMeAction(Request $request, Goal $goal, $userGoalId = null)
    {
        // get current user
        $user = $this->getUser();

        //get entity manager
        $em = $this->getDoctrine()->getManager();

        // empty data
        $steps = array();

        // check userGoalId
        if($userGoalId){

            $userGoal = $em->getRepository("AppBundle:UserGoal")->find($userGoalId);

            // check user goal, and return not found exception
            if(!$userGoal){
                throw $this->createNotFoundException('usergoal not found');
            }

        }
        else{
            $userGoal = new UserGoal();

            //set goal
            $userGoal->setGoal($goal);
        }

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

                // set status
                $userGoal->setStatus(UserGoal::ACTIVE);

                // if user is author, and goal is in draft
                if($goal->isAuthor($user)  && $goal->getReadinessStatus() == Goal::DRAFT ){

                    // set status to publish
                    $goal->setReadinessStatus(Goal::TO_PUBLISH);
                    $em->persist($goal);
                }

                // set date
                $userGoal->setListedDate(new \DateTime());

                // set user
                $userGoal->setUser($user);

                // set step
                $userGoal->setSteps($steps);

                $doDate = $form->get('birthday')->getData();

                // check date
                if($doDate){

                    $doDate= \DateTime::createFromFormat('m/d/Y', $doDate);

                    // set do date
                    $userGoal->setDoDate($doDate);
                }

                $em->persist($userGoal);
                $em->flush();

                return $this->redirectToRoute("goals_list");
            }
        }

        return  array('form' => $form->createView(), 'data' => $userGoal);
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
     * @Route("/drafts", name="goal_drafts")
     * @Template()
     * @return array
     * @Secure(roles="ROLE_USER")
     */
    public function draftAction(Request $request)
    {
        // get entity manager
        $em = $this->getDoctrine()->getManager();

        // get current user
        $currentUser = $this->getUser();

        // get current user
        $user = $currentUser;

        // find all drafts goal
        $goals = $em->getRepository("AppBundle:Goal")->findMyDrafts($user);

        // get paginator
        $paginator  = $this->get('knp_paginator');

        // paginate data
        $pagination = $paginator->paginate(
            $goals,
            $request->query->getInt('page', 1)/*page number*/,
            9/*limit per page*/
        );

        return array('goals' => $pagination);

    }

    /**
     * @Route("/remove-goal/{goal}/{user}", name="remove_goal")
     *
     * @param Goal $goal
     * @param User $user
     * @ParamConverter("goal", class="AppBundle:Goal")
     * @ParamConverter("user", class="ApplicationUserBundle:User")
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public  function removeGoal(Goal $goal, User $user)
    {
        // get entity manager
        $em = $this->getDoctrine()->getManager();

        // get user goal
        $userGoal = $em->getRepository('AppBundle:UserGoal')->findByUserAndGoal($user, $goal);

        // remove from bd
        $em->remove($userGoal);

        $em->flush();

        return $this->redirect($_SERVER['HTTP_REFERER']);
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
