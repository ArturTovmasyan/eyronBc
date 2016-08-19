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
use JMS\Serializer\Annotation\VirtualProperty;
use Symfony\Component\Validator\Constraints as Assert;
use JMS\Serializer\Annotation\Groups;

/**
 * Class Affiliate
 * @package Application\AffiliateBundle\Entity
 *
 * @ORM\Entity(repositoryClass="Application\AffiliateBundle\Entity\Repository\AffiliateRepository")
 * @ORM\Table(name="affiliate")
 */
class Affiliate
{
    use File;

    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Groups({"affiliate"})
     */
    protected $id;

    /**
     * @ORM\Column(name="name", type="string", length=50, nullable=false)
     * @Groups({"affiliate"})
     */
    protected $name;

    /**
     * @ORM\Column(name="link", type="string", length=500, nullable=true)
     */
    protected $link;

    /**
     * @ORM\Column(name="size", type="array", nullable=true)
     * @Groups({"affiliate"})
     */
    protected $size;

    /**
     * @ORM\Column(name="links", type="array", nullable=true)
     * @Groups({"affiliate_links"})
     */
    protected $links;

    /**
     * @ORM\ManyToOne(targetEntity="Application\AffiliateBundle\Entity\AffiliateType")
     * @ORM\JoinColumn(name="affiliate_type_id", referencedColumnName="id")
     *
     * @Groups({"affiliate_affiliateType"})
     */
    protected $affiliateType;

    /**
     * @var
     */
    protected $cacheDownloadLink;

    /**
     * @VirtualProperty()
     * @Groups({"affiliate"})
     */
    public function getHtmlContent()
    {
        return $this->replacePlaceHolders($this->getAffiliateType()->getHtmlContent());
    }
    

    /**
     * @VirtualProperty()
     * @Groups({"affiliate"})
     */
    public function getJsContent()
    {
        return $this->replacePlaceHolders($this->getAffiliateType()->getJsContent());
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
     * @return string
     */
    public function __toString()
    {
        return $this->getName() ? $this->getName() : "_" . $this->getId();
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

    /**
     * @return mixed
     */
    public function getSizeString()
    {
        return  $this->getSize() ? implode('x', $this->getSize()) : '';
    }

    /**
     * @param $size
     * @return $this
     */
    public function setSizeString($size)
    {
        $size = explode('x', $size);
        if (count($size) == 2){
            $this->size = $size;
        }

        return $this;
    }

    /**
     * @return mixed
     */
    public function getSize()
    {
        return $this->size;
    }

    /**
     * @param mixed $size
     */
    public function setSize($size)
    {
        $this->size = $size;
    }

    /**
     * Set links
     *
     * @param array $links
     *
     * @return Affiliate
     */
    public function setLinks($links)
    {
        $this->links = $links;

        return $this;
    }

    /**
     * Get links
     *
     * @return array
     */
    public function getLinks()
    {
        return $this->links;
    }

    /**
     * @return mixed
     */
    public function getCacheDownloadLink()
    {
        return $this->cacheDownloadLink ? $this->cacheDownloadLink : $this->getDownloadLink();
    }

    /**
     * @param mixed $cacheDownloadLink
     */
    public function setCacheDownloadLink($cacheDownloadLink)
    {
        $this->cacheDownloadLink = $cacheDownloadLink;
    }

    /**
     * @param $content
     * @return mixed
     */
    public function replacePlaceHolders($content)
    {
        $newContent = str_replace(AffiliateType::LINK_PLACEHOLDER, $this->getLink(), $content);
        $newContent = str_replace(AffiliateType::IMAGE_PLACEHOLDER, $this->getCacheDownloadLink(), $newContent);
        $newContent = str_replace(AffiliateType::AID_PLACEHOLDER, AffiliateType::$bookingAId, $newContent);

        return $newContent;
    }
}
