<?php
/**
 * Created by PhpStorm.
 * User: andranik
 * Date: 7/27/16
 * Time: 4:18 PM
 */
namespace Application\UserBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Groups;
use Gedmo\Mapping\Annotation as Gedmo;

/**
 * @ORM\Entity(repositoryClass="Application\UserBundle\Entity\Repository\UserNotificationRepository")
 * @ORM\Table(name="user_notification", indexes={@ORM\Index(name="notification_last_modified_index", columns={"user_id", "created"})})
 */
class UserNotification
{
    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Groups({"userNotification"})
     */
    protected $id;

    /**
     * @ORM\ManyToOne(targetEntity="Application\UserBundle\Entity\User")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     *
     * @Groups({"userNotification_user"})
     */
    protected $user;

    /**
     * @ORM\ManyToOne(targetEntity="Application\UserBundle\Entity\Notification", inversedBy="userNotifications")
     * @ORM\JoinColumn(name="notification_id", referencedColumnName="id")
     *
     * @Groups({"userNotification_notification"})
     */
    protected $notification;

    /**
     * @ORM\Column(name="is_read", type="boolean", nullable=false)
     *
     * @Groups({"userNotification"})
     */
    protected $isRead = false;

    /**
     * @Gedmo\Timestampable(on="create")
     * @ORM\Column(name="created", type="datetime", nullable=false)
     * @Groups({"userNotification"})
     */
    protected $created;

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
     * Set isRead
     *
     * @param boolean $isRead
     *
     * @return UserNotification
     */
    public function setIsRead($isRead)
    {
        $this->isRead = $isRead;

        return $this;
    }

    /**
     * Get isRead
     *
     * @return boolean
     */
    public function getIsRead()
    {
        return $this->isRead;
    }

    /**
     * @return mixed
     */
    public function getCreated()
    {
        return $this->created;
    }

    /**
     * @param mixed $created
     */
    public function setCreated($created)
    {
        $this->created = $created;
    }

    /**
     * Set user
     *
     * @param \Application\UserBundle\Entity\User $user
     *
     * @return UserNotification
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
     * Set notification
     *
     * @param \Application\UserBundle\Entity\Notification $notification
     *
     * @return UserNotification
     */
    public function setNotification(\Application\UserBundle\Entity\Notification $notification = null)
    {
        $this->notification = $notification;

        return $this;
    }

    /**
     * Get notification
     *
     * @return \Application\UserBundle\Entity\Notification
     */
    public function getNotification()
    {
        return $this->notification;
    }
}
