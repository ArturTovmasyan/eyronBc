<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 9/27/15
 * Time: 11:10 AM
 */

namespace AppBundle\Twig\Extension;
use Symfony\Component\DependencyInjection\Container;

/**
 * Class NewsFeedExtension
 * @package AppBundle\Twig\Extension
 */
class ConvertNewsExtension extends \Twig_Extension
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
            new \Twig_SimpleFunction('convertNews', array($this, 'convertNews'))
        );
    }

    /**
     * @param $entryLogs
     * @return mixed
     */
    public function convertNews($entryLogs)
    {
        $newsFeed = $this->container->get('bl_news_feed_service')->getNewsFeed($entryLogs);
        return $newsFeed;
    }

    public function getName()
    {
        return 'bl_news_extension';
    }
}