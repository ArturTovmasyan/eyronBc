<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 10/9/15
 * Time: 12:56 PM
 */


namespace Application\UserBundle\Handler;

use Symfony\Component\DependencyInjection\Container;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Http\Authentication\AuthenticationFailureHandlerInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationSuccessHandlerInterface;
use Symfony\Bundle\FrameworkBundle\Routing\Router;
use Symfony\Component\Security\Http\EntryPoint\AuthenticationEntryPointInterface;

/**
 * Class AuthenticationHandler
 * @package AppBundle\Handler
 */
class AuthenticationHandler implements AuthenticationSuccessHandlerInterface, AuthenticationFailureHandlerInterface, AuthenticationEntryPointInterface
{
    /**
     * @var \Symfony\Bundle\FrameworkBundle\Routing\Router
     */
    private $router;

    /**
     * @var Container
     */
    private $container;

    /**
     * @param Router $router
     */
    public function __construct(Router $router, Container $container = null)
    {
        $this->container = $container;
        $this->router = $router;
    }


    /**
     * @param Request $request
     * @param TokenInterface $token
     * @return RedirectResponse|Response
     */
    public function onAuthenticationSuccess(Request $request, TokenInterface $token)
    {
        // get roles
        $user = $token->getUser();

        //get session
        $session = $request->getSession();

        //check if user and session url exist
        if ($user && $session->has('url') && !$user->isAdmin()) {

            //get url is session
            $url = $session->get('url');

            //remove url
            $session->remove('url');

        }
        elseif ($user && $user->isAdmin()) {
            $url = $this->router->generate('sonata_admin_dashboard');
        }
        else {
            // generate url
            $url = $this->router->generate('check-login');
        }

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

    /**
     * @param Request $request
     * @param AuthenticationException|null $authException
     * @return JsonResponse|RedirectResponse
     */
    public function start(Request $request, AuthenticationException $authException = null)
    {
        //check if request format is json
        if ($request->get('_format') == "json"){
            return new JsonResponse('User not found', Response::HTTP_UNAUTHORIZED);
        }

        //set flash messages for open login by js
        $this->container->get('session')->getFlashBag()->add('error', '');

        //get current route name
        $routeName = $request->get('_route');

        //get url
        $url = $request->getUri();

        if($routeName == "done_goal") {

            //set url in session
            $request->getSession()->set('url', $url);

        }
        elseif($routeName == "add_to_me_goal" || $routeName == "settings" || $routeName == "add_story") {

            //get last url
            $redirectUrl = $request->headers->get('referer');

            //set url in session
            $request->getSession()->set('url', $redirectUrl);

            //set url in session
            $request->getSession()->set('addUrl', $url);

            return new JsonResponse('User not found', Response::HTTP_UNAUTHORIZED);

        }

        $loginPath = $this->router->generate('homepage');
        return new RedirectResponse($loginPath);
    }

}