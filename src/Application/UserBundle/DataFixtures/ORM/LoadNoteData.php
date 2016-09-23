<?php
namespace Application\UserBundle\DataFixtures\ORM;

use Application\UserBundle\Entity\Notification;
use Application\UserBundle\Entity\UserNotification;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Application\UserBundle\Entity\User;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

class LoadNoteData extends AbstractFixture implements OrderedFixtureInterface, ContainerAwareInterface
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
        $user1 = $this->getReference('user1');

        $userNot = new UserNotification();
        $userNot->setIsRead(false);
        $userNot->setUser($user1);
        $manager->persist($userNot);

        // create user
        $note = new Notification();
        $note->setBody('TEST NOTE');
        $note->setGoalId(1);
        $note->addUserNotification($userNot);
        $note->setLink('/goal/goal9');

        $manager->persist($note);

        $userNot->setNotification($note);
        $manager->persist($userNot);

        $manager->flush();

    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 5; // the order in which fixtures will be loaded
    }
}