<?php

namespace AppBundle\Entity;

use AppBundle\Model\ImageableInterface;
use AppBundle\Model\PublishAware;
use AppBundle\Traits\File;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use JMS\Serializer\Annotation as Serializer;
use JMS\Serializer\Annotation\Groups;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;
use JMS\Serializer\Annotation\SerializedName;


/**
 * Blog
 *
 * @ORM\Table(name="blog", uniqueConstraints={@ORM\UniqueConstraint(name="IDX_duplicate_blog_title", columns={"title"})},)
 * @ORM\Entity(repositoryClass="AppBundle\Entity\Repository\BlogRepository")
 * @UniqueEntity(
 *     fields={"title"},
 *     message="This blog title is already use."
 * )
 */
class Blog implements ImageableInterface, PublishAware
{
    // use file trait
    use File;

    const TYPE_TEXT = 'text';
    const TYPE_GOAL = 'goal';

    /**
     * @var int
     *
     * @ORM\Column(type="smallint")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var array
     * @Assert\Type("array")
     * @ORM\Column(type="array")
     */
    private $data;

    /**
     * @var string
     * @Assert\Type("string")
     * @ORM\Column(type="string", length=64, unique=true)
     */
    private $title;

    /**
     * @var string
     * @Gedmo\Slug(fields={"title"})
     * @ORM\Column(length=64, unique=true)
     */
    protected $slug;

    /**
     * @var \DateTime
     *
     * @ORM\Column(type="datetime", nullable=true)
     * @Assert\Type("datetime")
     */
    protected $publishedDate;

    /**
     * @var string
     * @SerializedName("image_path")
     */
    private $mobileImagePath;

    /**
     * @var string
     * @Assert\Type("string")
     * @ORM\Column(type="string", length=255)
     */
    private $metaDescription;

    /**
     * @var
     * @ORM\Column(name="publish", type="boolean")
     */
    protected $publish = PublishAware::NOT_PUBLISH;

    /**
     * @var \DateTime
     * @Assert\Type("datetime")
     * @ORM\Column(type="datetime")
     * @Gedmo\Timestampable(on="create")
     */
    private $created;

    /**
     * @var \DateTime
     * @Assert\Type("datetime")
     * @ORM\Column(type="datetime")
     * @Gedmo\Timestampable(on="update")
     */
    private $updated;

    /**
     * @ORM\OneToMany(targetEntity="Blog", mappedBy="parent", cascade={"persist", "remove"})
     */
    private $blog;

    /**
     * @ORM\ManyToOne(targetEntity="Blog")
     * @ORM\JoinColumn(name="parent_id", referencedColumnName="id")
     */
    private $parent;

//    public function __construct() {
//        $this->blog = new \Doctrine\Common\Collections\ArrayCollection();
//    }

    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set data
     *
     * @param array $data
     *
     * @return Blog
     */
    public function setData($data)
    {
        $this->data = $data;

        return $this;
    }

    /**
     * Get data
     *
     * @return array
     */
    public function getData()
    {
        return $this->data;
    }

    /**
     * Set updated
     *
     * @param \DateTime $updated
     *
     * @return Blog
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
     * Set title
     *
     * @param string $title
     *
     * @return Blog
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
     * Set slug
     *
     * @param string $slug
     *
     * @return Blog
     */
    public function setSlug($slug)
    {
        $this->slug = $slug;

        return $this;
    }

    /**
     * Get slug
     *
     * @return string
     */
    public function getSlug()
    {
        return $this->slug;
    }

    /**
     * Set created
     *
     * @param \DateTime $created
     *
     * @return Blog
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
     * @param $path
     * @return $this
     */
    public function setMobileImagePath($path)
    {
        $this->mobileImagePath = $path;

        return $this;
    }

    /**
     * @return string
     */
    public function getImagePath()
    {
        return $this->getDownloadLink();
    }

    /**
     * Set metaDescription
     *
     * @param string $metaDescription
     *
     * @return Blog
     */
    public function setMetaDescription($metaDescription)
    {
        $this->metaDescription = $metaDescription;

        return $this;
    }

    /**
     * Get metaDescription
     *
     * @return string
     */
    public function getMetaDescription()
    {
        return $this->metaDescription;
    }

    /**
     * Set publishedDate
     *
     * @param \DateTime $publishedDate
     *
     * @return Blog
     */
    public function setPublishedDate($publishedDate)
    {
        $this->publishedDate = $publishedDate;

        return $this;
    }

    /**
     * Get publishedDate
     *
     * @return \DateTime
     */
    public function getPublishedDate()
    {
        return $this->publishedDate;
    }

    /**
     * This function is used to get all related goal ids
     *
     */
    public function getRelatedGoalIds()
    {
        $ids = [];

        foreach ($this->data as $data) {
            if ($data['type'] == self::TYPE_GOAL) {
                $ids[] = $data['content'];
            }
        }

        return $ids;
    }

    /**
     * @return array
     */
    public function getBlMultipleBlog()
    {
        //check data and return array
        if ($this->data) {

            return $this->data;
        }

        return null;
    }

    /**
     * @param $multipleBlog
     */
    public function setBlMultipleBlog($multipleBlog)
    {
        $this->data = array_values($multipleBlog);
    }

    /**
     * This function is used to add goal in each array data
     *
     * @param array $goals
     * @return $this
     */
    public function addGoalsInData($goals)
    {
        $blogData = $this->data;

        foreach ($blogData as $key => $blog) {
            if ($blog['type'] == self::TYPE_GOAL && $blog['content']) {
                $goalId = $blog['content'];
                $blogData[$key]['goals'] = $goals[$goalId];
            }
        }

        $this->data = $blogData;
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
     * @return string
     */
    public function __toString()
    {
        return (string)$this->title;
    }

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->blog = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add blog
     *
     * @param \AppBundle\Entity\Blog $blog
     *
     * @return Blog
     */
    public function addBlog(\AppBundle\Entity\Blog $blog)
    {
        $this->blog[] = $blog;

        return $this;
    }

    /**
     * Remove blog
     *
     * @param \AppBundle\Entity\Blog $blog
     */
    public function removeBlog(\AppBundle\Entity\Blog $blog)
    {
        $this->blog->removeElement($blog);
    }

    /**
     * Get blog
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getBlog()
    {
        return $this->blog;
    }

    /**
     * Set parent
     *
     * @param \AppBundle\Entity\Blog $parent
     *
     * @return Blog
     */
    public function setParent(\AppBundle\Entity\Blog $parent = null)
    {
        $this->parent = $parent;

        return $this;
    }

    /**
     * Get parent
     *
     * @return \AppBundle\Entity\Blog
     */
    public function getParent()
    {
        return $this->parent;
    }
}
