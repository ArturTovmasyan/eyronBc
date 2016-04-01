<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 9/9/15
 * Time: 6:33 PM
 */

namespace AppBundle\Entity;

use AppBundle\Traits\File;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use JMS\Serializer\Annotation\Groups;
use JMS\Serializer\Annotation\VirtualProperty;
use Gedmo\Mapping\Annotation as Gedmo;

/**
 * Class GoalImage
 * @package AppBundle\Entity
 *
 * @ORM\Entity(repositoryClass="AppBundle\Entity\Repository\GoalImageRepository")
 * @ORM\Table(name="goal_image")
 * @ORM\HasLifecycleCallbacks()
 */
class GoalImage
{
    // use file trait
    use File;

    // constants for folder
    const COVER = 'cover';
    const F_LIST = 'list';

    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Groups({"image"})
     */
    protected $id;

    /**
     *
     * @ORM\ManyToOne(targetEntity="Goal", inversedBy="images", cascade={"persist"})
     * @ORM\JoinColumn(name="goal_id", referencedColumnName="id")
     */
    protected $goal;

    /**
     * @ORM\Column(type="boolean", name="list_image", nullable=true)
     * @Groups({"image"})
     */
    protected $list;

    /**
     * @ORM\Column(type="boolean", name="cover_image", nullable=true)
     * @Groups({"image"})
     */
    protected $cover;

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
     * @VirtualProperty
     * @Groups({"image"})
     */
    public function getImagePath()
    {
        return $this->getDownloadLink();
    }

    /**
     * @VirtualProperty
     * @Groups({"image"})
     */
    public function getImageSize()
    {
        //get image size
        $size = getimagesize($this->getAbsolutePath().$this->getFileName());

        //get image width
        $width = $size[0];

        //get image height
        $height = $size[1];

        return array('width' => $width, 'height' => $height);
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
     * Set goal
     *
     * @param \AppBundle\Entity\Goal $goal
     * @return GoalImage
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
     * Override getPath function in file trait
     *
     * @return string
     */
    protected function getPath()
    {
        return 'images';
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
     * Set created
     *
     * @param \DateTime $created
     * @return GoalImage
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
     * @return GoalImage
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
     * @return mixed
     */
    public function getList()
    {
        return $this->list;
    }

    /**
     * @param mixed $list
     */
    public function setList($list = 0)
    {
        $this->list = $list;
    }

    /**
     * @return mixed
     */
    public function getCover()
    {
        return $this->cover;
    }

    /**
     * @param mixed $cover
     */
    public function setCover($cover = 0)
    {
        $this->cover = $cover;
    }

    /**
     * @ORM\PreRemove
     */
    public function preRemove()
    {
        // get origin file path
        $filePath = $this->getAbsolutePath() . $this->getFileName();

        // check file and remove
        if (file_exists($filePath) && is_file($filePath)){
            unlink($filePath);
        }

        // get mobile file path
        $mobileFilePath = $this->getAbsoluteMobilePath() . $this->getFileName();

        // check file and remove
        if (file_exists($mobileFilePath) && is_file($mobileFilePath)){
            unlink($mobileFilePath);
        }

        // get tablet file path
        $tabletFilePath = $this->getAbsoluteTabletPath() . $this->getFileName();

        // check file and remove
        if (file_exists($tabletFilePath) && is_file($tabletFilePath)){
            unlink($tabletFilePath);
        }
    }
}
