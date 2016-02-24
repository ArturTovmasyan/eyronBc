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
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Class Builder
 * @package AppBundle\Menu
 */
class Builder extends ContainerAware
{
    /**
     * @var
     */
    private $otherMenu;

    /**
     * @var
     */
    private $policyMenu;

    /**
     * Sets the Container associated with this Controller.
     *
     * @param ContainerInterface $container A ContainerInterface instance
     *
     * @api
     */
    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;
        // get doctrine manager
        $em = $this->container->get('doctrine')->getManager();
        $pages = $em->getRepository('AppBundle:Page')->findAllByOrdered();

        // check pages
        if($pages){

            // loop for pages
            foreach($pages as $page){
                strpos(strtolower($page->getName()), 'policy') === false ? $this->otherMenu[] = $page : $this->policyMenu[] = $page ;
            }
        }
    }

    /**
     * @param FactoryInterface $factory
     * @param array $options
     * @return \Knp\Menu\ItemInterface
     */
    public function mainMenu(FactoryInterface $factory, array $options)
    {

        // get e
        $menu = $factory->createItem('root');

        //get translator
        $tr = $this->container->get('translator');

        //get security
        $security = $this->container->get('security.authorization_checker');

        // check pages
        if($this->otherMenu){

            //check if current user role is admin
            if($security->isGranted('ROLE_ADMIN')) {

                //add statistic view menu
                $menu->addChild($tr->trans('statistic_view'), array('route' => 'statistic_view'));
            }

            // loop for all pages
            foreach($this->otherMenu as $page){

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
        // get menu
        $menu = $factory->createItem('root');

        // check pages
        if($this->policyMenu){

            // loop for all pages
            foreach($this->policyMenu as $page){

                // add menu
                $menu->addChild($page->getName(), array(
                    'route' => 'page',
                    'routeParameters' => array('slug' => $page->getSlug())));
            }
        }

        return $menu;
    }
}