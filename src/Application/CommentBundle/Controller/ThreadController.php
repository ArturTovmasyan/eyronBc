<?php

namespace Application\CommentBundle\Controller;

use FOS\CommentBundle\FOSCommentBundle;
use FOS\CommentBundle\Model\CommentInterface;
use FOS\CommentBundle\Model\ThreadInterface;
use FOS\RestBundle\Util\Codes;
use FOS\RestBundle\View\RouteRedirectView;
use FOS\RestBundle\View\View;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Bundle\FrameworkBundle\Templating\TemplateReference;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use FOS\CommentBundle\Controller\ThreadController as BaseController;


/**
 * Restful controller for the Threads.
 *
 * @author Alexander <iam.asm89@gmail.com>
 */
class ThreadController extends BaseController
{
    /**
     * Forwards the action to the comment view on a successful form submission.
     *
     * @param FormInterface    $form   Form with the error
     * @param string           $id     Id of the thread
     * @param CommentInterface $parent Optional comment parent
     *
     * @return View
     */
    protected function onCreateCommentSuccess(FormInterface $form, $id, CommentInterface $parent = null)
    {
        //get entity manager
        $em = $this->container->get('doctrine')->getManager();

        //get goal by id
        $goal = $em->getRepository('AppBundle:Goal')->findGoalWithAuthor($id);

        //get user name
        $userName = $this->getUser()->showName();

        //check if goal author is not admin and not null
        if($goal && $goal->hasAuthorForNotify($userName)) {

            //send success story notify
            $this->get('user_notify')->sendNotifyAboutNewComment($goal, $userName);
        }

        //send comment event in google analytics
        $this->container->get('google_analytic')->commentEvent();
        
        return parent::onCreateCommentSuccess($form, $id, $parent);
    }
}
