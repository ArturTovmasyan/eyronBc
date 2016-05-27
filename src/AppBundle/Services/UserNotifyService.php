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
    protected  $kernel;

    /**
     * @var
     */
    protected  $projectName;

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
     * @param \Swift_Mailer $mailer
     * @param $projectName
     * @param $noReplyEmail
     */
    public function __construct(Router $router, TwigEngine $template, \Swift_Mailer $mailer, Kernel $kernel, $projectName, $noReplyEmail, $userNotify)
    {
        $this->router = $router;
        $this->template = $template;
        $this->mailer = $mailer;
        $this->kernel = $kernel;
        $this->projectName = $projectName;
        $this->noReplyEmail = $noReplyEmail;
        $this->userNotify = $userNotify;
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
        if($this->userNotify == 'off') {
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

        $this->sendEmail($email, $senderName, $authorName, $url, Goal::COMMENT);
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
        if($this->userNotify == 'off') {
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

        $this->sendEmail($email, $senderName, $authorName, $url, Goal::STORY);
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
    public function sendEmail($email, $senderName, $authorName, $url, $notifyType)
    {
        //get project name
        $projectName = $this->projectName;

        //get no-reply email
        $noReplyEmail = $this->noReplyEmail;

        //get environment
        $isDebug = $this->kernel->isDebug();

        //check environment
        if($isDebug){
            return;
        }

        try {
            //calculate message
            $message = \Swift_Message::newInstance()
                ->setSubject('You have a message from ' . $projectName )
                ->setFrom($noReplyEmail)
                ->setCc($email)
                ->setContentType('text/html; charset=UTF-8')
                ->setBody($this->template->render(
                    'AppBundle:Main:userNotifyEmail.html.twig',
                    array('senderName' => $senderName, 'userName' => $authorName, 'link' => $url, 'notifyType' => $notifyType)
                ), 'text/html');

            //send email
            $this->mailer->send($message);

        } catch(\Swift_TransportException $e) {

            throw $e;
        }
    }

}