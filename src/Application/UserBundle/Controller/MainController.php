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

        //get fos user manager
        $fosManager = $this->container->get("fos_user.user_manager");

        //set default primary email value
        $primaryEmail = false;

        // create goal form
        $form = $this->createForm(new SettingsType(), $user);

        // check request method
        if ($request->isMethod("POST")) {

            // get data from request
            $form->handleRequest($request);

            // check valid
            if ($form->isValid()) {

                //get userEmails in form
                $emailsInForm = $form->get('bl_multiple_email')->getData();

                //get user emails values in emailsInForm data
                $emailValue = array_map(function($item){ return $item['userEmails']; }, $emailsInForm);

                //set custom error class
//                $errors = new FormError($tr->trans('email.error', array(), 'FOSUserBundle'));
//
//                if(array_search($user->getEmail(), $emailValue)) {
//
//                    //set error in field
//                    $form->get('email')->addError($errors);
//                }

                //get primary values in emailsInForm data
                $primaryValue = array_map(function($item){ return $item['primary']; }, $emailsInForm);

                //if remove email exist in array
                if(($key = array_search('1', $primaryValue)) !== false) {

                    //get primary email
                    $primaryEmail = $emailsInForm[$key]['userEmails'];
                }

                //check if primary email exist in emailValue
                if(($key = array_search($primaryEmail, $emailValue)) !== false) {

                    unset($emailsInForm[$key]);
                }

                //check if set another primary email
                if($primaryEmail != false && $user->getEmail() !== $primaryEmail &&
                  (array_search($user->getEmail(), $emailsInForm) == false)) {

                    $emailsInForm[] = [
                        "userEmails" => $user->getEmail(),
                        "primary" => 0
                    ];
                }

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

                //set custom error class
                $error = new FormError($tr->trans('password.error', array(), 'FOSUserBundle'));

                //check if current password valid
                if($userPassword == $encode_data_pass) {

                    //check if primary email exist
                    if($primaryEmail) {
                        $user->setEmail($primaryEmail);
                    }

                    //set user emails
                    $user->setUserEmails($emailsInForm);

                    //set new password
                    $user->setPlainPassword($newPassword);
                    $this->get('bl_service')->uploadFile($user);

                    //update user
                    $fosManager->updateUser($user);

                    return $this->redirect($this->generateUrl('settings'));

                }
                else {
                    //set error in field
                    $form->get('password')->addError($error);
                }
            }
        }

        return array('form' => $form->createView());
    }

    /**
     * This function is used to remove user emails by email name
     *
     * @Route("/settings/remove-email/{email}", name="remove_email")
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
        if($userEmails) {

            //get userEmail value in array
            $emailsValue = array_map(function($item){ return $item['userEmails']; }, $userEmails);

            //if remove email exist in array
            if(($key = array_search($email, $emailsValue)) !== false) {

                unset($userEmails[$key]);
            }

            //set changed email data
            $user->setUserEmails($userEmails);

            $em->persist($user);
            $em->flush();
        }

        return $this->redirect($_SERVER['HTTP_REFERER']);

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
        if($user && count($user->getUserGoal()) == 0) {
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
        if(!$user){
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
        if ($user->getRegistrationToken()){
            $this->get('bl.email.sender')->sendConfirmEmail($user->getEmail(), $user->getRegistrationToken(), $user->getFirstName());

            return array();
        }

        $referer = $request->headers->get('referer');
        if ($referer){
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
