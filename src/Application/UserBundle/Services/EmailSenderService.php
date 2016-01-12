<?php
/**
 * Created by PhpStorm.
 * User: andranik
 * Date: 11/26/15
 * Time: 3:15 PM
 */
namespace Application\UserBundle\Services;

use Symfony\Component\DependencyInjection\Container;

class EmailSenderService
{
    /**
     * @var Container
     */
    protected $container;

    /**
     * ConfirmEmailService constructor.
     * @param Container $container
     */
    public function __construct(Container $container)
    {
        $this->container = $container;
    }

    public function sendConfirmEmail($email, $registrationToken, $name)
    {
        $router = $this->container->get('router');
        $request = $this->container->get('request_stack')->getCurrentRequest();
        $projectName = $this->container->getParameter('project_name');

        $url = $request->getHttpHost() . $router->generate("registration_confirm", array('token' => $registrationToken));

        $message = \Swift_Message::newInstance()
            ->setSubject('Please confirm your ' . $projectName . ' account')
            ->setFrom('tigranparemuzian@gmail.com')
            ->setCc($email)
            ->setContentType("text/html; charset=UTF-8")
            ->setBody($this->container->get('templating')->render(
                'ApplicationUserBundle:Registration:emailConfirm.html.twig',
                array('name' => $name, 'url' => $url, 'email' => $email)
            ), "text/html");

        $this->container->get('mailer')->send($message);
    }
}
