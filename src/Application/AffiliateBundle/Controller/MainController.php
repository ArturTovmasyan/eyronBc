<?php

namespace Application\AffiliateBundle\Controller;

use Application\AffiliateBundle\Entity\AffiliateType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;

class MainController extends Controller
{
    /**
     * @Route("/affiliates")
     * @Template()
     */
    public function indexAction(Request $request)
    {
        $link = $request->get('page_link');
        if (is_null($link)){
            throw new HttpException(Response::HTTP_BAD_REQUEST);
        }

        AffiliateType::$bookingAId = $this->getParameter('booking_aid');

        $em = $this->getDoctrine()->getEntityManager();
        $affiliates = $em->getRepository('ApplicationAffiliateBundle:Affiliate')->getAffiliatesByLink($link);
        
        $htmlContent = '';
        $jsContent   = '';

        foreach($affiliates as $affiliate){
            $htmlContent .= $affiliate->getHtmlContent();
            $jsContent .= $affiliate->getJsContent();
        }

        return [
            'htmlContent' => $htmlContent,
            'jsContent'   => $jsContent
        ];
    }
}
