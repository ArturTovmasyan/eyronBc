<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 10/20/15
 * Time: 8:07 PM
 */


namespace AppBundle\Entity;

use AppBundle\Model\ActivityableInterface;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Gedmo\Mapping\Annotation as Gedmo;
use JMS\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Context\ExecutionContextInterface;

/**
 * Class SuccessStory
 * @package AppBundle\Entity
 *
 * @ORM\Entity(repositoryClass="AppBundle\Entity\Repository\SuccessStoryRepository")
 * @ORM\Table(name="success_story")
 */
class SuccessStory implements ActivityableInterface
{
    const MIN_WORDS_IN_STORY = 3;

    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Groups({"successStory"})
     */
    protected $id;

    /**
     *
     * @ORM\ManyToOne(targetEntity="Goal", inversedBy="successStories", cascade={"persist"})
     * @ORM\JoinColumn(name="goal_id", referencedColumnName="id")
     */
    protected $goal;

    /**
     * @ORM\OneToMany(targetEntity="StoryImage", mappedBy="story", cascade={"persist", "remove"}, indexBy="id")
     * @Groups({"successStory_storyImage"})
     * @Assert\Valid()
     * @Assert\Count(
     *      max = "6",
     *      maxMessage = "success_story.max_files"
     * )
     */
    protected $files;

    /**
     * @ORM\ManyToOne(targetEntity="Application\UserBundle\Entity\User", inversedBy="SuccessStories")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     * @Groups({"successStory_user"})
     **/
    protected $user;

    /**
     * @var
     *
     * @Gedmo\Timestampable(on="create")
     * @ORM\Column(type="datetime")
     * @Groups({"successStory"})
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
     * @Groups({"successStory"})
     * @Assert\NotBlank()
     */
    protected $story;


    /**
     * @ORM\Column(name="video_link", type="json_array", nullable=true)
     * @Groups({"successStory"})
     */
    protected $videoLink;

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
        if (!isset($this->files[$files->getId()])){
            $this->files[$files->getId()] = $files;
            $files->setStory($this);
        }

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
        $this->story = trim($story);

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

    /**
     * Set user
     *
     * @param \Application\UserBundle\Entity\User $user
     * @return SuccessStory
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
     * Set videoLink
     *
     * @param string $videoLink
     * @return SuccessStory
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
     * @param ExecutionContextInterface $context
     *
     * @Assert\Callback()
     */
    public function validate(ExecutionContextInterface $context)
    {
        $hasFiles  = (count($this->files) != 0);
        $hasVideos = (count($this->videoLink) != 0);
        $wordCountInStory = count(explode(' ', $this->story));

        if (!$hasFiles && !$hasVideos && $wordCountInStory < self::MIN_WORDS_IN_STORY) {
            $context->buildViolation("Success story must has min " . self::MIN_WORDS_IN_STORY . " words")
                ->atPath('story')
                ->addViolation();
        }
    }
}
