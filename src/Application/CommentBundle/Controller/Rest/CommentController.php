<?php
/**
 * Created by PhpStorm.
 * User: andranik
 * Date: 7/12/16
 * Time: 2:57 PM
 */
namespace Application\CommentBundle\Controller\Rest;

use AppBundle\Entity\Goal;
use AppBundle\Entity\GoalImage;
use Application\CommentBundle\Entity\Comment;
use Application\CommentBundle\Entity\Thread;
use Application\UserBundle\Entity\User;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;

/**
 * @Rest\RouteResource("Comment")
 * @Rest\Prefix("/api/v1.0")
 */
class CommentController extends FOSRestController
{
    /**
     * @ApiDoc(
     *  resource=true,
     *  section="Comment",
     *  description="This function is used to create or update userGoal",
     *  statusCodes={
     *         201="Returned when comment was added",
     *         401="Returned when user not found",
     *         400="Body is empty or parent's thread isn't given parent"
     *     },
     *  parameters={
     *      {"name"="body", "dataType"="string", "required"=true, "description"="Comment body"},
     * }
     * )
     *
     * @Rest\Get("/comments/{goal}/{parentComment}", requirements={"goal"="\d+", "parentComment"="\d+"}, name="put_comment", options={"method_prefix"=false})
     * @Security("has_role('ROLE_USER')")
     * @ParamConverter("goal", class="AppBundle:Goal", options={"repository_method" = "findGoalWithAuthor"})
     *
     * @param Request $request
     * @param Goal $goal
     * @param Comment $parentComment
     * @return Response
     */
    public function putAction(Request $request, Goal $goal, Comment $parentComment = null)
    {
        $em = $this->getDoctrine()->getManager();
        $thread = $em->getRepository('ApplicationCommentBundle:Thread')->find($goal->getId());
        if (is_null($thread)){
            $thread = new Thread();
            $thread->setId($goal->getId());
            $thread->setCommentableEntity($goal);

            $em->persist($thread);
        }

        if (!is_null($parentComment)){
            if ($parentComment->getThread()->getId() != $thread->getId()){
                throw new HttpException(Response::HTTP_BAD_REQUEST);
            }
        }

        $body = $request->get('body', null);
        if (is_null($body)){
            throw new HttpException(Response::HTTP_BAD_REQUEST, 'Body can not be empty');
        }

        $comment = new Comment();
        $comment->setThread($thread);
        $comment->setAuthor($this->getUser());
        $comment->setBody($body);
        $comment->setParent($parentComment);
        $thread->addComment($comment);
        $em->persist($comment);
        $em->flush();


        $this->get('request_stack')->getCurrentRequest()->getSession()
            ->getFlashBag()
            ->set('comments','Add comment from Web');

        //check if goal author is not admin and not null
        if($goal && $goal->hasAuthorForNotify($this->getUser()->getId())) {
            $this->get('user_notify')->sendNotifyAboutNewComment($goal, $this->getUser(), null);
        }


        return new Response('', Response::HTTP_CREATED);
    }
}