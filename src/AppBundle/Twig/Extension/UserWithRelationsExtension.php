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
 * Class UserWithRelationsExtension
 * @package AppBundle\Twig\Extension
 */
class UserWithRelationsExtension extends \Twig_Extension
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
            new \Twig_SimpleFunction('userWithRelations', array($this, 'userWithRelations'))
        );
    }

    /**
     * @param $userId
     * @return mixed
     */
    public function userWithRelations($userId)
    {
        $em = $this->container->get('doctrine')->getManager();
        $user = $em->getRepository('ApplicationUserBundle:User')->findWithRelationsById($userId);

        return $user;
    }

    public function getName()
    {
        return 'bl_user_with_relations_extension';
    }
}