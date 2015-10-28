<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 9/8/15
 * Time: 3:32 PM
 */

namespace AppBundle\Entity;

use AppBundle\Model\MultipleFileInterface;
use AppBundle\Model\PublishAware;
use AppBundle\Traits\Location;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Gedmo\Mapping\Annotation as Gedmo;
use JMS\Serializer\Annotation\Groups;
use JMS\Serializer\Annotation\VirtualProperty;

/**
 * @ORM\Entity(repositoryClass="AppBundle\Entity\Repository\GoalRepository")
 * @ORM\Table(name="goal")
 */
class Goal implements MultipleFileInterface, PublishAware
{
    // constants for privacy status
    const PUBLIC_PRIVACY = true;
    const PRIVATE_PRIVACY = false;

    // constants for readinessStatus
    const DRAFT = false;
    const TO_PUBLISH = true;


    // constants for inner page
    const INNER = "inner";
    const VIEW = "view";

    // use location trait
    use Location;

    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Groups({"map"})
     */
    protected $id;

    /**
     * @ORM\Column(name="description", type="string", nullable=true)
     */
    protected $description;

    /**
     * @Assert\Length(
     *      groups={"goal"},
     *      min = 3,
     *      max = 255,
     *      minMessage = "Your title must be at least {{ limit }} characters long",
     *      maxMessage = "Your title name cannot be longer than {{ limit }} characters"
     * )
     * @ORM\Column(name="title", type="string", nullable=true)
     * @Groups({"map"})
     */
    protected $title;

    /**
     * @ORM\Column(name="video_link", type="string", nullable=true)
     */
    protected $videoLink;

    /**
     * @ORM\OneToMany(targetEntity="GoalImage", mappedBy="goal", cascade={"persist", "remove"})
     * @Assert\Valid()
     */
    protected $images;

    /**
     * @ORM\OneToMany(targetEntity="SuccessStory", mappedBy="goal", cascade={"persist", "remove"})
     * @Assert\Valid()
     */
    protected $successStories;

    /**
     * @ORM\OneToMany(targetEntity="UserGoal", mappedBy="goal", cascade={"persist"})
     **/
    protected $userGoal;

    /**
     * @ORM\ManyToOne(targetEntity="Application\UserBundle\Entity\User", inversedBy="authorGoals")
     * @ORM\JoinColumn(name="author_id", referencedColumnName="id")
     **/
    protected $author;


    /**
     * @ORM\ManyToOne(targetEntity="Application\UserBundle\Entity\User", inversedBy="editedGoals")
     * @ORM\JoinColumn(name="editor_id", referencedColumnName="id")
     **/
    protected $editor;

    /**
     * @ORM\ManyToMany(targetEntity="Tag", cascade={"persist"})
     * @ORM\JoinTable(name="goals_tags",
     *      joinColumns={@ORM\JoinColumn(name="goal_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="tag_id", referencedColumnName="id")}
     *      )
     **/
    protected $tags;

    /**
     * @var
     * @ORM\Column(name="status", type="boolean", nullable=true)
     */
    protected $status = self::PRIVATE_PRIVACY;

    /**
     * @var
     * @ORM\Column(name="readiness_status", type="boolean", nullable=true)
     */
    protected $readinessStatus = self::DRAFT;

    /**
     * @var
     * @ORM\Column(name="publish", type="boolean", nullable=true)
     */
    protected $publish = PublishAware::NOT_PUBLISH;

    /**
     * @var
     *
     * @Gedmo\Timestampable(on="create")
     * @ORM\Column(type="datetime")
     */
    protected $created;

    /**
     * @var
     *
     * @Gedmo\Timestampable(on="update")
     * @ORM\Column(type="datetime")
     */
    protected $updated;

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
     * @return string
     */
    public function __toString()
    {
        return (string) $this->id;
    }

    /**
     * Add images
     *
     * @param \AppBundle\Entity\GoalImage $images
     * @return Goal
     */
    public function addImage(\AppBundle\Entity\GoalImage $images)
    {
        $this->images[] = $images;
        $images->setGoal($this);

        return $this;
    }

    /**
     * Remove images
     *
     * @param \AppBundle\Entity\GoalImage $images
     */
    public function removeImage(\AppBundle\Entity\GoalImage $images)
    {
        $this->images->removeElement($images);
    }

    /**
     * Get images
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getImages()
    {
        return $this->images;
    }
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->images = new \Doctrine\Common\Collections\ArrayCollection();
        $this->userGoal = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add userGoal
     *
     * @param \AppBundle\Entity\UserGoal $userGoal
     * @return Goal
     */
    public function addUserGoal(\AppBundle\Entity\UserGoal $userGoal)
    {
        $this->userGoal[] = $userGoal;
        $userGoal->setGoal($this);

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
     * Set description
     *
     * @param string $description
     * @return Goal
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string 
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Add tags
     *
     * @param \AppBundle\Entity\Tag $tags
     * @return Goal
     */
    public function addTag(\AppBundle\Entity\Tag $tags)
    {
        $this->tags[] = $tags;

        return $this;
    }

    /**
     * Remove tags
     *
     * @param \AppBundle\Entity\Tag $tags
     */
    public function removeTag(\AppBundle\Entity\Tag $tags)
    {
        $this->tags->removeElement($tags);
    }

    /**
     * Get tags
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getTags()
    {
        return $this->tags;
    }

    /**
     * This function is used to get hash tags from description
     *
     * @return mixed
     */
    public function getHashTags()
    {
        // get description
        $content = strtolower($this->description);

        // get hash tags
        preg_match_all('/#([^\s]+)/', $content, $hashTags);

        // return hash tags
        return $hashTags[1];
    }


    /**
     * @return bool|mixed
     */
    public function getListPhoto()
    {
        // get images
        $images = $this->getImages();

        // check images
        if($images){

            // loop for images
            foreach($images as $image){

                // check is list
                if($image->getList()){
                    return $image;
                }
            }
        }

        return null;
    }

    /**
     * @VirtualProperty
     * @return null
     * @Groups({"map"})
     */
    public function getListPhotoDownloadLink()
    {
        // get list image
        $image = $this->getListPhoto();

        // return download link
        return $image ? $image->getDownloadLink() : null;
    }


    /**
     * @return bool|mixed
     */
    public function getCoverPhoto()
    {
        // get images
        $images = $this->getImages();

        // check images
        if($images){

            // loop for images
            foreach($images as $image){

                // check is cover
                if($image->getCover()){
                    return $image;
                }
            }
        }

        return null;
    }

    /**
     * @return array
     */
    public function  getBlMultipleFile()
    {
        // check images and return array
        if($this->images){

            return $this->images->toArray();
        }
        return array();
    }

    /**
     * @param $multipleFile
     */
    public function  setBlMultipleFile($multipleFile)
    {
        // check added images
        if(count($multipleFile) > 0){

            $this->images = new ArrayCollection($multipleFile);
        }
    }

    /**
     * Set title
     *
     * @param string $title
     * @return Goal
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string 
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set videoLink
     *
     * @param string $videoLink
     * @return Goal
     */
    public function setVideoLink($videoLink)
    {
        $this->videoLink = $videoLink;

        return $this;
    }

    /**
     * Get videoLink
     *
     * @return string 
     */
    public function getVideoLink()
    {
        return $this->videoLink;
    }

    /**
     * Set status
     *
     * @param integer $status
     * @return Goal
     */
    public function setStatus($status = self::PRIVATE_PRIVACY)
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

    /**
     * Set created
     *
     * @param \DateTime $created
     * @return Goal
     */
    public function setCreated($created)
    {
        $this->created = $created;

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
     * Set updated
     *
     * @param \DateTime $updated
     * @return Goal
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
     * Set publish
     *
     * @param boolean $publish
     * @return Goal
     */
    public function setPublish($publish)
    {
        $this->publish = $publish;

        return $this;
    }

    /**
     * Get publish
     *
     * @return boolean
     */
    public function getPublish()
    {
        return $this->publish;
    }

    /**
     * Add successStories
     *
     * @param \AppBundle\Entity\SuccessStory $successStories
     * @return Goal
     */
    public function addSuccessStory(\AppBundle\Entity\SuccessStory $successStories)
    {
        $this->successStories[] = $successStories;
        $successStories->setGoal($this);

        return $this;
    }

    /**
     * Remove successStories
     *
     * @param \AppBundle\Entity\SuccessStory $successStories
     */
    public function removeSuccessStory(\AppBundle\Entity\SuccessStory $successStories)
    {
        $this->successStories->removeElement($successStories);
    }

    /**
     * Get successStories
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getSuccessStories()
    {
        return $this->successStories;
    }

    /**
     * Set author
     *
     * @param \Application\UserBundle\Entity\User $author
     * @return Goal
     */
    public function setAuthor(\Application\UserBundle\Entity\User $author = null)
    {
        $this->author = $author;

        return $this;
    }

    /**
     * Get author
     *
     * @return \Application\UserBundle\Entity\User 
     */
    public function getAuthor()
    {
        return $this->author;
    }

    /**
     * Set editor
     *
     * @param \Application\UserBundle\Entity\User $editor
     * @return Goal
     */
    public function setEditor(\Application\UserBundle\Entity\User $editor = null)
    {
        $this->editor = $editor;

        return $this;
    }

    /**
     * Get editor
     *
     * @return \Application\UserBundle\Entity\User 
     */
    public function getEditor()
    {
        return $this->editor;
    }

    /**
     * @return mixed
     */
    public function getReadinessStatus()
    {
        return $this->readinessStatus;
    }

    /**
     * @param mixed $readinessStatus
     */
    public function setReadinessStatus($readinessStatus)
    {
        $this->readinessStatus = $readinessStatus;
    }


    /**
     * This function is used to check is user author if this goal
     *
     * @param $user
     * @return bool
     */
    public function isAuthor($user)
    {
        // get author
        $author = $this->getAuthor();

        // check author
        if($author && $author->getId() == $user->getId()){
            return true;
        }
        return false;
    }
}
