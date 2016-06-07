<?php
/**
 * Created by PhpStorm.
 * User: andranik
 * Date: 6/7/16
 * Time: 1:41 PM
 */
namespace Application\UserBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Class UserNewFeed
 * @package Application\UserBundle\Entity
 *
 * @ORM\Entity
 * @ORM\Table(name="user_new_feed")
 */
class UserNewFeed
{
    /**
     * @ORM\Id
     * @ORM\Column(name="id", type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     */
    protected $user;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\NewFeed", inversedBy="userNewFeed")
     * @ORM\JoinColumn(name="new_feed_id", referencedColumnName="id")
     */
    protected $newFeed;

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
     * Set user
     *
     * @param \Application\UserBundle\Entity\User $user
     * @return UserNewFeed
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
     * Set newFeed
     *
     * @param \AppBundle\Entity\NewFeed $newFeed
     * @return UserNewFeed
     */
    public function setNewFeed(\AppBundle\Entity\NewFeed $newFeed = null)
    {
        $this->newFeed = $newFeed;

        return $this;
    }

    /**
     * Get newFeed
     *
     * @return \AppBundle\Entity\NewFeed 
     */
    public function getNewFeed()
    {
        return $this->newFeed;
    }
}
