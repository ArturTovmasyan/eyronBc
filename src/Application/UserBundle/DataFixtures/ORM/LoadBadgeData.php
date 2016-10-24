<?php
namespace Application\UserBundle\DataFixtures\ORM;

use Application\UserBundle\Entity\Badge;
use Application\UserBundle\Entity\Notification;
use Application\UserBundle\Entity\UserNotification;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Application\UserBundle\Entity\User;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

class LoadBadgeData extends AbstractFixture implements OrderedFixtureInterface, ContainerAwareInterface
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

        $badge1 = new Badge();
        $badge1->setScore(11);
        $badge1->setType(Badge::TYPE_INNOVATOR);
        $badge1->setUser($user1);
        $manager->persist($badge1);

        $badge2 = new Badge();
        $badge2->setScore(15);
        $badge2->setType(Badge::TYPE_MOTIVATOR);
        $badge2->setUser($user1);
        $manager->persist($badge2);

        $badge3 = new Badge();
        $badge3->setScore(21);
        $badge3->setType(Badge::TYPE_TRAVELLER);
        $badge3->setUser($user1);
        $manager->persist($badge3);

        $manager->flush();
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 6; // the order in which fixtures will be loaded
    }
}