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
    // constants for notify type
    const USER_ACTIVITY = 'user_activity';
    const COMMENT_GOAL = 'comment_goal';
    const COMMENT_IDEA = 'comment_idea';
    const SUCCESS_STORY_GOAL = 'success_story_goal';
    const SUCCESS_STORY_IDEA = 'success_story_idea';
    const SUCCESS_STORY_LIKE = 'success_story_like';
    const PUBLISH_GOAL = 'publish_goal';
    const REPLY_COMMENT = 'reply_comment';
    const DEADLINE = 'deadline';
    const NEW_GOAL_FRIEND = 'new_goalfriend';
    const NEW_IDEA = 'new_idea';

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

    public function prepareAndSendNotifyViaProcess($receiverId, $type, array $options = [])
    {

        //get user notify value in parameter
        $enabledByConfig = $this->container->getParameter('user_notify');

        //get kernel debug
        $notProd = $this->container->getParameter('kernel.debug');

        //check if user notify is disabled
//        if(!$enabledByConfig || $notProd) {
//            return;
//        }

        // get doctrine manager
        $em = $this->container->get('doctrine')->getManager();

        // get receiver user
        $receiver = $em->getRepository('ApplicationUserBundle:User')->find($receiverId);

        // check receiver
        if(!$receiver){
            return;
        }
        $subjectTransId = 'email_body_for_' . $type;
        $bodyTransId = 'email_body_for_' . $type;

        //get receiver language
        $language = $receiver->getLanguage() ? $receiver->getLanguage() : 'en';

        $doer = null;
        $object = null;

        // check type
        switch ($type){
            case self::USER_ACTIVITY:
                $subject = $this->container->get('translator')->trans($subjectTransId, array(), 'email', $language);
                $body = $this->container->get('translator')->trans($bodyTransId, array(), 'email', $language);
                break;
//            case self::COMMENT_GOAL:
//            case self::COMMENT_IDEA:
//                $subject = $this->container->get('translator')->trans($subjectTransId, $prepareData, 'email', $language);
//                $body = $this->container->get('translator')->trans($bodyTransId, $prepareData, 'email', $language);
//                break;
//            case self::SUCCESS_STORY_GOAL:
//            case self::SUCCESS_STORY_IDEA:
//                $subject = $this->container->get('translator')->trans($subjectTransId, $prepareData, 'email', $language);
//                $body = $this->container->get('translator')->trans($bodyTransId, $prepareData, 'email', $language);
//                break;
//            case self::SUCCESS_STORY_LIKE:
//                $subject = $this->container->get('translator')->trans($subjectTransId, $prepareData, 'email', $language);
//                $body = $this->container->get('translator')->trans($bodyTransId, $prepareData, 'email', $language);
//                break;
//            case self::PUBLISH_GOAL:
//                $subject = $this->container->get('translator')->trans($subjectTransId, $prepareData, 'email', $language);
//                $body = $this->container->get('translator')->trans($bodyTransId, $prepareData, 'email', $language);
//                break;
//            case self::REPLY_COMMENT:
//                $subject = $this->container->get('translator')->trans($subjectTransId, $prepareData, 'email', $language);
//                $body = $this->container->get('translator')->trans($bodyTransId, $prepareData, 'email', $language);
//                break;
//            case self::DEADLINE:
//                $subject = $this->container->get('translator')->trans($subjectTransId, $prepareData, 'email', $language);
//                $body = $this->container->get('translator')->trans($bodyTransId, $prepareData, 'email', $language);
//                break;
//            case self::NEW_GOAL_FRIEND:
//                $prepareData = array('%senderName%' => $userName);
//                $subject = $this->container->get('translator')->trans($subjectTransId, $prepareData, 'email', $language);
//                $body = $this->container->get('translator')->trans($bodyTransId, $prepareData, 'email', $language);
//                break;
//            case self::NEW_IDEA:
//                $subject = $this->container->get('translator')->trans($subjectTransId, $prepareData, 'email', $language);
//                $body = $this->container->get('translator')->trans($bodyTransId, $prepareData, 'email', $language);
//                break;
        }

        // check texts
        if(!isset($subject) || !isset($body)){
            return;
        }

        //get put notification service
        $sendNoteService = $this->container->get('bl_put_notification_service');


        //get receiver email
        $email = $receiver->getEmail();

        //get subject for email
        //get content for email
//        $subject = $this->container->get('translator')->trans('subject_for_comment_email', array('%senderName%' => $userName), 'email', $language);

//        //send notification to mobile
//        $sendNoteService->sendPushNote($user, $subject);
//
        //generate content for email
        $content = $this->container->get('templating')->render(
            'AppBundle:Templates:userNotifyEmail.html.twig',
            array(
                'body' => $body,
                'object' => $object,
//                'type' => 'comments',
                'doer' => $doer,
//                'mailText' => 'notify_comment',
                'language' => $language
            )
        );

        return $content;
//
//        $this->sendEmail($email, $content, $subject);

    }


    /**
     * @param User $doer
     * @param User $receiver
     * @param $type
     */
    public function sendNotifyToUser(User $doer,User $receiver, $type)
    {

    }


    /**
     * This function is used to send notify about new comment
     * @deprecated
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
//        $enabled = $author->getIsCommentNotify();

        //check if user notify is disabled
//        if(!$enabledByConfig || $notProd || !$enabled) {
//            return;
//        }

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
     * @deprecated
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
        $projectName = $this->container->getParameter('email_sender');

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