<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 9/8/15
 * Time: 2:16 PM
 */

namespace Application\UserBundle\Entity;

use AppBundle\Traits\File;
use FOS\UserBundle\Entity\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 * @ORM\Table(name="fos_user")
 */
class User extends BaseUser
{
    // use file
    use File;

    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\Goal", mappedBy="users")
     **/
    protected $goals;

    /**
     * @var
     * @ORM\Column(name="first_name", type="string", length=50, nullable=true)
     */
    protected $firstName;

    /**
     * @ORM\Column(name="age", type="smallint", nullable=true)
     * @var
     */
    protected $age;

    /**
     * @var
     * @ORM\Column(name="last_name", type="string", length=50, nullable=true)
     */
    protected $lastName;

    /**
     * @var
     * @ORM\Column(name="about_me", type="string", nullable=true)
     */
    protected $aboutMe;

    /**
     * Constructor
     */
    public function __construct()
    {
        parent::__construct();

        $this->goals = new \Doctrine\Common\Collections\ArrayCollection();
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
     * Add goals
     *
     * @param \AppBundle\Entity\Goal $goals
     * @return User
     */
    public function addGoal(\AppBundle\Entity\Goal $goals)
    {
        $this->goals[] = $goals;

        return $this;
    }

    /**
     * Remove goals
     *
     * @param \AppBundle\Entity\Goal $goals
     */
    public function removeGoal(\AppBundle\Entity\Goal $goals)
    {
        $this->goals->removeElement($goals);
    }

    /**
     * Get goals
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getGoals()
    {
        return $this->goals;
    }

    /**
     * Set firstName
     *
     * @param string $firstName
     * @return User
     */
    public function setFirstName($firstName)
    {
        $this->firstName = $firstName;

        return $this;
    }

    /**
     * Get firstName
     *
     * @return string 
     */
    public function getFirstName()
    {
        return $this->firstName;
    }

    /**
     * Set lastName
     *
     * @param string $lastName
     * @return User
     */
    public function setLastName($lastName)
    {
        $this->lastName = $lastName;

        return $this;
    }

    /**
     * Get lastName
     *
     * @return string 
     */
    public function getLastName()
    {
        return $this->lastName;
    }

    /**
     * Set aboutMe
     *
     * @param string $aboutMe
     * @return User
     */
    public function setAboutMe($aboutMe)
    {
        $this->aboutMe = $aboutMe;

        return $this;
    }

    /**
     * Get aboutMe
     *
     * @return string 
     */
    public function getAboutMe()
    {
        return $this->aboutMe;
    }

    /**
     * Set age
     *
     * @param integer $age
     * @return User
     */
    public function setAge($age)
    {
        $this->age = $age;

        return $this;
    }

    /**
     * Get age
     *
     * @return integer 
     */
    public function getAge()
    {
        return $this->age;
    }

    /**
     * Override getPath function in file trait
     *
     * @return string
     */
    protected function getPath()
    {
        return 'photo';
    }


}
