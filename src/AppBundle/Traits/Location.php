<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 10/15/15
 * Time: 11:39 AM
 */

namespace AppBundle\Traits;

/**
 * Class Location
 * @package AppBundle\Traits
 */
trait Location
{

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
     * Set address
     *
     * @param integer $address
     * @return $this
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
     * @return $this
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
     * @return $this
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