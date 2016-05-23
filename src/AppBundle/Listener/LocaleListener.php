<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 2/16/16
 * Time: 11:37 AM
 */

namespace AppBundle\Listener;

use Symfony\Component\DependencyInjection\Container;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

/**
 * Class LocaleListener
 * @package AppBundle\Listener
 */
class LocaleListener //implements EventSubscriberInterface
{
    /**
     * @var string
     */
    private $defaultLocale;

    /**
     * @var
     */
    private $container;

    /**
     * @param $defaultLocale
     * @param Container $container
     */
    public function __construct($defaultLocale = "en", Container $container)
    {
        $this->defaultLocale = $defaultLocale;
        $this->container = $container;
    }

    /**
     *
     */
    public function onKernelRequest()
    {
        // get request
        $request = $this->container->get("request");

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
    }
}