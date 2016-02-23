<?php
/**
 * Created by PhpStorm.
 * User: andranik
 * Date: 11/27/15
 * Time: 2:33 PM
 */
namespace Application\UserBundle\Services;

use FOS\UserBundle\Mailer\Mailer as BaseMailer;

class Mailer extends BaseMailer
{
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

        $message = \Swift_Message::newInstance()
            ->setSubject($subject)
            ->setFrom($fromEmail)
            ->setTo($toEmail)
            ->setContentType("text/html; charset=UTF-8")
            ->setBody($body);

        $message->getHeaders()->addTextHeader('mailed-by', 'bucketlist127.com');

        $this->mailer->send($message);
    }
}

