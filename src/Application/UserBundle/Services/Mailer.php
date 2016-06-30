<?php
/**
 * Created by PhpStorm.
 * User: andranik
 * Date: 11/27/15
 * Time: 2:33 PM
 */
namespace Application\UserBundle\Services;

use FOS\UserBundle\Mailer\Mailer as BaseMailer;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Bundle\FrameworkBundle\Templating\EngineInterface;

class Mailer extends BaseMailer
{
    protected $translator;

    public function __construct($translator, $mailer, RouterInterface $router, EngineInterface $templating, array $parameters)
    {
        $this->translator = $translator;

        parent::__construct($mailer, $router, $templating, $parameters);
    }

    /**
     * @param string $renderedTemplate
     * @param $fromEmail
     * @param string $toEmail
     */
    protected function sendEmailMessage($renderedTemplate, $fromEmail, $toEmail)
    {
        // Render the email, use the first line as the subject, and the rest as the body
        $renderedLines = explode("\n", trim($renderedTemplate));
        $subject = $renderedLines[0];
        $body = implode("\n", array_slice($renderedLines, 1));
        $projectName = $this->translator->trans('bucketlist', array(), 'messages');

        $message = \Swift_Message::newInstance()
            ->setSubject($subject)
            ->setFrom($fromEmail, $projectName)
            ->setTo($toEmail)
            ->setContentType("text/html; charset=UTF-8")
            ->setBody($body);

        $this->mailer->send($message);
    }
}

