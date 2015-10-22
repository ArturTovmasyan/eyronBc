<?php

namespace Application\UserBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
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
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     * @param $token
     */
    public function confirmAction($token)
    {
        // get entity manager
        $em = $this->getDoctrine()->getManager();

        // get user by token
        $user = $em->getRepository("ApplicationUserBundle:User")->findOneBy(array('registrationToken' => $token));

        // check user
        if(!$user){

            throw $this->createNotFoundException("user not found");
        }

        // set token to null
        $user->setRegistrationToken(null);

        $em->persist($user);
        $em->flush();

        return $this->redirectToRoute('homepage');
    }
}
