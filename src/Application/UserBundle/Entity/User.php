<?php
/**
 * Created by PhpStorm.
 * User: Artur
 * Date: 9/8/15
 * Time: 2:16 PM
 */

namespace Application\UserBundle\Entity;

use AppBundle\Entity\UserGoal;
use AppBundle\Traits\File;
use Doctrine\Common\Collections\ArrayCollection;
use FOS\UserBundle\Entity\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\SerializedName;
use JMS\Serializer\Annotation\Type;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;
use JMS\Serializer\Annotation\Groups;
use JMS\Serializer\Annotation\VirtualProperty;
use Symfony\Component\Validator\Context\ExecutionContextInterface;
use Symfony\Component\Security\Core\Validator\Constraints as SecurityAssert;
use Symfony\Component\Validator\Mapping\ClassMetadata;

/**
 * @ORM\Entity(repositoryClass="Application\UserBundle\Entity\Repository\UserRepository")
 * @ORM\Table(name="fos_user")
 * @UniqueEntity(fields={"username"}, errorPath="email", message="fos_user.email.already_used" , groups={"Settings", "MobileSettings", "Register", "update_email"})
 * @Assert\Callback(methods={"validate"}, groups={"Settings", "MobileSettings"})
 * @ORM\EntityListeners({"AppBundle\Listener\SettingsListener"})
 * @ORM\HasLifecycleCallbacks()
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
     * @Groups({"user", "tiny_user"})
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
     * @Assert\NotBlank()
     * @Assert\Email()
     */
    protected $username;

    /**
     * @var
     * @ORM\Column(name="first_name", type="string", length=50, nullable=true)
     * @Groups({"user", "tiny_user", "settings"})
     * @Assert\NotBlank()
     * @Assert\NotBlank(groups={"Settings", "Register", "MobileSettings"})
     */
    protected $firstName;

    /**
     * @ORM\Column(name="gender", type="smallint", nullable=true)
     * @var
     */
    protected $gender;

    /**
     * @Assert\Length(groups={"Settings", "Register", "MobileSettings", "MobileChangePassword"},
     *      min = 6,
     *      minMessage = "fos_user.password.validation",
     * )
     *
     * @Assert\Regex(groups={"Settings", "Register", "MobileSettings", "MobileChangePassword"},
     *     pattern="/^[a-zA-Z\d\.]+$/i",
     *     match=true,
     *     message = "fos_user.password.validation",
     * )
     *
     * @Assert\NotBlank()
     * @Assert\NotBlank(groups={"MobileChangePassword"})
     */
    protected $plainPassword;

    /**
     * @var
     * @Assert\NotBlank(groups={"MobileChangePassword"})
     * @SecurityAssert\UserPassword(
     *     message = "Invalid current password", groups={"MobileChangePassword"}
     * )
     */
    public $currentPassword;

    /**
     * @var
     * @ORM\Column(name="birth_date", type="datetime", nullable=true)
     * @Assert\Date
     * @Groups({"settings"})
     * @Type("DateTime<'Y-m-d'>")
     */
    protected $birthDate;

    /**
     * @var
     * @ORM\Column(name="last_name", type="string", length=50, nullable=true)
     * @Groups({"user", "tiny_user", "settings"})
     * @Assert\NotBlank()
     * @Assert\NotBlank(groups={"Settings", "Register", "MobileSettings"})
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
     * @Groups({"settings"})
     */
    protected $userEmails;

    /**
     * @Groups({"user"})
     */
    protected $draftCount;

    /**
     * @var
     * @Assert\Email(groups={"Settings", "MobileSettings"})
     */
    public $addEmail;

    /**
     * @var
     * @Assert\Email(groups={"Settings", "MobileSettings"})
     */
    public $primary;

    /**
     * @var date $created
     *
     * @ORM\Column(name="created", type="datetime", nullable=true)
     */
    private $created;

    /**
     * @var
     */
    private $stats;

    /**
     * @return mixed
     */
    public function getDraftCount()
    {
        return $this->draftCount;
    }

    /**
     * @param mixed $draftCount
     */
    public function setDraftCount($draftCount)
    {
        $this->draftCount = $draftCount;
    }

    /**
     * @VirtualProperty
     * @Groups({"user", "tiny_user", "settings"})
     */
    public function getImagePath()
    {
        return $this->getDownloadLink();
    }

    /**
     * @VirtualProperty
     * @Groups({"user"})
     */
    public function getIsConfirmed()
    {
        return $this->registrationToken ? false : true;
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

            return $birthDate->diff($now)->y;
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
     * @VirtualProperty()
     */
    public function getPhotoLink()
    {
        // if uses have photo
        if($this->getFileName()){
            return $this->getDownloadLink();
        }
        // if social user, return social img
        elseif(($this->getFacebookId() || $this->getGoogleId() || $this->getTwitterId()) && $this->getSocialPhotoLink() ){
            return $this->getSocialPhotoLink();
        }

        return null;
    }

    /**
     * @return string
     */
    public function showName()
    {
        if (!$this->getFirstName() && !$this->getLastName()){
            return null;
        }

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
     * @VirtualProperty()
     * @SerializedName("stats")
     * @Groups({"user"})
     */
    public function getRawStats()
    {
        return $this->getStats();
    }

    /**
     * @return array
     */
    public function getStats()
    {
        if ($this->stats){
            return $this->stats;
        }


        $active = 0;
        $doneBy = 0;

        $userGoals = $this->getUserGoal();
        if($userGoals){
            foreach($userGoals as $userGoal){
                switch($userGoal->getStatus()){
                    case UserGoal::ACTIVE:
                        $active++;
                        break;
                    case UserGoal::COMPLETED:
                        $doneBy++;
                        break;
                }
            }
        }

        return [
            "listedBy"  => $active + $doneBy,
            "active"    => $active,
            "doneBy"    => $doneBy
        ];
    }

    /**
     * @param $stats
     * @return $this
     */
    public function setStats($stats)
    {
        $this->stats = $stats;

        return $this;
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

    /**
     * @return $this
     */
    public function setCreated($created)
    {
        $this->created =  $created;

        return $this;
    }

    /**
     * Get created
     *
     * @return \DateTime
     */
    public function getCreated()
    {
        return $this->created;
    }

    /**
     * This function is used to set primary email and change username
     *
     * @ORM\PreUpdate()
     */
    public function calculationSettingsProcess()
    {
        //set default array
        $userEmailsInDb = array();

        //get primary email
        $primaryEmail = $this->primary;

        //get current email
        $currentEmail = $this->getEmail();

        //get user emails
        $userEmails = $this->getUserEmails();

        //check if primary email exist
        if ($primaryEmail && $primaryEmail !== $currentEmail) {

            //set primary email
            $this->setEmail($primaryEmail);
        }

        //check if userEmails exist
        if ($userEmails) {

            //get user emails in db
            $userEmailsInDb = array_map(
                function ($item)
                {
                 return $item['userEmails'] ;
                },
                $userEmails
            );
        }

        //check if primary email exist in $userEmailsInDb
        if ($primaryEmail && $userEmailsInDb && ($key = array_search($primaryEmail, $userEmailsInDb)) !== false) {

            unset($userEmails[$key]);
        }

        //check if set another primary email
        if ($userEmailsInDb && $primaryEmail && $primaryEmail !== $currentEmail && (array_search($currentEmail, $userEmailsInDb) == false)) {

            //set user emails in array with token and primary value
            $currentEmailData = ['userEmails' => $currentEmail, 'token' => null, 'primary' => false];

            //set current email data in userEmails array
            $userEmails[$currentEmail] = $currentEmailData;
        }

        //set user emails
        $this->setUserEmails($userEmails);
    }

    /**
     * @param ExecutionContextInterface $context
     */
    public function validate(ExecutionContextInterface $context)
    {
        // generate password groups
        $validGroups = array("MobileSettings", "Settings");

        // get groups
        $groups = $context->getGroup();

        if(in_array($groups, $validGroups)){

            //get add email
            $addEmail = $this->addEmail;

            //get current email
            $currentEmail = $this->getEmail();

            //get primary email
            $primaryEmail = $this->primary;

            //get user emails
            $userEmails = $this->getUserEmails();

            //check if primary email equal currentEmail
            if ($primaryEmail && (!$userEmails || !array_key_exists($primaryEmail, $userEmails) ||
               ($primaryEmail == $currentEmail))) {

                $context->buildViolation('Set invalid primary email')
                    ->atPath('primary')
                    ->addViolation();
            }

            // check if new email equal currentEmail
            if ($addEmail == $currentEmail) {

                $context->buildViolation('This email already exists')
                    ->atPath('addEmail')
                    ->addViolation();
            }
        }
    }

    /**
     * @return null|string
     */
    public function getSocialFakeEmail()
    {
        if ($this->getFacebookId()){
            return $this->getFacebookId() . '@facebook.com';
        }
        elseif($this->getGoogleId()){
            return $this->getGoogleId() . '@google.com';
        }
        elseif($this->getTwitterId()){
            return $this->getTwitterId() . '@twitter.com';
        }

        return null;
    }
}
