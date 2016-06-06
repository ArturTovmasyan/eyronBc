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
     * @throws \Exception
     */
    public function sendEventInGoogleAnalytics($url)
    {
        //get user uid
        $user = $this->container->get('security.token_storage')->getToken()->getUser();

        //check if user has uid
        if($user && $user->getUId()) {
            //set client id
            $clientId = $user->getUId();
        }
        else{
            //generate random client id for GA
            $clientId = $this->randomNumber(12);
        }

        //init curl
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "https://www.google-analytics.com/collect?cid=".$clientId);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $url);

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
        $mainDir = str_replace('app', '', $this->container->getParameter('kernel.root_dir'));
        $newProcess = new Process("cd $mainDir && php app/console bl:analytics:request \"" . $url . "\"");
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
//        $this->sendEventInGoogleAnalyticsAsync($createGoalEvent);
        $this->sendEventInGoogleAnalytics($createGoalEvent);
    }

    /**
     * This function is used to send done goal event
     */
    public function doneGoalEvent()
    {
        //get done goal event api
        $doneGoalEvent = $this->container->getParameter('event_done_goal');

        //send event in google analytic
//        $this->sendEventInGoogleAnalyticsAsync($doneGoalEvent);
        $this->sendEventInGoogleAnalytics($doneGoalEvent);
    }

    /**
     * This function is used to send add goal event
     */
    public function addGoalEvent()
    {
        //get addGoal event api
        $addGoalEvent = $this->container->getParameter('event_add_goal');

        //send event in google analytic
//        $this->sendEventInGoogleAnalyticsAsync($addGoalEvent);
        $this->sendEventInGoogleAnalytics($addGoalEvent);
    }

    /**
     * This function is used to send remove goal event
     */
    public function removeGoalEvent()
    {
        //get remove goal event api
        $removeGoalEvent = $this->container->getParameter('event_remove_goal');

        //send event in google analytic
//        $this->sendEventInGoogleAnalyticsAsync($removeGoalEvent);
        $this->sendEventInGoogleAnalytics($removeGoalEvent);
    }

    /**
     * This function is used to send user register event
     */
    public function userRegisterEvent()
    {
        //get user register event api
        $userRegisterEvent = $this->container->getParameter('event_user_registration');

        //send event in google analytic
//        $this->sendEventInGoogleAnalyticsAsync($userRegisterEvent);
        $this->sendEventInGoogleAnalytics($userRegisterEvent);
    }

    /**
     * This function is used to send create goal story event
     */
    public function createGoalStoryEvent()
    {
        //get create story event api
        $createStoryEvent = $this->container->getParameter('event_create_story');

        //send event in google analytic
//        $this->sendEventInGoogleAnalyticsAsync($createStoryEvent);
        $this->sendEventInGoogleAnalytics($createStoryEvent);
    }

    /**
     * This function is used to send login user story event
     */
    public function loginUserEvent()
    {
        //get login user event api
        $loginUserEvent = $this->container->getParameter('event_login_user');

        //send event in google analytic
//        $this->sendEventInGoogleAnalyticsAsync($loginUserEvent);
        $this->sendEventInGoogleAnalytics($loginUserEvent);
    }

    /**
     * This function is used to send login user by social event
     *
     * @param $social
     */
    public function loginUserBySocialEvent($social)
    {
        switch($social){
            case User::FACEBOOK:
                $parameterName = 'event_facebook_login_user';
                break;
            case User::GOOGLE:
                $parameterName = 'event_google_login_user';
                break;
            case User::TWITTER:
                $parameterName = 'event_twitter_login_user';
                break;
            default:
                return;
        }

        //get login user by social event api
        $loginUserBySocialEvent = $this->container->getParameter($parameterName);

        //send event in google analytic
//        $this->sendEventInGoogleAnalyticsAsync($loginUserBySocialEvent);
        $this->sendEventInGoogleAnalytics($loginUserBySocialEvent);
    }

    /**
     * This function is used to send unList goal event
     */
    public function unListGoalEvent()
    {
        //get unList goal event api
        $unListGoalEvent = $this->container->getParameter('event_unlist_goal');

        //send event in google analytic
//        $this->sendEventInGoogleAnalyticsAsync($unListGoalEvent);
        $this->sendEventInGoogleAnalytics($unListGoalEvent);

    }

    /**
     * This function is used to send comment event
     */
    public function commentEvent()
    {
        //get comment goal event api
        $commentEvent = $this->container->getParameter('event_comment');

        //send event in google analytic
//        $this->sendEventInGoogleAnalyticsAsync($commentEvent);
        $this->sendEventInGoogleAnalytics($commentEvent);
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
//        $this->sendEventInGoogleAnalyticsAsync($loginUserBySocialEvent);
        $this->sendEventInGoogleAnalytics($loginUserBySocialEvent);
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
}