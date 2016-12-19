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
     *  section="Main",
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

    /**
     * @ApiDoc(
     *  resource=true,
     *  section="Main",
     *  description="This function is used to get bottom menu list",
     *  statusCodes={
     *         200="OK",
     *  })
     *
     * @Rest\View
     */
    public function getBottomMenuAction()
    {
        $menu = [];

        // get doctrine manager
        $em = $this->container->get('doctrine')->getManager();

        //get all page
        $pages = $em->getRepository('AppBundle:Page')->findAllByOrdered();

        //get router service
        $router = $this->get('router');

        // check pages
        if ($pages) {

            // loop for pages
            foreach ($pages as $page)
            {
                $menu[$page->getSlug()] = $router->generate('page', ['slug' => $page->getSlug()], true);
            }
        }

        return $menu;
    }
}