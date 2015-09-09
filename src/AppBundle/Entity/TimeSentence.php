<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 9/9/15
 * Time: 7:19 PM
 */

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Gedmo\Mapping\Annotation as Gedmo;


/**
 * @ORM\Entity
 * @ORM\Table(name="time_sentence")
 * @Assert\Callback(methods={"checkReplace"})
 */
class TimeSentence
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(name="content", type="string")
     */
    protected $content;

    /**
     * @var
     * @ORM\Column(name="replace", type="string", length=50)
     */
    protected $replace;

    /**
     * @var
     * @ORM\Column(name="replace_with", type="string", length=50)
     */
    protected $replaceWith;

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
     * Set content
     *
     * @param string $content
     * @return Aphorism
     */
    public function setContent($content)
    {
        $this->content = $content;

        return $this;
    }

    /**
     * Get content
     *
     * @return string
     */
    public function getContent()
    {
        return $this->content;
    }

    /**
     * Set replace
     *
     * @param string $replace
     * @return TimeSentence
     */
    public function setReplace($replace)
    {
        $this->replace = $replace;

        return $this;
    }

    /**
     * Get replace
     *
     * @return string 
     */
    public function getReplace()
    {
        return $this->replace;
    }

    /**
     * Set replaceWith
     *
     * @param string $replaceWith
     * @return TimeSentence
     */
    public function setReplaceWith($replaceWith)
    {
        $this->replaceWith = $replaceWith;

        return $this;
    }

    /**
     * Get replaceWith
     *
     * @return string 
     */
    public function getReplaceWith()
    {
        return $this->replaceWith;
    }

    /**
     * @param $context
     * @Assert\Callback
     */
    public function checkReplace($context)
    {

        // get content
        $content = strtolower($this->getContent());

        // get replace
        $replace = strtolower($this->getReplace());

        // check replace
        if($replace){

            // find in content, and add error, if replace field not found in content
            if(!strpos($content, $replace)){

                // add error
                $context->addViolationAt('replace', 'You have`nt this world in content', array(), null);
            }
        }
    }

    /**
     * This function is used to replace 'replace' field with 'replaceWith' field in content
     *
     * @return mixed|string
     */
    public function replaceContent()
    {
        // get new string
        $newString = $this->getReplaceWith();

        // get old string
        $oldString = $this->getReplace();

        //get content
        $content = $this->getContent();

        // check new string
        if($newString){

            // replace content
            $content = str_replace("%$$oldString%", $newString, $$content);
        }

        return $content;
    }
}
