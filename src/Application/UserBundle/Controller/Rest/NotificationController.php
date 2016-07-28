<?php
/**
 * Created by PhpStorm.
 * User: andranik
 * Date: 7/27/16
 * Time: 6:56 PM
 */
namespace Application\UserBundle\Controller\Rest;

use Application\UserBundle\Entity\UserNotification;
use JMS\SecurityExtraBundle\Annotation\Secure;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use FOS\RestBundle\Controller\Annotations as Rest;

/**
 * Class NotificationController
 * @package Application\UserBundle\Controller
 *
 * @Rest\RouteResource("Notification")
 * @Rest\Prefix("/api/v1.0")
 */
class NotificationController extends Controller
{
    /**
     * @ApiDoc(
     *  resource=true,
     *  section="Notification",
     *  description="This function is used to get user notifications",
     *  statusCodes={
     *         200="Returned when notifications was returned",
     *         401="Returned when user not authenticated"
     *  },
     *
     * )
     *
     * @Rest\View(serializerGroups={"userNotification", "userNotification_notification", "notification", "notification_performer", "tiny_user"})
     * @Rest\Get("/notifications/{first}/{count}", requirements={"first"="\d+", "count"="\d+"}, name="get_notification", options={"method_prefix"=false})
     * @Secure(roles="ROLE_USER")
     *
     * @param $first
     * @param $count
     * @return array
     */
    public function getAction($first, $count)
    {
        $em = $this->getDoctrine()->getManager();
        $userNotifications = $em->getRepository('ApplicationUserBundle:UserNotification')->getUserNotifications($this->getUSer()->getId(), $first, $count);

        return $userNotifications;
    }

    /**
     * @ApiDoc(
     *  resource=true,
     *  section="Notification",
     *  description="This function is used to set all notifications as read",
     *  statusCodes={
     *         200="Returned when notifications was set as unread",
     *         401="Returned when user not authenticated"
     *  },
     *
     * )
     *
     * @Secure(roles="ROLE_USER")
     * @return array
     */
    public function getAllReadAction()
    {
        $em = $this->getDoctrine()->getManager();
        $em->getRepository('ApplicationUserBundle:UserNotification')->setAsReadAllNotifications($this->getUSer()->getId());

        return new Response('ok');
    }

    /**
     * @ApiDoc(
     *  resource=true,
     *  section="Notification",
     *  description="This function is used to set single notification as read",
     *  statusCodes={
     *         200="Returned when notification was set as unread",
     *         401="Returned when user not authenticated",
     *         404="Returned when userNotification not found with that id",
     *  },
     *
     * )
     *
     * @Secure(roles="ROLE_USER")
     * @param UserNotification $userNotification
     * @return Response
     */
    public function getReadAction(UserNotification $userNotification)
    {
        $em = $this->getDoctrine()->getManager();
        $userNotification->setIsRead(true);
        $em->flush();

        return new Response('ok');
    }

    /**
     * @ApiDoc(
     *  resource=true,
     *  section="Notification",
     *  description="This function is used to remove user notification",
     *  statusCodes={
     *         200="Returned when notification was remove",
     *         401="Returned when user not authenticated",
     *         404="Returned when userNotification not found with that id"
     *  },
     *
     * )
     *
     * @Secure(roles="ROLE_USER")
     * @param $userNotificationId
     * @return Response
     */
    public function getDeleteAction($userNotificationId)
    {
        $em = $this->getDoctrine()->getManager();
        $userNotification = $em->getRepository('ApplicationUserBundle:UserNotification')->findUserNotification($userNotificationId);

        if (is_null($userNotification)){
            throw new HttpException(Response::HTTP_NOT_FOUND, 'User notification with such id not found');
        }

        $notification = $userNotification->getNotification();

        $notification->removeUserNotification($userNotification);
        $em->remove($userNotification);

        if ($notification->getUserNotifications()->count() == 0){
            $em->remove($notification);
        }

        $em->flush();

        return new Response('ok');
    }
}