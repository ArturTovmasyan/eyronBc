<?php
/**
 * Created by PhpStorm.
 * User: Artur
 * Date: 03/02/16
 * Time: 12:15 PM
 */

namespace AppBundle\Controller\Rest;

use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpFoundation\Response;

/**
 * @Rest\RouteResource("Settings")
 * @Rest\Prefix("/api/v1.0")
 * @Rest\NamePrefix("rest_")
 */
class SettingsController extends FOSRestController
{

    /**
     * @ApiDoc(
     *  resource=true,
     *  section="Settings",
     *  description="This function is used to set settings data",
     *  statusCodes={
     *         200="Return when successful",
     *         400="Bad request",
     *         404="Return when user not found",
     *         401="Unauthorized user",
     *     },
     * parameters={
     *      {"name"="profileImage", "dataType"="file", "required"=false, "description"="Users profile image file"},
     *      {"name"="firstName", "dataType"="string", "required"=true, "description"="User`s first name | min=3 / max=20 symbols"},
     *      {"name"="lastName", "dataType"="string", "required"=true, "description"="User`s last name | min=3 / max=20 symbols"},
     *      {"name"="primary", "dataType"="string", "required"=false, "description"="User`s primary email"},
     *      {"name"="addEmail", "dataType"="string", "required"=false, "description"="Add email for user"},
     *      {"name"="birthDate", "dataType"="string", "required"=true, "description"="User`s birthday | in this 01/12/2015 format"},
     * }
     * )
     * @Rest\View(serializerGroups={"settings"})
     */
    public function postSettingsAction(Request $request)
    {
        //get translator
        $tr = $this->get('translator');

        // get all data
        $data = $request->request->all();

        //get current user
        $user = $this->getUser();

        //check if user not found
        if (!is_object($user)) {

            // return 404 if user not found
            return new Response('User not found', Response::HTTP_UNAUTHORIZED);
        }

        //get current email
        $currentEmail = $user->getEmail();

        //get user emails in db
        $userEmails = $user->getUserEmails();

        // value for userEmailsInDb
        $userEmailsInDb = null;

        //set default primary email value
        $primaryEmail = null;

        //check if userEmails exist
        if ($userEmails) {

            //get user emails in db
            $userEmailsInDb = array_map(function ($item) { return $item['userEmails'] ; },  $userEmails);
        }

        //get fos user manager
        $fosManager = $this->container->get("fos_user.user_manager");

        //get user profileImage
        $profileImage = $request->files->get('profileImage');

        // get user firstName
        $firstName = array_key_exists('firstName', $data) ? $data['firstName'] : null;

        // get user lastName
        $lastName = array_key_exists('lastName', $data) ? $data['lastName'] : null;

        // get user birthDay
        $birthDate = array_key_exists('birthDate', $data) ? \DateTime::createFromFormat('d/m/Y', $data['birthDate']) : null;

        //get new email in request
        $addEmail = array_key_exists('addEmail', $data) ? $data['addEmail'] : null;

        //get primary email
        $primaryEmail = array_key_exists('primary', $data) ? $data['primary'] : null;

        //check if new email equal currentEmail
        if ($addEmail == $currentEmail) {

            return new JsonResponse($tr->trans('email.error', array(), 'FOSUserBundle'), Response::HTTP_BAD_REQUEST);
        }

        //check if primary email exist in $userEmailsInDb
        if ($primaryEmail && $userEmailsInDb && ($key = array_search($primaryEmail, $userEmailsInDb)) !== false) {

            unset($userEmails[$key]);
        }

        //check if set another primary email
        if ($userEmailsInDb && $primaryEmail && $currentEmail !== $primaryEmail &&
            (array_search($currentEmail, $userEmailsInDb) == false)) {

            //set user emails in array with token and primary value
            $currentEmailData = ['userEmails' => $currentEmail, 'token' => null, 'primary' => false];

            //set current email data in userEmails array
            $userEmails[$currentEmail] = $currentEmailData;
        }

        //check if primary email exist
        if ($primaryEmail && $primaryEmail !== $currentEmail) {

            //set email for user
            $user->setEmail($primaryEmail);
        }

        //check if addEmail exist
        if ($addEmail) {

            //generate email activation  token
            $emailToken = md5(microtime() . $addEmail);

            //set user emails in array with token and primary value
            $newEmail = ['userEmails' => $addEmail, 'token' => $emailToken, 'primary' => false];

            //set new email data in userEmails array
            $userEmails[$addEmail] = $newEmail;

            //get 8user full name
            $userName = $user->showName();

            //get send activation email service
            $this->get('bl.email.sender')->sendActivationUserEmail($addEmail, $emailToken, $userName);
        }

        //set user emails
        $user->setUserEmails($userEmails);

        //set user profile image
        $user->setUserEmails($userEmails);

        //set user lastName
        $user->setLastName($lastName);

        //set user firstName
        $user->setFirstName($firstName);

        //set user birthDate
        $user->setBirthDate($birthDate);

        //check if profile image exist
        if ($profileImage) {

            //set user profile image
            $user->setFile($profileImage);
        }

        //get uploadFile service for load profile pictures
        $this->container->get('bl_service')->uploadFile($user);

        //get validator
        $validator = $this->get('validator');

        //get errors
        $errors = $validator->validate($user, null, array('Settings'));

        //check count of errors
        if (count($errors) > 0) {

            //returned value
            $errorResult = array();

            // loop for error
            foreach ($errors as $error) {
                $errorResult[$error->getPropertyPath()] = $error->getMessage();
            }

            return new JsonResponse($errorResult, Response::HTTP_BAD_REQUEST);

        }

        //update user
        $fosManager->updateUser($user);

        return new Response('', Response::HTTP_OK);

    }

    /**
     * @ApiDoc(
     *  resource=true,
     *  section="Settings",
     *  description="This function is used to change user password",
     *  statusCodes={
     *         204="No content",
     *         400="Bad request",
     *         401="Not authorized user",
     *     },
     * parameters={
     *      {"name"="currentPassword", "dataType"="string", "required"=true, "description"="User`s current password"},
     *      {"name"="changePassword", "dataType"="string", "required"=true, "description"="Users change password" },
     * }
     * )
     * @param $request
     * @return Response
     * @Rest\View()
     */
    public function postChangePasswordAction(Request $request)
    {
        // get all data
        $data = $request->request->all();

        //get fos user manager
        $fosManager = $this->container->get("fos_user.user_manager");

        // get current user
        $user = $this->getUser();

        //check if not logged in user
        if(!is_object($user)) {
           return new Response("There is not any user logged in", (Response::HTTP_UNAUTHORIZED));
        }

        //get current password in post data
        $currentPassword = array_key_exists('currentPassword', $data) ? $data['currentPassword'] : null;

        //get change password in post data
        $changePassword = array_key_exists('changePassword', $data) ? $data['changePassword'] : null;

        if(!$currentPassword && (!$changePassword)) {
            return new Response("Post data es empty", Response::HTTP_BAD_REQUEST);
        }

        //get current user password
        $userPassword = $user->getPassword();

        //get encoder service
        $encoder_service = $this->get('security.encoder_factory');

        //encoder user
        $encoder = $encoder_service->getEncoder($user);

        //encoder sent current password
        $encode_data_pass = $encoder->encodePassword($currentPassword, $user->getSalt());

        if($userPassword == $encode_data_pass) {

            //set new password
            $user->setPlainPassword($changePassword);
            $fosManager->updateUser($user);

            return New Response(Response::HTTP_NO_CONTENT);
        }
        else {
            return new Response("Invalid current password", Response::HTTP_BAD_REQUEST);
        }
    }


    /**
     * @ApiDoc(
     *  resource=true,
     *  section="Settings",
     *  description="This function is used to get settings data",
     *  statusCodes={
     *         401="Unauthorized user",
     *     }
     * )
     * @Rest\View(serializerGroups={"settings"})
     */
    public function getSettingsAction()
    {
        //get current user
        $user = $this->getUser();

        //check if user not found
        if (!is_object($user)) {

            // return 404 if user not found
            return new Response('User not found', Response::HTTP_UNAUTHORIZED);
        }

        return $user;
    }

    /**
     * @ApiDoc(
     *  resource=true,
     *  section="Settings",
     *  description="This function is used to remove user emails in settings",
     *  statusCodes={
     *         200="Return when successful",
     *         400="Bad request",
     *         404="Return when user not found",
     *         401="Unauthorized user",
     *     },
     *  parameters={
     *      {"name"="email", "dataType"="string", "required"=false, "description"="User`s email remove"},
     * }
     * )
     * @Rest\View()
     */
    public function deleteEmailAction(Request $request)
    {
        // get all data
        $data = $request->request->all();

        // get entity manager
        $em = $this->getDoctrine()->getManager();

        //get current user
        $user = $this->getUser();

        //get email in request data
        $email = array_key_exists('email', $data) ? $data['email'] : null;

        //check if email is empty
        if (!$email) {

            // return 404 if email is empty
           return new Response( 'Email data is empty', Response::HTTP_BAD_REQUEST);
        }

        //check if user not found
        if (!is_object($user)) {

            // return 404 if user not found
          return new Response('User not found', Response::HTTP_UNAUTHORIZED);
        }

        //get user all emails
        $userEmails = $user->getUserEmails();

        //check if current user have userEmails
        if ($userEmails) {

            //check if email exist in userEmails
           if(!array_key_exists($email, $userEmails)) {

               // return 404 if email is empty
               return new Response('This user not have current email', Response::HTTP_BAD_REQUEST);
           }

            //remove email
            unset($userEmails[$email]);

            //set changed email data
            $user->setUserEmails($userEmails);

            $em->persist($user);
            $em->flush();

            return new Response('', Response::HTTP_OK);
        }

        // return 404 if email is empty
        return new Response('User not have removable email', Response::HTTP_BAD_REQUEST);
    }
}