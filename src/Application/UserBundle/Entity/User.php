<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 9/8/15
 * Time: 2:16 PM
 */

namespace Application\UserBundle\Entity;

use AppBundle\Entity\UserGoal;
use AppBundle\Traits\File;
use Doctrine\Common\Collections\ArrayCollection;
use FOS\UserBundle\Entity\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;
use JMS\Serializer\Annotation\Groups;
use JMS\Serializer\Annotation\VirtualProperty;

/**
 * @ORM\Entity(repositoryClass="Application\UserBundle\Entity\Repository\UserRepository")
 * @ORM\Table(name="fos_user")
 * @UniqueEntity(fields={"username"}, errorPath="email", message="fos_user.email.already_used" , groups={"Register", "update_email"})
 */
class User extends BaseUser
{
    const MALE = 0;
    const FEMALE = 1;

    // constants for percent
    const SIGN_UP = 15;
    const CONFIRM_ACCOUNT = 15;
    const UPLOAD_IMAGE = 10;
    const ADD_GOAL = 15;
    const SET_DEADLINE = 15;
    const COMPLETE_GOAL = 15;
    const SUCCESS_STORY = 15;

    // use file trait
    use File;

    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Groups({"user"})
     */
    protected $id;

    /**
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\UserGoal", indexBy="goal_id", mappedBy="user", cascade={"persist"})
     **/
    protected $userGoal;

    /**
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Goal", indexBy="goal_id", mappedBy="author", cascade={"persist"})
     **/
    protected $authorGoals;


    /**
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Goal", indexBy="goal_id", mappedBy="editor", cascade={"persist"})
     **/
    protected $editedGoals;

    /**
     * @Assert\NotBlank(groups={"personal"}, message="not_blank")
     * @Groups({"user"})
     */
    protected $username;

    /**
     * @var
     * @ORM\Column(name="first_name", type="string", length=50, nullable=true)
     * @Groups({"user"})
     */
    protected $firstName;

    /**
     * @ORM\Column(name="gender", type="smallint", nullable=true)
     * @var
     */
    protected $gender;

    /**
     * @Assert\Length(groups={"Register"},
     *      min = 6,
     *      minMessage = "fos_user.password.validation",
     * )
     *
     * @Assert\Regex(groups={"Register"},
     *     pattern="/^[a-zA-Z\d\.]+$/i",
     *     match=true,
     *     message = "fos_user.password.validation",
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
     * @Groups({"user"})
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
     * @var
     * @ORM\Column(name="user_emails", type="array", nullable=true)
     */
    protected $userEmails;

    /**
     * @VirtualProperty
     * @Groups({"user"})
     */
    public function getImagePath()
    {
        return $this->getDownloadLink();
    }


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

    public function getAge()
    {
        // get birthDate
        $birthDate = $this->getBirthDate();

        // check birthDate
        if($birthDate){

            // get year
            $now = new \DateTime();

            // get different
            $year = $now->format("Y");

            return $year - $this->birthDate->format("Y");

        }

        return null;
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

    /**
     * Add authorGoals
     *
     * @param \AppBundle\Entity\Goal $authorGoals
     * @return User
     */
    public function addAuthorGoal(\AppBundle\Entity\Goal $authorGoals)
    {
        $this->authorGoals[] = $authorGoals;
        $authorGoals->setAuthor($this);

        return $this;
    }

    /**
     * Remove authorGoals
     *
     * @param \AppBundle\Entity\Goal $authorGoals
     */
    public function removeAuthorGoal(\AppBundle\Entity\Goal $authorGoals)
    {
        $this->authorGoals->removeElement($authorGoals);
    }

    /**
     * Get authorGoals
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getAuthorGoals()
    {
        return $this->authorGoals;
    }

    /**
     * Add editedGoals
     *
     * @param \AppBundle\Entity\Goal $editedGoals
     * @return User
     */
    public function addEditedGoal(\AppBundle\Entity\Goal $editedGoals)
    {
        $this->editedGoals[] = $editedGoals;
        $editedGoals->setEditor($this);

        return $this;
    }

    /**
     * Remove editedGoals
     *
     * @param \AppBundle\Entity\Goal $editedGoals
     */
    public function removeEditedGoal(\AppBundle\Entity\Goal $editedGoals)
    {
        $this->editedGoals->removeElement($editedGoals);
    }

    /**
     * Get editedGoals
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getEditedGoals()
    {
        return $this->editedGoals;
    }


    /**
     * This function is used to check percent of completed profile
     *
     * @return int
     */
    public function getCompletedPercent()
    {
        // default percent
        $percent = 0;

        // set default sign up
        $percent += self::SIGN_UP;

        // check confirmation
        $percent += is_null($this->registrationToken) ? self::CONFIRM_ACCOUNT : 0;

        // check image
        $percent += $this->socialPhotoLink || $this->fileName ? self::UPLOAD_IMAGE : 0;

        // check goal
        $percent += $this->userGoal->count() > 0 ? self::ADD_GOAL : 0;

        // check deadlines
        $percent += $this->checkDeadLines() ? self::SET_DEADLINE : 0;

        // check completed goals
        $percent += $this->checkCompletedGoals() ? self::COMPLETE_GOAL : 0;

        // check success story
        $percent +=  $this->checkSuccessStory() ? self::SUCCESS_STORY : 0;

        return $percent;

    }

    /**
     * This function is used to check hav user add deadline
     *
     * @return bool
     */
    public function checkDeadLines()
    {
        // get user goal
        $userGoals = $this->userGoal;

        // check user goal
        if($userGoals){

            // loop for user goals
            foreach($userGoals as $userGoal){

                // check deadlines
                if($userGoal->getDoDate()){
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * This function is used to check have user complete goal
     *
     * @return bool
     */
    public function checkCompletedGoals()
    {
        // get user goal
        $userGoals = $this->userGoal;

        // check user goal
        if($userGoals){

            // loop for user goals
            foreach($userGoals as $userGoal){

                // check status
                if($userGoal->getStatus() == UserGoal::COMPLETED){
                    return true;
                }
            }
        }
        return false;
    }


    /**
     * This function is used to check have user add success story
     *
     * @return bool
     */
    public function checkSuccessStory()
    {
        // get user goal
        $userGoals = $this->userGoal;

        // check user goal
        if($userGoals){

            // loop for user goals
            foreach($userGoals as $userGoal){

                // get goal
                $goal = $userGoal->getGoal();

                // check success stories
                if($goal->getSuccessStories()->count() > 0){
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * @return array
     */
    public function getStats()
    {
        //get active goal count
        $active = $this->authorGoals->count();

        //set done goal default value
        $doneBy = 0;

        // get user goals
        $userGoals = $this->getUserGoal();

        // check user goals
        if($userGoals){
            // loop for user goals
            foreach($userGoals as $userGoal){

                if( $userGoal->getStatus() !== UserGoal::ACTIVE) {

                    //count done goal
                    $doneBy = ++$doneBy;
                }
            }
        }

        //get listed by count
        $listedBy = $active + $doneBy;

        //set data in result array
        $result = array("listedBy" => $listedBy, "active" => $active, "doneBy" =>$doneBy);

        return $result;
    }

    /**
     * @return array
     */
    public function  getBlMultipleEmail()
    {
        // check images and return array
        if($this->userEmails){

            return $this->userEmails;
        }
        return array();
    }

    /**
     * @param $userEmails
     */

    public function  setBlMultipleEmail($userEmails)
    {
        // check added userEmails
        if(count($userEmails) > 0){

            $this->userEmails = $userEmails;
        }
    }

    /**
     * Set userEmails
     *
     * @param array $userEmails
     * @return User
     */
    public function setUserEmails($userEmails)
    {
        $this->userEmails = $userEmails;

        return $this;
    }

    /**
     * Get userEmails
     *
     * @return array 
     */
    public function getUserEmails()
    {
        return $this->userEmails;
    }
}
