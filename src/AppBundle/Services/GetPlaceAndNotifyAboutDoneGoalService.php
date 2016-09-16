<?php

namespace AppBundle\Services;

use Doctrine\ORM\EntityManager;
use Symfony\Bundle\TwigBundle\TwigEngine;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Route;

class GetPlaceAndNotifyAboutDoneGoalService
{
    protected $entityManager;

    protected $geoCodingUrl;

    protected $googleClientId;

    public function __construct(EntityManager $entityManager, $geoCodingUrl, $googleClientId)
    {
        $this->entityManager = $entityManager;
        $this->geoCodingUrl = $geoCodingUrl;
        $this->googleClientId = $googleClientId;
    }

    /**
     * This function is used to get place data in google geoCoding api by lat and lon
     *
     * @param $latitude
     * @param $longitude
     * @return mixed
     */
    public function getPlaceByGeoCodingApi($latitude, $longitude)
    {
        //get geo coding api url
        $geoCodingUrl = $this->geoCodingUrl;

        //get google client id
        $key = $this->googleClientId;

        //generate geo coding url for get place data by lang and long
        $url = $geoCodingUrl.'latlng='.$latitude.','.$longitude.'&components=country&sensor=false';

        // use curl for get response
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-type: application/json'));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

        //get response
        $response = curl_exec($ch);

        //check if response not exist
        if($response === false) {
            return new Response("Bad request in get geo coding api", Response::HTTP_BAD_REQUEST);
        }

        //close curl
        curl_close($ch);

        return $response;
    }

    /**
     * This function is used to notify about goal by place and confirm it done
     *
     */
    public function notifyAboutGoalAndConfirmDoneAction()
    {

    }
}