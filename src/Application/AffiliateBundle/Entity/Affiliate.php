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
     * @ORM\Column(name="html_content", type="string", length=5000, nullable=true)
     */
    protected $htmlContent;

    /**
     * @ORM\Column(name="css_content", type="string", length=5000, nullable=true)
     */
    protected $cssContent;

    /**
     * @ORM\Column(name="js_content", type="string", length=5000, nullable=true)
     */
    protected $jsContent;

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
     * Set htmlContent
     *
     * @param string $htmlContent
     *
     * @return Affiliate
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
     * @return Affiliate
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
     * @return Affiliate
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
}
