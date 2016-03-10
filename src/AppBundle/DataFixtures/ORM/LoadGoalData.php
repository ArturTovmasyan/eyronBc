<?php
namespace AppBundle\DataFixtures\ORM;

use AppBundle\Entity\Category;
use AppBundle\Entity\GoalImage;
use AppBundle\Entity\Tag;
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
        $goalImage2->setGoal($goal2);
        $goalImage2->setFile($photo2);
        $goalImage2->setFileName($photo2->getClientOriginalName());
        $goalImage2->setFileSize($photo2->getSize());
        $goalImage2->setFileOriginalName($photo->getFilename());
        $manager->persist($goalImage2);

        $category1 = new Category();
        $category1->setTitle('Travel');
        $manager->persist($category1);

        $category2 = new Category();
        $category2->setTitle('Adventure');
        $manager->persist($category2);

        $category3 = new Category();
        $category3->setTitle('Experience');
        $manager->persist($category3);

        $category4 = new Category();
        $category4->setTitle('New Skills');
        $manager->persist($category4);

        $category5 = new Category();
        $category5->setTitle('Wellness');
        $manager->persist($category5);

        $category6 = new Category();
        $category6->setTitle('Social');
        $manager->persist($category6);

        $category7 = new Category();
        $category7->setTitle('Personal');
        $manager->persist($category7);


        $tag1 = new Tag();
        $tag1->setTag('adventure');
        $tag1->addCategory($category1);
        $tag1->addCategory($category2);
        $manager->persist($tag1);

        $tag2 = new Tag();
        $tag2->setTag('travel');
        $tag2->addCategory($category1);
        $manager->persist($tag2);

        $tag3 = new Tag();
        $tag3->setTag('experience');
        $tag3->addCategory($category3);
        $manager->persist($tag3);

        $tag4 = new Tag();
        $tag4->setTag('newskills');
        $tag4->addCategory($category4);
        $manager->persist($tag3);

        $tag5 = new Tag();
        $tag5->setTag('wellness');
        $tag5->addCategory($category5);
        $manager->persist($tag3);

        $tag6 = new Tag();
        $tag6->setTag('social');
        $tag6->addCategory($category6);
        $manager->persist($tag3);

        $tag7 = new Tag();
        $tag7->setTag('personal');
        $tag7->addCategory($category7);
        $manager->persist($tag3);

        $manager->flush();

        $this->addReference('goal1', $goal1);
        $this->addReference('goal2', $goal2);
        $this->addReference('userGoal1', $userGoal1);
        $this->addReference('userGoal2', $userGoal2);
        $this->addReference('goalImage', $goalImage);
        $this->addReference('goalImage2', $goalImage2);
        $this->addReference('tag1', $tag1);
        $this->addReference('tag2', $tag2);
        $this->addReference('tag3', $tag3);
        $this->addReference('tag4', $tag4);
        $this->addReference('tag5', $tag5);
        $this->addReference('tag6', $tag6);
        $this->addReference('tag7', $tag7);
        $this->addReference('category1', $category1);
        $this->addReference('category2', $category2);
        $this->addReference('category3', $category3);
        $this->addReference('category4', $category4);
        $this->addReference('category5', $category5);
        $this->addReference('category6', $category6);
        $this->addReference('category7', $category7);
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 2; // the order in which fixtures will be loaded
    }
}