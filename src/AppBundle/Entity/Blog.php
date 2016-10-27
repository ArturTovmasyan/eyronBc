<?php

namespace AppBundle\Entity;

use AppBundle\Model\ImageableInterface;
use AppBundle\Traits\File;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use JMS\Serializer\Annotation as Serializer;
use JMS\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use JMS\Serializer\Annotation\SerializedName;


/**
 * Blog
 *
 * @ORM\Table(name="blog")
 * @ORM\Entity(repositoryClass="AppBundle\Entity\Repository\BlogRepository")
 */
class Blog implements ImageableInterface
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
     * @Groups({"blog"})
     */
    private $id;

    /**
     * @var array
     * @Assert\Type("array")
     * @ORM\Column(type="array")
     * @Groups({"blog"})
     */
    private $data;

    /**
     * @var string
     * @Assert\Type("string")
     * @ORM\Column(type="string", length=64)
     * @Groups({"blog"})
     */
    private $title;

    /**
     * @var string
     * @Gedmo\Slug(fields={"title"})
     * @ORM\Column(length=64, unique=true)
     * @Groups({"blog"})
     */
    protected $slug;

    /**
     * @var integer
     * @Assert\Type("integer")
     * @ORM\Column(type="smallint")
     * @Groups({"blog"})
     */
    private $position;

    /**
     * @var string
     * @SerializedName("blog_image_path")
     * @Groups({"blog"})
     */
    private $mobileImagePath;

    /**
     * @var string
     * @Assert\Type("string")
     * @ORM\Column(type="string", length=255)
     */
    private $metaDescription;

    /**
     * @var \DateTime
     * @Assert\Type("datetime")
     * @ORM\Column(type="datetime")
     * @Gedmo\Timestampable(on="create")
     * @Groups({"blog"})
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
     * @return array
     */
    public function  getBlMultipleBlog()
    {
        //check data and return array
        if($this->data){

            return $this->data;
        }
        
        return null;
    }

    /**
     * @param $multipleBlog
     */
    public function  setBlMultipleBlog($multipleBlog)
    {
        $this->data = array_values($multipleBlog);
    }

    /**
     * Set position
     *
     * @param integer $position
     *
     * @return Blog
     */
    public function setPosition($position)
    {
        $this->position = $position;

        return $this;
    }

    /**
     * Get position
     *
     * @return integer
     */
    public function getPosition()
    {
        return $this->position;
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
     * This function is used to get all related goal ids
     *
     */
   public function getRelatedGoalIds()
   {
       $ids = [];
       
       foreach ($this->data as $data)
       {
           if ($data['type'] == self::TYPE_GOAL) {
               $ids[] = $data['content'];
           }
       }
       
       return $ids;
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
}
