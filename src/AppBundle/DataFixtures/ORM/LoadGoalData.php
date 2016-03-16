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
        // get users
        $user = $this->getReference('user');
        $user1 = $this->getReference('user1');
//        $user2 = $this->getReference('user2');

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
        $goal7->setDescription('goal7 goal7');
        $goal7->setTitle('goal7');
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

        $oldPhotoPath = __DIR__ . '/images/leon.jpg';
        $photoPath = __DIR__ . '/../../../../web/uploads/images/photo.jpg';

        // copy photo path
        copy($oldPhotoPath, $photoPath);

        // new uploaded file
        $photo = new UploadedFile(
            $photoPath,
            'photo.jpg',
            'image/jpeg'
        );

        $goalImage = new GoalImage();
        $goalImage->setGoal($goal1);
        $goal1->addImage($goalImage);
        $goalImage->setFile($photo);
        $goalImage->setFileName($photo->getClientOriginalName());
        $goalImage->setFileSize($photo->getSize());
        $goalImage->setFileOriginalName($photo->getFilename());

        $manager->persist($goalImage);


        $oldPhotoPath2 = __DIR__ . '/images/image.jpg';
        $photoPath2 = __DIR__ . '/../../../../web/uploads/images/photo2.jpg';

        // copy photo path
        copy($oldPhotoPath2, $photoPath2);

        // new uploaded file
        $photo2 = new UploadedFile(
            $photoPath2,
            'photo2.jpg',
            'image/jpeg'
        );

        $goalImage2 = new GoalImage();
        $goalImage2->setGoal($goal2);
        $goal2->addImage($goalImage2);
        $goalImage2->setFile($photo2);
        $goalImage2->setFileName($photo2->getClientOriginalName());
        $goalImage2->setFileSize($photo2->getSize());
        $goalImage2->setFileOriginalName($photo2->getFilename());

        $manager->persist($goalImage2);


        $oldPhotoPath3 = __DIR__ . '/images/image1.jpg';
        $photoPath3 = __DIR__ . '/../../../../web/uploads/images/photo3.jpg';

        // copy photo path
        copy($oldPhotoPath3, $photoPath3);

        // new uploaded file
        $photo3 = new UploadedFile(
            $photoPath3,
            'photo3.jpg',
            'image/jpeg'
        );

        $goalImage3 = new GoalImage();
        $goalImage3->setGoal($goal3);
        $goalImage3->setFile($photo3);
        $goal3->addImage($goalImage3);
        $goalImage3->setFileName($photo3->getClientOriginalName());
        $goalImage3->setFileSize($photo3->getSize());
        $goalImage3->setFileOriginalName($photo3->getFilename());

        $manager->persist($goalImage3);

        $oldPhotoPath4 = __DIR__ . '/images/image2.jpg';
        $photoPath4 = __DIR__ . '/../../../../web/uploads/images/photo4.jpg';

        // copy photo path
        copy($oldPhotoPath4, $photoPath4);

        // new uploaded file
        $photo4 = new UploadedFile(
            $photoPath4,
            'photo4.jpg',
            'image/jpeg'
        );

        $goalImage4 = new GoalImage();
        $goalImage4->setGoal($goal4);
        $goalImage4->setFile($photo4);
        $goal4->addImage($goalImage4);
        $goalImage4->setFileName($photo4->getClientOriginalName());
        $goalImage4->setFileSize($photo4->getSize());
        $goalImage4->setFileOriginalName($photo4->getFilename());

        $manager->persist($goalImage4);

        $oldPhotoPath5 = __DIR__ . '/images/image3.jpg';
        $photoPath5 = __DIR__ . '/../../../../web/uploads/images/photo5.jpg';

        // copy photo path
        copy($oldPhotoPath5, $photoPath5);

        // new uploaded file
        $photo5 = new UploadedFile(
            $photoPath5,
            'photo5.jpg',
            'image/jpeg'
        );

        $goalImage5 = new GoalImage();
        $goalImage5->setGoal($goal5);
        $goalImage5->setFile($photo5);
        $goal5->addImage($goalImage5);
        $goalImage5->setFileName($photo5->getClientOriginalName());
        $goalImage5->setFileSize($photo5->getSize());
        $goalImage5->setFileOriginalName($photo5->getFilename());

        $manager->persist($goalImage5);

        $oldPhotoPath6 = __DIR__ . '/images/image4.jpg';
        $photoPath6 = __DIR__ . '/../../../../web/uploads/images/photo6.jpg';

        // copy photo path
        copy($oldPhotoPath6, $photoPath6);

        // new uploaded file
        $photo6 = new UploadedFile(
            $photoPath6,
            'photo6.jpg',
            'image/jpeg'
        );

        $goalImage6 = new GoalImage();
        $goalImage6->setGoal($goal6);
        $goalImage6->setFile($photo6);
        $goal6->addImage($goalImage6);
        $goalImage6->setFileName($photo6->getClientOriginalName());
        $goalImage6->setFileSize($photo6->getSize());
        $goalImage6->setFileOriginalName($photo6->getFilename());

        $manager->persist($goalImage6);


        $oldPhotoPath7 = __DIR__ . '/images/image5.jpg';
        $photoPath7 = __DIR__ . '/../../../../web/uploads/images/photo7.jpg';

        // copy photo path
        copy($oldPhotoPath7, $photoPath7);

        // new uploaded file
        $photo7 = new UploadedFile(
            $photoPath7,
            'photo7.jpg',
            'image/jpeg'
        );

        $goalImage7 = new GoalImage();
        $goalImage7->setGoal($goal6);
        $goalImage7->setFile($photo7);
        $goal7->addImage($goalImage7);
        $goalImage7->setFileName($photo7->getClientOriginalName());
        $goalImage7->setFileSize($photo7->getSize());
        $goalImage7->setFileOriginalName($photo7->getFilename());

        $manager->persist($goalImage7);

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