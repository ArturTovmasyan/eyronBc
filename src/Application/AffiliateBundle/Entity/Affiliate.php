<?php
/**
 * Created by PhpStorm.
 * User: andranik
 * Date: 8/4/16
 * Time: 7:12 PM
 */
namespace Application\AffiliateBundle\Entity;

use AppBundle\Traits\File;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Class Affiliate
 * @package Application\AffiliateBundle\Entity
 *
 * @ORM\Entity()
 * @ORM\Table(name="affiliate")
 */
class Affiliate
{
    use File;

    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(name="name", type="string", length=50, nullable=false)
     */
    protected $name;

    /**
     * @ORM\Column(name="link", type="string", length=200, nullable=true)
     */
    protected $link;

    /**
     * @ORM\ManyToOne(targetEntity="Application\AffiliateBundle\Entity\AffiliateType")
     * @ORM\JoinColumn(name="affiliate_type_id", referencedColumnName="id")
     */
    protected $affiliateType;

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
     * Set name
     *
     * @param string $name
     *
     * @return Affiliate
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set link
     *
     * @param string $link
     *
     * @return Affiliate
     */
    public function setLink($link)
    {
        $this->link = $link;

        return $this;
    }

    /**
     * Get link
     *
     * @return string
     */
    public function getLink()
    {
        return $this->link;
    }

    /**
     * Set affiliateType
     *
     * @param \Application\AffiliateBundle\Entity\AffiliateType $affiliateType
     *
     * @return Affiliate
     */
    public function setAffiliateType(\Application\AffiliateBundle\Entity\AffiliateType $affiliateType = null)
    {
        $this->affiliateType = $affiliateType;

        return $this;
    }

    /**
     * Get affiliateType
     *
     * @return \Application\AffiliateBundle\Entity\AffiliateType
     */
    public function getAffiliateType()
    {
        return $this->affiliateType;
    }
}
