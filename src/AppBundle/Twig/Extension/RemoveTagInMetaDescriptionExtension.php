<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 9/27/15
 * Time: 11:10 AM
 */

namespace AppBundle\Twig\Extension;

/**
 * Class RemoveTagInMetaDescriptionExtension
 * @package AppBundle\Twig\Extension
 */
 

class RemoveTagInMetaDescriptionExtension extends \Twig_Extension
{
    /**
     * @return array
     */
    public function getFilters()
    {
        return array(
            new \Twig_SimpleFilter('removeTagInMeta', array($this, 'removeTagInMeta'))
        );
    }

    /**
     * @param $text
     * @return mixed
     */
    public function removeTagInMeta($text)
    {
        //remove tag in text
        $content = str_replace('#', '',  $text);

        //remove html tag in text
        $content = strip_tags($content);

        return $content;
    }

    public function getName()
    {
        return 'bl_remove_tag_meta';
    }
}