<?php
/**
 * Created by PhpStorm.
 * User: andranik
 * Date: 6/27/16
 * Time: 6:20 PM
 */
namespace AppBundle\Controller\Rest;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;

/**
 * @Rest\Prefix("/api/v1.0")
 */
class MainRestController extends FOSRestController
{
    const IOS_REQUEST_PARAM     = 'ios';
    const ANDROID_REQUEST_PARAM = 'android';

    /**
     * @ApiDoc(
     *  resource=true,
     *  section="Goal",
     *  description="This function is used to get mobile last versions",
     *  statusCodes={
     *         200="Returned when goals was returned",
     *  },
     *  parameters={
     *      {"name"="mobileAppPlatform", "dataType"="string", "required"=true, "description"="mobile app platform"}
     *  }
     *
     *
     * )
     *
     * @param $mobileAppPlatform
     * @return array
     * @Rest\View
     */
    public function getAppVersionAction($mobileAppPlatform)
    {
        switch($mobileAppPlatform){
            case MainRestController::IOS_REQUEST_PARAM:
                return [
                    'mandatory' => $this->container->getParameter('ios_mandatory_version'),
                    'optional'  => $this->container->getParameter('ios_optional_version')
                ];
            case MainRestController::ANDROID_REQUEST_PARAM:
                return [
                    'mandatory' => $this->container->getParameter('android_mandatory_version'),
                    'optional'  => $this->container->getParameter('android_optional_version')
                ];
        }

        return [];
    }
}