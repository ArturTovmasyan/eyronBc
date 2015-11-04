<?php
namespace AppBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use AppBundle\Entity\Goal;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

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
        $goal = new Goal();
        $goal->setDescription('goal1 goal1');
        $goal->setTitle('goal1');
        $goal->setStatus(1);
        $goal->setVideoLink('www.google.com');
        $goal->setAuthor($user);
        $manager->persist($goal);

        // create goal
        $goal = new Goal();
        $goal->setDescription('goal3 goal3');
        $goal->setTitle('goal3');
        $goal->setStatus(1);
        $goal->setVideoLink('www.google.com');
        $goal->setAuthor($user);
        $manager->persist($goal);

        $manager->flush();

        $this->addReference('goal', $goal);
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 2; // the order in which fixtures will be loaded
    }
}