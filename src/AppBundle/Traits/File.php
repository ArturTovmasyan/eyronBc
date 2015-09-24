<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 9/8/15
 * Time: 3:37 PM
 */

namespace AppBundle\Traits;

use Symfony\Component\HttpFoundation\File\UploadedFile;


/**
 * Class File
 * @package AppBundle\Traits
 */
trait File
{
    /**
     * @Assert\File(
     *          maxSize="2000000",
     *          mimeTypes = {
     *              "image/png",
     *              "image/jpeg",
     *              "image/jpg",
     *              "image/gif",
     *          },
     *          mimeTypesMessage = "file.extension_error",
     *          maxSizeMessage = "file.size_error",
     * )
     */
    protected  $file;

    /**
     * @ORM\Column(name="file_original_name", type="string", length=255, nullable=true)
     */
    protected $fileOriginalName;

    /**
     * @ORM\Column(name="file_name", type="string", length=255, nullable=true)
     */
    protected $fileName;

    /**
     * @var integer
     *
     * @ORM\Column(name="file_size", type="integer", nullable=true)
     */
    protected $fileSize;

    /**
     * Sets file.
     *
     * @param UploadedFile $file
     */
    public function setFile(UploadedFile $file = null)
    {
        $this->file = $file;
    }

    /**
     * Get file.
     *
     * @return UploadedFile
     */
    public function getFile()
    {
        return $this->file;
    }

    /**
     * Set FileOriginalName
     *
     * @param string $fileOriginalName
     * @return $this
     */
    public function setFileOriginalName($fileOriginalName)
    {
        $this->fileOriginalName = $fileOriginalName;

        return $this;
    }

    /**
     * Get fileOriginalName
     *
     * @return string
     */
    public function getFileOriginalName()
    {
        return $this->fileOriginalName;
    }

    /**
     * Set fileName
     *
     * @param string $fileName
     * @return $this
     */
    public function setFileName($fileName)
    {
        $this->fileName = $fileName;

        return $this;
    }

    /**
     * Get fileName
     *
     * @return string
     */
    public function getFileName()
    {
        return $this->fileName;
    }

    /**
     * Set fileSize
     *
     * @param integer $fileSize
     * @return $this
     */
    public function setFileSize($fileSize)
    {
        $this->fileSize = $fileSize;

        return $this;
    }

    /**
     * Get fileSize
     *
     * @return integer
     */
    public function getFileSize()
    {
        return $this->fileSize;
    }

    /**
     * This function is used to return file web path
     *
     * @return string
     */
    public function getDownloadLink()
    {
        return '/' . $this->getUploadDir() . '/' . $this->getPath() . '/' . $this->fileName;
    }


    /**
     * This function is used to upload image
     *
     */
    public function uploadFile()
    {
        // the file property can be empty if the field is not required
        if (null == $this->getFile())
        {
            return;
        }
        // check file name
        if($this->getFileName()){
            // get file path
            $path = $this->getAbsolutePath() . $this->getFileName();
            // check file
            if(file_exists($path)){
                // remove file
                unlink($path);
            }
        }

        // get file originalName
        $this->fileOriginalName = $this->getFile()->getClientOriginalName();

        // get file
        $path_parts = pathinfo($this->getFile()->getClientOriginalName());

        // generate filename
        $this->fileName = md5(microtime()) . '.' . $path_parts['extension'];

        // set size
        $this->setFileSize($this->getFile()->getClientSize());

        // upload file
        $this->getFile()->move($this->getAbsolutePath(), $this->fileName);

        // set file to null
        $this->file = null;

        // get original file
        $file = $this->getAbsolutePath() . $this->fileName ;

        // create imagick for mobile image
        $im = new \Imagick($file);
        $im->resizeImage(10, 10, \Imagick::FILTER_LANCZOS, 1, true);
        $mobileFile = $this->getAbsoluteMobilePath() . $this->fileName;
        $im->writeImage( $mobileFile );

        // create imagick for tablet image
        $im = new \Imagick($file);
        $im->resizeImage(20, 20, \Imagick::FILTER_LANCZOS, 1, true);
        $tabletFile = $this->getAbsoluteTabletPath() . $this->fileName;
        $im->writeImage( $tabletFile );
    }


    /**
     * @return string
     */
    public function getAbsolutePath()
    {
        return $this->getUploadRootDir() . '/' . $this->getPath() .'/';
    }

    /**
     * @return string
     */
    public function getAbsoluteMobilePath()
    {
        return $this->getUploadRootDir() . '/' . $this->getMobilePath() .'/';
    }

    /**
     * @return string
     */
    public function getAbsoluteTabletPath()
    {
        return $this->getUploadRootDir() . '/' . $this->getTabletPath() .'/';
    }

    /**
     * This function is used to return file web path
     *
     * @return string
     */
    public function getUploadRootDir()
    {
        return __DIR__. '/../../../web/' . $this->getUploadDir();
    }

    /**
     * @return string
     */
    protected function getPath()
    {
        return 'files';
    }

    /**
     * @return string
     */
    protected function getTabletPath()
    {
        return 'tablet';
    }

    /**
     * @return string
     */
    protected function getMobilePath()
    {
        return 'mobile';
    }


    /**
     * Upload folder name
     *
     * @return string
     */
    protected function getUploadDir()
    {
        return 'uploads';
    }


    /**
     * @ORM\PreRemove
     */
    public function preRemove()
    {
        // get file path
        $filePath = $this->getAbsolutePath() . $this->getFileName();

        // check file and remove
        if (file_exists($filePath)){
            unlink($filePath);
        }
    }
}