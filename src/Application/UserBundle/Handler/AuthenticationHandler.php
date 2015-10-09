<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 10/9/15
 * Time: 12:56 PM
 */


namespace Application\UserBundle\Handler;

use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Http\Authentication\AuthenticationFailureHandlerInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationSuccessHandlerInterface;

/**
 * Class AuthenticationHandler
 * @package AppBundle\Handler
 */
class AuthenticationHandler implements AuthenticationSuccessHandlerInterface, AuthenticationFailureHandlerInterface
{
    /**
     * @param Request $request
     * @param TokenInterface $token
     * @return RedirectResponse|Response
     */
    public function onAuthenticationSuccess(Request $request, TokenInterface $token)
    {

////        if ($request->isXmlHttpRequest())
//        {
//            $result = array('success' => true);
//            $response = new Response(json_encode($result));
//            $response->headers->set('Content-Type', 'application/json');
//            return $response;
//        }
//        return new RedirectResponse($this->router->generate('anag_new'));
    }

    /**
     * @param Request $request
     * @param AuthenticationException $exception
     * @return Response
     */
    public function onAuthenticationFailure(Request $request, AuthenticationException $exception)
    {

////        if ($request->isXmlHttpRequest())
//        {
//            $result = array('success' => false, 'message' => $exception->getMessage());
//            $response = new Response(json_encode($result));
//            $response->headers->set('Content-Type', 'application/json');
//            return $response;
//        }
//        return new Response();
    }

}