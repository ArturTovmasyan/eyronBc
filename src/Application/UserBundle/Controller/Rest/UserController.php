<?php
/**
 * Created by PhpStorm.
 * User: andranik
 * Date: 1/20/16
 * Time: 4:24 PM
 */
namespace Application\UserBundle\Controller\Rest;

use Application\UserBundle\Entity\User;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;


/**
 * @Rest\RouteResource("User")
 * @Rest\Prefix("/api/v1.0")
 * @Rest\NamePrefix("rest_")
 */
class UserController extends FOSRestController
{
    /**
     * @ApiDoc(
     *  resource=true,
     *  section="User",
     *  description="This function is used to register a new user",
     *  statusCodes={
     *         400="Bad request",
     *         200="The user was registered"
     *     },
     * parameters={
     *      {"name"="email", "dataType"="email", "required"=true, "description"="User`s email"},
     *      {"name"="plainPassword", "dataType"="string", "required"=true, "description"="User`s password"},
     *      {"name"="firstName", "dataType"="string", "required"=true, "description"="User`s first name | min=3 / max=20 symbols"},
     *      {"name"="lastName", "dataType"="string", "required"=true, "description"="User`s last name | min=3 / max=20 symbols"},
     *      {"name"="birthday", "dataType"="string", "required"=true, "description"="User`s birthday | in this 01/12/2015 format"},
     *      {"name"="profile_image", "dataType"="file", "required"=true, "description"="Users profile image file" },
     *
     * }
     * )
     * @Rest\View(serializerGroups={"user"})
     * @param Request $request
     * @return JsonResponse|Response
     */
    public function postAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        $data = $request->request->all();

        $user = new User();
        $user->setUsername(array_key_exists('email', $data) ? $data['email'] : null);
        $user->setEmail(array_key_exists('email', $data) ? $data['email'] : null);
        $user->setPlainPassword(array_key_exists('plainPassword', $data) ? $data['plainPassword'] : null);
        $user->setFirstName(array_key_exists('firstName', $data) ? $data['firstName'] : null);
        $user->setLastName(array_key_exists('lastName', $data) ? $data['lastName'] : null);
        $user->setBirthDate(array_key_exists('birthday', $data) ? \DateTime::createFromFormat('d/m/Y', $data['birthday'])  : null);

        $validator = $this->get('validator');
        $errors = $validator->validate($user, null, array('Register', 'Default'));


        if(count($errors) > 0){
            $returnResult = [];
            if(count($errors) > 0){
                foreach($errors as $error){
                    $returnResult[$error->getPropertyPath()] = $error->getMessage();
                }
            }

            return new JsonResponse($returnResult, Response::HTTP_BAD_REQUEST);
        }

        $profileImage = $request->files->get('profile_image');

        if($profileImage){
            $user->setFile($profileImage);
        }

        $blService = $this->container->get('bl_service');
        $blService->uploadFile($user);
        $token = md5(microtime());
        $user->setRegistrationToken($token);

        $this->container->get('bl.email.sender')->sendConfirmEmail($user->getEmail(), $token, $user->getFirstName());

        $sessionId = $this->loginAction($user);

        $em->persist($user);
        $em->flush();

        $result = array(
            'sessionId' => $sessionId,
            'userInfo' => $user
        );

        return $result;
    }

    /**
     * @param $user
     * @return mixed
     */
    private function loginAction(User $user)
    {
        // get firewall name
        $providerKey = $this->container->getParameter('fos_user.firewall_name');
        // create new token
        $token = new UsernamePasswordToken($user, $user->getPassword(), $providerKey, $user->getRoles());
        // set token
        $this->get('security.token_storage')->setToken($token);
        // get session
        $session = $this->get('session');
        // set to session
        $session->set($providerKey, serialize($token));
        $session->save();
        // get request
        $request = $this->get('request');
        // get cookie
        $cookie = $request->cookies;
        // get session id from cookie
        $phpSessionId = $cookie->get('PHPSESSID');
        // if cookie is not set
        if(!$phpSessionId){
            // get session id
            $phpSessionId = $session->getId();
        }

        return $phpSessionId;
    }

    /**
     * This function is used to login user
     *
     * @ApiDoc(
     *  resource=true,
     *  section="User",
     *  description="This function is used to login user",
     *  statusCodes={
     *         200="Returned when was login",
     *         404="User not found"
     *     },
     * parameters={
     *      {"name"="username", "dataType"="string", "required"=true, "description"="User`s username"},
     *      {"name"="password", "dataType"="password", "required"=true, "description"="User`s password"},
     *
     * }
     *
     * )
     *
     * @Rest\View(serializerGroups={"user"})
     * @param $request
     * @return Response
     */
    public function postLoginAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $username = $request->get('username');
        $password = $request->get('password');
        $user = $em->getRepository("ApplicationUserBundle:User")->findOneBy(array('username' => $username));

        if($user){
            $encoderService = $this->get('security.encoder_factory');
            $encoder = $encoderService->getEncoder($user);

            if($encoder->isPasswordValid($user->getPassword(), $password, $user->getSalt())){

                $phpSessionId = $this->loginAction($user);

                return array(
                    'sessionId' => $phpSessionId,
                    'userInfo'  => $user
                );
            }
        }

        return new JsonResponse('Bad credentials', Response::HTTP_NOT_FOUND);
    }

//    /**
//     * This function is used login by social data
//     *
//     * @ApiDoc(
//     *  resource=true,
//     *  section="User",
//     *  description="This function is used login by social data",
//     *  statusCodes={
//     *         400="Returned when no such status code",
//     *         204="There is no information to send back"
//     *     },
//     * requirements={
//     *      {"name"="type", "dataType"="string", "requirement"=true, "description"="social type | twitter, facebook, google"},
//     *      {"name"="accessToken", "dataType"="string", "requirement"=true, "description"="User`s social access_token"},
//     * }
//     * )
//     * @param $type
//     * @param $accessToken
//     * @return Response
//     * @Rest\View(serializerGroups={"user"})
//     */
//    public function getSocialLoginAction($type, $accessToken)
//    {
//        //get entity manager
//        $em = $this->getDoctrine()->getManager();
//        $id = null;
//        // switch for type
//        switch($type){
//            case "facebook":
//                try{
//                    $data = file_get_contents("https://graph.facebook.com/me?access_token=" . $accessToken);
//                    $data = json_decode($data);
//                    $id = $data->id;
//                }
//                catch(\Exception $e){
//                    return new JsonResponse("Wrong access token", Response::HTTP_BAD_REQUEST);
//                }
//                break;
//            case "google":
//                try{
//                    $data = file_get_contents("https://www.googleapis.com/plus/v1/people/me?access_token=" . $accessToken);
//                    $data = json_decode($data);
//                    $id = $data->data->id;
//                }
//                catch(\Exception $e){
//                    return new JsonResponse("Wrong access token", Response::HTTP_BAD_REQUEST);
//                }
//                break;
//            case "twitter":
//                $data = explode('-', $accessToken);
//                $id = is_array($data) ?  $data[0] : null;
//                break;
//            default:
//                return new JsonResponse("Wrong type, type must be 'facebook', 'twitter', 'instagram'", Response::HTTP_BAD_REQUEST);
//                break;
//        }
//
//        $user = $em->getRepository('ApplicationUserBundle:User')->findBySocial($type, $id);
//
//        if(!$user){
////            TODO: need to create a new user
//            return new JsonResponse('We have not this user in our database', Response::HTTP_NOT_FOUND);
//        }
//
//        $sessionId = $this->loginAction($user);
//
//        return  array(
//            'sessionId' => $sessionId,
//            'userInfo'  => $user
//        );
//    }

    /**
     * This function is used to check is user with such email registered
     *
     * @ApiDoc(
     *  resource=true,
     *  section="User",
     *  description="This function is used to check is user with such email registered",
     *  statusCodes={
     *         200="Returned when status changed",
     *         404="User not found"
     *     },
     * )
     *
     * @Rest\View()
     * @param $email
     * @return array
     */
    public function getRegisteredAction($email)
    {
        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository("ApplicationUserBundle:User")->findOneBy(array('email' => $email));

        if($user){

            return array(
                'registered' => true,
                'image_path' => $user->getPhotoLink()
            );
        }

        return array(
            'registered' => false
        );
    }

    /**
     * @ApiDoc(
     *  resource=true,
     *  section="User",
     *  description="This function is used to reset password",
     *  statusCodes={
     *         204="Returned when all ok",
     *         404="User not found"
     *     },
     * )
     *
     * @Rest\View()
     * @param $email
     * @return array
     */
    public function getResetAction($email)
    {
        $user = $this->container->get('fos_user.user_manager')->findUserByUsernameOrEmail($email);

        if (null === $user) {
            return new Response('user not found', Response::HTTP_NOT_FOUND);
        }

        if ($user->isPasswordRequestNonExpired($this->container->getParameter('fos_user.resetting.token_ttl'))) {
            return new Response('The password for this user has already been requested within the last 24 hours.', Response::HTTP_BAD_REQUEST);
        }

        if (null === $user->getConfirmationToken()) {
            /** @var $tokenGenerator \FOS\UserBundle\Util\TokenGeneratorInterface */
            $tokenGenerator = $this->container->get('fos_user.util.token_generator');
            $user->setConfirmationToken($tokenGenerator->generateToken());
        }

        $this->container->get('fos_user.mailer')->sendResettingEmailMessage($user);
        $user->setPasswordRequestedAt(new \DateTime());
        $this->container->get('fos_user.user_manager')->updateUser($user);

        return new Response('', Response::HTTP_OK);
    }
}

