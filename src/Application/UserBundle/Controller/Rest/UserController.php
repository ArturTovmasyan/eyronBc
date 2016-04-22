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
use JMS\SecurityExtraBundle\Annotation\Secure;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;


/**
 * @Rest\RouteResource("User")
 * @Rest\Prefix("/api/v1.0")
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

        $em->persist($user);
        $em->flush();

        if($this->container->get('kernel')->getEnvironment() != 'test')
        {
            $sessionId = $this->loginAction($user);
        }
        else {
            $sessionId = 'test';
        }

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

        $em = $this->getDoctrine()->getManager();
        $em->getRepository("AppBundle:Goal")->findMyDraftsCount($user);

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

    /**
     * This function is used login by social data
     *
     * @ApiDoc(
     *  resource=true,
     *  section="User",
     *  description="This function is used login by social data",
     *  statusCodes={
     *         400="Returned when no such status code",
     *         204="There is no information to send back"
     *     },
     * requirements={
     *      {"name"="type", "dataType"="string", "requirement"=true, "description"="social type | twitter, facebook, google"},
     *      {"name"="accessToken", "dataType"="string", "requirement"=true, "description"="User`s social access_token"},
     * }
     * )
     * @param $type
     * @param $accessToken
     * @param $tokenSecret
     * @return Response
     * @Rest\View(serializerGroups={"user"})
     * @Rest\Get("/users/social-login/{type}/{accessToken}/{tokenSecret}", defaults={"tokenSecret"=null}, name="application_user_rest_user_getsociallogin", options={"method_prefix"=false})
     */
    public function getSocialLoginAction($type, $accessToken, $tokenSecret)
    {
        //get entity manager
        $em = $this->getDoctrine()->getManager();
        $id = null;
        $newUser = new User();

        // switch for type
        switch($type){
            case "facebook":
                try{
                    $data = file_get_contents("https://graph.facebook.com/me?access_token=" . $accessToken . '&fields=id,email,first_name,last_name,gender,birthday,picture');
                    $data = json_decode($data);
                    $id = $data->id;
                    $newUser->setFacebookId($id);
                    $newUser->setEmail($data->email ? $data->email : $newUser->getSocialFakeEmail());
                    $newUser->setUsername($data->email ? $data->email : $newUser->getSocialFakeEmail());

                    $newUser->setFirstName($data->first_name);
                    $newUser->setLastName(isset($data->last_name) ? $data->last_name : '');

                    $photoPath = "https://graph.facebook.com/" . $id . "/picture?type=large";
                }
                catch(\Exception $e){
                    return new JsonResponse("Wrong access token", Response::HTTP_BAD_REQUEST);
                }
                break;
            case "google":
                try{
                    $data = file_get_contents("https://www.googleapis.com/plus/v1/people/me?access_token=" . $accessToken);
                    $data = json_decode($data);
                    $id = $data->id;
                    $newUser->setGoogleId($id);
                    $newUser->setEmail($data->emails[0]->value);
                    $newUser->setUsername($data->emails[0]->value);
                    $newUser->setFirstName($data->name->givenName);
                    $newUser->setLastName($data->name->familyName);
                    if (isset($data->gender)) {
                        $newUser->setGender($data->gender == "male" ? User::MALE : User::FEMALE);
                    }

                    $photoPath  = $data->image->url;
                    $photoPath = substr($photoPath, 0, strpos($photoPath, "?"));
                }
                catch(\Exception $e){
                    return new JsonResponse("Wrong access token", Response::HTTP_BAD_REQUEST);
                }
                break;
            case "twitter":
                $data = explode('-', $accessToken);
                $id = is_array($data) && isset($data[1]) ?  $data[0] : null;
                $newUser->setTwitterId($id);

                $data = $this->getTwitterData($id, $accessToken, $tokenSecret);

                if (!isset($data->id)){
                    $id = null;
                    break;
                }

                $id = $data->id;
                $newUser->setEmail($newUser->getSocialFakeEmail());
                $newUser->setUsername($newUser->getSocialFakeEmail());
                $fullName = explode(' ', $data->name);
                $newUser->setFirstName($fullName[0]);
                $newUser->setLastName("");

                $photoPath = $data->profile_image_url;
                $photoPath = str_replace('_normal', '', $photoPath);

                break;
            default:
                return new JsonResponse("Wrong type, type must be 'facebook', 'twitter', 'instagram'", Response::HTTP_BAD_REQUEST);
                break;
        }

        if (!$id){
            return new JsonResponse("Wrong access token", Response::HTTP_BAD_REQUEST);
        }

        $user = $em->getRepository('ApplicationUserBundle:User')->findBySocial($type, $id);

        if(!$user){
            $fileName = md5(microtime()) . '.jpg';
            file_put_contents($newUser->getAbsolutePath() . $fileName, fopen($photoPath, 'r'));
            $newUser->setFileName($fileName);
            $newUser->setFileSize(filesize($newUser->getAbsolutePath() . $fileName));
            $newUser->setFileOriginalName($newUser->getFirstName() . '_photo');
            $newUser->setPassword('');

            $newUser->setSocialPhotoLink($photoPath);
            $em->persist($newUser);
            $em->flush();

            $user = $newUser;
        }

        $sessionId = $this->loginAction($user);

        return  array(
            'sessionId' => $sessionId,
            'userInfo'  => $user
        );
    }

    /**
     * @param $id
     * @param $token
     * @param $token_secret
     * @return mixed
     */
    private function getTwitterData($id, $token, $token_secret)
    {
        $consumer_key = $this->getParameter('twitter_client_id'); //$response->getResourceOwner()->getOption('client_id');
        $consumer_secret = $this->getParameter('twitter_client_secret'); //$response->getResourceOwner()->getOption('client_secret');

        $host = 'api.twitter.com';
        $method = 'GET';
        $path = '/1.1/users/show.json'; // api call path

        $query = array(
            'user_id' => $id,
        );

        $oauth = array(
            'oauth_consumer_key' => $consumer_key,
            'oauth_token' => $token,
            'oauth_nonce' => (string)mt_rand(), // a stronger nonce is recommended
            'oauth_timestamp' => time(),
            'oauth_signature_method' => 'HMAC-SHA1',
            'oauth_version' => '1.0'
        );

        $oauth = array_map("rawurlencode", $oauth); // must be encoded before sorting
        $query = array_map("rawurlencode", $query);

        $arr = array_merge($oauth, $query); // combine the values THEN sort

        asort($arr); // secondary sort (value)
        ksort($arr); // primary sort (key)

        // http_build_query automatically encodes, but our parameters
        // are already encoded, and must be by this point, so we undo
        // the encoding step
        $querystring = urldecode(http_build_query($arr, '', '&'));

        $url = "https://$host$path";

        // mash everything together for the text to hash
        $base_string = $method."&".rawurlencode($url)."&".rawurlencode($querystring);

        // same with the key
        $key = rawurlencode($consumer_secret)."&".rawurlencode($token_secret);

        // generate the hash
        $signature = rawurlencode(base64_encode(hash_hmac('sha1', $base_string, $key, true)));

        // this time we're using a normal GET query, and we're only encoding the query params
        // (without the oauth params)
        $url .= "?".http_build_query($query);
        $url=str_replace("&amp;","&",$url); //Patch by @Frewuill

        $oauth['oauth_signature'] = $signature; // don't want to abandon all that work!
        ksort($oauth); // probably not necessary, but twitter's demo does it

        // also not necessary, but twitter's demo does this too
        // function add_quotes($str) { return '"'.$str.'"'; }
        $oauth = array_map(function ($str) { return '"'.$str.'"'; }, $oauth);

        // this is the full value of the Authorization line
        $auth = "OAuth " . urldecode(http_build_query($oauth, '', ', '));

        // if you're doing post, you need to skip the GET building above
        // and instead supply query parameters to CURLOPT_POSTFIELDS
        $options = array( CURLOPT_HTTPHEADER => array("Authorization: $auth"),
            //CURLOPT_POSTFIELDS => $postfields,
            CURLOPT_HEADER => false,
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_SSL_VERIFYPEER => false);

        // do our business
        $feed = curl_init();
        curl_setopt_array($feed, $options);
        $json = curl_exec($feed);
        curl_close($feed);

        return json_decode($json);
    }

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
        $trans = $this->get('translator');

        if (null === $user) {
            return new Response($trans->trans('resetting.user_not_found', [], 'FOSUserBundle'), Response::HTTP_NOT_FOUND);
        }

        if ($user->isPasswordRequestNonExpired($this->container->getParameter('fos_user.resetting.token_ttl'))) {
            return new Response($trans->trans('resetting.password_already_requested', [], 'FOSUserBundle'), Response::HTTP_BAD_REQUEST);
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

    /**
     * This function is used to get current users
     *
     * @ApiDoc(
     *  resource=true,
     *  section="User",
     *  description="This function is used to to get current user",
     *  statusCodes={
     *         200="Returned when status changed",
     *         401="Access allowed only for registered users"
     *     },
     * )
     * @Rest\View(serializerGroups={"user"})
     * @Secure(roles="ROLE_USER")
     */
    public function getAction(Request $request)
    {
        // get entity manager
        $em = $this->getDoctrine()->getManager();

        //get current user
        $currentUser = $this->get('security.token_storage')->getToken()->getUser();

        // get drafts
        $em->getRepository("AppBundle:Goal")->findMyDraftsCount($currentUser);

        //check if not logged in user
        if(!is_object($currentUser)) {
            throw new HttpException(Response::HTTP_UNAUTHORIZED, "There is not any user logged in");
        }

        return $currentUser;
    }


    /**
     * This function is used to get apps string for mobile
     *
     * @ApiDoc(
     *  resource=true,
     *  section="User",
     *  description="This function is used to get apps string for mobile",
     *  statusCodes={
     *         200="OK",
     *         204="No content"
     *     },
     * )
     * @Rest\View()
     */
    public function getAppStringAction()
    {
        //get file directory
        $rootDir= __DIR__ . '/../../../../../bin/appString.txt';

        if(file_exists($rootDir) || is_file($rootDir)) {

            //open file
            $file = fopen($rootDir ,'r');

            //get string in file
            $string = fread($file, filesize($rootDir));

            //close file
            fclose($file);
        }
        else{
            return new Response('File with app string not exist', Response::HTTP_NO_CONTENT);
        }

        return $string;
    }

    /**
     * This function is used to create apps string for mobile
     *
     * @ApiDoc(
     *  resource=true,
     *  section="User",
     *  description="This function is used to create apps string for mobile",
     *  statusCodes={
     *         200="OK",
     *         400="Bad request"
     *     },
     * )
     * @Rest\View()
     */
    public function postAppStringAction($string)
    {
        if(!$string) {
            return new Response('Invalid string parameters', Response::HTTP_BAD_REQUEST);
        }

        //get file directory
        $rootDir= __DIR__ . '/../../../../../bin/appString.txt';

        //open file
        $file = fopen($rootDir ,'w');

        //write string code in file
        fwrite($file, $string);

        //close file
        fclose($file);

        return new Response('', Response::HTTP_OK);

    }

    /**
     * This function is used to get User`s register id
     *
     * @ApiDoc(
     *  resource=true,
     *  section="User",
     *  description="This function is used to get User`s register id",
     *  statusCodes={
     *         204="There is no information to send back",
     *         401="Access allowed only for registered users",
     *         400="Bad request"
     *     },
     * parameters={
     *      {"name"="registrationId", "dataType"="string", "required"=true, "description"="Device Id"},
     *      {"name"="mobileOc", "dataType"="string", "required"=true, "description"="Mobile OC"},
     * }
     * )
     *
     * @return Response
     * @Rest\View()
     */
    public function putDeviceIdAction(Request $request)
    {
        // get entity manager
        $em = $this->getDoctrine()->getManager();
        //get current user
        $currentUser = $this->get('security.token_storage')->getToken()->getUser();
        //check if not logged in user
        if(!is_object($currentUser)) {
            throw new HttpException(Response::HTTP_UNAUTHORIZED, "There is not any user logged in");
        }
        // get all data
        $data = $request->request->all();
        // get register ids
        $registrationIds = array_key_exists('registrationId', $data) ? $data['registrationId'] : null;
        //get mobile OC
        $mobileOc = array_key_exists('mobileOc', $data) ? $data['mobileOc'] : null;
        if(!$registrationIds || !$mobileOc){
            throw new HttpException(Response::HTTP_BAD_REQUEST, "Empty parameters value");
        }
        // get exist registrations data
        $regData = $currentUser->getRegistrationIds();
        // check is mobile device exist
        if(array_key_exists($mobileOc, $regData)){
            // get device array
            $device = $regData[$mobileOc];
            // check is registration in array
            if(!in_array($registrationIds, $device)){
                // push to array
                array_push($device, $registrationIds);
            }
            // set mobile data
            $regData[$mobileOc] = $device;
        }
        else{
            // set mobile data
            $regData[$mobileOc][] =  $registrationIds;
        }
        // set register ids
        $currentUser->setRegistrationIds($regData);
        $em->persist($currentUser);
        $em->flush();
        return new JsonResponse(Response::HTTP_NO_CONTENT);
    }
}

