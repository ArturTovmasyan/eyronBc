<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 10/21/15
 * Time: 10:56 AM
 */

namespace AppBundle\Entity;

use AppBundle\Traits\File;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use JMS\Serializer\Annotation\Groups;
use Gedmo\Mapping\Annotation as Gedmo;

/**
 * Class StoryImage
 * @package AppBundle\Entity
 *
 * @ORM\Entity()
 * @ORM\Table(name="story_image")
 */
class StoryImage
{
    // use file trait
    use File;

    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     *
     * @ORM\ManyToOne(targetEntity="SuccessStory", inversedBy="files", cascade={"persist"})
     * @ORM\JoinColumn(name="story_id", referencedColumnName="id")
     */
    protected $story;

    /**
     * Override getPath function in file trait
     *
     * @return string
     */
    protected function getPath()
    {
        return 'stories';
    }

    /**
     * Override getPath function in file trait
     *
     * @return string
     */
    protected function getMobilePath()
    {
        return $this->getPath() . '/mobile';
    }

    /**
     * Override getPath function in file trait
     *
     * @return string
     */
    protected function getTabletPath()
    {
        return $this->getPath() . '/tablet';
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
     * Set story
     *
     * @param \AppBundle\Entity\SuccessStory $story
     * @return StoryImage
     */
    public function setStory(\AppBundle\Entity\SuccessStory $story = null)
    {
        $this->story = $story;

        return $this;
    }

    /**
     * Get story
     *
     * @return \AppBundle\Entity\SuccessStory 
     */
    public function getStory()
    {
        return $this->story;
    }
}
