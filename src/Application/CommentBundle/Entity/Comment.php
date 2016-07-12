<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 10/14/15
 * Time: 7:29 PM
 */

namespace Application\CommentBundle\Entity;

use AppBundle\Model\ActivityableInterface;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Groups;
use Symfony\Component\Security\Core\User\UserInterface;
use Gedmo\Mapping\Annotation as Gedmo;

/**
 * @ORM\Entity(repositoryClass="Application\CommentBundle\Entity\Repository\CommentRepository")
 * @ORM\Table(name="comment")
 */
class Comment implements ActivityableInterface
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Groups({"comment"})
     */
    protected $id;

    /**
     * Thread of this comment
     *
     * @var Thread
     * @ORM\ManyToOne(targetEntity="Thread", inversedBy="comments")
     */
    protected $thread;

    /**
     * Author of the comment
     *
     * @ORM\ManyToOne(targetEntity="Application\UserBundle\Entity\User")
     * @Groups({"comment_author"})
     */
    protected $author;

    /**
     * Author of the comment
     *
     * @ORM\ManyToOne(targetEntity="Application\CommentBundle\Entity\Comment")
     * @Groups({"comment_parent"})
     */
    protected $parent;

    /**
     * @ORM\Column(name="bode", type="text", length=2000, nullable=false)
     * @Groups({"comment"})
     */
    protected $body;

    /**
     * @Gedmo\Timestampable(on="create")
     * @ORM\Column(name="created_at", type="datetime", nullable=false)
     * @Groups({"comment"})
     */
    protected $createdAt;

    /**
     * @Gedmo\Timestampable(on="update")
     * @ORM\Column(name="updated_at", type="datetime", nullable=false)
     * @Groups({"comment"})
     */
    protected $updatedAt;

    /**
     * @param $body
     */
    public function setBody($body)
    {
        $this->body = ($body !== null) ? strip_tags($body) : $body;
    }

    /**
     * @param UserInterface $author
     */
    public function setAuthor(UserInterface $author)
    {
        $this->author = $author;
    }

    /**
     * @return mixed
     */
    public function getAuthor()
    {
        return $this->author;
    }

    /**
     * @return string
     */
    public function getAuthorName()
    {
        if (null === $this->getAuthor()) {
            return 'Anonymous';
        }

        return $this->getAuthor()->getUsername();
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
     * Get body
     *
     * @return string
     */
    public function getBody()
    {
        return $this->body;
    }

    /**
     * Set createdAt
     *
     * @param \dateTime $createdAt
     *
     * @return Comment
     */
    public function setCreatedAt(\dateTime $createdAt)
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * Get createdAt
     *
     * @return \dateTime
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Set updatedAt
     *
     * @param \dateTime $updatedAt
     *
     * @return Comment
     */
    public function setUpdatedAt(\dateTime $updatedAt)
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    /**
     * Get updatedAt
     *
     * @return \dateTime
     */
    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }

    /**
     * Set thread
     *
     * @param \Application\CommentBundle\Entity\Thread $thread
     *
     * @return Comment
     */
    public function setThread(\Application\CommentBundle\Entity\Thread $thread = null)
    {
        $this->thread = $thread;

        return $this;
    }

    /**
     * Get thread
     *
     * @return \Application\CommentBundle\Entity\Thread
     */
    public function getThread()
    {
        return $this->thread;
    }

    /**
     * Set parent
     *
     * @param \Application\CommentBundle\Entity\Comment $parent
     *
     * @return Comment
     */
    public function setParent(\Application\CommentBundle\Entity\Comment $parent = null)
    {
        $this->parent = $parent;

        return $this;
    }

    /**
     * Get parent
     *
     * @return \Application\CommentBundle\Entity\Comment
     */
    public function getParent()
    {
        return $this->parent;
    }
}
