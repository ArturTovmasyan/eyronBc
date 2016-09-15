<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * Place
 *
 * @ORM\Table(name="place")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\PlaceRepository")
 * @UniqueEntity(
 *     fields={"place", "place_type_id"},
 *     message="This place is already use."
 * )
 */
class Place
{
    
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @var string
     *
     * @ORM\Column(name="place", type="string", length=255)
     */
    protected $place;

    /**
     *
     * @ORM\ManyToOne(targetEntity="PlaceType", inversedBy="place", cascade={"persist"})
     * @ORM\JoinColumn(name="place_type_id", referencedColumnName="id")
     */
    protected $placeType;

    /**
     * @ORM\OneToMany(targetEntity="UserPlace", mappedBy="place", cascade={"persist", "remove"})
     */
    protected $userPlace;
    
    /**
     * @ORM\ManyToMany(targetEntity="Goal", mappedBy="place")
     */
    protected $goal;

    
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
     * Set place
     *
     * @param string $place
     *
     * @return Place
     */
    public function setPlace($place)
    {
        $this->place = $place;

        return $this;
    }

    /**
     * Get place
     *
     * @return string
     */
    public function getPlace()
    {
        return $this->place;
    }
 

    /**
     * Set placeType
     *
     * @param \AppBundle\Entity\PlaceType $placeType
     *
     * @return Place
     */
    public function setPlaceType(\AppBundle\Entity\PlaceType $placeType = null)
    {
        $this->placeType = $placeType;

        return $this;
    }

    /**
     * Get placeType
     *
     * @return \AppBundle\Entity\PlaceType
     */
    public function getPlaceType()
    {
        return $this->placeType;
    }
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->goal = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add goal
     *
     * @param \AppBundle\Entity\Goal $goal
     *
     * @return Place
     */
    public function addGoal(\AppBundle\Entity\Goal $goal)
    {
        $this->goal[] = $goal;

        return $this;
    }

    /**
     * Remove goal
     *
     * @param \AppBundle\Entity\Goal $goal
     */
    public function removeGoal(\AppBundle\Entity\Goal $goal)
    {
        $this->goal->removeElement($goal);
    }

    /**
     * Get goal
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getGoal()
    {
        return $this->goal;
    }

    /**
     * Add userPlace
     *
     * @param \AppBundle\Entity\UserPlace $userPlace
     *
     * @return Place
     */
    public function addUserPlace(\AppBundle\Entity\UserPlace $userPlace)
    {
        $this->userPlace[] = $userPlace;

        return $this;
    }

    /**
     * Remove userPlace
     *
     * @param \AppBundle\Entity\UserPlace $userPlace
     */
    public function removeUserPlace(\AppBundle\Entity\UserPlace $userPlace)
    {
        $this->userPlace->removeElement($userPlace);
    }

    /**
     * Get userPlace
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getUserPlace()
    {
        return $this->userPlace;
    }
}
