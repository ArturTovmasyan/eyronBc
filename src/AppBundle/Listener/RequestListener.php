<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 2/16/16
 * Time: 11:37 AM
 */

namespace AppBundle\Listener;

use AppBundle\Controller\Rest\MainRestController;
use Doctrine\ORM\EntityManager;
use Symfony\Bundle\TwigBundle\TwigEngine;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorage;

/**
 * Class LocaleListener
 * @package AppBundle\Listener
 */
class RequestListener //implements EventSubscriberInterface
{
    private $maintenance;
    private $kernel;
    private $templating;
    private $defaultLocale;
    private $mandatoryVersions;
    private $tokenStorage;
    private $em;

    /**
     * RequestListener constructor.
     * @param string $defaultLocale
     * @param $iosMandatoryVersion
     * @param $androidMandatoryVersion
     * @param $maintenance
     * @param \AppKernel $kernel
     * @param TwigEngine $templating
     * @param TokenStorage $tokenStorage
     * @param EntityManager $entityManager
     */
    public function __construct($defaultLocale = "en", $iosMandatoryVersion, $androidMandatoryVersion, $maintenance,
                                \AppKernel $kernel, TwigEngine $templating, TokenStorage $tokenStorage, EntityManager $entityManager)
    {
        $this->defaultLocale = $defaultLocale;
        $this->tokenStorage  = $tokenStorage;
        $this->em            = $entityManager;
        $this->maintenance   = $maintenance;
        $this->kernel        = $kernel;
        $this->templating    = $templating;

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
        $debug = in_array($this->kernel->getEnvironment(), array('test', 'dev'));

        if ($this->maintenance && !$debug) {
            $content = $this->templating->render('::maintenance.html.twig');
            $event->setResponse(new Response($content, 503));
            $event->stopPropagation();
            return;
        }


        $request = $event->getRequest();
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

        $mobileAppVersion  = $request->query->get('mobileAppVersion');
        $mobileAppPlatform = $request->query->get('mobileAppPlatform');

        if ($mobileAppVersion && $mobileAppPlatform){
            if(isset($this->mandatoryVersions[$mobileAppPlatform]) &&
                version_compare($mobileAppVersion, $this->mandatoryVersions[$mobileAppPlatform]) == -1){
                $event->setResponse(new Response('You need to update your app', Response::HTTP_UPGRADE_REQUIRED));
            }
        }

        $token = $this->tokenStorage->getToken();
        if ($token && is_object($user = $token->getUser())){
            $filter = $this->em->getFilters()->getFilter('visibility_filter');
            $filter->setParameter('userId', $user->getId());
        }
    }
}