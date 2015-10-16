<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 10/16/15
 * Time: 10:15 AM
 */

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Gedmo\Mapping\Annotation as Gedmo;

/**
 * @ORM\Entity()
 * @ORM\Table(name="step")
 */
class Step
{
    // constants for status
    const TO_DO = 0;
    const DONE = 1;

    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(name="name", type="string")
     */
    protected $name;

    /**
     * @ORM\Column(name="status",  type="smallint")
     */
    protected $status;

    /**
     *
     * @ORM\ManyToOne(targetEntity="UserGoal", inversedBy="steps")
     * @ORM\JoinColumn(name="step_id", referencedColumnName="id")
     */
    protected $goal;

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
     * Set name
     *
     * @param string $name
     * @return Step
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
     * Set goal
     *
     * @param \AppBundle\Entity\UserGoal $goal
     * @return Step
     */
    public function setGoal(\AppBundle\Entity\UserGoal $goal = null)
    {
        $this->goal = $goal;

        return $this;
    }

    /**
     * Get goal
     *
     * @return \AppBundle\Entity\UserGoal 
     */
    public function getGoal()
    {
        return $this->goal;
    }

    /**
     * Set status
     *
     * @param integer $status
     * @return Step
     */
    public function setStatus($status = self::TO_DO)
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
}
