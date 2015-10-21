<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 10/20/15
 * Time: 8:07 PM
 */


namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Gedmo\Mapping\Annotation as Gedmo;

/**
 * Class SuccessStory
 * @package AppBundle\Entity
 *
 * @ORM\Entity(repositoryClass="AppBundle\Entity\Repository\SuccessStoryRepository")
 * @ORM\Table(name="success_story")
 */
class SuccessStory
{

    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     *
     * @ORM\ManyToOne(targetEntity="Goal", inversedBy="successStories", cascade={"persist"})
     * @ORM\JoinColumn(name="goal_id", referencedColumnName="id")
     */
    protected $goal;

    /**
     * @ORM\OneToMany(targetEntity="StoryImage", mappedBy="story", cascade={"persist", "remove"})
     * @Assert\Valid()
     */
    protected $files;

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
     * @ORM\Column(name="story", type="text")
     */
    protected $story;

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
     * Set created
     *
     * @param \DateTime $created
     * @return SuccessStory
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
     * @return SuccessStory
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
     * Set goal
     *
     * @param \AppBundle\Entity\Goal $goal
     * @return SuccessStory
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
     * Constructor
     */
    public function __construct()
    {
        $this->files = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add files
     *
     * @param \AppBundle\Entity\StoryImage $files
     * @return SuccessStory
     */
    public function addFile(\AppBundle\Entity\StoryImage $files)
    {
        $this->files[] = $files;
        $files->setStory($this);

        return $this;
    }

    /**
     * Remove files
     *
     * @param \AppBundle\Entity\StoryImage $files
     */
    public function removeFile(\AppBundle\Entity\StoryImage $files)
    {
        $this->files->removeElement($files);
    }

    /**
     * Get files
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getFiles()
    {
        return $this->files;
    }

    /**
     * Set story
     *
     * @param string $story
     * @return SuccessStory
     */
    public function setStory($story)
    {
        $this->story = $story;

        return $this;
    }

    /**
     * Get story
     *
     * @return string
     */
    public function getStory()
    {
        return $this->story;
    }
}