<?php
/**
 * Created by PhpStorm.
 * User: andranik
 * Date: 8/2/16
 * Time: 1:55 PM
 */
namespace Application\UserBundle\Controller\Rest;

use Application\UserBundle\Entity\Report;
use Application\UserBundle\Entity\User;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use JMS\SecurityExtraBundle\Annotation\Secure;
use JMS\Serializer\SerializationContext;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Http\RememberMe\TokenBasedRememberMeServices;


/**
 * @Rest\RouteResource("Report")
 * @Rest\Prefix("/api/v1.0")
 */
class ReportController extends FOSRestController
{
    /**
     * @ApiDoc(
     *  resource=true,
     *  section="Report",
     *  description="This function is used to create a report",
     *  statusCodes={
     *         200="Return when report was sent",
     *         400="Return when data is invalid",
     *         404="Return when reported user not found"
     *     },
     * parameters={
     *      {"name"="userId", "dataType"="integer", "required"=true, "description"="Reported user id"},
     *      {"name"="contentType", "dataType"="integer", "required"=true, "description"="Reported content type (comment, success story, ...)"},
     *      {"name"="contentId", "dataType"="string", "required"=true, "description"="Reported content id"},
     *      {"name"="message", "dataType"="string", "required"=true, "Report description"}
     * }
     * )
     * @Rest\View()
     * @Secure("ROLE_USER")
     * @param Request $request
     * @return JsonResponse|Response
     */
    public function putAction(Request $request)
    {
        $userId = $request->get('userId', null);

        if (is_null($userId)){
            throw new HttpException(Response::HTTP_BAD_REQUEST, 'userId is required');
        }

        $em = $this->getDoctrine()->getManager();
        $reportedUser = $em->getRepository('ApplicationUserBundle:User')->find($userId);

        if (is_null($reportedUser)){
            throw new HttpException(Response::HTTP_NOT_FOUND, 'reported user not found');
        }


        $report = new Report();
        $report->setUser($this->getUser());
        $report->setReportedUser($reportedUser);
        $report->setContentType($request->get('contentType', null));
        $report->setContentId($request->get('contentId', null));
        $report->setMessage($request->get('message', null));

        $validator = $this->get('validator');
        $errors = $validator->validate($report);

        if(count($errors) > 0){
            throw new HttpException(Response::HTTP_BAD_REQUEST, $errors[0]->getMessage());
        }

        $em->persist($report);
        $em->flush();

        return [];
    }
}