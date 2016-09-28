<?php

namespace AppBundle\Services;

use AppBundle\Entity\Place;
use AppBundle\Entity\PlaceType;
use Doctrine\ORM\EntityManager;

class GooglePlaceService
{
    const URL = 'https://maps.googleapis.com/maps/api/geocode/json';

    /**
     * @var EntityManager $em
     */
    protected $em;

    /**
     * @var string
     */
    protected $googleServerKey;


    /**
     * NotifyAboutDoneGoalByPlaceService constructor.
     * @param EntityManager $em
     * @param $googleServerKey string
     */
    public function __construct(EntityManager $em, $googleServerKey)
    {
        $this->em = $em;
        $this->googleServerKey = $googleServerKey;
    }

    /**
     * This function is used to get place data and notify about goal done
     *
     * @param $latitude float
     * @param $longitude float
     * @param $save boolean
     * @return mixed
     */
    public function getPlace($latitude, $longitude, $save = false)
    {
        //concat latitude and longitude by comma for api
        $latLng = trim($latitude).','.trim($longitude);

        //generate geo coding url for get place data by lang and long
        $url = sprintf('%s?latlng=%s&sensor=false&language=en&result_type=locality|country&key=%s', self::URL, $latLng, $this->googleServerKey);

        //use curl for get response
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-type: application/json'));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

        //get response
        $response = curl_exec($ch);

        //check if response not exist
        if ($response === false) {
            throw new \InvalidArgumentException('Invalid geo coding results');
        }

        //close curl
        curl_close($ch);

        //json decode data
        $response = json_decode($response);

        //get result
        $results = $response->results;

        if (!empty($results)) {

            //get place
            $place = $results[0]->formatted_address;

            //explode place data by comma
            $places = explode(',', $place);

            //set default array
            $placeArray=[];

            foreach ($places as $key => $place)
            {
                if ($key == 0) {
                    //set type
                    $type = PlaceType::TYPE_CITY;
                } else {
                    //set type
                    $type = PlaceType::TYPE_COUNTRY;
                }

                //remove all spaces and number in word
                $placeArray[$type] = trim(preg_replace('/[0-9]+/', '', strtolower($place)));
            }

            //check if save value is true
            if ($save) {

                //get places in array
                $places = array_values($placeArray);
                
                //get places in DB
                $placeInDb = $this->em->getRepository('AppBundle:Place')->findByName($places);

                //check if place in db not exists
                if (!$placeInDb) {

                    //get all placeType index by name
                    $placeType = $this->em->getRepository('AppBundle:PlaceType')->findAllIndexByName();
                    
                    foreach ($placeArray as $key => $place)
                    {
                        //create new place
                        $newPlace = new Place();
                        $newPlace->setName($place);
                        $newPlace->setPlaceType($placeType[$key]);
                        $this->em->persist($newPlace);
                    }
                    
                    $this->em->flush();
                }
            }

            return $placeArray;
        }

        return null;
    }
}