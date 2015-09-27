<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 9/27/15
 * Time: 11:10 AM
 */

namespace AppBundle\Twig\Extension;

/**
 * Class ReplaceExtension
 * @package AppBundle\Twig\Extension
 */
class ReplaceExtension extends \Twig_Extension
{
    /**
     * @return array
     */
    public function getFunctions()
    {
        return array(
            new \Twig_SimpleFunction('replaceString', array($this, 'replaceString'))
        );
    }
    /**
     * @param $search
     * @param $replace
     * @param $object
     * @return mixed
     */
    public function replaceString($search, $replace, $object)
    {
        $content = str_replace($search, $replace, $object);
        return $content;
    }
    public function getName()
    {
        return 'bl_replace_extension';
    }
}