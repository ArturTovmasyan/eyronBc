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

    /**
     * @param $email
     * @param $registrationToken
     * @param $name
     * @throws \Throwable
     * @throws \Twig_Error
     */
    public function sendConfirmEmail($email, $registrationToken, $name)
    {
        //get project name
        $projectName = $this->container->getParameter('email_sender');

        //get set from email in parameters
        $setFrom =  $this->container->getParameter('no_reply');

        //get activate url
        $url = $this->container->get('router')->generate('registration_confirm', array('token' => $registrationToken), true);

        //get help center link
        $helpLink = $this->container->get('router')->generate('page', array('slug' => 'contact-us'), true);

        $message = \Swift_Message::newInstance()
            ->setSubject('Please confirm your ' . $projectName . ' account')
            ->setFrom($setFrom, $projectName)
            ->setCc($email)
            ->setContentType("text/html; charset=UTF-8")
            ->setBody($this->container->get('templating')->render(
                'ApplicationUserBundle:Registration:emailConfirm.html.twig',
                array('name' => $name, 'url' => $url, 'email' => $email, 'helpUrl' => $helpLink)
            ), "text/html");

        $this->container->get('mailer')->send($message);
    }

    /**
     * @param $newUserEmail
     * @param $emailToken
     * @param $userName
     * @throws \Throwable
     * @throws \Twig_Error
     */
    public function sendActivationUserEmail($newUserEmail, $emailToken, $userName)
    {
        //get project name
        $projectName = $this->container->getParameter('email_sender');

        //get set from email in parameters
        $setFrom =  $this->container->getParameter('no_reply');

        //get email activate url
        $url = $this->container->get('router')->generate('activation_user_email', array('emailToken' => $emailToken, 'email' => $newUserEmail), true);

        //get help center link
        $helpLink = $this->container->get('router')->generate('page', array('slug' => 'contact-us'), true);

        $message = \Swift_Message::newInstance()
            ->setSubject('Please confirm your new email in ' . $projectName . ' account')
            ->setFrom($setFrom, $projectName)
            ->setCc($newUserEmail)
            ->setContentType('text/html; charset=UTF-8')
            ->setBody($this->container->get('templating')->render(
                'ApplicationUserBundle:Registration:userEmailsActivation.html.twig',
                array('name' => $userName, 'url' => $url, 'email' => $newUserEmail, 'helpUrl' => $helpLink)
            ), 'text/html');

        $this->container->get('mailer')->send($message);
    }

    /**
     * This function send contact us message to admins
     *
     * @param $email
     * @param $name
     * @param $data
     * @throws \Twig_Error
     */
    public function sendContactUsEmail($email, $name, $data)
    {
        //get project name
        $projectName = $this->container->getParameter('email_sender');

        $fromEmail = 'confirmEmail@' . $this->container->getParameter('project_name') . '.com';

        // generate url
        $helpLink = $this->container->get('router')->generate('homepage', array(), true);

        // calculate message
        $message = \Swift_Message::newInstance()
            ->setSubject('You have a message from ' . $projectName )
            ->setFrom($fromEmail, $projectName)
            ->setCc($email)
            ->setContentType("text/html; charset=UTF-8")
            ->setBody($this->container->get('templating')->render(
                'AppBundle:Main:contactUsEmail.html.twig',
                array('name' => $name, 'data' => $data, 'link'=>$helpLink)
            ), "text/html");
        // send email
        $this->container->get('mailer')->send($message);
    }
}
