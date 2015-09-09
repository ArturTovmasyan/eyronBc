<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 9/9/15
 * Time: 3:41 PM
 */

namespace Application\UserBundle\Provider;

use HWI\Bundle\OAuthBundle\OAuth\Response\UserResponseInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use FOS\UserBundle\Model\UserManagerInterface;
use HWI\Bundle\OAuthBundle\Security\Core\User\OAuthUserProvider as BaseProvider;


/**
 * Class UserProvider
 * @package Application\UserBundle\Provider
 */
class UserProvider extends   BaseProvider
{

    /**
     * @var UserManagerInterface
     */
    protected $userManager;

    /**
     * Constructor
     *
     * @param UserManagerInterface $userManager
     */
    public function __construct(UserManagerInterface $userManager)
    {
        $this->userManager = $userManager;
    }

    //TODO: create load by username function
//    /**
//     * {@inheritDoc}
//     */
//    public function loadUserByUsername($username, $response = null)
//    {
//
//    }


    /**
     * {@inheritdoc}
     */
    public function loadUserByOAuthUserResponse(UserResponseInterface $response)
    {
//        dump($response);
//        exit;
//        return $this->loadUserByUsername($response->getNickname(), $response);
        return $this->loadUserByUsername($response->getNickname());
    }
}