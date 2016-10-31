<?php
namespace AppBundle\DataFixtures\ORM;

use AppBundle\Entity\Blog;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class LoadBlogData extends AbstractFixture implements OrderedFixtureInterface, ContainerAwareInterface
{
    /**
     * @var ContainerInterface
     */
    private $container;

    /**
     * {@inheritDoc}
     */
    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;
    }

    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
        $goal1 = $this->getReference('goal1');

        $oldPhotoPath = __DIR__ . '/images/image1.jpg';
        $photoPath = __DIR__ . '/../../../../web/uploads/images/blogPhoto.jpg';

        // copy photo path
        copy($oldPhotoPath, $photoPath);

        // new uploaded file
        $photo = new UploadedFile(
            $photoPath,
            'photo.jpg',
            'image/jpeg'
        );

        $blog1 = new Blog();
        $blog1->setTitle('NEW BLOG');
        $blog1->setPosition(1);
        $blog1->setPublish(1);
        $blog1->setMetaDescription('Description for new blog!!!!!');
        $blog1->setFile($photo);
//        $blog1->setFileOriginalName('blogPhoto.jpg');
        $blog1->setData([['type' => Blog::TYPE_GOAL, 'content' => $goal1->getId()]]);

        $manager->persist($blog1);

        $manager->flush();
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 7; // the order in which fixtures will be loaded
    }
}