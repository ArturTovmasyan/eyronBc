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
}
