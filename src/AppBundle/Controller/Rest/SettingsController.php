<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 10/28/15
 * Time: 12:15 PM
 */

namespace AppBundle\Controller\Rest;

use Nelmio\ApiDocBundle\Annotation\ApiDoc;
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