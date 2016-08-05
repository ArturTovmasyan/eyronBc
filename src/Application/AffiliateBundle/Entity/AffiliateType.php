<?php
/**
 * Created by PhpStorm.
 * User: andranik
 * Date: 8/4/16
 * Time: 12:17 PM
 */
namespace Application\AffiliateBundle\Entity;

use AppBundle\Traits\File;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use JMS\Serializer\Annotation\Groups;

/**
 * Class AffiliateType
 * @package Application\AffiliateBundle\Entity
 *
 * @ORM\Entity()
 * @ORM\Table(name="affiliate_type")
 */
class AffiliateType
{
    const AID_PLACEHOLDER   = '%aid%';
    const IMAGE_PLACEHOLDER = '%image%';
    const LINK_PLACEHOLDER  = '%link%';

    public static $bookingAId;

    use File;

    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Groups({"affiliateType"})
     */
    protected $id;

    /**
     * @ORM\Column(name="name", type="string", length=50, nullable=false)
     * @Groups({"affiliateType"})
     */
    protected $name;

    /**
     * @ORM\Column(name="html_content", type="string", length=5000, nullable=true)
     * @Groups({"affiliateType"})
     */
    protected $htmlContent;

    /**
     * @ORM\Column(name="css_content", type="string", length=5000, nullable=true)
     * @Groups({"affiliateType"})
     */
    protected $cssContent;

    /**
     * @ORM\Column(name="js_content", type="string", length=5000, nullable=true)
     * @Groups({"affiliateType"})
     */
    protected $jsContent;

    /**
     * @ORM\Column(name="default_link", type="string", length=500, nullable=true)
     */
    protected $defaultLink;

    /**
     * @var
     */
    protected $cacheDownloadLink;

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
     * Set htmlContent
     *
     * @param string $htmlContent
     *
     * @return AffiliateType
     */
    public function setHtmlContent($htmlContent)
    {
        $this->htmlContent = $htmlContent;

        return $this;
    }

    /**
     * Get htmlContent
     *
     * @return string
     */
    public function getHtmlContent()
    {
        return $this->htmlContent;
    }

    /**
     * Set cssContent
     *
     * @param string $cssContent
     *
     * @return AffiliateType
     */
    public function setCssContent($cssContent)
    {
        $this->cssContent = $cssContent;

        return $this;
    }

    /**
     * Get cssContent
     *
     * @return string
     */
    public function getCssContent()
    {
        return $this->cssContent;
    }

    /**
     * Set jsContent
     *
     * @param string $jsContent
     *
     * @return AffiliateType
     */
    public function setJsContent($jsContent)
    {
        $this->jsContent = $jsContent;

        return $this;
    }

    /**
     * Get jsContent
     *
     * @return string
     */
    public function getJsContent()
    {
        return $this->jsContent;
    }

    /**
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param mixed $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @return mixed
     */
    public function getDefaultLink()
    {
        return $this->defaultLink;
    }

    /**
     * @param mixed $defaultLink
     */
    public function setDefaultLink($defaultLink)
    {
        $this->defaultLink = $defaultLink;
    }

    /**
     * @return mixed
     */
    public function getCacheDownloadLink()
    {
        return $this->cacheDownloadLink ? $this->cacheDownloadLink : $this->getDownloadLink();
    }

    /**
     * @param $cacheDownloadLink
     * @return $this
     */
    public function setCacheDownloadLink($cacheDownloadLink)
    {
        $this->cacheDownloadLink = $cacheDownloadLink;

        return $this;
    }


    public function replacePlaceHolders($content)
    {
        $newContent = str_replace(AffiliateType::AID_PLACEHOLDER, self::$bookingAId, $content);
        $newContent = str_replace(AffiliateType::LINK_PLACEHOLDER, $this->getDefaultLink(), $newContent);
        $newContent = str_replace(AffiliateType::IMAGE_PLACEHOLDER, $this->getCacheDownloadLink(), $newContent);

        return $newContent;
    }
}
