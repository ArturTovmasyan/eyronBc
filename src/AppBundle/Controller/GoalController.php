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
use AppBundle\Entity\Tag;
use AppBundle\Entity\UserGoal;
use AppBundle\Form\GoalType;
use JMS\Serializer\SerializationContext;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use JMS\SecurityExtraBundle\Annotation\Secure;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;


/**
 * @Route("/")
 *
 * Class GoalController
 * @package AppBundle\Controller
 */
class GoalController extends Controller
{
    const STAGE_URL = 'http://stage.bucketlist127.com/';
    const STAGE_CACHE_PREFIX = '-stage';
    const PROD_CACHE_PREFIX = '-prod';

    /**
     * @Route("goal/create", name="add_goal")
     * @Template()
     * @Secure(roles="ROLE_USER")
     *
     * @param Request $request
     * @return array
     * @throws
     */
    public function addAction(Request $request)
    {
        $em          = $this->getDoctrine()->getManager();
        $currentUser = $this->getUser();

        $goalId      = $request->get('id');
        $cloneTrue   = $request->get('clone');


        //If we clone or edit any goal
        if($goalId)
        {
            $goal = $em->getRepository("AppBundle:Goal")->findGoalWithAuthor($goalId);

            if (is_null($goal->getAuthor()) || $this->getUser()->getId() != $goal->getAuthor()->getId()){
                throw $this->createAccessDeniedException("It isn't your goal");
            }

            if(is_null($goal)){
                throw $this->createNotFoundException("Goal not found");
            }

            $goal = $cloneTrue ? clone $goal : $goal;
        }
        else {
            $goal = new Goal();
        }

        $goal->setLanguage($currentUser->getLanguage());
        $goal->setAuthor($currentUser);


        $form  = $this->createForm(GoalType::class, $goal);

        if($request->isMethod("POST"))
        {
            $form->handleRequest($request);

            if($form->isValid())
            {
                if ($videoLinks = $goal->getVideoLink()){
                    $videoLinks = array_values($videoLinks);
                    $videoLinks = array_filter($videoLinks);

                    $goal->setVideoLink($videoLinks);
                }

                $tags = $form->get('hashTags')->getData();
                $this->getAndAddTags($goal, $tags);

                // get images ids
                $images = $form->get('files')->getData();

                if($images){
                    $images     = json_decode($images);
                    $images     = array_unique($images);
                    $goalImages = $em->getRepository('AppBundle:GoalImage')->findByIDs($images);

                    if($goalImages){
                        foreach($goalImages as $goalImage){
                            $goal->addImage($goalImage);
                        }
                    }
                }

                if (!is_null($request->get("btn_publish"))) {

                    $goal->setDescription(str_replace('#', '', $goal->getDescription()));

                    $em->persist($goal);
                    $em->flush();

                    $request->getSession()
                        ->getFlashBag()
                        ->set('success','Your Goal has been Successfully Published');

                    return new Response($goal->getId());
                }

                $em->persist($goal);
                $em->flush();

                return  $this->redirectToRoute('view_goal', ['slug'=> $goal->getSlug()]);
            }
        }

        $slug = $request->get('slug', null);
        $isPrivate = ($slug == "drafts" || $slug == null) ? false : true;

        if($isPrivate){
            $request->getSession()
                ->getFlashBag()
                ->set('private','Edit my private idea from Web');
        } elseif ($goalId){
            $request->getSession()
                ->getFlashBag()
                ->set('draft','Edit my draft  from Web')
            ;
        }


        return array('form' => $form->createView(), 'currentUser' => $currentUser, 'isPrivate' => $isPrivate, 'id' => $goalId);
    }

    /**
     * @Route("goal/my-ideas/{slug}", defaults={"slug" = null}, name="my_ideas")
     * @Template()
     * @Secure(roles="ROLE_USER")
     *
     * @return array
     * @param $slug
     * @param Request $request
     */
    public function myIdeasAction($slug = null, Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        if($slug == 'drafts'){
            // find all drafts goal
            $goals = $em->getRepository("AppBundle:Goal")->findMyDrafts($this->getUser());
        } else{
            // find all private goals
            $goals = $em->getRepository("AppBundle:Goal")->findMyPrivateGoals($this->getUser());
        }

        $paginator  = $this->get('knp_paginator');

        $pagination = $paginator->paginate(
            $goals,
            $request->query->getInt('page', 1)/*page number*/,
            9/*limit per page*/
        );

        //This part is used for profile completion percent calculation
        if ($this->getUser()->getProfileCompletedPercent() != 100) {
            $em->getRepository("ApplicationUserBundle:User")->updatePercentStatuses($this->getUser());
        }

        $em->getRepository('ApplicationUserBundle:User')->setUserStats($this->getUser());

        return array(
            'goals'       => $pagination,
            'slug'        => $slug,
            'profileUser' => $this->getUser()
        );
    }

    /**
     * @Route("goal/view/{slug}", name="view_goal")
     * @Template()
     * @ParamConverter("goal", class="AppBundle:Goal",  options={
     *   "mapping": {"slug": "slug"},
     *   "repository_method" = "findBySlugWithRelations" })
     *
     * @param Goal $goal
     * @return array
     */
    public function viewAction(Goal $goal)
    {
        return array('goal' => $goal);
    }

    /**
     * @Template("AppBundle:Blocks:goalInner.html.twig")
     * @ParamConverter("goal", class="AppBundle:Goal")
     *
     * @param Goal $goal
     * @param $page
     * @return array
     */
    public function innerContentAction(Goal $goal, $page = Goal::INNER)
    {
        $em = $this->getDoctrine()->getManager();
        $this->container->get('bl.doctrine.listener')->disableUserStatsLoading();

        $em->getRepository("AppBundle:Goal")->findGoalStateCount($goal);

        $doneByUsers = $em->getRepository("AppBundle:Goal")->findGoalUsers($goal->getId(), UserGoal::COMPLETED, 0, 3);
        $listedByUsers = $em->getRepository("AppBundle:Goal")->findGoalUsers($goal, UserGoal::ACTIVE, 0, 3 );

        // get aphorism by goal
        $aphorisms = $em->getRepository('AppBundle:Aphorism')->findOneRandom($goal);

        return array(
            'goal'          => $goal,
            'page'          => $page,
            'aphorisms'     => $aphorisms,
            'doneByUsers'   => $doneByUsers,
            'listedByUsers' => $listedByUsers
        );
    }

    /**
     * @Route("goal/done/{id}", name="done_goal")
     * @Template()
     * @ParamConverter("goal", class="AppBundle:Goal")
     *
     * @param Goal $goal
     * @param Request $request
     * @return array
     * @Secure(roles="ROLE_USER")
     */
    public function doneAction(Goal $goal, Request $request)
    {
        // get current user
        $user = $this->getUser();
        $this->container->get('bl.doctrine.listener')->disableUserStatsLoading();

        //get entity manager
        $em = $this->getDoctrine()->getManager();

        // get user goal
        $userGoal = $em->getRepository("AppBundle:UserGoal")->findByUserAndGoal($user->getId(), $goal->getId());

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

        if ($request->query->get('ajax')){
            return new Response('ok');
        }

        return $this->redirectToRoute("user_profile_single", array('status' => 'completed-goals'));
    }

    /**
     * @Route("goal/add-modal", name="add_modal")
     * @Template()
     * @return array
     */
    public function addModalAction()
    {
        // create filter
        $filters = array(
            UserGoal::NOT_URGENT_IMPORTANT => 'filters.import_not_urgent',
            UserGoal::URGENT_IMPORTANT => 'filters.import_urgent',
            UserGoal::NOT_URGENT_NOT_IMPORTANT => 'filters.not_import_not_urgent',
            UserGoal::URGENT_NOT_IMPORTANT => 'filters.not_import_urgent',
        );

        return $this->render('@App/Goal/addToMe.html.twig', array(
            'filters' => $filters
        ));
    }

    /**
     * @Route("goal/done-modal", name="done_modal")
     * @return array
     */
    public function doneModalAction()
    {
        return $this->render('AppBundle:Goal:addSuccessStory.html.twig');
    }

    /**
     * @Route("ideas/{category}", defaults={"category" = null}, name="goals_list")
     * @param Request $request
     * @param $category
     * @Template()
     * @return array
     */
    public function listAction(Request $request, $category = null)
    {
        // get entity manager
        $em = $this->getDoctrine()->getManager();
        
        if($category){
            $request->getSession()
                ->getFlashBag()
                ->set('category','Goal select category '.$category.' from Web')
            ;
        }

        // get search key
        $search = $request->get('search');

        $cachePrefix = (strpos($request->getUri(), self::STAGE_URL) === false) ? self::PROD_CACHE_PREFIX : self::STAGE_CACHE_PREFIX;

        // get categories
        $categories  = $em->getRepository('AppBundle:Category')->getAllCached($cachePrefix);

        $serializer = $this->get('serializer');
        $categoriesJson = $serializer->serialize($categories, 'json', SerializationContext::create()->setGroups(array('category')));

        return array('category' => $category, 'categories' => $categories, 'search' => $search, 'categoriesJson' => $categoriesJson);
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
     * @Route("goal/remove-ideas/{goal}/{slug}", defaults={"slug" = null}, name="remove_my_ideas")
     *
     * @param Goal $goal
     * @param $slug
     * @param Request $request
     * @ParamConverter("goal", class="AppBundle:Goal")
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     * @Secure(roles="ROLE_USER")
     *
     * @deprecated must be checked and removed
     */
    public function removeDraftGoal(Goal $goal, $slug = null, Request $request)
    {
        // get entity manager
        $em = $this->getDoctrine()->getManager();

        // get current user
        $user = $this->getUser();

        // get user goal
        $userGoal = $em->getRepository('AppBundle:UserGoal')->findByUserAndGoal($user->getId(), $goal->getId());

        //check if user goal exist and 1
        if(count($userGoal) == 1){
            // remove from bd
            $em->remove($userGoal);
        }

        //get goal draft by goal id
        $goalDraft = $em->getRepository('AppBundle:Goal')->find($goal);

        //check user goal
        if(!$goalDraft){

            // return Exception
            throw $this->createNotFoundException("This draft goal by id $goal not found");
        }

        // remove from bd
        $em->remove($goalDraft);
        $em->flush();

        if($slug == "drafts"){
            $request->getSession()
                ->getFlashBag()
                ->set('draft','Delete my draft from Web')
            ;
        }else{
            $request->getSession()
                ->getFlashBag()
                ->set('private','Delete my private idea from Web')
            ;
        }

        return $this->redirectToRoute("my_ideas", array('slug' => $slug));
    }

    /**
     * @Route("goal/remove-image/{filename}", name="remove_image")
     * @Secure(roles="ROLE_USER")
     * @ParamConverter("goalImage", class="AppBundle:GoalImage",  options={
     *   "mapping": {"filename": "fileName"},
     *   "repository_method" = "findOneByFileName" })
     *
     * @param GoalImage $goalImage
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function removeImage(GoalImage $goalImage)
    {
        // get entity manager
        $em = $this->getDoctrine()->getManager();

        $goalImage->getGoal()->removeImage($goalImage);
        $goalImages = $goalImage->getGoal()->getImages();
        if ($goalImage->getList() && $goalImages->first()){
            $goalImages->first()->setList(true);
        }
        if ($goalImage->getCover() && $goalImages->first()){
            $goalImages->first()->setCover(true);
        }

        // remove from bd
        $em->remove($goalImage);

        $em->flush();

        if (isset($_SERVER['HTTP_REFERER'])){

            return $this->redirect($_SERVER['HTTP_REFERER']);
        }

        return new Response('', Response::HTTP_OK);
    }

    /**
     * @Route("goal/{slug}", name="inner_goal")
     * @Template()
     * @ParamConverter("goal", class="AppBundle:Goal",  options={
     *   "mapping": {"slug": "slug"},
     *   "repository_method" = "findBySlugWithRelations" })
     * @param Goal $goal
     * @return array
     *
     */
    public function showAction(Goal $goal)
    {
        return array('goal' => $goal);
    }

    /**
     * @Route("clone/{slug}", name="clone_goal")
     * @Secure(roles="ROLE_SUPER_ADMIN")
     * @ParamConverter("goal", class="AppBundle:Goal",  options={
     *   "mapping": {"slug": "slug"},
     *   "repository_method" = "findBySlugWithRelations" })
     *
     * @param Goal $goal
     * @return array
     * @deprecated must be removed
     */
    public function cloneAction(Goal $goal)
    {
        // get entity manager
        $em = $this->getDoctrine()->getManager();
        // clone goal
        $object = clone $goal;
        // persist goal
        $em->persist($object);
        $em->flush();

        // redirect to goal add
        return $this->redirectToRoute('add_goal', array('id'=>$object->getId()));

    }
}
