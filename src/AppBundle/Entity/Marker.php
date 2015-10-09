<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 10/8/15
 * Time: 5:08 PM
 */


namespace AppBundle\Entity;

use AppBundle\Traits\File;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 * @ORM\Table(name="marker")
 */
class Marker
{


    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(type="smallint", name="address", nullable=true)
     * @var
     */
    protected $address;

    /**
     * @ORM\Column(type="float", name="lat", nullable=true)
     * @var
     */
    protected $lat;

    /**
     * @ORM\Column(type="float", name="lng", nullable=true)
     * @var
     */
    protected $lng;



    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set address
     *
     * @param integer $address
     * @return Marker
     */
    public function setAddress($address)
    {
        $this->address = $address;

        return $this;
    }

    /**
     * Get address
     *
     * @return integer 
     */
    public function getAddress()
    {
        return $this->address;
    }

    /**
     * Set lat
     *
     * @param float $lat
     * @return Marker
     */
    public function setLat($lat)
    {
        $this->lat = $lat;

        return $this;
    }

    /**
     * Get lat
     *
     * @return float 
     */
    public function getLat()
    {
        return $this->lat;
    }

    /**
     * Set lng
     *
     * @param float $lng
     * @return Marker
     */
    public function setLng($lng)
    {
        $this->lng = $lng;

        return $this;
    }

    /**
     * Get lng
     *
     * @return float 
     */
    public function getLng()
    {
        return $this->lng;
    }
}
