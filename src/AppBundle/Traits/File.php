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
     * @Assert\Image(
     *     groups={"Registration", "Profile", "Default"},
     *     minWidth = 400,
     *     minHeight = 400,
     *     minWidthMessage = "file.width_extension",
     *     minHeightMessage = "file.height_extension",
     * )
     *
     * @Assert\Image(
     *     groups={"goal", "success_story"},
     *     minWidth = 640,
     *     minHeight = 640,
     *     mimeTypes = {
     *         "image/png",
     *              "image/jpeg",
     *              "image/jpg",
     *              "image/gif",
     *              "application/pdf",
     *              "application/x-pdf",
     *              "image/vnd-wap-wbmp"
     *          },
     *     minWidthMessage = "file.goal_image_width_extension",
     *     minHeightMessage = "file.goal_image_height_extension",
     *     mimeTypesMessage = "file.extension_error",
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
        // get origin file path
        $filePath = $this->getAbsolutePath() . $this->getFileName();

        // check file and remove
        if (file_exists($filePath)){
            unlink($filePath);
        }

        // get mobile file path
        $mobileFilePath = $this->getAbsoluteMobilePath() . $this->getFileName();

        // check file and remove
        if (file_exists($mobileFilePath)){
            unlink($mobileFilePath);
        }

        // get tablet file path
        $tabletFilePath = $this->getAbsoluteTabletPath() . $this->getFileName();

        // check file and remove
        if (file_exists($tabletFilePath)){
            unlink($tabletFilePath);
        }
    }
}