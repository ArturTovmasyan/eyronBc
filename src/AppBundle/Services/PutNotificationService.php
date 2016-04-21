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
     * @param $id
     * @param $message
     */
    public function sendNoteToIos($id, $message)
    {
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

    /**
     * @param $id
     * @param $message
     */
    public function sendNoteToAndroid($id, $message)
    {
        // get notifications
        $notifications = $this->container->get('rms_push_notifications');

        // create ios message
        $push = new AndroidMessage();
        $push->setGCM(true);
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
//        $pemFile = $this->container->getParameter("rms_push_notifications.ios.pem");
        // set content
//        $notifications->setAPNSPemAsString($pemContent, $passphrase);
        // send push
        $notifications->send($push);
    }
}