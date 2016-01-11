<?php

namespace AppBundle\Twig\Extension;

/**
 * Class ImageFilterExtension
 * @package AppBundle\Twig\Extension
 */
class ImageFilterExtension extends \Twig_Extension
{
    /**
     * @var
     */
    private $container;

    /**
     * @param $container
     */
    public function __construct($container)
    {
        $this->container = $container;
    }

    /**
     * @return array
     */
    public function getFilters()
    {
        return array(
            new \Twig_SimpleFilter('blImageFilter', array($this, 'blImageFilter')),
        );
    }


    /**
     * @param $path
     * @param $filter
     */
    public function blImageFilter($path, $filter)
    {

        // check has http in path
        if(strpos($path, 'http') === false){

            try{
                $this->container->get('liip_imagine.controller')->filterAction($this->container->get('request'), $path, $filter);
                $cacheManager = $this->container->get('liip_imagine.cache.manager');
                $srcPath = $cacheManager->getBrowserPath($path, $filter);

                return $srcPath;
            }catch (\Exception $e){
                return $path;
            }
        }
        else{
            return $path;
        }
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'app_bl_image_filter';
    }
}