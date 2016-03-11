<?php
namespace Application\UserBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Application\UserBundle\Entity\User;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

class LoadUserData extends AbstractFixture implements OrderedFixtureInterface, ContainerAwareInterface
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
        // create user
        $user = new User();
        $user->setFirstName('admin');
        $user->setLastName('adminyan');
        $user->setEmail('admin@admin.com');
        $user->setRoles(array('ROLE_SUPER_ADMIN'));
        $user->setEnabled(true);
        $user->setPlainPassword('Test1234');
        $user->setBirthDate(new \DateTime('now'));
        $user->setRegistrationToken('a4b9e332d75ac0e99b54bf09d2de1gad');
        $user->setCreated(new \DateTime('now'));
        $user->setUserEmails(array('admin1@test.ru'=>
                array('userEmails'=>'admin1@test.ru',
                    'token'=>'f1acf697a3a6477ec984b740701475d9',
                    'primary'=>false))
        );
        $manager->persist($user);

        // create user
        $user = new User();
        $user->setFirstName('user1');
        $user->setLastName('useryan');
        $user->setEmail('user1@user.com');
        $user->setEnabled(true);
        $user->setPlainPassword('Test1234');
        $user->setBirthDate(new \DateTime('now'));
        $user->setRegistrationToken('a4b9e332d75ac0e99b54bf09d2de1dag');
        $user->setCreated(new \DateTime('now'));
        $user->setUserEmails(array('test@test.ru'=>
                                    array('userEmails'=>'test@test.ru',
                                        'token'=>'f1acf697a3a6477ec984b740701475d9',
                                        'primary'=>false))
        );

        $manager->persist($user);

        // create user
        $user = new User();
        $user->setFirstName('user2');
        $user->setLastName('useryan');
        $user->setEmail('user2@user.com');
        $user->setEnabled(true);
        $user->setPlainPassword('Test1234');
        $user->setRegistrationToken('a4b9e332d75ac0e99b54bf09d2de1dagd');
        $user->setCreated(new \DateTime('now')
        );

        $manager->persist($user);

        $manager->flush();

        $this->addReference('user', $user);
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 1; // the order in which fixtures will be loaded
    }
}