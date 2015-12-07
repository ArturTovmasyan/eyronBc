<?php

namespace Application\UserBundle\Controller;

use Application\UserBundle\Entity\User;
use Application\UserBundle\Form\Type\SettingsType;
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
     */
    public function settingsAction(Request $request)
    {

        // get entity manager
        $em = $this->getDoctrine()->getManager();

        //get translator
        $tr = $this->get('translator');

        // get current user
        $user = $this->getUser();

        //get fos user manager
        $fosManager = $this->container->get("fos_user.user_manager");

        // create goal form
        $form = $this->createForm(new SettingsType(), $user);

        // check request method
        if ($request->isMethod("POST")) {

            // get data from request
            $form->handleRequest($request);

            // check valid
            if ($form->isValid()) {

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

                if($userPassword == $encode_data_pass) {

                    //set new password
                    $user->setPlainPassword($newPassword);
                    $this->get('bl_service')->uploadFile($user);

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
        return new RedirectResponse($referer);
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
