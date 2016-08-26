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
     * @var Session
     */
    private $session;

    /**
     * AuthenticationHandler constructor.
     * @param Session|null $session
     * @param Router|null $router
     */
    public function __construct(Session $session = null, Router $router = null)
    {
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
        $request->getSession()
            ->getFlashBag()
                ->set('userLogin','User login by '.$social.' from Web')
            ;
        }
        else{
            $request->getSession()
                ->getFlashBag()
                ->set('userLogin','User native login from Web')
            ;
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
        $routeName   = $request->get('_route');
        $url         = $request->getUri();
        $referrerUrl = $request->headers->get('referer');

        $routeNames = [
            "rest_put_usergoal",
            "rest_get_usergoal_done"
        ];

        if (in_array($routeName, $routeNames)) {
            $goal = $request->get('goal');
            $request->getSession()->set('goal_action', ['action' => $routeName, 'goal_id' => (is_object($goal) ? $goal->getId() : $goal) ]);
        }

        if ($request->get('_format') == "json"){
            return new JsonResponse('User not found', Response::HTTP_UNAUTHORIZED);
        }

        $this->session->getFlashBag()->add('error-open-login', '');

        $loginPath = $referrerUrl;
        if (!$loginPath){
            //generate homepage url for redirect
            $loginPath = $this->router->generate('homepage');
        }

        $request->getSession()->set('url', $url);

        return new RedirectResponse($loginPath);
    }

}