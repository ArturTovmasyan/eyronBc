<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 9/27/15
 * Time: 11:10 AM
 */

namespace AppBundle\Twig\Extension;

/**
 * Class ReplaceInDescriptionExtension
 * @package AppBundle\Twig\Extension
 */

class ReplaceInDescriptionExtension extends \Twig_Extension
{
    /**
     * @return array
     */
    public function getFunctions()
    {
        return array(
            new \Twig_SimpleFunction('replaceDescription', array($this, 'replaceDescription'))
        );
    }

    /**
     * @param $text
     * @return mixed
     */

    public function replaceDescription($text)
    {
        $content = str_replace('#', '',  $text);
//        $content = str_replace("\r\n", "<br>", $content);

        return $content;
    }
    public function getName()
    {
        return 'bl_replace_description_extension';
    }
}