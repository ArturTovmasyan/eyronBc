<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 9/8/15
 * Time: 3:32 PM
 */

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use AppBundle\Traits\Location;
use Gedmo\Mapping\Annotation as Gedmo;


/**
 * @ORM\Entity(repositoryClass="AppBundle\Entity\Repository\UserGoalRepository")
 * @ORM\Table(name="users_goals", uniqueConstraints={@ORM\UniqueConstraint(name="duplicate_user_goal", columns={"user_id", "goal_id"})})
 * @Gedmo\Loggable
 */
class UserGoal
{
    use Location;

    // constants for status
    const ACTIVE = 1;
    const COMPLETED = 2;

    // constants for filter in twig
    const URGENT_IMPORTANT = 1;
    const URGENT_NOT_IMPORTANT = 2;
    const NOT_URGENT_IMPORTANT = 3;
    const NOT_URGENT_NOT_IMPORTANT = 4;

    // constants for steps
    const TO_DO = 0;
    const DONE = 1;

    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Groups({"userGoal"})
     */
    protected $id;

    /**
     * @var
     * @ORM\Column(name="status", type="smallint", nullable=true)
     * @Groups({"userGoal"})
     * @Gedmo\Versioned
     */
    protected $status;

    /**
     * @var
     * @ORM\Column(name="is_visible", type="boolean", nullable=true)
     * @Groups({"userGoal"})
     */
    protected $isVisible = true;

    /**
     * @var
     * @ORM\Column(name="urgent", type="boolean", nullable=false)
     * @Groups({"userGoal"})
     */
    protected $urgent = false;

    /**
     * @var
     * @ORM\Column(name="important", type="boolean", nullable=false)
     * @Groups({"userGoal"})
     */
    protected $important = false;

    /**
     * @var
     * @ORM\Column(name="note", type="text", nullable=true)
     * @Groups({"userGoal"})
     */
    protected $note;

    /**
     * @var
     * @ORM\Column(name="steps", type="array", nullable=true)
     * @Groups({"userGoal"})
     */
    protected $steps = [];

    /**
     * @var
     * @ORM\Column(name="due_date", type="datetime", nullable=true)
     * @Groups({"userGoal"})
     */
    protected $doDate;

    /**
     * @var
     * @ORM\Column(name="completion_date", type="datetime", nullable=true)
     * @Groups({"userGoal"})
     */
    protected $completionDate;

    /**
     * @var
     * @ORM\Column(name="listed_date", type="datetime", nullable=true)
     * @Groups({"userGoal"})
     */
    protected $listedDate;

    /**
     * @ORM\ManyToOne(targetEntity="Goal", inversedBy="userGoal", cascade={"persist"})
     * @ORM\JoinColumn(name="goal_id", referencedColumnName="id")
     * @Groups({"userGoal_goal"})
     * @Gedmo\Versioned
     **/
    protected $goal;

    /**
     * @ORM\ManyToOne(targetEntity="Application\UserBundle\Entity\User", inversedBy="userGoal")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     * @Groups({"user"})
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
     * @return int|null
     */
    public function getUrgentImportantStatus()
    {
        if ($this->urgent == true && $this->important == true){
            return UserGoal::URGENT_IMPORTANT;
        }
        elseif ($this->urgent == true && $this->important == false){
            return UserGoal::URGENT_NOT_IMPORTANT;
        }
        elseif ($this->urgent == false && $this->important == true){
            return UserGoal::NOT_URGENT_IMPORTANT;
        }
        elseif ($this->urgent == false && $this->important == false){
            return UserGoal::NOT_URGENT_NOT_IMPORTANT;
        }

        return null;
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

    /**
     * Set note
     *
     * @param string $note
     * @return UserGoal
     */
    public function setNote($note)
    {
        $this->note = $note;

        return $this;
    }

    /**
     * Get note
     *
     * @return string 
     */
    public function getNote()
    {
        return $this->note;
    }

    /**
     * Set doDate
     *
     * @param \DateTime $doDate
     * @return UserGoal
     */
    public function setDoDate($doDate)
    {
        $this->doDate = $doDate;

        return $this;
    }

    /**
     * Get doDate
     *
     * @return \DateTime 
     */
    public function getDoDate()
    {
        return $this->doDate;
    }

    /**
     * Set steps
     *
     * @param array $steps
     * @return UserGoal
     */
    public function setSteps($steps)
    {
        $this->steps = $steps;

        return $this;
    }

    /**
     * Get steps
     *
     * @return array 
     */
    public function getSteps()
    {
        return $this->steps;
    }

    /**
     * @return mixed
     */
    public function getCompletionDate()
    {
        return $this->completionDate;
    }

    /**
     * @param mixed $completionDate
     */
    public function setCompletionDate($completionDate)
    {
        $this->completionDate = $completionDate;
    }

    /**
     * @return mixed
     */
    public function getListedDate()
    {
        return $this->listedDate;
    }

    /**
     * @param mixed $listedDate
     */
    public function setListedDate($listedDate)
    {
        $this->listedDate = $listedDate;
    }

    /**
     * @return mixed
     */
    public function getUrgent()
    {
        return $this->urgent;
    }

    /**
     * @param mixed $urgent
     */
    public function setUrgent($urgent)
    {
        $this->urgent = $urgent;
    }

    /**
     * @return mixed
     */
    public function getImportant()
    {
        return $this->important;
    }

    /**
     * @param mixed $important
     */
    public function setImportant($important)
    {
        $this->important = $important;
    }

    /**
     * @return int
     */
    public function getCompleted()
    {
        // get all steps
        $steps = $this->getSteps();

        // check step
        if($steps){

            // get count of steps
            $count = count($steps);

            // count of steps for done
            $done = 0;

            // loop for steps
            foreach($steps as $step){

                // check is step done
                if($step == self::DONE) {
                    $done ++;
                }
            }
            return $done * 100 / $count;
        }
        return 100;
    }

    /**
     * This function is used to return json location for twig
     *
     * @return string
     */
    public function getLocations()
    {
        // check data
        if($this->getLng() && $this->getLat() && $this->getAddress()){
            $result = array(
                "location" =>
                    array(
                        "latitude" => $this->getLng(),
                        "longitude" => $this->getLat()
                    ),
                "address" => $this->getAddress() );

            return json_encode($result);
        }

        return null;


    }

    /**
     * This function is used to return json location for twig
     *
     * @return string
     */
    public function getStepsJson()
    {
        $result= array();

        // get steps
        $steps = $this->getSteps();

        if($steps){
            foreach($steps as $text => $switch){
                $result[] = array('text' => $text, 'switch' => $switch == self::DONE);
            }
        }
        else{
            $result[] = array();
        }
        return json_encode($result);
    }

    /**
     * Set isVisible
     *
     * @param boolean $isVisible
     * @return UserGoal
     */
    public function setIsVisible($isVisible)
    {
        $this->isVisible = $isVisible;

        return $this;
    }

    /**
     * Get isVisible
     *
     * @return boolean 
     */
    public function getIsVisible()
    {
        return $this->isVisible;
    }
}
