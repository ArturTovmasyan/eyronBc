<?php

namespace AppBundle\Services;

use Application\UserBundle\Entity\User;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\DependencyInjection\Container;
use Symfony\Component\Process\Process;


/**
 * Class GoogleAnalyticService
 * @package AppBundle\Services
 */

class GoogleAnalyticService
{
    /**
     * @var \Symfony\Component\DependencyInjection\Container
     */
    protected  $container;


    /**
     * @param Container $container
     */
    public function __construct(Container $container)
    {
        $this->container = $container;
    }

    /**
     * This function is used to send event in google analytics
     *
     * @param $url
     * @param $clientId
     * @throws \Exception
     */
    public function sendEventInGoogleAnalytics($url, $clientId)
    {
        //get tid in parameter
        $tid = $this->container->getParameter('ga_id');

        //data for GA event
        $data = array(
            'v' => 1,
            'tid' => $tid,
            'cid' => $clientId,
        );

        //generate url param
        $content = http_build_query($data).$url;

        //encode url
        $content = utf8_encode($content);

        //init curl
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://www.google-analytics.com/collect');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $content);

        //run curl
        $output = curl_exec($ch);

        //get curl error
        $err = curl_error($ch);

        //close curl
        curl_close($ch);

        //check if error exists
        if ($err) {

            //get logger service
            $logger = $this->container->get('logger');

            //set error in log
            $logger->error('Bad request for add event in google analytics');
        }
    }

    /**
     * This function is used to run sendEventInGoogleAnalytics function Asynchronously
     * @param $url
     */
    public function sendEventInGoogleAnalyticsAsync($url)
    {
        //get kernel debug
        $isDebug = $this->container->getParameter('kernel.debug');

        if($isDebug) {
            return;
        }

        //get request
        $request = $this->container->get('request');

        //get google analytic cookie value
        $gaValue = $request->cookies->has('_ga');

        //if ga value exist
        if($gaValue) {

            //get client id in cookie
            $clientId = $request->cookies->get('_ga');

            $clientId = substr($clientId, 6);
        }
        else{

            //generate client id
            $clientId = $this->randomNumber(9).'.'.$this->randomNumber(10);
        }

        $mainDir = str_replace('app', '', $this->container->getParameter('kernel.root_dir'));
        $newProcess = new Process("cd $mainDir && php app/console bl:analytics:request \"" . $url . "\" $clientId");
        $newProcess->start();
    }

    /**
     * This function is used to send create goal event
     */
    public function createGoalEvent()
    {
        //get create goal event
        $createGoalEvent = $this->container->getParameter('event_create_goal');

        //send event in google analytic
        $this->sendEventInGoogleAnalyticsAsync($createGoalEvent);
    }

    /**
     * This function is used to send done goal event
     */
    public function doneGoalEvent()
    {
        //get done goal event api
        $doneGoalEvent = $this->container->getParameter('event_done_goal');

        //send event in google analytic
        $this->sendEventInGoogleAnalyticsAsync($doneGoalEvent);
    }

    /**
     * This function is used to send add goal event
     */
    public function addGoalEvent()
    {
        //get addGoal event api
        $addGoalEvent = $this->container->getParameter('event_add_goal');

        //send event in google analytic
        $this->sendEventInGoogleAnalyticsAsync($addGoalEvent);
    }

    /**
     * This function is used to send remove goal event
     */
    public function removeGoalEvent()
    {
        //get remove goal event api
        $removeGoalEvent = $this->container->getParameter('event_remove_goal');

        //send event in google analytic
        $this->sendEventInGoogleAnalyticsAsync($removeGoalEvent);
    }

    /**
     * This function is used to send user register event
     */
    public function userRegisterEvent()
    {
        //get user register event api
        $userRegisterEvent = $this->container->getParameter('event_user_registration');

        //send event in google analytic
        $this->sendEventInGoogleAnalyticsAsync($userRegisterEvent);
    }

    /**
     * This function is used to send create goal story event
     */
    public function createGoalStoryEvent()
    {
        //get create story event api
        $createStoryEvent = $this->container->getParameter('event_create_story');

        //send event in google analytic
        $this->sendEventInGoogleAnalyticsAsync($createStoryEvent);
    }

    /**
     * This function is used to send login user story event
     */
    public function loginUserEvent()
    {
//        //get login user event api
//        $loginUserEvent = $this->container->getParameter('event_login_user');

//        //send event in google analytic
////        $this->sendEventInGoogleAnalyticsAsync($loginUserEvent);
    }

    /**
     * This function is used to send login user by social event
     *
     * @param $social
     */
    public function loginUserBySocialEvent($social)
    {
//        switch($social){
//            case User::FACEBOOK:
//                $parameterName = 'event_facebook_login_user';
//                break;
//            case User::GOOGLE:
//                $parameterName = 'event_google_login_user';
//                break;
//            case User::TWITTER:
//                $parameterName = 'event_twitter_login_user';
//                break;
//            default:
//                return;
//        }
//
//        //get login user by social event api
//        $loginUserBySocialEvent = $this->container->getParameter($parameterName);
//
//        //send event in google analytic
////        $this->sendEventInGoogleAnalyticsAsync($loginUserBySocialEvent);
    }

    /**
     * This function is used to send unList goal event
     */
    public function unListGoalEvent()
    {
        //get unList goal event api
        $unListGoalEvent = $this->container->getParameter('event_unlist_goal');

        //send event in google analytic
        $this->sendEventInGoogleAnalyticsAsync($unListGoalEvent);
    }

    /**
     * This function is used to send comment event
     */
    public function commentEvent()
    {
        //get comment goal event api
        $commentEvent = $this->container->getParameter('event_comment');

        //send event in google analytic
        $this->sendEventInGoogleAnalyticsAsync($commentEvent);
    }

    /**
     * This function is used to send registration user by social event
     * 
     * @param $social
     */
    public function registrationUserBySocialEvent($social)
    {
        switch($social){
            case User::FACEBOOK:
                $parameterName = 'event_facebook_registration';
                break;
            case User::GOOGLE:
                $parameterName = 'event_google_registration';
                break;
            case User::TWITTER:
                $parameterName = 'event_twitter_registration';
                break;
            default:
                return;
        }

        //get login user by social event api
        $loginUserBySocialEvent = $this->container->getParameter($parameterName);

        //send event in google analytic
        $this->sendEventInGoogleAnalyticsAsync($loginUserBySocialEvent);
    }

    /**
     * This function is used to generate random number
     *
     * @param $length
     * @return string
     */
    public function randomNumber($length) {
        $result = '';

        for($i = 0; $i < $length; $i++) {
            $result .= mt_rand(0, 9);
        }

        return $result;
    }

//    /**
//     * @return string
//     */
//    function generate_uuid() {
//        return sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
//            mt_rand(0, 0xffff), mt_rand(0, 0xffff),
//            mt_rand(0, 0xffff),
//            mt_rand(0, 0x0fff) | 0x4000,
//            mt_rand(0, 0x3fff) | 0x8000,
//            mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
//        );
//    }
}