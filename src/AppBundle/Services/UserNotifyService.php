<?php

namespace AppBundle\Services;

use AppBundle\Entity\Goal;
use Application\UserBundle\Entity\User;
use Symfony\Component\HttpKernel\Exception\HttpException;
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
     * @throws \Swift_TransportException
     */
    public function sendNotifyAboutNewComment(Goal $goal, $senderName)
    {
        //get goal author
        $author = $goal->getAuthor();

        //get author email
        $email = $author->getEmail();

        //get author name
        $authorName = $author->showName();

        //get goal slug
        $slug = $goal->getSlug();

        //generate goal inner page url for email
        $url = $this->container->get('router')->generate('view_goal', array('slug' => $slug), true);

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
        //get goal author
        $author = $goal->getAuthor();

        //get goal author email
        $email = $author->getEmail();

        //get goal author name
        $authorName = $author->showName();

        //get goal slug
        $slug = $goal->getSlug();

        //generate goal inner page url for email
        $url = $this->container->get('router')->generate('inner_goal', array('slug' => $slug), true);

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
        $projectName = $this->container->getParameter('project_name');

        //get no-reply email
        $noReplyEmail = $this->container->getParameter('no_reply');

        try {
            //calculate message
            $message = \Swift_Message::newInstance()
                ->setSubject('You have a message from ' . $projectName )
                ->setFrom($noReplyEmail)
                ->setCc($email)
                ->setContentType('text/html; charset=UTF-8')
                ->setBody($this->container->get('templating')->render(
                    'AppBundle:Main:userNotifyEmail.html.twig',
                    array('senderName' => $senderName, 'userName' => $authorName, 'link' => $url, 'notifyType' => $notifyType)
                ), 'text/html');

            //send email
            $this->container->get('mailer')->send($message);

        } catch(\Swift_TransportException $e) {

            throw $e;
        }
    }

}