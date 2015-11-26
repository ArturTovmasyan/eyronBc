<?php

namespace Application\UserBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;

class MainController extends Controller
{
    /**
     * @Route("/settings", name="settings")
     * @Template()
     */
    public function settingsAction()
    {
        return array();
    }

    /**
     * @Route("/check-login", name="check-login")
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function checkLoginAction(Request $request)
    {
        // get referer
        $referer = $request->server->get('HTTP_REFERER');
        // generate url
        $url = $referer ?
            $referer :
            $this->generateUrl('homepage');

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
            return array('verified' => false);
        }

        $user->setRegistrationToken(null);
        $em->persist($user);
        $em->flush();

        return array('verified' => true);
    }

    /**
     * @Route("/resend-message", name="resend_message")
     * @Security("has_role('ROLE_USER')")
     * @param Request $request
     * @return RedirectResponse
     */
    public function resendMessageAction(Request $request)
    {
        $user = $this->getUser();
        if ($user->getRegistrationToken()){
            $this->get('bl.email.sender')->sendConfirmEmail($user->getEmail(), $user->getRegistrationToken(), $user->getFirstName());
        }

        $referer = $request->headers->get('referer');
        return new RedirectResponse($referer);
    }
}
