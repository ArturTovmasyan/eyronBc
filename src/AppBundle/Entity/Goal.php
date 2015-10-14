<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 9/8/15
 * Time: 3:32 PM
 */

namespace AppBundle\Entity;

use AppBundle\Model\MultipleFileInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Gedmo\Mapping\Annotation as Gedmo;

/**
 * @ORM\Entity
 * @ORM\Table(name="goal")
 */
class Goal implements MultipleFileInterface
{
    // constants for privacy
    const PUBLIC_PRIVACY = 1;
    const PRIVATE_PRIVACY = 2;

    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(name="description", type="string")
     */
    protected $description;

    /**
     * @ORM\Column(name="title", type="string", nullable=true)
     */
    protected $title;

    /**
     * @ORM\Column(name="video_link", type="string", nullable=true)
     */
    protected $videoLink;

    /**
     * @ORM\Column(name="video_description", type="string", nullable=true)
     */
    protected $videoDescription;

    /**
     * @ORM\OneToMany(targetEntity="GoalImage", mappedBy="goal", cascade={"persist", "remove"})
     * @Assert\Valid()
     */
    protected $images;

    /**
     * @ORM\OneToMany(targetEntity="UserGoal", mappedBy="goal", cascade={"persist"})
     **/
    protected $userGoal;

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
     * @ORM\Column(name="status", type="smallint", nullable=true)
     */
    protected $status;

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
    public function getPrimaryPhoto()
    {
        // get images
        $images = $this->getImages();

        // check images
        if($images){

            // loop for images
            foreach($images as $image){

                // check is primary
                if($image->getPrimary()){
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
     * Set videoDescription
     *
     * @param string $videoDescription
     * @return Goal
     */
    public function setVideoDescription($videoDescription)
    {
        $this->videoDescription = $videoDescription;

        return $this;
    }

    /**
     * Get videoDescription
     *
     * @return string 
     */
    public function getVideoDescription()
    {
        return $this->videoDescription;
    }

    /**
     * Set status
     *
     * @param integer $status
     * @return Goal
     */
    public function setStatus($status = self::PUBLIC_PRIVACY)
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
}
