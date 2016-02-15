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
        $goal1->setVideoLink(null);
        $goal1->setAuthor($user);
        $goal1->setPublish(true);
        $manager->persist($goal1);

        // create goal
        $goal2 = new Goal();
        $goal2->setDescription('goal3 goal3');
        $goal2->setTitle('goal3');
        $goal2->setStatus(1);
        $goal2->setVideoLink(null);
        $goal2->setAuthor($user);
        $goal2->setPublish(true);
        $manager->persist($goal2);

        // create goal
        $userGoal1 = new UserGoal();
        $userGoal1->setUser($user);
        $userGoal1->setGoal($goal1);
        $userGoal1->setIsVisible(true);
        $userGoal1->setNote('aaaaa');
        $userGoal1->setImportant(true);
        $userGoal1->setUrgent(true);
        $userGoal1->setDoDate(new \DateTime('now'));
        $manager->persist($userGoal1);

        // create goal
        $userGoal2 = new UserGoal();
        $userGoal2->setUser($user);
        $userGoal2->setGoal($goal2);
        $userGoal2->setIsVisible(true);
        $userGoal2->setNote('aaaaa');
        $userGoal2->setImportant(true);
        $userGoal2->setUrgent(true);
        $manager->persist($userGoal2);

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


        $oldPhotoPath2 = __DIR__ . '/old_photo2.jpg';
        $photoPath2 = __DIR__ . '/photo2.jpg';

        // copy photo path
        copy($oldPhotoPath2, $photoPath2);

        // new uploaded file
        $photo2 = new UploadedFile(
            $photoPath,
            'photo2.jpg',
            'image/jpeg',
            123
        );
        $goalImage2 = new GoalImage();
        $goalImage2->setGoal($goal1);
        $goalImage2->setFile($photo2);
        $goalImage2->setFileName($photo2->getClientOriginalName());
        $goalImage2->setFileSize($photo2->getSize());
        $goalImage2->setFileOriginalName($photo->getFilename());
        $manager->persist($goalImage2);



        $manager->flush();

        $this->addReference('goal1', $goal1);
        $this->addReference('goal2', $goal2);
        $this->addReference('userGoal1', $userGoal1);
        $this->addReference('userGoal2', $userGoal2);
        $this->addReference('goalImage', $goalImage);
        $this->addReference('goalImage2', $goalImage2);
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 2; // the order in which fixtures will be loaded
    }
}