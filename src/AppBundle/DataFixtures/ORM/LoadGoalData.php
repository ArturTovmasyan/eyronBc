<?php
namespace AppBundle\DataFixtures\ORM;

use AppBundle\Entity\GoalImage;
use AppBundle\Entity\UserGoal;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use AppBundle\Entity\Goal;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Finder\Finder;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class LoadGoalData extends AbstractFixture implements OrderedFixtureInterface, ContainerAwareInterface
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
        // get user
        $user = $manager->getRepository('ApplicationUserBundle:User')->findOneByEmail('admin@admin.com');

        // create goal
        $goal1 = new Goal();
        $goal1->setDescription('goal1 goal1');
        $goal1->setTitle('goal1');
        $goal1->setStatus(1);
        $goal1->setVideoLink('www.google.com');
        $goal1->setAuthor($user);
        $goal1->setPublish(true);
        $manager->persist($goal1);

        // create goal
        $goal2 = new Goal();
        $goal2->setDescription('goal3 goal3');
        $goal2->setTitle('goal3');
        $goal2->setStatus(1);
        $goal2->setVideoLink('www.google.com');
        $goal2->setAuthor($user);
        $goal2->setPublish(true);
        $manager->persist($goal2);

        // create goal
        $userGoal1 = new UserGoal();
        $userGoal1->setUser($user);
        $userGoal1->setGoal($goal1);
        $userGoal1->setIsVisible(true);
        $userGoal1->setNote('aaaaa');
        $manager->persist($userGoal1);

        $oldPhotoPath = __DIR__ . '/old_photo.jpg';
        $photoPath = __DIR__ . '/photo.jpg';

        // copy photo path
        copy($oldPhotoPath, $photoPath);

        // new uploaded file
        $photo = new UploadedFile(
            $photoPath,
            'photo.jpg',
            'image/jpeg',
            123
        );
        $goalImage = new GoalImage();
        $goalImage->setGoal($goal1);
        $goalImage->setFile($photo);
        $goalImage->setFileName($photo->getClientOriginalName());
        $goalImage->setFileSize($photo->getSize());
        $goalImage->setFileOriginalName($photo->getFilename());
        $manager->persist($goalImage);



        $manager->flush();

        $this->addReference('goal1', $goal1);
        $this->addReference('goal2', $goal2);
        $this->addReference('userGoal1', $userGoal1);
        $this->addReference('goalImage', $goalImage);
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 2; // the order in which fixtures will be loaded
    }
}