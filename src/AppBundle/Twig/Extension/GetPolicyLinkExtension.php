<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 10/28/15
 * Time: 11:59 AM
 */

namespace AppBundle\Twig\Extension;

use Symfony\Component\DependencyInjection\Container;

class GetPolicyLinkExtension extends \Twig_Extension
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
            new \Twig_SimpleFunction('getPolicyLink', array($this, 'getPolicyLink'))
        );
    }

    /**
     * @return string
     */
    public function getPolicyLink()
    {
        $em = $this->container->get('doctrine')->getManager();
        $pages = $em->getRepository('AppBundle:Page')->findAllByOrdered();
        $route = $this->container->get('router');

        if($pages){

            foreach($pages as $page){
                if (strpos(strtolower($page->getName()), 'policy') !== false){
                    return $route->generate('page', array('slug' => $page->getSlug()));
                }
            }
        }

        return '#';
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'bl_policy_link_extension';
    }
}