<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Goal;
use AppBundle\Entity\Page;
use AppBundle\Entity\UserGoal;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use AppBundle\Form\ContactUsType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * Class MainController
 * @package AppBundle\Controller
 */
class MainController extends Controller
{
    /**
     * @Route("/", name="homepage")
     * @Template()
     */
    public function indexAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        if (!$this->getUser()){
            $goals = $em->getRepository("AppBundle:Goal")->findAllWithCount(7);
            $em->getRepository("AppBundle:Goal")->findGoalStateCount($goals);

            return array('goals' => $goals);
        }

        // get current user
        $currentUser = $this->getUser();

        // check user is have a goal
        if (count($currentUser->getUserGoal()) == 0) {
            $url = 'goals_list';
        } else {
            $url = 'activity';
        }

        return $this->redirectToRoute($url);
    }

    /**
     * @Route("/page/{slug}", name="page")
     * @param slug
     * @Template()
     * @return array
     */
    public function pageAction(Request $request, $slug)
    {
        // get entity manager
        $em = $this->getDoctrine()->getManager();

        // get page
        $page = $em->getRepository("AppBundle:Page")->findOneBy(array('slug' => $slug));

        // check if page contact us
        if($slug == 'contact-us')
        {
            // create form type
            $form  = $this->createForm(new ContactUsType());

            // check request method
            if($request->isMethod("POST")){

                // get data from request
                $form->handleRequest($request);

                // check valid
                if($form->isValid()){
                    // get form data
                    $formData = $form->getData();
                    // get admins
                    $admins = $em->getRepository('ApplicationUserBundle:User')->findAdmins('ROLE_SUPER_ADMIN');

                    // calculate data form form
                    $contactUsData = array();

                    $contactUsData['fullName'] = $formData['fullName'];
                    $contactUsData['email'] = $formData['email'];
                    $contactUsData['subject'] = $formData['subject'];
                    $contactUsData['message'] = $formData['message'];
                    // send messages to admins by contact us content
                    foreach($admins as $admin )
                    {   // call send mailer service for calculate message content
                        $this->get('bl.email.sender')->sendContactUsEmail($admin['email'], $admin['fullName'], $contactUsData);
                    }
                    // return data after send
                    return array('page'=> $page, 'isSend'=>true);
                }
            }
            // write form
            return array('page'=> $page, 'isSend'=>false, 'form' => $form->createView());
        }

        // check page
        if(!$page){

            throw $this->createNotFoundException("Page not found");
        }

        return array('page' => $page);
    }

    /**
     * @Route("/goal-friends", name="goal_friends")
     * @Template()
     * @Security("has_role('ROLE_USER')")
     * @return array
     */
    public function goalFriendsAction(Request $request)
    {
        $search = $request->get('search') ? $request->get('search') : null;
        $em = $this->getDoctrine()->getManager();
        $goalFriends = $em->getRepository('AppBundle:Goal')->findGoalFriends($this->getUser()->getId(), false, null, $search, true);

        $paginator  = $this->get('knp_paginator');
        $pagination = $paginator->paginate(
            $goalFriends,
            $request->query->getInt('page', 1)/*page number*/,
            30/*limit per page*/
        );

        return array('pagination' => $pagination);
    }

    /**
     * @Route("/listed-users/{slug}", name="listed_users")
     * @Route("/done-users/{slug}", name="done_users")
     * @ParamConverter("goal", class="AppBundle:Goal",  options={
     *   "mapping": {"slug": "slug"},
     *   "repository_method" = "findOneBySlug" })
     * @Template()
     *
     * @param Goal $goal
     * @param Request $request
     * @return array
     */
    public function goalUsersAction(Goal $goal, Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $users = $em->getRepository('AppBundle:Goal')
            ->findGoalUsers($goal->getId(), $request->get('_route') == 'listed_users' ? null : UserGoal::COMPLETED);

        $paginator  = $this->get('knp_paginator');
        $pagination = $paginator->paginate(
            $users,
            $request->query->getInt('page', 1)/*page number*/,
            30/*limit per page*/
        );

        return $this->render('AppBundle:Main:goalFriends.html.twig', array('pagination' => $pagination));
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
        $this->get('bl_news_feed_service')->updateNewsFeed();

        //If user is logged in then show news feed
        $result = $em->getRepository('AppBundle:NewFeed')->findNewFeed($this->getUser()->getId());

        $paginator  = $this->get('knp_paginator');
        $pagination = $paginator->paginate(
            $result,
            $request->query->getInt('page', 1)/*page number*/,
            5/*limit per page*/
        );

        return array('pagination' => $pagination);
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
     * This function is view statistic
     *
     * @Route("/moderator/statistic", name="statistic_view")
     * @Template()
     * @Security("has_role('ROLE_ADMIN')")
     */
    public function statisticAction()
    {
        $em = $this->getDoctrine()->getManager();

        $createLimit = new \DateTime('now');

        $createLimit->modify('-30 days');

        $createLimit = date_format($createLimit,'Y-m-d');

        $results = $em->getRepository('AppBundle:Goal')->findGoalGroupByCreationDate($createLimit);

        $createResult = array();

        $createCount = 0;

        if($results) {

            $count = 0;

            foreach($results as $n => $result){

                $time1 = new \DateTime($result['dates']);

                $createResult[$count]['dates'] = $result['dates'];

                $createResult[$count]['counts'] = $result['counts'];

                $count++;

                $createCount +=$result['counts'];

                if(isset($results[$n + 1])){

                    $time2 = new \DateTime($results[$n+1]['dates']);

                    for($i =$count;$i < 30 ; $i++){

                        if(date_diff($time1,$time2)->d > 1){
                            $createResult[$count]['dates'] = date_format(date_add($time1, date_interval_create_from_date_string('1 days')), 'Y-m-d');
                            $createResult[$count]['counts'] = 0;
                            $count++;
                        }
                    }
                }
            };

        }
        else {
            $create = new \DateTime('now');

            $create = date_format($create,'Y-m-d');

            $createResult[0]['dates'] = $create;

            $createResult[0]['counts'] = 0;
        }



        //set updated goals in 30 days
        $updateLimit = new \DateTime('now');

        $updateLimit->modify('-30 days');

        $updateLimit = date_format($updateLimit,'Y-m-d');

        $updated = $em->getRepository('AppBundle:Goal')->findGoalGroupByUpdateDate($updateLimit);

//        dump($updated);exit;
        $updatedResult = array();

        $updateCount = 0;

        if($updated) {

            $count = 0;

            foreach($updated as $n => $update){

                $time1 = new \DateTime($update['dates']);

                $updatedResult[$count]['dates'] = $update['dates'];

                $updatedResult[$count]['counts'] = $update['counts'];

                $count++;

                $updateCount += $update['counts'];

                if(isset($updated[$n + 1])){

                    $time2 = new \DateTime($updated[$n+1]['dates']);

                    for($i =$count; $i < 30 ; $i++){

                        if(date_diff($time1,$time2)->d > 1){
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

        if($published) {

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

                        foreach ($userNames as $userName) {
                            if ($userName == $publish['publishedBy']) {

                                //when username is null move count in wiki userName
                                if ($userName == null) {

                                    $userName = 'admin@admin.com';

                                    if (isset($publishResult[$day][$userName]['counts'])) {

                                        $publishResult[$day][$userName]['counts'] += $publish['counts'];

                                        $publishResult[$day]['total']['counts'] += $publish['counts'];

                                        $perUser[$userName] += $publish['counts'];

                                    } else {
                                        if (isset($publishResult[$day]['total']['counts'])) {
                                            $publishResult[$day]['total']['counts'] += $publish['counts'];
                                        } else {
                                            $publishResult[$day]['total']['counts'] = $publish['counts'];
                                        }

                                        if (isset($perUser[$userName])) {

                                            $perUser[$userName] += $publish['counts'];
                                        } else {
                                            $perUser[$userName] = $publish['counts'];
                                        }

                                        $publishResult[$day][$userName]['counts'] = $publish['counts'];
                                    }
                                } else {
                                    //if userName is wiki and it isset
                                    if (isset($publishResult[$day][$userName]['counts'])) {

                                        $publishResult[$day]['total']['counts'] += $publish['counts'];

                                        $publishResult[$day][$userName]['counts'] += $publish['counts'];

                                        $perUser[$userName] += $publish['counts'];

                                    } else {
                                        if (isset($publishResult[$day]['total']['counts'])) {

                                            $publishResult[$day]['total']['counts'] += $publish['counts'];
                                        } else {
                                            $publishResult[$day]['total']['counts'] = $publish['counts'];
                                        }

                                        if (isset($perUser[$userName])) {

                                            $perUser[$userName] += $publish['counts'];
                                        } else {
                                            $perUser[$userName] = $publish['counts'];
                                        }

                                        $publishResult[$day][$userName]['counts'] = $publish['counts'];
                                    }
                                }

                                $publishCount += $publish['counts'];//for total

                            } elseif (!isset($publishResult[$day][$userName]['counts']) and $userName != null) {
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
            'ollDates'       => $ollDates,
            'userNames'      => $kayNames,
            'perUser'		 => $perUser,
            'result' 	     => $createResult,
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
}
