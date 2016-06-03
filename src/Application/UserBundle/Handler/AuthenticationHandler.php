<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 10/9/15
 * Time: 12:56 PM
 */


namespace Application\UserBundle\Handler;

use AppBundle\Services\GoogleAnalyticService;
use Doctrine\ORM\EntityManager;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\Routing\Route;
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
     * @var GoogleAnalyticService
     */
    private $analytic;

    /**
     * @var Session
     */
    private $session;

    /**
     * AuthenticationHandler constructor.
     * @param Session|null $session
     * @param Router|null $router
     * @param GoogleAnalyticService|null $analytic
     */
    public function __construct(Session $session = null, Router $router = null, GoogleAnalyticService $analytic = null)
    {
        $this->analytic      = $analytic;
        $this->router        = $router;
        $this->session       = $session;
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

        //get social name for user login
        $social = $user->getSocialsName();

        //check if social exists
        if($social) {

            //send login user by social event in google analytics
            $this->analytic->loginUserBySocialEvent($social);
        }
        else{
            //send login user event in google analytics
            $this->analytic->loginUserEvent();
        }

        //check if user and session url exist
        if ($user && $session->has('url') && !$user->isAdmin()) {

            //get url is session
            $url = $session->get('url');

            //remove url
            $session->remove('url');

        }
        elseif ($user && ($user->isAdmin() || $user->hasRole('ROLE_GOD'))) {
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
        $this->session->getFlashBag()->add('error', '');

        //get current route name
        $routeName = $request->get('_route');

        //get url
        $url = $request->getUri();

        //check if route name is done_goal
        if ($routeName == "done_goal") {

            //set url in session
            $request->getSession()->set('url', $url);
        }

        //check if route nam is current list
        if ($routeName == "add_to_me_goal" ||
            $routeName == "settings"       ||
            $routeName == "add_story"      ||
            $routeName == "add_goal") {

            //check if route don`t add_goal
            if ($routeName !== "add_goal") {

                //get last url
                $redirectUrl = $request->headers->get('referer');

                //set url in session
                $request->getSession()->set('url', $redirectUrl);

                //set url in session
                $request->getSession()->set('addUrl', $url);
            }

            return new JsonResponse('User not found', Response::HTTP_UNAUTHORIZED);
        }

        //generate homepage url for redirect
        $loginPath = $this->router->generate('homepage');

        return new RedirectResponse($loginPath);
    }

}