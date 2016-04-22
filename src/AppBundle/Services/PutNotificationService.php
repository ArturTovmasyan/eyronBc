<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 9/11/15
 * Time: 1:29 PM
 */

namespace AppBundle\Services;

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
            // check is array
            if (is_array($message)) {
                // set message
                $push->setMessage($message['message']);
                $push->setData(array('adId' => $message['adId']));
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
        $massage = "testing notifications in BucketList";

        $this->sendPushNote($currentUser, $massage);
    }

    /**
     * @param $currentUser
     */
    public function sendDoDateMassage($currentUser)
    {
        $goals = $currentUser->getComingGoals();

        $massage = '';

        $this->sendPushNote($currentUser, $massage);
    }

    /**
     * @param $currentUser
     */
    public function sendProgressMassage($currentUser)
    {
        $timePercent = $currentUser->getTimePercent();
        $goalCompletedPercent = $currentUser->getGoalCompletedPercent();

        $massage = '';

        $this->sendPushNote($currentUser, $massage);
    }
}