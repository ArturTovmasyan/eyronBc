<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 9/11/15
 * Time: 1:29 PM
 */

namespace AppBundle\Services;

use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\DependencyInjection\Container;


/**
 * Class BucketListService
 * @package AppBundle\Services
 */
class BucketListService
{
    /**
     * @var \Symfony\Component\DependencyInjection\Container
     */
    protected  $container;

    /**
     * @var
     */
    protected $em;

    /**
     * @param Container $container
     */
    public function __construct(Container $container)
    {
        $this->container = $container;
        $this->em = $container->get('doctrine')->getManager();
    }
}