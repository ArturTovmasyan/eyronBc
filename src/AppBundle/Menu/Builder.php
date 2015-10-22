<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 10/16/15
 * Time: 8:40 PM
 */

namespace AppBundle\Menu;

use Knp\Menu\FactoryInterface;
use Symfony\Component\DependencyInjection\ContainerAware;

/**
 * Class Builder
 * @package AppBundle\Menu
 */
class Builder extends ContainerAware
{
    /**
     * @param FactoryInterface $factory
     * @param array $options
     * @return \Knp\Menu\ItemInterface
     */
    public function mainMenu(FactoryInterface $factory, array $options)
    {
        $menu = $factory->createItem('root');

        // get doctrine manager
        $em = $this->container->get('doctrine')->getManager();

        // find all menus
        $pages = $em->getRepository('AppBundle:Page')->findAllByOrdered();

        // check pages
        if($pages){
            // loop for all pages
            foreach($pages as $page){

                // add menu
                $menu->addChild($page->getName(), array('route' => 'page', 'routeParameters' => array('slug' => $page->getSlug())));
            }
        }

        return $menu;
    }

    /**
     * @param FactoryInterface $factory
     * @param array $options
     * @return \Knp\Menu\ItemInterface
     */
    public function privacyMenu(FactoryInterface $factory, array $options)
    {
        $menu = $factory->createItem('root');

        // get doctrine manager
        $em = $this->container->get('doctrine')->getManager();

        // find all menus
        $pages = $em->getRepository('AppBundle:Page')->findPrivacy();

        // check pages
        if($pages){
            // loop for all pages
            foreach($pages as $page){

                // add menu
                $menu->addChild($page->getName(), array('route' => 'page', 'routeParameters' => array('slug' => $page->getSlug())));
            }
        }

        return $menu;
    }
}