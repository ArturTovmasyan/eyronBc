<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 9/9/15
 * Time: 3:41 PM
 */

namespace Application\UserBundle\Provider;

use Application\UserBundle\Entity\User;
use HWI\Bundle\OAuthBundle\OAuth\ResourceOwner\FacebookResourceOwner;
use HWI\Bundle\OAuthBundle\OAuth\ResourceOwner\GoogleResourceOwner;
use HWI\Bundle\OAuthBundle\OAuth\ResourceOwner\TwitchResourceOwner;
use HWI\Bundle\OAuthBundle\OAuth\ResourceOwner\TwitterResourceOwner;
use HWI\Bundle\OAuthBundle\OAuth\Response\UserResponseInterface;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
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

    /**
     * {@inheritDoc}
     */
    public function loadUserByUsername($username, $response = null)
    {
        // get owner
        $resourceOwner = $response->getResourceOwner();

        // check owner resource
        if($resourceOwner instanceof GoogleResourceOwner){
            // get google user
            $user = $this->createGoogleUser($response->getResponse());
        }
        elseif($resourceOwner instanceof TwitterResourceOwner){
            // get twitter user
            $user = $this->createTwitterUser($response->getResponse());
        }
        elseif($resourceOwner instanceof FacebookResourceOwner){
            // get facebook user
            $user = $this->createFacebookUserUser($response->getResponse());
        }
        else {
            // return exception if user not found,
            throw new UnsupportedUserException(sprintf('User not found, please try again'));
        }

        if ($user->getSocialPhotoLink()) {
            $fileName = md5(microtime()) . '.jpg';
            file_put_contents($user->getAbsolutePath() . $fileName, fopen($user->getSocialPhotoLink(), 'r'));
            $user->setFileName($fileName);
            $user->setFileSize(filesize($user->getAbsolutePath() . $fileName));
            $user->setFileOriginalName($user->getFirstName() . '_photo');
        }

        // return user
        return $user;
    }


    /**
     * {@inheritdoc}
     */
    public function loadUserByOAuthUserResponse(UserResponseInterface $response)
    {
        return $this->loadUserByUsername($response->getNickname(), $response);
    }


    /**
     * This function is used to create google user
     *
     * @param $response
     * @return User|\FOS\UserBundle\Model\UserInterface
     */
    private function createGoogleUser($response)
    {
        // check is user in our bd
        $user = $this->userManager->findUserBy(array('googleId'=>$response['id']));

        // if user not found in bd, create
        if(!$user) {

            // create new user
            $user = new User();

            // set google id
            $user->setGoogleId($response['id']);

            // set email
            $user->setEmail($response['email']);

            // set email
            $user->setUsername($response['email']);

            // set first name
            $user->setFirstName($response['given_name']);

            // set last name
            $user->setLastName($response['family_name']);

            // set gender
            if (isset($response['gender'])) {
                $user->setGender($response['gender'] == "male" ? User::MALE : User::FEMALE);
            }

            // set photo link
            $photoPath = $response['picture'];
            if (strpos($photoPath, "?")){
                $photoPath = substr($photoPath, 0, strpos($photoPath, "?"));
            }
            $user->setSocialPhotoLink($photoPath);

            // set password
            $user->setPassword('');

            // update user
            $this->userManager->updateUser($user);

        }

        return $user;
    }


    /**
     * This function is used to create facebook user
     *
     * @param $response
     * @return User|\FOS\UserBundle\Model\UserInterface
     */
    private function createFacebookUserUser($response)
    {
        // check is user in our bd
        $user = $this->userManager->findUserBy(array('facebookId'=>$response['id']));

        // if user not found in bd, create
        if(!$user) {

            // create new user
            $user = new User();

            // set google id
            $user->setFacebookId($response['id']);

            // set email
            $user->setEmail($response['email']);

            // set email
            $user->setUsername($response['email']);

            // set first name
            $user->setFirstName($response['first_name']);

            // set last name
            $user->setLastName($response['last_name']);

            // set password
            $user->setPassword('');

            $user->setSocialPhotoLink("https://graph.facebook.com/" . $response['id'] . "/picture?type=large");

            // update user
            $this->userManager->updateUser($user);

        }

        return $user;
    }

    /**
     * This function is used to create Twitter user
     *
     * @param $response
     * @return User|\FOS\UserBundle\Model\UserInterface
     */
    private function createTwitterUser($response)
    {
        // check is user in our bd
        $user = $this->userManager->findUserBy(array('twitterId'=>$response['id']));

        // if user not found in bd, create
        if(!$user) {

            // create new user
            $user = new User();

            // set google id
            $user->setTwitterId($response['id']);

            // set email
            $user->setEmail($user->getSocialFakeEmail());

            // set email
            $user->setUsername($user->getSocialFakeEmail());

            // get fullName
            $fullName = explode(' ', $response['name']);

            // set first name
            $user->setFirstName($fullName[0]);

            // set last name
            $user->setLastName($fullName[0]);

            // set photo link
            $user->setSocialPhotoLink(str_replace('_normal', '', $response['profile_image_url']));

            // set password
            $user->setPassword('');

            // update user
            $this->userManager->updateUser($user);

        }

        return $user;
    }


}