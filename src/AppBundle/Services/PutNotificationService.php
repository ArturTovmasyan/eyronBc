<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 9/11/15
 * Time: 1:29 PM
 */

namespace AppBundle\Services;

use AppBundle\Entity\UserGoal;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\DependencyInjection\Container;
use RMS\PushNotificationsBundle\Message\iOSMessage;
use RMS\PushNotificationsBundle\Message\AndroidMessage;


/**
 * Class PutNotificationService
 * @package AppBundle\Services
 */
class PutNotificationService
{
    const ANDROID = 'android';
    const IOS = 'ios';

    /**
     * @var \Symfony\Component\DependencyInjection\Container
     */
    protected $container;

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
     * @param $ids
     * @param $message
     */
    public function sendNoteToIos($ids, $message)
    {
        foreach($ids as $id){
            // get notifications
            $notifications = $this->container->get('rms_push_notifications');

            // create ios message
            $push = new iOSMessage();
            $push->setAPSBadge(1);
            $push->setAPSSound('default');
            // check is array
            if(is_array($message)){
                // set message
                $push->setMessage($message['message']);
                $push->setData(array('adId' => $message['adId']));
            }
            else{
                $push->setMessage($message);
            }
            // device
            $push->setDeviceIdentifier($id);
            // get pem file
            $pemFile = $this->container->getParameter("rms_push_notifications.ios.pem");
            // set passphrase
            $passphrase =null;
            // get pem phrase
            $pemContent = file_get_contents($pemFile);
            // set content
            $notifications->setAPNSPemAsString($pemContent, $passphrase);
            // send push
            $notifications->send($push);
        }
    }

    /**
     * @param $ids
     * @param $message
     */
    public function sendNoteToAndroid($ids, $message)
    {
        foreach($ids as $id) {
            // get notifications
            $notifications = $this->container->get('rms_push_notifications');

            // create ios message
            $push = new AndroidMessage();
            $push->setGCM(true);

            $isAutocomplete = is_array($message) && array_key_exists('isAutocomplete', $message) ?
                $message['isAutocomplete'] : false;

            // check is array
            if (is_array($message)) {
                // set message
                $push->setMessage($message['message']);

                $push->setData(array('adId' => $message['adId'], 'isAutocomplete' => $isAutocomplete));
            } else {
                $push->setMessage($message);
            }
            // device
            $push->setDeviceIdentifier($id);
            // get pem file
            //        $pemFile = $this->container->getParameter("rms_push_notifications.ios.pem");
            // set content
            //        $notifications->setAPNSPemAsString($pemContent, $passphrase);
            // send push
            $notifications->send($push);
        }
    }

    /**
     * Check and send mobiles notes
     *
     * @param $currentUser
     * @param $message
     */
    public function sendPushNote($currentUser, $message)
    {
        $androidIds = array();
        $iosIds = array();
        // if user is deactivate, return
//        if($currentUser->getDeactivate() || !$currentUser->getNotificationSwitch()){
//            return;
//        }
        // check registration ids
        $registrations = $currentUser->getRegistrationIds();
        // check registrations
        if($registrations){
            // check, and get android ids, if exist
            if(array_key_exists( self::ANDROID, $registrations)){
                $androidIds = $registrations[self::ANDROID];
            }
            // check, and get ios ids, if exist
            if(array_key_exists(self::IOS, $registrations)){
                $iosIds = $registrations[self::IOS];
            }
        }
        // check androids ids
        if(count($androidIds) > 0){
            $this->sendNoteToAndroid($androidIds, $message);
        }
        // check ios ids
        if(count($iosIds) > 0){
            $this->sendNoteToIos($iosIds, $message);
        }
    }

    /**
     * @param $currentUser
     */
    public function sendTestMassage($currentUser)
    {
        $massage = $this->container->get('translator')->trans('test_message');

        $this->sendPushNote($currentUser, $massage);

        $this->sendProgressMassage($currentUser);
    }

    /**
     * @param $currentUser
     */
    public function sendReminderMassage($currentUser)
    {
        $goals = $currentUser->getComingGoals();

        if($goals){
            $massage = $this->container->get('translator')->trans('reminder_message');
            $this->sendPushNote($currentUser, $massage);
        }
    }

    /**
     * @param $currentUser
     */
    public function sendProgressMassage($currentUser)
    {
        $progress = $this->calculateProgress($currentUser->getUserGoal());

        if($progress < 90){
            $massage = $this->container->get('translator')->trans('progress_bad'); 
        }
        elseif($progress < 110) {
            $massage = $this->container->get('translator')->trans('progress_good');
        }
        else{
            $massage = $this->container->get('translator')->trans('progress_excellent');
        }

        $this->sendPushNote($currentUser, $massage);
    }

    /**
     * @param $userGoals
     * @return null
     */
    public function calculateProgress($userGoals)
    {
        $count = 0;
        $overall = 0;

        if ($userGoals) {
            foreach ($userGoals as $userGoal) {
                if ($userGoal->getStatus() != UserGoal::COMPLETED) {
                    //if goal have listed and do dates
                    if ($userGoal->getListedDate() && $userGoal->getDoDate()) {

                        $time1 = $userGoal->getListedDate();
                        $time2 = $userGoal->getDoDate();
                        $limit = date_diff($time2, $time1)->days;
                        $time3 = new \DateTime('now');
                        $currentLimit = date_diff($time3, $time1)->days;

                        if ($currentLimit > $limit) {
                            $timesAgo = $limit ? $limit : 1;
                            $allTimes = $limit ? $limit : 1;
                        } else {
                            $timesAgo = $currentLimit ? $currentLimit : 1;
                            $allTimes = $limit ? $limit : 1;
                        }

                        $goalPercent = $userGoal->getCompleted();
                        $currentTimePercent = (100 * $timesAgo) / $allTimes;
                        $currentOverall = ($userGoal->getSteps() && $goalPercent) ? ($goalPercent * 100 / $currentTimePercent) : (($currentLimit > $limit || !$limit) ? 0 : (100 - ($currentLimit * 100 / $limit)));

                        if ($userGoal->getSteps() && !$goalPercent) {
                            $stepsCount = count($userGoal->getSteps());
                            $oneComplatePercent = 100 / (2 * $stepsCount);
                            $currentOverall = ($currentOverall < $oneComplatePercent) ? $currentOverall : $oneComplatePercent;

                        }

                        $overall += $currentOverall;
                        $count++;
                    }
                }
            }

            if ($count && $overall) {
                return floor($overall / $count);
            }
        }

        return null;
    }
        

    /**
     * @param $userId
     */
    public function sendPushNotForAutocomplete($userId)
    {
        // get user
        $user = $this->em->getRepository('ApplicationUserBundle:User')->find($userId);

        if($user){
            $messages = ['message'=> 'Message for autocomplete', 'adId'=> null ,'isAutocomplete' => true];
            $this->sendPushNote($user, $messages);
        }
    }
}