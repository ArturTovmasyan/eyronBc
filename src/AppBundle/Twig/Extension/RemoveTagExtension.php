<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 9/27/15
 * Time: 11:10 AM
 */

namespace AppBundle\Twig\Extension;

/**
 * Class RemoveTagsExtension
 * @package AppBundle\Twig\Extension
 */


class RemoveTagExtension extends \Twig_Extension
{
    /**
     * @return array
     */
    public function getFilters()
    {
        return array(
            new \Twig_SimpleFilter('removeTag', array($this, 'removeTag'))
        );
    }

    /**
     * @param $text
     * @return mixed
     */

    public function removeTag($text)
    {
        $content = preg_replace('/#([^\s#])/', '$1',  $text);

        return  $content;
    }
    public function getName()
    {
        return 'bl_replace_description_extension';
    }
}