<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Place
 *
 * @ORM\Table(name="place", uniqueConstraints={@ORM\UniqueConstraint(name="IDX_duplicate_place", columns={"name", "place_type_id"})},
 *                          indexes={@ORM\Index(name="index_place_name", columns={"name", "place_type_id"})})
 * @ORM\Entity(repositoryClass="AppBundle\Repository\PlaceRepository")
 * @UniqueEntity(
 *     fields={"name", "placeType"},
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
     * @ORM\Column(name="name", type="string", length=100)
     * @Assert\Type("string")
     * @Assert\Length(
     *      min = 2,
     *      max = 100,
     *      minMessage = "Your place name must be at least {{ limit }} characters long",
     *      maxMessage = "Your place name cannot be longer than {{ limit }} characters"
     * )
     * @Assert\NotBlank(message = "Place name can't be blank")
     */
    protected $name;

    /**
     *
     * @ORM\ManyToOne(targetEntity="PlaceType")
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

    /**
     * Set name
     *
     * @param string $name
     *
     * @return Place
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @return string
     */
    public function __toString()
    {
        return (string) $this->name;
    }
}
