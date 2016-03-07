<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 10/28/15
 * Time: 11:59 AM
 */

namespace AppBundle\Twig\Extension;

use Symfony\Component\DependencyInjection\Container;

class DeviceTypeExtension extends \Twig_Extension
{
    /**
     * @var Container
     */
    protected $container;

    /**
     * @param Container $container)
     */
    public function __construct(Container $container)
    {
        $this->container = $container;
    }

    /**
     * @return array
     */
    public function getFunctions()
    {
        return array(
            new \Twig_SimpleFunction('isMobile', array($this, 'isMobile')),
            new \Twig_SimpleFunction('isTablet', array($this, 'isTablet'))
        );
    }

    /**
     * @return bool
     */
    public function isMobile()
    {
        return $this->container->get('mobile_detect.mobile_detector')->isMobile();
    }

    /**
     * @return bool
     */
    public function isTablet()
    {
        return $this->container->get('mobile_detect.mobile_detector')->isTablet();
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'bl_device_type_extension';
    }
}