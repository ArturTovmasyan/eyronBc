<?php

namespace AppBundle\Services;

use AppBundle\Entity\Goal;
use Symfony\Component\DependencyInjection\Container;


/**
 * Class UserNotifyService
 * @package AppBundle\Services
 */
class UserNotifyService
{
    /**
     * @var \Symfony\Component\DependencyInjection\Container
     */
    protected  $container;


    /**
     * @param Container $container
     */
    public function __construct(Container $container)
    {
        $this->container = $container;
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
        //get user notify value in parameter
        $enabled = $this->container->getParameter('user_notify');

        //get request
        $request = $this->container->get('request');

        //check if user notify is disabled
        if(!$enabled) {
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
        $basePath = $request->getSchemeAndHttpHost();

        //get goal photo absolute path
        $goalPhotoPath =  $basePath.$goal->getCoverPhotoDownloadLink();

        //TODO get translator and get email text

        //generate goal inner page url for email
        $url = $this->container->get('router')->generate('inner_goal', array('slug' => $slug), true);

        //generate content for email
        $content = $this->container->get('templating')->render(
            'AppBundle:Main:userNotifyEmail.html.twig',
            array('senderName' => $senderName, 'userName' => $authorName, 'link' => $url, 'text' => $commentText, 'photoPath'=> $goalPhotoPath, 'goalTitle' => $goalTitle, 'eventName' => 'notify_comment')
        );
        
        $this->sendEmail($email, $content);
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
        $noReplyEmail = $this->container->getParameter('no_reply');

        //get kernel debug
        $notProd = $this->container->getParameter('kernel.debug');

        //check if environment is not prod
        if($notProd){
            return;
        }

        try {
            //calculate message
            $message = \Swift_Message::newInstance()
                ->setSubject('You have a message from bucketlist 127')
                ->setFrom($noReplyEmail)
                ->setTo('ateptan777@gmail.com')
                ->setContentType('text/html; charset=UTF-8')
                ->setBody($content, 'text/html');

            //send email
            $this->container->get('mailer')->send($message);

        } catch(\Swift_TransportException $e) {

            throw $e;
        }
    }

}