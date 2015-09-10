<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 9/9/15
 * Time: 7:04 PM
 */

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Gedmo\Mapping\Annotation as Gedmo;


/**
 * @ORM\Entity
 * @ORM\Table(name="category")
 */
class Category
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(name="title", type="string")
     */
    protected $title;

    /**
     * @Gedmo\Slug(fields={"title"})
     * @ORM\Column(name="slug", type="string", unique=true, nullable=false)
     */
    protected $slug;

    /**
     * @ORM\OneToMany(targetEntity="Aphorism", mappedBy="category", cascade={"persist"})
     **/
    protected $aphorisms;

    /**
     * @ORM\OneToMany(targetEntity="Goal", mappedBy="category", cascade={"persist"})
     **/
    protected $goals;

    /**
     * @ORM\ManyToMany(targetEntity="Tag")
     * @ORM\JoinTable(name="categories_tags",
     *      joinColumns={@ORM\JoinColumn(name="goal_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="tag_id", referencedColumnName="id")}
     *      )
     **/
    protected $tags;

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
        $this->aphorisms = new \Doctrine\Common\Collections\ArrayCollection();
        $this->goals = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add aphorisms
     *
     * @param \AppBundle\Entity\Aphorism $aphorisms
     * @return Category
     */
    public function addAphorism(\AppBundle\Entity\Aphorism $aphorisms)
    {
        $this->aphorisms[] = $aphorisms;
        $aphorisms->setCategory($this);

        return $this;
    }

    /**
     * Remove aphorisms
     *
     * @param \AppBundle\Entity\Aphorism $aphorisms
     */
    public function removeAphorism(\AppBundle\Entity\Aphorism $aphorisms)
    {
        $this->aphorisms->removeElement($aphorisms);
    }

    /**
     * Get aphorisms
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getAphorisms()
    {
        return $this->aphorisms;
    }

    /**
     * Add goals
     *
     * @param \AppBundle\Entity\Goal $goals
     * @return Category
     */
    public function addGoal(\AppBundle\Entity\Goal $goals)
    {
        $this->goals[] = $goals;
        $goals->setCategory($this);

        return $this;
    }

    /**
     * Remove goals
     *
     * @param \AppBundle\Entity\Goal $goals
     */
    public function removeGoal(\AppBundle\Entity\Goal $goals)
    {
        $this->goals->removeElement($goals);
    }

    /**
     * Get goals
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getGoals()
    {
        return $this->goals;
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