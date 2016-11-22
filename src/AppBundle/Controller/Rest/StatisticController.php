<?php

namespace AppBundle\Controller\Rest;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;

/**
 * @Rest\Prefix("/api/v1.0")
 */
class StatisticController extends FOSRestController
{
    const MONTH = 1;
    const WEEK = 2;
    const DAY = 3;
    const TYPE_EMAIL = 4;

    /**
     * @Rest\Get("/statistic/{type}/{groupBy}/{start}/{end}", requirements={"type"="\d+", "groupBy"="\d+"}, name="get_statistic", options={"method_prefix"=false})
     * @ApiDoc(
     *  resource=true,
     *  section="Statistic",
     *  description="This function is used to get statistic data for pages",
     *  statusCodes={
     *         200="Returned when goals was returned",
     *  }
     * )
     * 
     * @param $type
     * @param $start
     * @param $end
     * @param $groupBy
     * @Rest\View
     * @Security("has_role('ROLE_ADMIN')")
     * @return array
     */
    public function getStatisticAction($type, $groupBy, $start, $end)
    {
        $statisticData = null;

        // get entity manager
        $em = $this->getDoctrine()->getManager();

//        // check group by
//        if($groupBy == self::MONTH){
//            $start = null;
//            $end = null;
//            $yearForMonthly = null;
//        }elseif ($groupBy == self::WEEK){
//            $start = null;
//            $end = null;
//        }elseif ($groupBy == self::DAY){
//            $yearForMonthly = null;
//        }

        //check if type is email
        if ($type == self::TYPE_EMAIL) {

            //statistic data for email
            $statisticData = $em->getRepository('AppBundle:Email')->findStatisticData($groupBy, $start, $end);
        }

        return $statisticData;
    }
}