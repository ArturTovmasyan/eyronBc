<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * PlaceType
 *
 * @ORM\Table(name="place_type")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\PlaceTypeRepository")
 */
class PlaceType
{
    //constants for place type
    const COUNTRY = 0;
    const CITY = 1;

    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @var int
     *
     * @ORM\Column(name="type", type="integer")
     */
    protected $type;

    /**
     * @ORM\OneToMany(targetEntity="Place", mappedBy="placeType", cascade={"persist", "remove"})
     */
    protected $place;

    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set type
     *
     * @param integer $type
     *
     * @return PlaceType
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type
     *
     * @return int
     */
    public function getType()
    {
        return $this->type;
    }
  
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->place = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add place
     *
     * @param \AppBundle\Entity\Place $place
     *
     * @return PlaceType
     */
    public function addPlace(\AppBundle\Entity\Place $place)
    {
        $this->place[] = $place;

        return $this;
    }

    /**
     * Remove place
     *
     * @param \AppBundle\Entity\Place $place
     */
    public function removePlace(\AppBundle\Entity\Place $place)
    {
        $this->place->removeElement($place);
    }

    /**
     * Get place
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getPlace()
    {
        return $this->place;
    }

    /**
     * @return null|string
     */
    public function getStringName()
    {
        $value = null;
        
        if($this->type == self::CITY) {
            $value = 'city';
        } elseif($this->type == self::COUNTRY) {
            $value = 'country';
        }
        
        return $value;
    }
}
