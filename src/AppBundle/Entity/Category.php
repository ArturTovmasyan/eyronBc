<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 9/9/15
 * Time: 7:04 PM
 */

namespace AppBundle\Entity;

use AppBundle\Traits\File;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Groups;
use JMS\Serializer\Annotation\VirtualProperty;
use Symfony\Component\Validator\Constraints as Assert;
use Gedmo\Mapping\Annotation as Gedmo;


/**
 * @ORM\Entity
 * @ORM\Table(name="category")
 */
class Category
{
    use File;

    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Groups("category")
     */
    protected $id;

    /**
     * @ORM\Column(name="title", type="string")
     * @Groups("category")
     */
    protected $title;

    /**
     * @Gedmo\Slug(fields={"title"})
     * @ORM\Column(name="slug", type="string", unique=true, nullable=false)
     * @Groups("category")
     */
    protected $slug;

    /**
     * @ORM\ManyToMany(targetEntity="Tag", inversedBy="category")
     * @ORM\JoinTable(name="categories_tags",
     *      joinColumns={@ORM\JoinColumn(name="category_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="tag_id", referencedColumnName="id")}
     *      )
     **/
    protected $tags;


    /**
     * @VirtualProperty()
     * @Groups("category")
     */
    public function getImageDownloadLink()
    {
        return $this->getDownloadLink();
    }

    /**
     * @return string
     */
    public function __toString()
    {
        return (string) $this->title;
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
     * Set title
     *
     * @param string $title
     * @return Category
     */
    public function setTitle($title)
    {
        $this->title = strip_tags($title);

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
     * @return Category
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
     * Constructor
     */
    public function __construct()
    {
        $this->goals = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add tags
     *
     * @param \AppBundle\Entity\Tag $tags
     * @return Category
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
}
