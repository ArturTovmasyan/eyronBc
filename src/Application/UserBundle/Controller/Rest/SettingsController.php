<?php
/**
 * Created by PhpStorm.
 * User: Artur
 * Date: 03/02/16
 * Time: 12:15 PM
 */

namespace Application\UserBundle\Controller\Rest;

use Application\UserBundle\Entity\User;
use Application\UserBundle\Form\ChangePasswordMobileType;
use Application\UserBundle\Form\SettingsMobileType;
use JMS\SecurityExtraBundle\Annotation\Secure;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
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
     *         204="No content",
     *         400="Bad request",
     *         401="Unauthorized user",
     *     },
     * parameters={
     *      {"name"="bl_mobile_user_settings[file]", "dataType"="file", "required"=false, "description"="Users profile image file"},
     *      {"name"="bl_mobile_user_settings[firstName]", "dataType"="string", "required"=true, "description"="User`s first name | min=3 / max=20 symbols"},
     *      {"name"="bl_mobile_user_settings[lastName]", "dataType"="string", "required"=true, "description"="User`s last name | min=3 / max=20 symbols"},
     *      {"name"="bl_mobile_user_settings[primary]", "dataType"="email", "required"=false, "description"="User`s primary email"},
     *      {"name"="bl_mobile_user_settings[addEmail]", "dataType"="email", "required"=false, "description"="Add email for user"},
     *      {"name"="bl_mobile_user_settings[birthDate]", "dataType"="string", "required"=false, "description"="User`s birthday | in this 2015/01/22 format"},
     *      {"name"="bl_mobile_user_settings[language]", "dataType"="string", "required"=false, "description"="User`s language | en|ru"},
     *      {"name"="bl_mobile_user_settings[commentNotify]", "dataType"="boolean", "required"=false, "description"="User`s comment email notify | 0|1"},
     *      {"name"="bl_mobile_user_settings[successStoryNotify]", "dataType"="boolean", "required"=false, "description"="User`s success story email notify | 0|1"},
     * }
     * )
     * @Rest\View(serializerGroups={"user"})
     * @Secure("ROLE_USER")
     */
    public function postSettingsAction(Request $request)
    {
        //get current user
        $user = $this->getUser();

        //get entity manager
        $em = $this->getDoctrine()->getManager();

        // create goal form
        $form = $this->createForm(new SettingsMobileType(), $user);

        // get data from request
        $form->handleRequest($request);

        //check if from valid
        if ($form->isValid()) {

            //get uploadFile service for load profile pictures
            $this->container->get('bl_service')->uploadFile($user);

            $em->persist($user);
            $em->flush();

            $em->getRepository("AppBundle:Goal")->findMyDraftsCount($user);

            return $user;

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
     *      {"name"="bl_mobile_change_password[currentPassword]", "dataType"="password", "required"=true, "description"="User current password"},
     *      {"name"="bl_mobile_change_password[plainPassword][first]", "dataType"="string", "required"=true, "description"="User new password"},
     *      {"name"="bl_mobile_change_password[plainPassword][second]", "dataType"="string", "required"=true, "description"="User new password"},
     * }
     * )
     * @param $request
     * @return Response
     * @Rest\View()
     * @Secure("ROLE_USER")
     */
    public function postChangePasswordAction(Request $request)
    {
        //get current user
        $user = $this->getUser();

        // create goal form
        $form = $this->createForm(new ChangePasswordMobileType(), $user);

        // get data from request
        $form->handleRequest($request);

        //check if from valid
        if ($form->isValid()) {

            //get fos user manager
            $fosManager = $this->container->get("fos_user.user_manager");

            //update user
            $fosManager->updateUser($user);

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
     *  description="This function is used to get setting by user id",
     *  statusCodes={
     *         200="OK",
     *     },
     * )
     * @Rest\View(serializerGroups={"settings"})
     * @Secure("ROLE_USER")
     */
    public function getUserFromSettingsAction()
    {
        //get current user
        $user = $this->getUser();

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
     *         401="Unauthorized user",
     *     },
     *  parameters={
     *      {"name"="email", "dataType"="string", "required"=true, "description"="User`s email"},
     * }
     * )
     * @Rest\View()
     * @Secure("ROLE_USER")
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