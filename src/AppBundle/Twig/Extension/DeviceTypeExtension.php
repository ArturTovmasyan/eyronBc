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
            new \Twig_SimpleFunction('getDeviceType', array($this, 'getDeviceType'))
        );
    }

    /**
     * @return string
     */
    public function getDeviceType()
    {
        return $this->container->get('liip_theme.active_theme')->getDeviceType();
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'bl_device_type_extension';
    }
}