<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 9/8/15
 * Time: 3:32 PM
 */

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 * @ORM\Table(name="goal")
 */
class Goal
{
    // constants for status
    const ACTIVE = 0;
    const COMPLETED = 1;

    // constants for privacy
    const PUBLIC_PRIVACY = 1;
    const PRIVATE_PRIVACY = 2;

    // constants for quality
    const URGENT = 1;
    const NOT_URGENT = 2;
    const IMPORTANT = 3;
    const NOT_IMPORTANT = 4;

    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;


    /**
     * @ORM\Column(name="description", type="string")
     */
    protected $description;

    /**
     * @var
     * @ORM\Column(name="status", type="smallint")
     */
    protected $status;


    /**
     * @var
     * @ORM\Column(name="privacy", type="smallint")
     */
    protected $privacy;

    /**
     * @var
     * @ORM\Column(name="quality", type="smallint")
     */
    protected $quality;

    /**
     * @ORM\ManyToMany(targetEntity="Application\UserBundle\Entity\User", inversedBy="goals")
     * @ORM\JoinTable(name="users_goals",
     *      joinColumns={@ORM\JoinColumn(name="user_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="goal_id", referencedColumnName="id")}
     *      )
     **/
    protected $users;

    /**
     * @ORM\OneToMany(targetEntity="GoalImage", mappedBy="goal", cascade={"persist", "remove"})
     * @Assert\Valid()
     */
    protected $images;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->users = new \Doctrine\Common\Collections\ArrayCollection();
        $this->status = self::ACTIVE;
    }

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
     * Set title
     *
     * @param string $title
     * @return Goal
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string 
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set description
     *
     * @param string $description
     * @return Goal
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string 
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Add users
     *
     * @param \Application\UserBundle\Entity\User $users
     * @return Goal
     */
    public function addUser(\Application\UserBundle\Entity\User $users)
    {
        $this->users[] = $users;

        return $this;
    }

    /**
     * Remove users
     *
     * @param \Application\UserBundle\Entity\User $users
     */
    public function removeUser(\Application\UserBundle\Entity\User $users)
    {
        $this->users->removeElement($users);
    }

    /**
     * Get users
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getUsers()
    {
        return $this->users;
    }

    /**
     * Set status
     *
     * @param integer $status
     * @return Goal
     */
    public function setStatus($status)
    {
        $this->status = $status;

        return $this;
    }

    /**
     * Get status
     *
     * @return integer 
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * Set privacy
     *
     * @param integer $privacy
     * @return Goal
     */
    public function setPrivacy($privacy)
    {
        $this->privacy = $privacy;

        return $this;
    }

    /**
     * Get privacy
     *
     * @return integer 
     */
    public function getPrivacy()
    {
        return $this->privacy;
    }

    /**
     * Set quality
     *
     * @param integer $quality
     * @return Goal
     */
    public function setQuality($quality)
    {
        $this->quality = $quality;

        return $this;
    }

    /**
     * Get quality
     *
     * @return integer 
     */
    public function getQuality()
    {
        return $this->quality;
    }

    /**
     * Add images
     *
     * @param \AppBundle\Entity\GoalImage $images
     * @return Goal
     */
    public function addImage(\AppBundle\Entity\GoalImage $images)
    {
        $this->images[] = $images;
        $images->setGoal($this);

        return $this;
    }

    /**
     * Remove images
     *
     * @param \AppBundle\Entity\GoalImage $images
     */
    public function removeImage(\AppBundle\Entity\GoalImage $images)
    {
        $this->images->removeElement($images);
    }

    /**
     * Get images
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getImages()
    {
        return $this->images;
    }
}
