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
     * @Template()
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
}
