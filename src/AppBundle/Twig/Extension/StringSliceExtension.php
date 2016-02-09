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
        //cut string
        $content = substr($text, 0, 160);

        return $content;
    }

    public function getName()
    {
        return 'bl_slice_extension';
    }
}