<?php
/**
 * Created by PhpStorm.
 * User: andranik
 * Date: 7/27/16
 * Time: 6:56 PM
 */
namespace Application\UserBundle\Controller\Rest;

use Application\UserBundle\Entity\User;
use Application\UserBundle\Form\SettingsType;
use Application\UserBundle\Form\UserNotifySettingsType;
use JMS\SecurityExtraBundle\Annotation\Secure;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\Form\FormError;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
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
}