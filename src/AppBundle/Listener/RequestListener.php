<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 2/16/16
 * Time: 11:37 AM
 */

namespace AppBundle\Listener;

use AppBundle\Controller\Rest\MainRestController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

/**
 * Class LocaleListener
 * @package AppBundle\Listener
 */
class RequestListener //implements EventSubscriberInterface
{
    /**
     * @var string
     */
    private $defaultLocale;

    /**
     * @var
     */
    private $mandatoryVersions;

    /**
     * RequestListener constructor.
     * @param string $defaultLocale
     * @param $iosMandatoryVersion
     * @param $androidMandatoryVersion
     */
    public function __construct($defaultLocale = "en", $iosMandatoryVersion, $androidMandatoryVersion)
    {
        $this->defaultLocale = $defaultLocale;

        $this->mandatoryVersions = [
            MainRestController::IOS_REQUEST_PARAM     => $iosMandatoryVersion,
            MainRestController::ANDROID_REQUEST_PARAM => $androidMandatoryVersion
        ];
    }

    /**
     * @param GetResponseEvent $event
     */
    public function onKernelRequest(GetResponseEvent $event)
    {
        // get request
        $request = $event->getRequest();

        //get current url
        $currentUrl = $request->getUri();

        //check if current url is not admin
        if (strpos($currentUrl, 'admin') == false) {

            if (!$request->hasPreviousSession()) {
                return;
            }

            // try to see if the locale has been set as a _locale routing parameter
            if ($locale = $request->attributes->get('_locale')) {
                $request->getSession()->set('_locale', $locale);
            } else {
                // if no explicit locale has been set on this request, use one from the session
                $request->setLocale($request->getSession()->get('_locale', $this->defaultLocale));
            }
        }

//        $mobileAppVersion  = $request->query->get('mobileAppVersion');
//        $mobileAppPlatform = $request->query->get('mobileAppPlatform');
//
//        if ($mobileAppVersion && $mobileAppPlatform){
//
//            if(isset($this->mandatoryVersions[$mobileAppPlatform]) &&
//                version_compare($mobileAppVersion, $this->mandatoryVersions[$mobileAppPlatform]) == -1)
//            {
//                $event->setResponse(new Response('You need to update your app', Response::HTTP_UPGRADE_REQUIRED));
//            }
//        }
    }
}