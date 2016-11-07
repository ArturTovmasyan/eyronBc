<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Goal;
use AppBundle\Entity\Page;
use AppBundle\Entity\UserGoal;
use AppBundle\Services\UserNotifyService;
use Application\UserBundle\Entity\User;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Cache;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use AppBundle\Form\ContactUsType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;


/**
 * Class MainController
 * @package AppBundle\Controller
 */
class MainController extends Controller
{
    /**
     * This action is used to redirect all gone pages
     * @Route("/listed-users/{slug}")
     * @Route("/done-users/{slug}")
     */
    public function gonePagesAction()
    {
        throw new HttpException(Response::HTTP_GONE);   
    }
    
    /**
     * @Route("/", name="homepage")
     * @Template()
     */
    public function indexAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $user = $this->getUser();

        if (!is_object($user)){

            $response = new Response();
            $response->setPublic();
            $response->headers->set('Cache-Control', 'public, must-revalidate');

            $currentDate = new \DateTime();
            $currentDate->setTimezone(new \DateTimeZone('UTC'));
            $currentDate->setTime(0, 0, 0);

            $response->setLastModified($currentDate);

            if ($response->isNotModified($request)){
                return $response;
            }

            $this->container->get('bl.doctrine.listener')->disableUserStatsLoading();

            $goals = $em->getRepository("AppBundle:Goal")->findPopular(7);
            $em->getRepository("AppBundle:Goal")->findGoalStateCount($goals);

            $stories = $em->getRepository("AppBundle:SuccessStory")->findInspireStories();

            $goalIds = [];
            foreach($stories as $story){
                $goalIds[$story->getGoal()->getId()] = 1;
            }

            $stats = $em->getRepository("AppBundle:Goal")->findGoalStateCount($goalIds, true);
            foreach($stories as &$story){
                $story->getGoal()->setStats([
                    'listedBy' => $stats[$story->getGoal()->getId()]['listedBy'],
                    'doneBy'   => $stats[$story->getGoal()->getId()]['doneBy'],
                ]);
            }

            return $this->render('AppBundle:Main:index.html.twig', array('goals' => $goals, 'stories' => $stories), $response);
        }


        if ($request->getSession()->has('vote_story_id')){
            $storyId = $request->getSession()->get('vote_story_id');
            $request->getSession()->remove('vote_story_id');
            $story = $em->getRepository('AppBundle:SuccessStory')->find($storyId);
            $this->get('bl_story_service')->voteStory($storyId, $this->getUser());

            return $this->redirectToRoute('inner_goal', ['slug' => $story->getGoal()->getSlug()]);
        }

        //check and set user activity by new feed count
        $url = 'goals_list';
        $this->get('bl_service')->setUserActivity($user, $url);
        
        return $this->redirectToRoute($url);
    }

    /**
     * @Route("/page/{slug}", name="page")
     * @Template()
     *
     * @param Request $request
     * @param $slug
     * @return array|Response
     */
    public function pageAction(Request $request, $slug)
    {
        $em   = $this->getDoctrine()->getManager();
        $env  = $this->get('kernel')->getEnvironment();
        $page = $em->getRepository("AppBundle:Page")->findOneBy(array('slug' => $slug));

        if(!$page){
            throw $this->createNotFoundException("Page has not been found!");
        }

        if($slug == 'contact-us'){
            $form = $this->createForm(ContactUsType::class);

            if($request->isMethod("POST")){
                $form->handleRequest($request);

                if($form->isValid()){
                    $formData = $form->getData();
                    $admins = $em->getRepository('ApplicationUserBundle:User')->findAdmins('ROLE_SUPER_ADMIN');

                    foreach($admins as $admin){
                        $this->get('bl.email.sender')->sendContactUsEmail($admin['email'], $admin['fullName'], $formData);
                    }

                    return ['page' => $page, 'isSend' => true];
                }
            }

            return ['page' => $page, 'isSend' => false, 'form' => $form->createView()];
        }


        $response = new Response();

        if($env == 'prod')
        {
            // set last modified data
            $response->setLastModified($page->getUpdated());
            // Set response as public. Otherwise it will be private by default.
            $response->setPublic();

            // Check that the Response is not modified for the given Request
            if ($response->isNotModified($request)) {
                // return the 304 Response immediately
                return $response;
            }
        }

        return $this->render('AppBundle:Main:page.html.twig', array('page' => $page), $response);
    }

    /**
     * @Route("/leaderboard", name="leaderboard")
     * @Template()
     */
    public function leaderboardAction()
    {
        return [];
    }

    /**
     * This action is used to include user block in header
     * @Template()
     * @return array
     */
    public function esiMenuAction()
    {
        return array();
    }

    /**
     * This action is used to include user block in header
     * @Route("/esi-user-for-amp", name="esi_user_for_amp")
     * @Template()
     * @return array
     */
    public function esiUserForAmpAction()
    {
        $user = $this->getUser();

        return array('user' => $user);
    }


    /**
     * @Route("/goal-friends", name="goal_friends")
     * @Template()
     * @Security("has_role('ROLE_USER')")
     * @return array
     */
    public function goalFriendsAction(Request $request)
    {
        $this->container->get('bl.doctrine.listener')->disableUserStatsLoading();
        $em          = $this->getDoctrine()->getManager();
        $em->getRepository('ApplicationUserBundle:User')->setUserStats($this->getUser());

        //This part is used for profile completion percent calculation
        if ($this->getUser()->getProfileCompletedPercent() != 100) {
            $em->getRepository("ApplicationUserBundle:User")->updatePercentStatuses($this->getUser());
        }
        return array();
    }

    /**
     * @Route("/notifications", name="notifications")
     * @Template()
     * @Security("has_role('ROLE_USER')")
     * @return array
     */
    public function notificationsAction(Request $request)
    {
        return array();
    }

    /**
     * @Route("/activity", name="activity")
     * @Template()
     * @Security("has_role('ROLE_USER')")
     * @return array
     */
    public function activitiesAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $em->getRepository('ApplicationUserBundle:User')->setUserStats($this->getUser());

        //This part is used for profile completion percent calculation
        if ($this->getUser()->getProfileCompletedPercent() != 100) {
            $em->getRepository("ApplicationUserBundle:User")->updatePercentStatuses($this->getUser());
        }

        return array();
    }

    /**
     * @Route("/register/confirmed", name="registration_confirmed")
     * @Security("has_role('ROLE_USER')")
     * @return array
     */
    public function registrationConfirmedAction()
    {
        return $this->redirectToRoute('activity');
    }

    /**
     * @param $index
     * @param $array
     * @return bool
     */
    private function checkAndGetFromArray($index, &$array)
    {
        // check data
        foreach ($array as $key => $value){
            if($index == $value['dates']){
                $result = $value['counts'];
                unset($array[$key]);
                return $result;
            }
        }
        return 0;
    }

    /**
     * This function is view statistic
     *
     * @Route("/moderator/goal-statistic", name="statistic_view")
     * @Template()
     * @Security("has_role('ROLE_ADMIN') or has_role('ROLE_GOD')")
     */
    public function goalStatisticAction()
    {
        $em = $this->getDoctrine()->getManager();

        // find all admins
        $admins = $em->getRepository("ApplicationUserBundle:User")->findAdmins('');
        // get admins ids
        $adminIds = array_map(function($admin){return $admin['id']; }, $admins);

        $createLimit = new \DateTime('now');
        $end = clone $createLimit;
        $createLimit->modify('-30 days');
        $start = clone $createLimit;
        $createLimit = date_format($createLimit,'Y-m-d');

        $adminResults = $em->getRepository('AppBundle:Goal')->findGoalGroupByCreationDateByAdmin($createLimit, $adminIds);
        $userResults = $em->getRepository('AppBundle:Goal')->findGoalGroupByCreationDateByUser($createLimit, $adminIds);

        $createResult = array();
        $createCount = 0;
        $createAxis = array('Total', 'By Admin', 'By User');
        $createCategories = [];
        $perUserCreated = array('By Admin' => 0, 'By User' => 0, 'Total' => 0 );

        for( $i = $start; $i < $end; $i->modify("+1 day")){

            $createResult[$i->format('Y-m-d')] = array(
                'By Admin' => 0, 'By User' => 0, 'Total' => 0
            );


            $adminResult = $this->checkAndGetFromArray($i->format('Y-m-d'), $adminResults);
            $createResult[$i->format('Y-m-d')]['By Admin'] += $adminResult;

            $userResult = $this->checkAndGetFromArray($i->format('Y-m-d'), $userResults);
            $createResult[$i->format('Y-m-d')]['By User'] += $userResult;

            $createResult[$i->format('Y-m-d')]['Total'] += $adminResult + $userResult;

            if($adminResult > 0 || $userResult > 0){
                $createCount += $createResult[$i->format('Y-m-d')]['Total'];
            }

            $perUserCreated['Total'] += ($adminResult + $userResult);
            $perUserCreated['By User'] += $userResult;
            $perUserCreated['By Admin'] += $adminResult;

            $day = $i->format('M d');
            $createCategories[] = $day;//for view oll days in graph

        }

        $createCategories = array_unique($createCategories);


//        if($results) {
//            $count = 0;
//
//            foreach($results as $n => $result)
//            {
//                $time1 = new \DateTime($result['dates']);
//                $createResult[$count]['dates'] = $result['dates'];
//                $createResult[$count]['counts'] = $result['counts'];
//                $count++;
//                $createCount +=$result['counts'];
//
//                if(isset($results[$n + 1])){
//                    $time2 = new \DateTime($results[$n+1]['dates']);
//
//                    for($i =$count;$i < 30 ; $i++)
//                    {
//                        if(date_diff($time1,$time2)->d > 1){
//                            $createResult[$count]['dates'] = date_format(date_add($time1, date_interval_create_from_date_string('1 days')), 'Y-m-d');
//                            $createResult[$count]['counts'] = 0;
//                            $count++;
//                        }
//                    }
//                }else{
//                    $time2 = new \DateTime('now');
//
//                    for($i =$count;$i < 30 ; $i++)
//                    {
//                        if(date_diff($time1,$time2)->d > 0){
//                            $createResult[$count]['dates'] = date_format(date_add($time1, date_interval_create_from_date_string('1 days')), 'Y-m-d');
//                            $createResult[$count]['counts'] = 0;
//                            $count++;
//                        }
//                    }
//                }
//            };
//        }
//        else {
//            $create = new \DateTime('now');
//            $create = date_format($create,'Y-m-d');
//            $createResult[0]['dates'] = $create;
//            $createResult[0]['counts'] = 0;
//        }


        //set updated goals in 30 days
        $updateLimit = new \DateTime('now');
        $updateLimit->modify('-30 days');
        $updateLimit = date_format($updateLimit,'Y-m-d');
        $updated = $em->getRepository('AppBundle:Goal')->findGoalGroupByUpdateDate($updateLimit);
        $updatedResult = array();
        $updateCount = 0;

        if($updated)
        {
            $count = 0;

            foreach($updated as $n => $update)
            {
                $time1 = new \DateTime($update['dates']);
                $updatedResult[$count]['dates'] = $update['dates'];
                $updatedResult[$count]['counts'] = $update['counts'];
                $count++;
                $updateCount += $update['counts'];

                if(isset($updated[$n + 1]))
                {
                    $time2 = new \DateTime($updated[$n+1]['dates']);

                    for($i =$count; $i < 30 ; $i++)
                    {
                        if(date_diff($time1,$time2)->d > 1){
                            $updatedResult[$count]['dates'] = date_format(date_add($time1, date_interval_create_from_date_string('1 days')), 'Y-m-d');
                            $updatedResult[$count]['counts'] = 0;
                            $count++;
                        }
                    }
                }
                else {
                    $time2 = new \DateTime('now');

                    for ($i = $count; $i < 30; $i++)
                    {
                        if (date_diff($time1, $time2)->d > 0) {
                            $updatedResult[$count]['dates'] = date_format(date_add($time1, date_interval_create_from_date_string('1 days')), 'Y-m-d');
                            $updatedResult[$count]['counts'] = 0;
                            $count++;
                        }
                    }
                }
            };
        }
        else {
            $update = new \DateTime('now');
            $update = date_format($update,'Y-m-d');
            $updatedResult[0]['dates'] = $update;
            $updatedResult[0]['counts'] = 0;
        }




        //set published limit in 30 days
        $publishLimit = new \DateTime('now');
        $publishLimit->modify('-30 days');
        $publishLimit = date_format($publishLimit,'Y-m-d');

        //get publish dates
        $published = $em->getRepository('AppBundle:Goal')->findPublishedGoalGroupByDate($publishLimit);

        //for calculate total count
        $publishCount = 0;
        $perUser = array();

        //create publish results for oll users
        $publishResult = array();

        if($published)
        {
            //get oll userNames
            foreach($published as $publish)
            {
                $userNames[] = $publish['publishedBy'];
                if ($publish['publishedBy'] != null) {
                    $kayNames[] = $publish['publishedBy'];//when name is null it will be exist
                }
            }

            $kayNames[] = 'total';
            $userNames = array_unique($userNames);
            $kayNames = array_unique($kayNames);

            //set publishResult
            foreach($published as $n => $publish)
            {
                $time1 = new \DateTime($publish['dates']);
                $day = $time1->format('M d');
                $ollDates[] = $day;//for view oll days in graph

                foreach ($userNames as $userName)
                {
                    if ($userName == $publish['publishedBy']) {
                        //when username is null move count in wiki userName
                        if ($userName == null) {
                            $userName = 'admin@admin.com';

                            if (isset($publishResult[$day][$userName]['counts'])) {
                                $publishResult[$day][$userName]['counts'] += $publish['counts'];
                                $publishResult[$day]['total']['counts'] += $publish['counts'];
                                $perUser[$userName] += $publish['counts'];

                            }
                            else {
                                if (isset($publishResult[$day]['total']['counts']))
                                {
                                    $publishResult[$day]['total']['counts'] += $publish['counts'];
                                }
                                else {
                                    $publishResult[$day]['total']['counts'] = $publish['counts'];
                                }

                                if (isset($perUser[$userName])) {
                                    $perUser[$userName] += $publish['counts'];
                                }
                                else {
                                    $perUser[$userName] = $publish['counts'];
                                }

                                $publishResult[$day][$userName]['counts'] = $publish['counts'];
                            }
                        } else {
                            //if userName is wiki and it isset
                            if (isset($publishResult[$day][$userName]['counts']))
                            {
                                $publishResult[$day]['total']['counts'] += $publish['counts'];
                                $publishResult[$day][$userName]['counts'] += $publish['counts'];
                                $perUser[$userName] += $publish['counts'];

                            }
                            else {
                                if (isset($publishResult[$day]['total']['counts']))
                                {
                                    $publishResult[$day]['total']['counts'] += $publish['counts'];
                                }
                                else {
                                    $publishResult[$day]['total']['counts'] = $publish['counts'];
                                }

                                if (isset($perUser[$userName]))
                                {
                                    $perUser[$userName] += $publish['counts'];
                                }
                                else{
                                    $perUser[$userName] = $publish['counts'];
                                }

                                $publishResult[$day][$userName]['counts'] = $publish['counts'];
                            }
                        }

                        $publishCount += $publish['counts'];//for total

                    }
                    elseif (!isset($publishResult[$day][$userName]['counts']) and $userName != null)
                    {
                        if (!isset($publishResult[$day]['total']['counts'])) {
                            $publishResult[$day]['total']['counts'] = 0;
                        }

                        if (!isset($perUser[$userName])) {
                            $perUser[$userName] = 0;
                        }

                        $publishResult[$day][$userName]['counts'] = 0;//if in this day user not publish
                    }
                }


                if (isset($published[$n + 1])) {

                    $time2 = new \DateTime($published[$n + 1]['dates']);

                    for ($i = 0; $i < 30; $i++) {

                        //if have day when no one not publish
                        if ($time1 !== null && date_diff($time1, $time2)->d > 1) {
                            $day = date_format(date_add($time1, date_interval_create_from_date_string('1 days')), 'M d');
                            $ollDates[] = $day;
                            $publishResult[$day]['total']['counts'] = 0;
                            foreach ($kayNames as $userName) {
                                $publishResult[$day][$userName]['counts'] = 0;
                            }
                        }
                    }
                }else{
                    $time2 = new \DateTime('now');

                    for ($i = 0; $i < 30; $i++) {

                        //if have day when no one not publish
                        if ($time1 !== null && date_diff($time1, $time2)->d > 0) {
                            $day = date_format(date_add($time1, date_interval_create_from_date_string('1 days')), 'M d');
                            $ollDates[] = $day;
                            $publishResult[$day]['total']['counts'] = 0;
                            foreach ($kayNames as $userName) {
                                $publishResult[$day][$userName]['counts'] = 0;
                            }
                        }
                    }
                }
            }

        }
        else
        {
            //if not publish date
            $update = new \DateTime('now');
            $update = date_format($update,'M d');
            $kayNames[] = 'NO ONE';
            $publishResult[$update]['NO ONE']['counts'] = 0;
            $ollDates[] = $update;
            $perUser['NO ONE'] = 0;
        }

        $perUser['Total'] = $publishCount;
        $publishAverage = (int) floor($publishCount/30);
        $createAverage = (int) floor($createCount/30);
        $updateAverage = (int) floor($updateCount/30);
        $ollDates = array_unique($ollDates);

        return array(
            'createCategories' => $createCategories,
            'createAxis' => $createAxis,
            'ollDates'       => $ollDates,
            'userNames'      => $kayNames,
            'perUser'		 => $perUser,
            'perUserCreated'		 => $perUserCreated,
            'createResult' 	     => $createResult,
            'crawlerCount'	 => $createCount,
            'crawlerAverage' => $createAverage,
            'published'	     => $publishResult,
            'publishCount'	 => $publishCount,
            'publishAverage' => $publishAverage,
            'updateResult'   => $updatedResult,
            'updateAverage'  => $updateAverage,
            'updateCount'    => $updateCount,
        );
    }

    /**
     * This function is view statistic
     *
     * @Route("/moderator/version-statistic", name="version_statistic")
     * @Template()
     * @Security("has_role('ROLE_ADMIN') or has_role('ROLE_GOD')")
     */
    public function versionStatisticAction()
    {
        $em = $this->getDoctrine()->getManager();
        $versionStatisticData = $em->getRepository('ApplicationUserBundle:User')->getAppVersionsStatistic();

        return ['appVersionStatistic' => $versionStatisticData];
    }
}


