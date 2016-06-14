<?php

namespace Application\UserBundle\Menu;

use Knp\Menu\FactoryInterface;
use Symfony\Component\DependencyInjection\ContainerAware;

class Profile extends ContainerAware
{
    /**
     * @param FactoryInterface $factory
     * @param array $options
     * @return \Knp\Menu\ItemInterface
     */
    public function settingsMenu(FactoryInterface $factory, array $options)
    {

        $menu = $factory->createItem('root');
        $menu->addChild('Profile', array('route' => 'edit_user_profile'));
        $menu->addChild('Notifications', array('route' => 'edit_user_notify'));

        return $menu;
    }
}
