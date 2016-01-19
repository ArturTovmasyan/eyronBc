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
        //get project name
        $projectName = $this->container->getParameter('project_name');

        //get activate url
        $url = $this->container->get('router')->generate('registration_confirm', array('token' => $registrationToken), true);

        //get help center link
        $helpLink = $this->container->get('router')->generate('page', array('slug' => 'contact-us'), true);

        $message = \Swift_Message::newInstance()
            ->setSubject('Please confirm your ' . $projectName . ' account')
            ->setFrom('confirmEmail@'. $projectName . '.com')
            ->setCc($email)
            ->setContentType("text/html; charset=UTF-8")
            ->setBody($this->container->get('templating')->render(
                'ApplicationUserBundle:Registration:emailConfirm.html.twig',
                array('name' => $name, 'url' => $url, 'email' => $email, 'helpUrl' => $helpLink)
            ), "text/html");

        $headers = $message->getHeaders();
        $headers->addTextHeader("Message-ID: <".time()." TheSystem@".$_SERVER['SERVER_NAME'].">");
        $headers->addTextHeader("X-Mailer: PHP v".phpversion()."");

        $this->container->get('mailer')->send($message);
    }
}
