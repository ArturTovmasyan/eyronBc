<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 9/11/15
 * Time: 1:29 PM
 */

namespace AppBundle\Services;

use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\DependencyInjection\Container;


/**
 * Class BucketListService
 * @package AppBundle\Services
 */
class BucketListService
{
    /**
     * @var \Symfony\Component\DependencyInjection\Container
     */
    protected  $container;

    /**
     * @var
     */
    protected $em;

    /**
     * @param Container $container
     */
    public function __construct(Container $container)
    {
        $this->container = $container;
        $this->em = $container->get('doctrine')->getManager();
    }

    /**
     * This function is used to upload image
     *
     */

    /**
     * @param $object
     */
    public function uploadFile(&$object)
    {
        // the file property can be empty if the field is not required
        if (null == $object->getFile())
        {
            return;
        }
        // check file name
        if($object->getFileName()){
            // get file path
            $path = $object->getAbsolutePath() . $object->getFileName();
            // check file
            if(file_exists($path)){
                // remove file
                unlink($path);
            }
        }

        // get file originalName
        $object->setFileOriginalName($object->getFile()->getClientOriginalName());

        // get file
        $path_parts = pathinfo($object->getFile()->getClientOriginalName());

        // generate filename
        $object->setFileName(md5(microtime()) . '.' . $path_parts['extension']);

        // set size
        $object->setFileSize($object->getFile()->getClientSize());

        // upload file
        $object->getFile()->move($object->getAbsolutePath(), $object->getFileName());

        // set file to null
        $object->setFile(null);

        // get original file
        $file = $object->getAbsolutePath() . $object->getFileName() ;

        // create imagick for mobile image
        $im = new \Imagick($file);
        $im->resizeImage($this->container->getParameter('mobile')['with'], $this->container->getParameter('mobile')['height'],
            \Imagick::STYLE_NORMAL, 1, true);
        $mobileFile = $object->getAbsoluteMobilePath() . $object->getFileName();
        $im->writeImage( $mobileFile );

        // create imagick for tablet image
        $im = new \Imagick($file);
        $im->resizeImage($this->container->getParameter('tablet')['with'], $this->container->getParameter('tablet')['height'],
            \Imagick::STYLE_NORMAL, 1, true);
        $tabletFile = $object->getAbsoluteTabletPath() . $object->getFileName();
        $im->writeImage( $tabletFile );
    }
}