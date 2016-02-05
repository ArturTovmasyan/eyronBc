<?php
/**
 * Created by PhpStorm.
 * User: Artur
 * Date: 03/02/16
 * Time: 12:15 PM
 */

namespace AppBundle\Controller\Rest;

use Application\UserBundle\Form\SettingsMobileType;
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
     *      {"name"="bl_mobile_user_settings[file]", "dataType"="file", "required"=false, "description"="Users profile image file"},
     *      {"name"="bl_mobile_user_settings[firstName]", "dataType"="string", "required"=true, "description"="User`s first name | min=3 / max=20 symbols"},
     *      {"name"="bl_mobile_user_settings[lastName]", "dataType"="string", "required"=true, "description"="User`s last name | min=3 / max=20 symbols"},
     *      {"name"="bl_mobile_user_settings[primary]", "dataType"="email", "required"=false, "description"="User`s primary email"},
     *      {"name"="bl_mobile_user_settings[addEmail]", "dataType"="email", "required"=false, "description"="Add email for user"},
     *      {"name"="bl_mobile_user_settings[birthDate]", "dataType"="string", "required"=false, "description"="User`s birthday | in this 01/12/2015 format"},
     * }
     * )
     * @Rest\View(serializerGroups={"settings"})
     */
    public function postSettingsAction(Request $request)
    {
        //get current user
        $user = $this->getUser();

        //check if user not found
        if (!is_object($user)) {

            // return 404 if user not found
            return new Response('User not found', Response::HTTP_UNAUTHORIZED);
        }

        //get entity manager
        $em = $this->getDoctrine()->getManager();

        // create goal form
        $form = $this->createForm(new SettingsMobileType(), $user);

        // get data from request
        $form->handleRequest($request);

        //check if from valid
        if ($form->isValid()) {

            //get function in user object
            $user->hasSettingsProcess();

            //get uploadFile service for load profile pictures
            $this->container->get('bl_service')->uploadFile($user);

            $em->persist($user);
            $em->flush();

            return new Response('', Response::HTTP_OK);

        }
        else{

            //get form errors
            $formErrors = $form->getErrors(true);

            //set default array
            $returnResult = array();

            foreach($formErrors as $formError)
            {
                //get error field name
                $name = $formError->getOrigin()->getConfig()->getName();

                //set for errors in array
                $returnResult[$name] = $formError->getMessage();
            }

            return new JsonResponse($returnResult, Response::HTTP_BAD_REQUEST);

        }
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