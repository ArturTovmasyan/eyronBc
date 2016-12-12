<?php

namespace AppBundle\Controller\Rest;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\HttpFoundation\Response;

/**
 * @Rest\Prefix("/api/v1.0")
 */
class StatisticController extends FOSRestController
{
    const MONTH = 1;
    const DAY = 2;
    const TYPE_EMAIL = 3;
    const TYPE_REG_USER_BY_DEVICE = 4;
    const TYPE_REG_USER_BY_SOCIAL = 5;
    const TYPE_PUBLISHED_GOAL = 6;
    const TYPE_CREATED_GOAL = 7;

    /**
     * @Rest\Get("/statistic/{type}/{groupBy}/{start}/{end}", name="get_statistic", options={"method_prefix"=false})
     * @ApiDoc(
     *  resource=true,
     *  section="Statistic",
     *  description="This function is used to get statistic data by TYPE",
     *  statusCodes={
     *         200="Returned when goals was returned",
     *         400="Bad request"
     *  }
     * )
     *
     * @param $type
     * @param $groupBy
     * @param $start
     * @param $end
     * @Rest\View
     * @Security("has_role('ROLE_ADMIN') or has_role('ROLE_GOD')")
     * @return array|response
     */
    public function getStatisticDataAction($type, $groupBy, $start, $end)
    {
        //check if type is string
        if (is_string(strtolower($type))) {

            //switch for type name
            switch ($type) {
                case 'email':
                    $type = self::TYPE_EMAIL;
                    break;
                default:
                    break;
            }
        }

        //check if group is string
        if(is_string($groupBy)) {

            //switch for group name
            switch (strtolower($groupBy)) {
                case 'day':
                    $groupBy = self::DAY;
                    break;
                case 'month':
                    $groupBy = self::MONTH;
                    break;
                default:
                    break;
            }
        }

        //check groupBy and type parameters value
        if(!is_numeric($groupBy) || (!is_numeric($type))) {
            return new Response('Invalid url parameter', Response::HTTP_BAD_REQUEST);
        }

        $statisticData = [];

        // get entity manager
        $em = $this->getDoctrine()->getManager();

        //check if type is email
        if ($type == self::TYPE_EMAIL) {

            //statistic data for email
            $statisticData = $em->getRepository('AppBundle:Email')->getEmailStatisticData($groupBy, $start, $end);
        }
        //check if type is registration user by device
        elseif($type == self::TYPE_REG_USER_BY_DEVICE) {

            //statistic data for registration user by device
            $statisticData = $em->getRepository('ApplicationUserBundle:User')->getAppVersionsStatisticData($groupBy, $start, $end);
        }
        //check if type is registration user by social network
        elseif($type == self::TYPE_REG_USER_BY_SOCIAL) {

            //statistic data for registration user by social
            $statisticData = $em->getRepository('ApplicationUserBundle:User')->getRegUserBySocialStatisticData($groupBy, $start, $end);
        }
        //check if type is published goal
        elseif($type == self::TYPE_PUBLISHED_GOAL) {

            //statistic data for published goal
            $statisticData = $em->getRepository('AppBundle:Goal')->getPublishedGoalStatisticData($groupBy, $start, $end);
        }
        //check if type is published goal
        elseif($type == self::TYPE_CREATED_GOAL) {

            //statistic data for published goal
            $statisticData = $em->getRepository('AppBundle:Goal')->getCreatedGoalStatisticData($groupBy, $start, $end);
        }


        return $statisticData;
    }
}