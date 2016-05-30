<?php

namespace AppBundle\Services;

use AppBundle\Entity\Goal;
use Doctrine\ORM\EntityManager;
use Symfony\Bundle\FrameworkBundle\Translation\Translator;
use Symfony\Bundle\TwigBundle\TwigEngine;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Routing\Router;


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
    protected  $enabled;


    /**
     * UserNotifyService constructor.
     * @param Router $router
     * @param TwigEngine $template
     * @param \Swift_Mailer $mailer
     * @param $notProd
     * @param $noReplyEmail
     * @param $enabled
     */
    public function __construct(Router $router, TwigEngine $template, \Swift_Mailer $mailer, $notProd, $noReplyEmail, $enabled)
    {
        $this->router = $router;
        $this->template = $template;
        $this->mailer = $mailer;
        $this->notProd = $notProd;
        $this->noReplyEmail = $noReplyEmail;
        $this->enabled = $enabled;
    }


    /**
     * This function is used to send notify about new comment
     *
     * @param Goal $goal
     * @param $senderName
     * @param $commentText
     * @throws \Swift_TransportException
     */
    public function sendNotifyAboutNewComment(Goal $goal, $senderName, $commentText)
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

        //get goal title
        $goalTitle = $goal->getTitle();

        //get goal photo path
        $goalPhotoPath =  $goal->getCoverPhotoDownloadLink();
            
        //generate goal inner page url for email
        $url = $this->router->generate('inner_goal', array('slug' => $slug), true);

        //generate content for email
        $content = $this->template->render(
            'AppBundle:Main:userNotifyEmail.html.twig',
            array('senderName' => $senderName, 'userName' => $authorName, 'link' => $url, 'text' => $commentText, 'photoPath'=> $goalPhotoPath, 'goalTitle' => $goalTitle, 'eventName' => 'notify_comment')
        );
        
        $this->sendEmail($email, $content, $goalPhotoPath);
    }

    /**
     * This function is used to send notify about new success story
     *
     * @param Goal $goal
     * @param $senderName
     * @param $storyText
     * @throws \Swift_TransportException
     */
    public function sendNotifyAboutNewSuccessStory(Goal $goal, $senderName, $storyText)
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
            array('senderName' => $senderName, 'userName' => $authorName, 'link' => $url, 'text' => $storyText, 'eventName' => 'notify_comment')
        );

        $this->sendEmail($email, $content);
    }

    /**
     * @param $email
     * @param $content
     * @throws \Exception
     * @throws \Swift_TransportException
     */
    public function sendEmail($email, $content)
    {
        //get no-reply email
        $noReplyEmail = $this->noReplyEmail;

        //get kernel debug
        $notProd = $this->notProd;

        //check if environment is not prod
        if($notProd){
            return;
        }

        try {
            //calculate message
            $message = \Swift_Message::newInstance()
                ->setSubject('You have a message from bucketlist 127')
                ->setFrom($noReplyEmail)
                ->setTo($email)
                ->setContentType('text/html; charset=UTF-8')
                ->setBody($content, 'text/html');

            //send email
            $this->mailer->send($message);

        } catch(\Swift_TransportException $e) {

            throw $e;
        }
    }

}