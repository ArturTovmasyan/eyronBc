<?php
/**
 * Created by PhpStorm.
 * User: Artur
 * Date: 9/27/15
 * Time: 11:10 AM
 */

namespace AppBundle\Twig\Extension;

/**
 * Class StringSliceExtension
 * @package AppBundle\Twig\Extension
 */
class StringSliceExtension extends \Twig_Extension
{
    /**
     * @return array
     */
    public function getFunctions()
    {
        return array(
            new \Twig_SimpleFunction('sliceString', array($this, 'sliceString'))
        );
    }

    /**
     * @param $text
     * @return mixed
     */
    public function sliceString($text)
    {
        //clear html tag and spaces
        $text = strip_tags($text);
        $text = htmlspecialchars(trim($text));

        //check if text less then 160 symbol
        if(strlen($text) > 160) {

            //cut string
            $content = substr($text, 0, 160).".";

            //get last dot position
            $pos = strrpos($content, '.');

            //check if dot not exist
            if(!$pos) {
                $pos = strrpos($content, ',');
            }

            //cut text with dot position
            $content = substr($content, 0, $pos + 1);
        }
        else {
            $content = $text;
        }

        return $content;
    }

    public function getName()
    {
        return 'bl_slice_extension';
    }
}