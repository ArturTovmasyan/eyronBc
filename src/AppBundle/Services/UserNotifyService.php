<?php

namespace AppBundle\Services;

use AppBundle\Entity\Goal;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Kernel;
use Symfony\Component\Routing\Router;
use Symfony\Bundle\TwigBundle\TwigEngine;


/**
 * Class UserNotifyService
 * @package AppBundle\Services
 */
class UserNotifyService
{
    /**
     * @var \Symfony\Component\DependencyInjection\Container
     */
    protected  $router;

    /**
     * @var TwigEngine
     */
    protected  $template;

    /**
     * @var \Swift_Mailer
     */
    protected  $mailer;

    /**
     * @var
     */
    protected  $noReplyEmail;

    /**
     * @var
     */
    protected  $userNotify;


    /**
     * UserNotifyService constructor.
     * @param Router $router
     * @param TwigEngine $template
     * @param \Swift_Mailer $mailer
     * @param $isDebug
     * @param $noReplyEmail
     * @param $enabled
     */
    public function __construct(Router $router, TwigEngine $template, \Swift_Mailer $mailer, $isDebug, $noReplyEmail, $enabled)
    {
        $this->router = $router;
        $this->template = $template;
        $this->mailer = $mailer;
        $this->isDebug = $isDebug;
        $this->noReplyEmail = $noReplyEmail;
        $this->enabled = $enabled;
    }


    /**
     * This function is used to send notify about new comment
     * 
     * @param Goal $goal
     * @param $senderName
     * @throws \Swift_TransportException
     */
    public function sendNotifyAboutNewComment(Goal $goal, $senderName)
    {
        //check if user notify is disabled
        if(!$this->enabled) {
            return;
        }

        //get goal author
        $author = $goal->getAuthor();

        //get author email
        $email = $author->getEmail();

        //get author name
        $authorName = $author->showName();

        //get goal slug
        $slug = $goal->getSlug();

        //generate goal inner page url for email
        $url = $this->router->generate('inner_goal', array('slug' => $slug), true);

        //generate content for email
        $content = $this->template->render(
            'AppBundle:Main:userNotifyEmail.html.twig',
            array('senderName' => $senderName, 'userName' => $authorName, 'link' => $url)
        );

        $this->sendEmail($email, $senderName, $authorName, $url);
    }

    /**
     * This function is used to send notify about new success story
     * 
     * @param Goal $goal
     * @param $senderName
     * @throws \Swift_TransportException
     */
    public function sendNotifyAboutNewSuccessStory(Goal $goal, $senderName)
    {
        //check if user notify is disabled
        if(!$this->enabled) {
            return;
        }

        //get goal author
        $author = $goal->getAuthor();

        //get goal author email
        $email = $author->getEmail();

        //get goal author name
        $authorName = $author->showName();

        //get goal slug
        $slug = $goal->getSlug();

        //generate goal inner page url for email
        $url = $this->router->generate('inner_goal', array('slug' => $slug), true);

        //generate content for email
        $content = $this->template->render(
            'AppBundle:Main:userNotifyEmail.html.twig',
            array('senderName' => $senderName, 'userName' => $authorName, 'link' => $url)
        );
        
        $this->sendEmail($email, $content);
    }

    /**
     * @param $email
     * @param $senderName
     * @param $authorName
     * @param $url
     * @param $notifyType
     * @throws \Swift_TransportException
     * @throws \Twig_Error
     */
    public function sendEmail($email, $content)
    {
        //get no-reply email
        $noReplyEmail = $this->noReplyEmail;

        //get environment
        $isDebug = $this->isDebug;

        //check environment
        if($isDebug){
            return;
        }

        try {
            //calculate message
            $message = \Swift_Message::newInstance()
                ->setSubject('You have a message from bucketlist 127' )
                ->setFrom($noReplyEmail)
                ->setCc($email)
                ->setContentType('text/html; charset=UTF-8')
                ->setBody($content, 'text/html');

            //send email
            $this->mailer->send($message);

        } catch(\Swift_TransportException $e) {

            throw $e;
        }
    }

}