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
use AppBundle\Model\PublishAware;
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
use Symfony\Component\Security\Core\Exception\AccessDeniedException;


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

            if(is_null($goal)){
                throw $this->createNotFoundException("Goal not found");
            }

            if (is_null($goal->getAuthor()) || $this->getUser()->getId() != $goal->getAuthor()->getId()){
                throw $this->createAccessDeniedException("It isn't your goal");
            }

            $goal = $cloneTrue ? clone $goal : $goal;
        }
        else {
            $goal = new Goal();
        }

        $goal->setLanguage($currentUser->getLanguage());
        $goal->setAuthor($currentUser);


        $form  = $this->createForm(GoalType::class, $goal);

        if($request->isMethod("POST")){
            $form->handleRequest($request);

            if($form->isValid()){
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
        }
        elseif ($goalId){
            $request->getSession()
                ->getFlashBag()
                ->set('draft','Edit my draft  from Web');
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
        } else {
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
        $this->denyAccessUnlessGranted('edit', $goal, $this->get('translator')->trans('goal.edit_access_denied'));

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
        $this->denyAccessUnlessGranted('view', $goal, $this->get('translator')->trans('goal.view_access_denied'));

        $em = $this->getDoctrine()->getManager();
        $this->container->get('bl.doctrine.listener')->disableUserStatsLoading();

        $em->getRepository("AppBundle:Goal")->findGoalStateCount($goal);

        $doneByUsers   = $em->getRepository("AppBundle:Goal")->findGoalUsers($goal->getId(), UserGoal::COMPLETED, 0, 3);
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
     * @Route("ideas/{category}", defaults={"category" = null}, name="goals_list")
     * @param Request $request
     * @param $category
     * @Template()
     * @return array
     */
    public function listAction(Request $request, $category = null)
    {
        $em = $this->getDoctrine()->getManager();
        
        if($category){
            $request->getSession()
                ->getFlashBag()
                ->set('category','Goal select category '.$category.' from Web')
            ;
        }

        $search = $request->get('search');
        $cachePrefix = (strpos($request->getUri(), self::STAGE_URL) === false) ? self::PROD_CACHE_PREFIX : self::STAGE_CACHE_PREFIX;

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
        $em = $this->getDoctrine()->getManager();
        $env = $this->container->getParameter("kernel.environment");

        if($env == "test") {
            $tags = [];
        }

        if($tags){

            $tags = str_replace('#', '', $tags);
            $tags = json_decode($tags);

            $dbTags = $em->getRepository("AppBundle:Tag")->getTagTitles();

            $newTags = array_diff($tags, $dbTags);

            foreach($newTags as $tagString)
            {
                $tag = new Tag();
                $title = strtolower($tagString);
                $title = str_replace(',', '', $title);
                $title = str_replace(':', '', $title);
                $title = str_replace('.', '', $title);

                $tag->setTag($title);
                $object->addTag($tag);

                $em->persist($tag);
            }

            $existTags = array_diff($tags, $newTags);
            $oldTags = $em->getRepository("AppBundle:Tag")->findTagsByTitles($existTags);

            foreach($oldTags as $oldTag){
                if(!$object->getTags() || !  $object->getTags()->contains($oldTag)){
                    $object->addTag($oldTag);
                    $em->persist($oldTag);
                }
            }
        }
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
        $this->denyAccessUnlessGranted('view', $goal, $this->get('translator')->trans('goal.view_access_denied'));

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
        $em = $this->getDoctrine()->getManager();

        $object = clone $goal;

        $em->persist($object);
        $em->flush();

        return $this->redirectToRoute('add_goal', array('id' => $object->getId()));
    }

    /**
     * @Route("goal/add-modal", name="add_modal")
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

        return $this->render('AppBundle:Goal:addToMe.html.twig', array(
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
}
