<?php

namespace Application\UserBundle\Controller;

use Application\UserBundle\Entity\User;
use Application\UserBundle\Form\SettingsType;
use JMS\SecurityExtraBundle\Annotation\Secure;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\Form\FormError;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class MainController extends Controller
{
    /**
     * @Route("/settings", name="settings")
     * @Template()
     * @Secure(roles="ROLE_USER")
     */
    public function settingsAction(Request $request)
    {
        //get translator
        $tr = $this->get('translator');

        // get current user
        $user = $this->getUser();

        //get current email
        $currentEmail = $user->getEmail();

        //get user emails in db
        $userEmails = $user->getUserEmails();

        //set default
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

        // create goal form
        $form = $this->createForm(new SettingsType(), $user);

        // check request method
        if ($request->isMethod("POST")) {

            // get data from request
            $form->handleRequest($request);

            // get current password in form
            $currentPassword = $form->get('password')->getData();

            //get new password in form
            $newPassword = $form->get('plainPassword')->getData();

            //get current user password
            $userPassword = $user->getPassword();

            //get encoder service
            $encoder_service = $this->get('security.encoder_factory');

            //encoder user
            $encoder = $encoder_service->getEncoder($user);

            //encoder sent current password
            $encode_data_pass = $encoder->encodePassword($currentPassword, $user->getSalt());

            //check if current password valid
            if ($currentPassword && $userPassword !== $encode_data_pass) {

                //set custom error class
                $error = new FormError($tr->trans('password.error', array(), 'FOSUserBundle'));

                //set error in field
                $form->get('password')->addError($error);
            }

            //check if current password not set
            if ($newPassword && $currentPassword == null) {

                //set custom error class
                $error = new FormError($tr->trans('password.current', array(), 'FOSUserBundle'));

                //set error in field
                $form->get('password')->addError($error);
            }

            //get new email in request
            $addEmail = $form->get('addEmail')->getData();

            //check if new email equal currentEmail
            if ($addEmail == $currentEmail) {

                //set custom error class
                $error = new FormError($tr->trans('email.error', array(), 'FOSUserBundle'));

                //set error in field
                $form->get('addEmail')->addError($error);
            }

            //get primary email
            $primaryEmail = $request->request->get('primary');

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
            if ($primaryEmail) {

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

            //set new password
            $user->setPlainPassword($newPassword);

            //get uploadFile service
            $this->get('bl_service')->uploadFile($user);

            //get validator
            $validator = $this->get('validator');

            //get errors
            $errors = $validator->validate($user, null, array('Register'));

            //returned value
            $returnResult = array();

            //check count of errors
            if (count($errors) > 0) {

                // loop for error
                foreach ($errors as $error) {
                    $returnResult[$error->getPropertyPath()] = $error->getMessage();
                }

                //check if email error exist
                if (array_key_exists('email', $returnResult)) {

                    //set custom error class
                    //$error = new FormError($returnResult['email']);
                    $error = new FormError($tr->trans('email.primary_error', array(), 'FOSUserBundle'));

                    //set error in field
                    $form->get('addEmail')->addError($error);
                }
            }

            //check if form is valid
            if ($form->isValid()) {

                //update user
                $fosManager->updateUser($user);

                return $this->redirect($this->generateUrl('homepage'));
            }
        }

        return array('form' => $form->createView());
    }

    /**
     * This function is used to remove user emails by email name
     *
     * @Route("/settings/remove-email/{email}", name="remove_email")
     * @Secure(roles="ROLE_USER")
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function removeEmailInSettings($email)
    {
        // get entity manager
        $em = $this->getDoctrine()->getManager();

        //get current user
        $user = $this->getUser();

        //get user all emails
        $userEmails = $user->getUserEmails();

        //check if current user have userEmails
        if ($userEmails) {

            //remove email in userEmails
            unset($userEmails[$email]);

            //set changed email data
            $user->setUserEmails($userEmails);

            $em->persist($user);
            $em->flush();
        }

        return $this->redirectToRoute('homepage');

    }

    /**
     * @Route("/activation_email/{emailToken}/{email}", name="activation_user_email")
     * @Secure(roles="ROLE_USER")
     */
    public function activationUserEmailsAction(Request $request, $emailToken, $email)
    {
        // get entity manager
        $em = $this->getDoctrine()->getManager();

        //get current user
        $user = $this->container->get('security.token_storage')->getToken()->getUser();

        //check if user not exist
        if (!$user) {
            // return Exception
            throw $this->createNotFoundException("User not found");
        }

        //get user emails
        $userEmails = $user->getUserEmails();

        //get current email data
        $data = $userEmails[$email];

        //get userEmail value in array
        $currentEmailToken = $data['token'];

        //check if tokens is equal
        if ($currentEmailToken == $emailToken) {

            //set token null in userEmails by key
            $userEmails[$email]['token'] = null;

            //set activation email token null
            $user->setUserEmails($userEmails);
        }
        else {
            // return Exception
            throw $this->createNotFoundException("Invalid email token for this user");
        }

            $em->persist($user);
            $em->flush($user);

        return $this->redirectToRoute('homepage');

    }

    /**
     * @Route("/check-login", name="check-login")
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function checkLoginAction(Request $request)
    {

        //get current user
        $user = $this->getUser();

        //check if user haven`t any goals
        if ($user && count($user->getUserGoal()) == 0) {
            // generate url
            $url = $this->generateUrl('goals_list');
        }
        else {

            // get referer
            $referer = $request->server->get('HTTP_REFERER');

            // generate url
            $url = $referer ?
                $referer :
                $this->generateUrl('homepage');
        }

        $this->addFlash('', '');

        return $this->redirect($url);
    }

    /**
     * @Route("/registration-confirm/{token}", name="registration_confirm")
     * @Template()
     * @param $token
     * @return array
     */
    public function confirmAction($token)
    {
        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository("ApplicationUserBundle:User")->findOneBy(array('registrationToken' => $token));

        // check user
        if (!$user) {
            throw new NotFoundHttpException('Invalid token');
        }

        $user->setRegistrationToken(null);
        $em->persist($user);
        $em->flush();

        return array();
    }

    /**
     * @Route("/resend-message", name="resend_message")
     * @Template()
     * @Security("has_role('ROLE_USER')")
     * @param Request $request
     * @return RedirectResponse
     */
    public function resendMessageAction(Request $request)
    {
        $user = $this->getUser();
        if ($user->getRegistrationToken()) {
            $this->get('bl.email.sender')->sendConfirmEmail($user->getEmail(), $user->getRegistrationToken(), $user->getFirstName());

            return array();
        }

        $referer = $request->headers->get('referer');
        if ($referer) {
            return new RedirectResponse($referer);
        }

        return $this->redirectToRoute('homepage');
    }

    /**
     * @Route("/update-email", name="update_email")
     * @Template()
     * @Security("has_role('ROLE_USER')")
     * @param Request $request
     * @return RedirectResponse
     */
    public function updateEmailAction(Request $request)
    {
        if (!$this->getUser()->getRegistrationToken()){
            return $this->redirectToRoute('homepage');
        }

        $user = new User();
        $form = $this->createFormBuilder($user, array('validation_groups' => array('update_email')))
            ->add('email', 'email', array('attr' => array(
                'oninvalid' => "EmailValidation(this)",
                'oninput' => "EmailValidation(this)"
            )
            ))
            ->add('done', 'submit')
            ->getForm();


        if ($request->getMethod() == "POST"){

            $form->handleRequest($request);

            if ($form->isValid()){

                $token = md5(microtime());
                $email = $form->get('email')->getData();

                $this->getUser()->setRegistrationToken($token);
                $this->getUser()->setEmail($email);

                $this->get('bl.email.sender')->sendConfirmEmail($email, $token, $this->getUser()->getFirstName());

                $em = $this->getDoctrine()->getManager();
                $em->flush();

                return $this->redirectToRoute('homepage');
            }
        }

        return array('form' => $form->createView());
    }
}
