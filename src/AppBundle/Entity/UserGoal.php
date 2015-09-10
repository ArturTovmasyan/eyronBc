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
     * @ORM\ManyToOne(targetEntity="Goal", inversedBy="userGoal", cascade={"persist"})
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
     * This function is used to get status integer, and convert to string
     *
     * @return null|string
     */
    public function getStatusString()
    {
        // empty result
        $result = null;

        // switch for status and return result
        switch($this->status){
            case self::ACTIVE:
                $result = 'user_goal.active';
                break;
            case self::COMPLETED:
                $result = 'user_goal.completed';
                break;
        }

        return $result;
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
     * This function is used to get privacy integer, and convert to string
     *
     * @return null|string
     */
    public function getPrivacyString()
    {
        // empty result
        $result = null;

        // switch for privacy and return result
        switch($this->privacy){
            case self::PRIVATE_PRIVACY:
                $result = 'user_goal.private';
                break;
            case self::PUBLIC_PRIVACY:
                $result = 'user_goal.public';
                break;
        }

        return $result;
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
     * This function is used to get quality integer, and convert to string
     *
     * @return null|string
     */
    public function getQualityString()
    {
        // empty result
        $result = null;

        // switch for quality and return result
        switch($this->quality){
            case self::IMPORTANT:
                $result = 'user_goal.important';
                break;
            case self::NOT_IMPORTANT:
                $result = 'user_goal.not_important';
                break;
            case self::URGENT:
                $result = 'user_goal.urgent';
                break;
            case self::NOT_URGENT:
                $result = 'user_goal.not_urgent';
                break;
        }

        return $result;
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
