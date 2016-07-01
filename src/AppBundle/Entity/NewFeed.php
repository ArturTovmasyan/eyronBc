<?php
/**
 * Created by PhpStorm.
 * User: pc-4
 * Date: 11/13/15
 * Time: 1:35 PM
 */
namespace AppBundle\Entity;

use JMS\Serializer\Annotation\Groups;
use Doctrine\ORM\Mapping as ORM;

/**
 * Class NewFeed
 * @package AppBundle\Model
 *
 * @ORM\Entity(repositoryClass="AppBundle\Entity\Repository\NewFeedRepository")
 * @ORM\Table(name="new_feed")
 */
class NewFeed
{
    const GOAL_CREATE   = 0;
    const GOAL_ADD      = 1;
    const GOAL_COMPLETE = 2;
    const SUCCESS_STORY = 3;
    const COMMENT       = 4;

    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     *
     * @Groups({"new_feed"})
     */
    protected $id;

    /**
     * @ORM\ManyToOne(targetEntity="Application\UserBundle\Entity\User")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id", onDelete="CASCADE")
     *
     * @Groups({"new_feed"})
     */
    protected $user;

    /**
     * @ORM\Column(name="goals", type="array", nullable=false)
     *
     * @Groups({"new_feed"})
     */
    protected $goals;

    /**
     * @ORM\Column(name="listed_by", type="integer", nullable=false)
     *
     * @Groups({"new_feed"})
     */
    protected $listedBy;

    /**
     * @ORM\Column(name="completed_by", type="integer", nullable=false)
     *
     * @Groups({"new_feed"})
     */
    protected $completedBy;

    /**
     * @ORM\Column(name="action", type="smallint")
     * @Groups({"new_feed"})
     */
    protected $action;

    /**
     * @ORM\Column(name="perform_date", type="datetime")
     * @Groups({"new_feed"})
     */
    protected $datetime;

    /**
     * @ORM\ManyToOne(targetEntity="Application\CommentBundle\Entity\Comment")
     * @ORM\JoinColumn(name="comment_id", referencedColumnName="id", onDelete="CASCADE")
     *
     * @Groups({"new_feed"})
     */
    protected $comment;

    /**
     * @ORM\ManyToOne(targetEntity="SuccessStory")
     * @ORM\JoinColumn(name="success_story_id", referencedColumnName="id", onDelete="CASCADE")
     *
     * @Groups({"new_feed"})
     */
    protected $successStory;

    /**
     * @ORM\OneToOne(targetEntity="Gedmo\Loggable\Entity\LogEntry")
     * @ORM\JoinColumn(name="log_id", referencedColumnName="id", onDelete="SET NULL")
     */
    protected $log;

    /**
     * NewFeed constructor.
     * @param null $action
     * @param null $user
     * @param null $goal
     * @param null $story
     * @param null $comment
     */
    public function __construct($action = null, $user = null, $goal = null, $story = null, $comment = null)
    {
        $this->setUser($user);
        $this->setAction($action);
        $this->setSuccessStory($story);
        $this->setComment($comment);
        $this->setDatetime(new \DateTime());
        $this->setGoals([$goal->getId() => $goal]);
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
     * Set action
     *
     * @param integer $action
     * @return NewFeed
     */
    public function setAction($action)
    {
        $this->action = $action;

        return $this;
    }

    /**
     * Get action
     *
     * @return integer 
     */
    public function getAction()
    {
        return $this->action;
    }

    /**
     * Set datetime
     *
     * @param \DateTime $datetime
     * @return NewFeed
     */
    public function setDatetime($datetime)
    {
        $this->datetime = $datetime;

        return $this;
    }

    /**
     * Get datetime
     *
     * @return \DateTime 
     */
    public function getDatetime()
    {
        return $this->datetime;
    }

    /**
     * Set user
     *
     * @param \Application\UserBundle\Entity\User $user
     * @return NewFeed
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
     * Set comment
     *
     * @param \Application\CommentBundle\Entity\Comment $comment
     * @return NewFeed
     */
    public function setComment(\Application\CommentBundle\Entity\Comment $comment = null)
    {
        $this->comment = $comment;

        return $this;
    }

    /**
     * Get comment
     *
     * @return \Application\CommentBundle\Entity\Comment 
     */
    public function getComment()
    {
        return $this->comment;
    }

    /**
     * Set successStory
     *
     * @param \AppBundle\Entity\SuccessStory $successStory
     * @return NewFeed
     */
    public function setSuccessStory(\AppBundle\Entity\SuccessStory $successStory = null)
    {
        $this->successStory = $successStory;

        return $this;
    }

    /**
     * Get successStory
     *
     * @return \AppBundle\Entity\SuccessStory 
     */
    public function getSuccessStory()
    {
        return $this->successStory;
    }

    /**
     * Set logId
     *
     * @param \Gedmo\Loggable\Entity\LogEntry $log
     * @return NewFeed
     */
    public function setLogId(\Gedmo\Loggable\Entity\LogEntry $log = null)
    {
        $this->log = $log;

        return $this;
    }

    /**
     * Get logId
     *
     * @return \Gedmo\Loggable\Entity\LogEntry 
     */
    public function getLogId()
    {
        return $this->log;
    }

    /**
     * Set log
     *
     * @param \Gedmo\Loggable\Entity\LogEntry $log
     * @return NewFeed
     */
    public function setLog(\Gedmo\Loggable\Entity\LogEntry $log = null)
    {
        $this->log = $log;

        return $this;
    }

    /**
     * Get log
     *
     * @return \Gedmo\Loggable\Entity\LogEntry 
     */
    public function getLog()
    {
        return $this->log;
    }

    /**
     * Set listedBy
     *
     * @param integer $listedBy
     *
     * @return NewFeed
     */
    public function setListedBy($listedBy)
    {
        $this->listedBy = $listedBy;

        return $this;
    }

    /**
     * Get listedBy
     *
     * @return integer
     */
    public function getListedBy()
    {
        return $this->listedBy;
    }

    /**
     * Set completedBy
     *
     * @param integer $completedBy
     *
     * @return NewFeed
     */
    public function setCompletedBy($completedBy)
    {
        $this->completedBy = $completedBy;

        return $this;
    }

    /**
     * Get completedBy
     *
     * @return integer
     */
    public function getCompletedBy()
    {
        return $this->completedBy;
    }

    /**
     * @return mixed
     */
    public function getGoals()
    {
        return $this->goals;
    }

    /**
     * @param mixed $goals
     */
    public function setGoals($goals)
    {
        $this->goals = $goals;
    }

    /**
     * @param $goal
     */
    public function addGoal($goal)
    {
        $this->goals[$goal->getId()] = $goal;
    }
}
