<?php
namespace AppBundle\DataFixtures\ORM;

use AppBundle\Entity\GoalImage;
use AppBundle\Entity\UserGoal;
use Application\CommentBundle\Entity\Comment;
use Application\CommentBundle\Entity\Thread;
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

        $user1 = $manager->getRepository('ApplicationUserBundle:User')->findOneByEmail('user1@user.com');

        $user2 = $manager->getRepository('ApplicationUserBundle:User')->findOneByEmail('user2@user.com');

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
        $goal2->setDescription('goal2 goal2');
        $goal2->setTitle('goal2');
        $goal2->setStatus(1);
        $goal2->setVideoLink(null);
        $goal2->setAuthor($user1);
        $goal2->setPublish(true);
        $manager->persist($goal2);

        // create goal
        $goal3 = new Goal();
        $goal3->setDescription('goal3 goal3');
        $goal3->setTitle('goal3');
        $goal3->setStatus(1);
        $goal3->setVideoLink(null);
        $goal3->setAuthor($user1);
        $goal3->setReadinessStatus(Goal::DRAFT);
        $goal3->setPublish(true);
        $manager->persist($goal3);

        // create goal
        $goal4 = new Goal();
        $goal4->setDescription('goal4 goal4');
        $goal4->setTitle('goal4');
        $goal4->setStatus(1);
        $goal4->setVideoLink(null);
        $goal4->setAuthor($user1);
        $goal4->setPublish(true);
        $manager->persist($goal4);

        // create goal
        $goal5 = new Goal();
        $goal5->setDescription('goal5 goal5');
        $goal5->setTitle('goal5');
        $goal5->setStatus(1);
        $goal5->setVideoLink(null);
        $goal5->setAuthor($user1);
        $goal5->setReadinessStatus(Goal::DRAFT);
        $goal5->setPublish(true);
        $manager->persist($goal5);

        // create goal
        $goal6 = new Goal();
        $goal6->setDescription('goal6 goal6');
        $goal6->setTitle('goal6');
        $goal6->setStatus(1);
        $goal6->setVideoLink(null);
        $goal6->setAuthor($user1);
        $goal6->setPublish(true);
        $manager->persist($goal6);

        // create goal
        $goal7 = new Goal();
        $goal7->setDescription('goal6 goal6');
        $goal7->setTitle('goal6');
        $goal7->setStatus(1);
        $goal7->setVideoLink(null);
        $goal7->setAuthor($user1);
        $goal7->setPublish(true);
        $manager->persist($goal7);


        // create goal
        $userGoal1 = new UserGoal();
        $userGoal1->setUser($user);
        $userGoal1->setGoal($goal1);
        $userGoal1->setIsVisible(true);
        $userGoal1->setNote('aaaaa');
        $userGoal1->setImportant(true);
        $userGoal1->setUrgent(false);
        $userGoal1->setDoDate(new \DateTime('now'));
        $manager->persist($userGoal1);

        // create goal
        $userGoal2 = new UserGoal();
        $userGoal2->setUser($user);
        $userGoal2->setGoal($goal2);
        $userGoal2->setIsVisible(true);
        $userGoal2->setNote('aaaaa');
        $userGoal2->setImportant(false);
        $userGoal2->setUrgent(true);
        $manager->persist($userGoal2);

        // create goal
        $userGoal3 = new UserGoal();
        $userGoal3->setUser($user1);
        $userGoal3->setGoal($goal3);
        $userGoal3->setIsVisible(true);
        $userGoal3->setNote('sfsdf');
        $userGoal3->setImportant(true);
        $userGoal3->setStatus(UserGoal::COMPLETED);
        $userGoal3->setUrgent(false);
        $manager->persist($userGoal3);

        // create goal
        $userGoal4 = new UserGoal();
        $userGoal4->setUser($user1);
        $userGoal4->setGoal($goal4);
        $userGoal4->setIsVisible(true);
        $userGoal4->setNote('goal4');
        $userGoal4->setImportant(false);
        $userGoal4->setUrgent(true);
        $userGoal4->setDoDate(new \DateTime('now'));
        $manager->persist($userGoal4);

        // create goal
        $userGoal5 = new UserGoal();
        $userGoal5->setUser($user1);
        $userGoal5->setGoal($goal7);
        $userGoal5->setIsVisible(true);
        $userGoal5->setNote('goal4');
        $userGoal5->setImportant(false);
        $userGoal5->setUrgent(false);
        $userGoal5->setDoDate(new \DateTime('now'));
        $manager->persist($userGoal5);

        // create goal
        $userGoal6 = new UserGoal();
        $userGoal6->setUser($user1);
        $userGoal6->setGoal($goal6);
        $userGoal6->setIsVisible(true);
        $userGoal6->setNote('goal6');
        $userGoal6->setImportant(true);
        $userGoal6->setUrgent(true);
        $userGoal6->setDoDate(new \DateTime('now'));
        $manager->persist($userGoal6);

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

        $manager->flush();


        $thread = new Thread();
        $thread->setId($goal6->getId());
        $thread->setPermalink("http://bucketlist.loc/app_behat.php/goal/goal6");
        $thread->setCommentable(true);
        $thread->setNumComments(3);
        $thread->setLastCommentAt(new \DateTime('now'));

        $manager->persist($thread);

        $comment = new Comment();
        $comment->setAuthor($user1);
        $comment->setBody("Comment1");
        $comment->setThread($thread);
        $manager->persist($comment);

        $comment = new Comment();
        $comment->setAuthor($user1);
        $comment->setBody("Comment1");
        $comment->setThread($thread);
        $manager->persist($comment);

        $comment = new Comment();
        $comment->setAuthor($user1);
        $comment->setBody("Comment2");
        $comment->setThread($thread);
        $manager->persist($comment);

        $comment = new Comment();
        $comment->setAuthor($user1);
        $comment->setBody("Comment3");
        $comment->setThread($thread);
        $manager->persist($comment);

        $comment = new Comment();
        $comment->setAuthor($user1);
        $comment->setBody("Comment4");
        $comment->setThread($thread);
        $manager->persist($comment);

        $comment = new Comment();
        $comment->setAuthor($user1);
        $comment->setBody("Comment5");
        $comment->setThread($thread);
        $manager->persist($comment);

        $manager->flush();

        $this->addReference('goal1', $goal1);
        $this->addReference('goal2', $goal2);
        $this->addReference('goal3', $goal3);
        $this->addReference('goal4', $goal4);
        $this->addReference('goal5', $goal5);
        $this->addReference('userGoal1', $userGoal1);
        $this->addReference('userGoal2', $userGoal2);
        $this->addReference('userGoal3', $userGoal3);
        $this->addReference('userGoal4', $userGoal4);
        $this->addReference('userGoal5', $userGoal5);
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