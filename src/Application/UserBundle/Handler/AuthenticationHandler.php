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
use Symfony\Bundle\FrameworkBundle\Routing\Router;

/**
 * Class AuthenticationHandler
 * @package AppBundle\Handler
 */
class AuthenticationHandler implements AuthenticationSuccessHandlerInterface, AuthenticationFailureHandlerInterface
{
    /**
     * @var \Symfony\Bundle\FrameworkBundle\Routing\Router
     */
    private $router;

    /**
     * @param Router $router
     */
    public function __construct(Router $router)
    {
        $this->router = $router;
    }


    /**
     * @param Request $request
     * @param TokenInterface $token
     * @return RedirectResponse|Response
     */
    public function onAuthenticationSuccess(Request $request, TokenInterface $token)
    {
        // generate url
        $url =  $request->headers->get('referer') ?
            $request->headers->get('referer') :
            $this->router->generate('homepage');

        // check request method
        if ($request->isXmlHttpRequest()) {

            // create response
            $response =  new Response(Response::HTTP_OK);
            $response->setContent(json_encode(array('link' => $url)));

            // set header
            $response->headers->set('Content-Type', 'application/json');

            // return response
            return $response;
        }
        else {

            return new RedirectResponse($url);
        }
    }

    /**
     * @param Request $request
     * @param AuthenticationException $exception
     * @return Response
     */
    public function onAuthenticationFailure(Request $request, AuthenticationException $exception)
    {
        // generate url
        $url =  $request->headers->get('referer') ?
            $request->headers->get('referer') :
            $this->router->generate('homepage');

        // check request method
        if ($request->isXmlHttpRequest()) {
            // create response
            $response =  new Response('', Response::HTTP_BAD_REQUEST);

            $response->setContent(json_encode(array('message'=>'Incorrect Email or Password')));
            // set header
            $response->headers->set('Content-Type', 'application/json');

            // return response
            return $response;
        }
        else {

            // set flush message
            $request->getSession()->getFlashBag()->add('error', $exception->getMessage());

            // redirect
            return new RedirectResponse($url);
        }

    }

}