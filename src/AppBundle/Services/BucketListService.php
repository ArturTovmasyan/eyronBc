<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 9/11/15
 * Time: 1:29 PM
 */

namespace AppBundle\Services;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\DependencyInjection\Container;


/**
 * Class BucketListService
 * @package AppBundle\Services
 */
class BucketListService
{
    /**
     * @var \Symfony\Component\DependencyInjection\Container
     */
    protected  $container;

    /**
     * @var
     */
    protected $em;

    /**
     * @param Container $container
     */
    public function __construct(Container $container)
    {
        $this->container = $container;
        $this->em = $container->get('doctrine')->getManager();
    }

    /**
     * This function is used to upload image
     *
     */

    /**
     * @param $object
     */
    public function uploadFile(&$object)
    {
        // the file property can be empty if the field is not required
        if (null == $object->getFile())
        {
            return;
        }
        // check file name
        if($object->getFileName()){
            // get file path
            $path = $object->getAbsolutePath() . $object->getFileName();
            // check file
            if(file_exists($path) && is_file($path)){
                // remove file
                unlink($path);
            }
        }

        // get file originalName
        $object->setFileOriginalName($object->getFile()->getClientOriginalName());

        // get file
        $path_parts = pathinfo($object->getFile()->getClientOriginalName());

        // generate filename
        if(!$path_parts['extension']){
            $extension = $object->getFile()->getMimeType();
            $extension = substr($extension ,strpos($extension, '/') + 1);
        }else{
            $extension = $path_parts['extension'];
        }
        $object->setFileName(md5(microtime()) . '.' . $extension);

        // set size
        $object->setFileSize($object->getFile()->getClientSize());

        // upload file
        $object->getFile()->move($object->getAbsolutePath(), $object->getFileName());

        // set file to null
        $object->setFile(null);
    }

    /**
     * This function is used to generate files for tablet
     *
     * @param $object
     */
    public function generateFilesForApplication(&$object)
    {
        // get original file
        $file = $object->getAbsolutePath() . $object->getFileName() ;

        if(!file_exists($file) && is_file($file)){
            return;
        }
        // create imagick for mobile image
        $im = new \Imagick($file);
        $im->setImageCompressionQuality(100);
        $im->resizeImage($this->container->getParameter('mobile')['with'], $this->container->getParameter('mobile')['height'],
            \Imagick::FILTER_LANCZOS, 0.7, false);

        // check if folder is not exist, create it
        if (!file_exists($object->getAbsoluteMobilePath())) {
            mkdir($object->getAbsoluteMobilePath(), 0777, true);
        }

        $mobileFile = $object->getAbsoluteMobilePath() . $object->getFileName();
        $im->writeImage( $mobileFile );
        $im->clear();
        $im->destroy();

        // create imagick for tablet image
        $im = new \Imagick($file);
        $im->setImageCompressionQuality(100);
        $im->resizeImage($this->container->getParameter('tablet')['with'], $this->container->getParameter('tablet')['height'],
            \Imagick::FILTER_LANCZOS, 0.7, false);

        // check if folder is not exist, create it
        if (!file_exists($object->getAbsoluteTabletPath())) {
            mkdir($object->getAbsoluteTabletPath(), 0777, true);
        }

        $tabletFile = $object->getAbsoluteTabletPath() . $object->getFileName();
        $im->writeImage( $tabletFile );
        $im->clear();
        $im->destroy();
    }

    /**
     * This function is used to send event in google analytics
     *
     * @param $url
     * @throws \Exception
     */
    public function sendEventInGoogleAnalytics($url)
    {
        //init curl
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_HEADER, 0);

        //run curl
        $output = curl_exec($ch);

        //check if error exists
        if ($output === false) {

            //get logger service
            $logger = $this->container->get('logger');

            //set error in log
            $logger->error('Bad request for add event in google analytics');
        }
        
        //close curl
        curl_close($ch);
    }

    /**
     * This function is used to send create goal event 
     */
    public function createGoalEvent()
    {
        //get create goal event
        $createGoalEvent = $this->container->getParameter('event_create_goal');
        
        //send event in google analytic
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
        $this->sendEventInGoogleAnalytics($removeGoalEvent);
    }

    /**
     * This function is used to send user register event
     */
    public function userRegisterEvent()
    {
        //get user register event api
        $userRegisterEvent = $this->container->getParameter('event_user_register');

        //send event in google analytic
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
            case 'Facebook':
                $parameterName = 'event_facebook_login_user';
                break;
            case 'Google':
                $parameterName = 'event_google_login_user';
                break;
            case 'Twitter':
                $parameterName = 'event_twitter_login_user';
                break;
            default:
                return;
        }
        
        //get login user by social event api
        $loginUserBySocialEvent = $this->container->getParameter($parameterName);

        //send event in google analytic
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
        $this->sendEventInGoogleAnalytics($unListGoalEvent);
    }

    /**
     * This function is used to check user have activity and set it
     *
     * @param $user
     * @param bool $inLogin
     * @param string $url
     */
    public function setUserActivity($user, $inLogin = false, &$url = null)
    {
        //get new feed is log service
        $this->container->get('bl_news_feed_service')->updateNewsFeed();
        
        //If user is logged in then show news feed
        $feedCount = $this->em->getRepository('AppBundle:NewFeed')->findNewFeedCounts($user->getId());
        
        //check if service call after login
        if ($inLogin) {
            
            //check user is not have a new feed
            if ($feedCount == 0) {

                //set redirect url to ideas list
                $url = 'goals_list';
                $user->setActivity(false);

            }else {

                //set redirect url to activity page
                $url = 'activity';
                $user->setActivity(true);
            }
        }
        else {
            
            //get user activity
            $activity = $user->getActivity();

            //check if user don't have activity
            if (!$activity) {

                //check if user dont have activity
                if($feedCount > 0) {
                    $user->setActivity(true);
                }
            }
            else{

                //check if user don't have new feed
                if($feedCount == 0) {
                    $user->setActivity(false);
                }
            }
        }

        $this->em->persist($user);
        $this->em->flush();
    }
}