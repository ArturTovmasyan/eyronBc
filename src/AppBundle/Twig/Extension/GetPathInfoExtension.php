<?php

namespace AppBundle\Twig\Extension;

use Symfony\Component\DependencyInjection\Container;


class GetPathInfoExtension extends \Twig_Extension
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
            new \Twig_SimpleFunction('getReferer', array($this, 'getReferer'))
        );
    }

    /**
     * @return string
     */
    public function getReferer()
    {
        $referer = $this->container->get('request')->headers->get('referer');

        if($referer){
            return $referer;
        }
        return "";
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'bl_path_info_extension';
    }
}
