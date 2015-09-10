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
 * @ORM\Table(name="users_goals")
 */
class UserGoal
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
     * @ORM\ManyToOne(targetEntity="Goal", inversedBy="userGoal")
     * @ORM\JoinColumn(name="goal_id", referencedColumnName="id")
     **/
    protected $goal;

    /**
     * @ORM\ManyToOne(targetEntity="Application\UserBundle\Entity\User", inversedBy="userGoal")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     **/
    protected $user;

    /**
     * Constructor
     */
    public function __construct()
    {
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
     * Set description
     *
     * @param string $description
     * @return UserGoal
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
     * Set status
     *
     * @param integer $status
     * @return UserGoal
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
     * @return UserGoal
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
     * @return UserGoal
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
     * Set goal
     *
     * @param \AppBundle\Entity\Goal $goal
     * @return UserGoal
     */
    public function setGoal(\AppBundle\Entity\Goal $goal = null)
    {
        $this->goal = $goal;

        return $this;
    }

    /**
     * Get goal
     *
     * @return \AppBundle\Entity\Goal 
     */
    public function getGoal()
    {
        return $this->goal;
    }

    /**
     * Set user
     *
     * @param \Application\UserBundle\Entity\User $user
     * @return UserGoal
     */
    public function setUser(\Application\UserBundle\Entity\User $user = null)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Get user
     *
     * @return \Application\UserBundle\Entity\User 
     */
    public function getUser()
    {
        return $this->user;
    }
}
