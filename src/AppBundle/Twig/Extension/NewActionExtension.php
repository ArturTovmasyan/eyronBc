<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 9/27/15
 * Time: 11:10 AM
 */

namespace AppBundle\Twig\Extension;
use AppBundle\Entity\NewFeed;
use Symfony\Component\DependencyInjection\Container;

/**
 * Class NewsFeedExtension
 * @package AppBundle\Twig\Extension
 */
class NewActionExtension extends \Twig_Extension
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
            new \Twig_SimpleFunction('getNewAction', array($this, 'getNewAction'))
        );
    }

    /**
     * @param $actionCode
     * @return mixed
     */
    public function getNewAction($actionCode)
    {
        $translator = $this->container->get('translator');
        if ($actionCode == NewFeed::GOAL_CREATE){
            return $translator->trans('goal.create', array(), 'newsFeed');
        }
        if ($actionCode == NewFeed::GOAL_ADD){
            return $translator->trans('goal.add', array(), 'newsFeed');
        }
        if ($actionCode == NewFeed::GOAL_COMPLETE){
            return $translator->trans('goal.complete', array(), 'newsFeed');
        }
        if ($actionCode == NewFeed::SUCCESS_STORY){
            return $translator->trans('goal.success_story', array(), 'newsFeed');
        }
        if ($actionCode == NewFeed::COMMENT){
            return $translator->trans('goal.comment', array(), 'newsFeed');
        }

        return '';
    }

    public function getName()
    {
        return 'bl_news_extension';
    }
}