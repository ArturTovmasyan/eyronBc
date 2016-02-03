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
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\HttpKernel\Exception\HttpException;

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

        if (!$email) {
            // return 404 if email is empty
            throw new HttpException(Response::HTTP_BAD_REQUEST, "Email data is empty");
        }

        //check if user not found
        if (!is_object($user)) {
            // return 404 if toUser not found
            throw new HttpException(Response::HTTP_UNAUTHORIZED, "User not found");
        }

        //get user all emails
        $userEmails = $user->getUserEmails();

        //check if current user have userEmails
        if ($userEmails) {

            unset($userEmails[$email ]);
        }

        //set changed email data
        $user->setUserEmails($userEmails);

        $em->persist($user);
        $em->flush();

        return new Response('', Response::HTTP_OK);
    }
}