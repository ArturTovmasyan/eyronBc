<?php

namespace AppBundle\Services;

use AppBundle\Entity\Goal;
use Application\UserBundle\Entity\User;
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
     * @param User $user
     * @param $commentText
     * @throws \Swift_TransportException
     */
    public function sendNotifyAboutNewComment(Goal $goal, User $user, $commentText)
    {
        //get user notify value in parameter
        $enabledByConfig = $this->container->getParameter('user_notify');

        //get put notification service
        $sendNoteService = $this->container->get('bl_put_notification_service');

        //get kernel debug
        $notProd = $this->container->getParameter('kernel.debug');

        //get goal author
        $author = $goal->getAuthor();

        //get comment notify settings value
        $enabled = $author->getIsCommentNotify();

        //check if user notify is disabled
        if(!$enabledByConfig || $notProd || !$enabled) {
            return;
        }

        //check if comment text is null
        if(!$commentText) {

            //get entity manager
            $em = $this->container->get('doctrine')->getManager();

            //get last comment
            $lastComment = $em->getRepository('ApplicationCommentBundle:Comment')->findLastCommentByGoalId($goal->getId());

            //get comment text
            $commentText = $lastComment['body'];
        }

        //get author email
        $email = $author->getEmail();

        //get author language
        $language = $author->getLanguage() ? $author->getLanguage() : 'en';

        //get sender name
        $userName = $user->showName();

        //get subject for email
        $subject = $this->container->get('translator')->trans('subject_for_comment_email', array('%senderName%' => $userName), 'email', $language);

        //send notification to mobile
        $sendNoteService->sendPushNote($user, $subject);

        //generate content for email
        $content = $this->container->get('templating')->render(
            'AppBundle:Main:userNotifyEmail.html.twig',
            array('eventText' => $commentText, 'goal' => $goal, 'type' => 'comments', 'user' => $user, 'mailText' => 'notify_comment', 'language' => $language)
        );
        
        $this->sendEmail($email, $content, $subject);
    }

    /**
     * This function is used to send notify about new success story
     *
     * @param Goal $goal
     * @param User $user
     * @param $storyText
     * @throws \Swift_TransportException
     */
    public function sendNotifyAboutNewSuccessStory(Goal $goal, User $user, $storyText)
    {
        //get user notify value in parameter
        $enabledByConfig = $this->container->getParameter('user_notify');

        //get put notification service
        $sendNoteService = $this->container->get('bl_put_notification_service');
        
        //get kernel debug
        $notProd = $this->container->getParameter('kernel.debug');

        //get goal author
        $author = $goal->getAuthor();

        //get story notify settings value
        $enabled = $author->getIsSuccessStoryNotify();

        //check if user notify is disabled
        if(!$enabledByConfig || $notProd || !$enabled) {
            return;
        }

        //get author email
        $email = $author->getEmail();

        //get author language
        $language = $author->getLanguage() ? $author->getLanguage() : 'en';
        
        //get sender name
        $userName = $user->showName();

        //get subject for email
        $subject = $this->container->get('translator')->trans('subject_for_story_email', array('%senderName%' => $userName), 'email', $language);

        //send notification to mobile
        $sendNoteService->sendPushNote($user, $subject);

        //generate content for email
        $content = $this->container->get('templating')->render(
            'AppBundle:Main:userNotifyEmail.html.twig',
            array('eventText' => $storyText, 'goal' => $goal, 'type' => 'success_story', 'user' => $user, 'mailText' => 'notify_success_story', 'language' => $language)
        );

        $this->sendEmail($email, $content, $subject);
    }

    /**
     * @param $email
     * @param $content
     * @param $subject
     * @throws \Exception
     * @throws \Swift_TransportException
     */
    public function sendEmail($email, $content, $subject)
    {
        //get no-reply email
        $noReplyEmail = $this->container->getParameter('no_reply');

        //get project name
        $projectName = $this->container->get('translator')->trans('bucketlist', array(), 'messages');

        try {
            //calculate message
            $message = \Swift_Message::newInstance()
                ->setSubject($subject)
                ->setFrom($noReplyEmail, $projectName)
                ->setTo($email)
                ->setContentType('text/html; charset=UTF-8')
                ->setBody($content, 'text/html');

            //send email
            $this->container->get('mailer')->send($message);

        } catch(\Swift_TransportException $e) {

            throw $e;
        }
    }

}