<?php
/**
 * Created by PhpStorm.
 * User: andranik
 * Date: 2/16/16
 * Time: 4:35 PM
 */
namespace AppBundle\LiipFilters;

use Imagine\Filter\Basic\Crop;
use Imagine\Image\Box;
use Imagine\Image\ImageInterface;
use Imagine\Image\Point;
use Liip\ImagineBundle\Imagine\Filter\Loader\LoaderInterface;

class CentralCropFilterLoader implements LoaderInterface
{
    /**
     * @param ImageInterface $image
     * @param array $options
     * @return ImageInterface.
     */
    public function load(ImageInterface $image, array $options = array())
    {
        $size = $image->getSize();
        list($width, $height) = $options['size'];

        $x = ($size->getWidth() - $width) / 2;
        $y = ($size->getHeight() - $height) / 2;
        $filter = new Crop(new Point($x, $y), new Box($width, $height));
        $image = $filter->apply($image);

        return $image;
    }

}