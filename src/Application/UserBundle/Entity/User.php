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
use Gedmo\Mapping\Annotation as Gedmo;
use Symfony\Component\Validator\Mapping\ClassMetadata;

/**
 * @ORM\Entity(repositoryClass="Application\UserBundle\Entity\Repository\UserRepository")
 * @ORM\Table(name="fos_user")
 * @UniqueEntity(fields={"username"}, errorPath="email", message="fos_user.email.already_used" , groups={"Register", "update_email"})
 * @UniqueEntity(fields={"email"}, errorPath="primary_error", message="fos_user.email.primary_error" , groups={"Settings", "MobileSettings"})
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
    const FACEBOOK = 'Facebook';
    const GOOGLE = 'Google';
    const TWITTER = 'Twitter';

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
     * @ORM\Column(name="u_id", type="string", length=9)
     * @Groups({"user", "tiny_user"})
     */
    protected $uId;

    /**
     * @var
     * @ORM\Column(name="registration_ids", type="text", nullable=true)
     */
    protected $registrationIds;

    /**
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\UserGoal", indexBy="goal_id", mappedBy="user", cascade={"persist"})
     **/
    protected $userGoal;

    /**
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\SuccessStory", indexBy="goal_id", mappedBy="user", cascade={"persist"})
     **/
    protected $SuccessStories;

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
     * @ORM\Column(name="language", type="string", length=3, nullable=true)
     * @var
     */
    protected $language;

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
     * @ORM\Column(name="created", type="datetime")
     * @Gedmo\Timestampable(on="create")
     */
    private $created;

    /**
     * @var
     *
     * @ORM\Column(type="datetime")
     * @Gedmo\Timestampable(on="update")
     */
    private $updated;

    /**
     * @var
     */
    private $stats;

    /**
     * @ORM\Column(name="activity", type="boolean", nullable=false)
     */
    protected $activity = false;

    /**
     * @ORM\Column(name="active_time", type="integer", nullable=true)
     * @var
     */
    protected $activeTime;

    /**
     * @Groups({"tiny_goal"})
     */
    private $cachedImage;

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
        if ($userEmailsInDb && $primaryEmail && $primaryEmail !== $currentEmail && (array_search($currentEmail, $userEmailsInDb) == false)
                && $currentEmail != $this->getSocialFakeEmail()) {

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
            if ($addEmail == $currentEmail || ($userEmails && array_key_exists($addEmail, $userEmails))) {

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

    /**
     * @return mixed
     */
    public function getLanguage()
    {
        return $this->language;
    }

    /**
     * @param mixed $language
     */
    public function setLanguage($language)
    {
        $this->language = $language;
    }


    /**
     * This function is used to get last email in userEmails array
     *
     * @VirtualProperty()
     * @SerializedName("lastUserEmail")
     * @Groups({"settings"})
     */
    public function getLastInUserEmails()
    {
        //get userEmails
        $userEmails = $this->getUserEmails();

        //get last userEmails in array
        $userEmail = end($userEmails);

        return $userEmail;
    }

    /**
     * Set updated
     *
     * @param \DateTime $updated
     * @return User
     */
    public function setUpdated($updated)
    {
        $this->updated = $updated;

        return $this;
    }

    /**
     * Get updated
     *
     * @return \DateTime 
     */
    public function getUpdated()
    {
        return $this->updated;
    }

    /**
     * Set uId
     *
     * @param string $uId
     * @return User
     */
    public function setUId($uId)
    {
        $this->uId = $uId;

        return $this;
    }

    /**
     * Get uId
     *
     * @return string 
     */
    public function getUId()
    {
        return $this->uId;
    }


    /**
     * Set activeTime
     *
     * @param integer $activeTime
     * @return User
     */
    public function setActiveTime($activeTime)
    {
        $this->activeTime = $activeTime;

        return $this;
    }

    /**
     * Get activeTime
     *
     * @return integer 
     */
    public function getActiveTime()
    {
        return $this->activeTime;
    }

    /**
     * Add SuccessStories
     *
     * @param \AppBundle\Entity\SuccessStory $successStories
     * @return User
     */
    public function addSuccessStory(\AppBundle\Entity\SuccessStory $successStories)
    {
        $this->SuccessStories[] = $successStories;

        return $this;
    }

    /**
     * Remove SuccessStories
     *
     * @param \AppBundle\Entity\SuccessStory $successStories
     */
    public function removeSuccessStory(\AppBundle\Entity\SuccessStory $successStories)
    {
        $this->SuccessStories->removeElement($successStories);
    }

    /**
     * Get SuccessStories
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getSuccessStories()
    {
        return $this->SuccessStories;
    }

    /**
     * Get mostActiveTime
     *
     * @return integer
     */
    public function getMostActiveTime()
    {
        $userGoals = $this->getUserGoal();
        $haveDate = false;
        $timesAdd = [];
        if ($userGoals)
        {
            $haveDate = true;
            foreach($userGoals as $userGoal){
                if($userGoal->getDoDate()){
                    $time = $userGoal->getDoDate()->format('H');
                    if(isset($timesAdd[$time])){
                        $timesAdd[$time]++;
                    }else{
                        $timesAdd[$time] = 1;
                    }
                };

                if($userGoal->getCompletionDate()){
                    $time = $userGoal->getCompletionDate()->format('H');
                    if(isset($timesAdd[$time])){
                        $timesAdd[$time]++;
                    }else{
                        $timesAdd[$time] = 1;
                    }
                };

                if($userGoal->getListedDate()){
                    $time = $userGoal->getListedDate()->format('H');
                    if(isset($timesAdd[$time])){
                        $timesAdd[$time]++;
                    }else{
                        $timesAdd[$time] = 1;
                    }
                }
            }
        }
        $successStories = $this->getSuccessStories();
        if($successStories){
            foreach($successStories as $time){
                if($time->getUpdated()){
                    $time = $time->getUpdated()->format('H');
                    if(isset($timesAdd[$time])){
                        $timesAdd[$time]++;
                    }else{
                        $timesAdd[$time] = 1;
                    }
                };
            }
        }

        if($haveDate && $timesAdd){
            $activeTime = array_keys($timesAdd, max($timesAdd))[0];
        }else{
            $activeTime = 0;
        }
        return $activeTime;
    }

    /**
     * Update ActiveTime
     *
     * @return $this
     */
    public function updateActiveTime()
    {
        $activeTime = $this->getMostActiveTime();
        $this->setActiveTime($activeTime);
        return $this;
    }

    /**
     * Get timePercent
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getTimePercent()
    {
        $userGoals = $this->getUserGoal();
        $timePercent = 0;
        $timesAgo = 0;
        $allTimes = 0;
        if ($userGoals)
        {
            foreach($userGoals as $userGoal){
                if($userGoal->getStatus() != UserGoal::COMPLETED){
                    //if goal have listed and do dates
                    if($userGoal->getListedDate() && $userGoal->getDoDate()){
                        $time1 = $userGoal->getListedDate();
                        $time2 = $userGoal->getDoDate();
                        $limit = date_diff($time2,$time1)->d;
                        $time3 = new \DateTime('now');
                        $currentLimit = date_diff($time3,$time1)->d;

                        if($currentLimit > $limit){
                            $timesAgo += $limit;
                            $allTimes += $limit;
                        }else{
                            $timesAgo += $currentLimit;
                            $allTimes += $limit;
                        }
                    }
                }
            }
            if($allTimes){
                $timePercent = (100/$allTimes)*$timesAgo;
            }
        }
        return $timePercent;
    }

    /**
     * Get getGoalCompletedPercent
     *
     * @return integer
     */
    public function getGoalCompletedPercent()
    {
        $userGoals = $this->getUserGoal();
        $goalPercent = 0;
        $count = 0;
        if ($userGoals)
        {
            foreach($userGoals as $userGoal){
                $goalPercent += $userGoal->getCompleted();
                $count++;
            }
            if($count){
                $goalPercent = $goalPercent/$count;
            }

        }
        return $goalPercent;
    }

    /**
     * @return array
     */
    public function getComingGoals()
    {
        $comingGoals = [];
        $userGoals = $this->getUserGoal();
        if ($userGoals)
        {
            foreach($userGoals as $userGoal){
                if($userGoal->getStatus() != UserGoal::COMPLETED){
                    //if goal have listed and do dates
                    if($userGoal->getListedDate() && $userGoal->getDoDate()){
                        $time1 = $userGoal->getDoDate();
                        $time2 = new \DateTime('now');
                        $limit = date_diff($time1,$time2)->d;

                        if($limit == 1 || $limit == 0){
                            $comingGoals[] = $userGoal;
                        };
                    }
                }
            }
        }
        return $comingGoals;
    }

    /**
     * @param mixed $data
     */
    public function setRegistrationIds($data)
    {
        $this->registrationIds = json_encode($data) ;
    }

    /**
     * @return mixed
     */
    public function getRegistrationIds()
    {
        $idsArray = json_decode($this->registrationIds, true);
        return is_array($idsArray)?$idsArray:[];
    }
    
    /**
     * This function is used to get login social name
     * 
     */
    public function getSocialsName()
    {
        //check if login by facebook
       if($this->getFacebookId()) {
           return self::FACEBOOK;
       }
        
        //check if login by google
        if($this->getGoogleId()) {
            return self::GOOGLE;
        }
        
        //check if login by twitter
        if($this->getTwitterId()) {
            return self::TWITTER;
        }
        
        return null;
    }

    /**
     * Set activity
     *
     * @param boolean $activity
     * @return User
     */
    public function setActivity($activity)
    {
        $this->activity = $activity;

        return $this;
    }

    /**
     * Get activity
     *
     * @return boolean 
     */
    public function getActivity()
    {
        return $this->activity;
    }

    /**
     * @return mixed
     *
     * @VirtualProperty
     * @Groups({"user", "tiny_user", "settings"})
     */
    public function getCachedImage()
    {
        return $this->cachedImage;
    }

    /**
     * @param mixed $cachedImage
     */
    public function setCachedImage($cachedImage)
    {
        $this->cachedImage = $cachedImage;
    }
}
