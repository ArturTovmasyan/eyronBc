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
 * @ORM\Entity(repositoryClass="Application\UserBundle\Entity\Repository\UserRepository")
 * @ORM\Table(name="fos_user")
 */
class User extends BaseUser
{
    const MALE = 0;
    const FEMALE = 1;

    // use file trait
    use File;

    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\UserGoal", indexBy="goal_id", mappedBy="user", cascade={"persist"})
     **/
    protected $userGoal;


    /**
     * @Assert\NotBlank(groups={"personal"}, message="not_blank")
     */
    protected $username;

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
     * @ORM\Column(name="gender", type="smallint", nullable=true)
     * @var
     */
    protected $gender;

    /**
     *
     * @Assert\Length(
     *      min = 6,
     *      minMessage = "Your password must be at least {{ limit }} characters long",
     *
     * )
     */
    protected $plainPassword;

    /**
     * @var
     * @ORM\Column(name="birth_date", type="datetime", nullable=true)
     */
    protected $birthDate;

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
     * @var
     * @ORM\Column(type="string", length=50, nullable=true)
     */
    protected $facebookId;
    /**
     * @var
     * @ORM\Column(type="string", length=50,  nullable=true)
     */
    protected $twitterId;

    /**
     * @var
     * @ORM\Column(type="string", length=50,  nullable=true)
     */
    protected $googleId;

    /**
     * @var
     * @ORM\Column(type="string", nullable=true)
     */
    protected $socialPhotoLink;

    /**
     * @var
     * @ORM\Column(name="registration_token", type="string", nullable=true, unique=true)
     */
    protected $registrationToken;

    /**
     * Constructor
     */
    public function __construct()
    {
        parent::__construct();
        $this->enabled = true;

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

    /**
     * Override getPath function in file trait
     *
     * @return string
     */
    protected function getMobilePath()
    {
        return $this->getPath() . '/mobile';
    }

    /**
     * Override getPath function in file trait
     *
     * @return string
     */
    protected function getTabletPath()
    {
        return $this->getPath() . '/tablet';
    }

    /**
     * Add userGoal
     *
     * @param \AppBundle\Entity\UserGoal $userGoal
     * @return User
     */
    public function addUserGoal(\AppBundle\Entity\UserGoal $userGoal)
    {
        $this->userGoal[] = $userGoal;
        $userGoal->setUser($this);

        return $this;
    }


    /**
     * @param string $email
     * @return $this
     */
    public function setEmail($email)
    {
        $this->email = $email;
        $this->username = $email;

        return $this;
    }

    /**
     * Remove userGoal
     *
     * @param \AppBundle\Entity\UserGoal $userGoal
     */
    public function removeUserGoal(\AppBundle\Entity\UserGoal $userGoal)
    {
        $this->userGoal->removeElement($userGoal);
    }

    /**
     * Get userGoal
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getUserGoal()
    {
        return $this->userGoal;
    }

    /**
     * Set facebookId
     *
     * @param string $facebookId
     * @return User
     */
    public function setFacebookId($facebookId)
    {
        $this->facebookId = $facebookId;

        return $this;
    }

    /**
     * Get facebookId
     *
     * @return string 
     */
    public function getFacebookId()
    {
        return $this->facebookId;
    }

    /**
     * Set googleId
     *
     * @param string $googleId
     * @return User
     */
    public function setGoogleId($googleId)
    {
        $this->googleId = $googleId;

        return $this;
    }

    /**
     * Get googleId
     *
     * @return string 
     */
    public function getGoogleId()
    {
        return $this->googleId;
    }

    /**
     * Set socialPhotoLink
     *
     * @param string $socialPhotoLink
     * @return User
     */
    public function setSocialPhotoLink($socialPhotoLink)
    {
        $this->socialPhotoLink = $socialPhotoLink;

        return $this;
    }

    /**
     * Get socialPhotoLink
     *
     * @return string 
     */
    public function getSocialPhotoLink()
    {
        return $this->socialPhotoLink;
    }

    /**
     * Set gender
     *
     * @param integer $gender
     * @return User
     */
    public function setGender($gender)
    {
        $this->gender = $gender;

        return $this;
    }

    /**
     * Get gender
     *
     * @return integer 
     */
    public function getGender()
    {
        return $this->gender;
    }

    /**
     * Set twitterId
     *
     * @param string $twitterId
     * @return User
     */
    public function setTwitterId($twitterId)
    {
        $this->twitterId = $twitterId;

        return $this;
    }

    /**
     * Get twitterId
     *
     * @return string 
     */
    public function getTwitterId()
    {
        return $this->twitterId;
    }

    /**
     * Set birthDate
     *
     * @param \DateTime $birthDate
     * @return User
     */
    public function setBirthDate($birthDate)
    {
        $this->birthDate = $birthDate;

        return $this;
    }

    /**
     * Get birthDate
     *
     * @return \DateTime 
     */
    public function getBirthDate()
    {
        return $this->birthDate;
    }


    /**
     * @return string
     */
    public function getPhotoLink()
    {
        // if social user, return social img
        if(($this->getFacebookId() || $this->getGoogleId() || $this->getTwitterId()) && $this->getSocialPhotoLink() ){
            return $this->getSocialPhotoLink();
        }
        // if uses have photo
        elseif($this->getFileName()){
            return $this->getDownloadLink();
        }

        return null;

    }

    /**
     * @return string
     */
    public function showName()
    {
        return $this->getFirstName() .  ' ' . $this->getLastName();
    }


    /**
     * @return bool
     */
    public function isAdmin()
    {
        // get roles
        $roles = $this->getRoles();

        // check roles
        if($roles && is_array($roles) && ((in_array('ROLE_ADMIN', $roles) || in_array('ROLE_SUPER_ADMIN', $roles)))){
            return true;
        }

        return false;
    }

    /**
     * Set registrationToken
     *
     * @param string $registrationToken
     * @return User
     */
    public function setRegistrationToken($registrationToken)
    {
        $this->registrationToken = $registrationToken;

        return $this;
    }

    /**
     * Get registrationToken
     *
     * @return string 
     */
    public function getRegistrationToken()
    {
        return $this->registrationToken;
    }
}
