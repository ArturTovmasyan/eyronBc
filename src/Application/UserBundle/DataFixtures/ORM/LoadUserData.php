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
        $user1 = new User();
        $user1->setFirstName('user1');
        $user1->setLastName('useryan');
        $user1->setEmail('user1@user.com');
        $user1->setEnabled(true);
        $user1->setPlainPassword('Test1234');
        $user1->setBirthDate(new \DateTime('now'));
        $user1->setRegistrationToken('a4b9e332d75ac0e99b54bf09d2de1dag');
        $user1->setCreated(new \DateTime('now'));
        $user1->setUserEmails(array('test@test.ru'=>
                                    array('userEmails'=>'test@test.ru',
                                        'token'=>'f1acf697a3a6477ec984b740701475d9',
                                        'primary'=>false))
        );

        $manager->persist($user1);

        // create user
        $user2 = new User();
        $user2->setFirstName('user2');
        $user2->setLastName('useryan');
        $user2->setEmail('user2@user.com');
        $user2->setEnabled(true);
        $user2->setPlainPassword('Test1234');
        $user2->setRegistrationToken('a4b9e332d75ac0e99b54bf09d2de1dagd');
        $user2->setCreated(new \DateTime('now')
        );

        $manager->persist($user2);

        // create user
        $user3 = new User();
        $user3->setFirstName('user3');
        $user3->setLastName('user3');
        $user3->setEmail('user@user.com');
        $user3->setEnabled(true);
        $user3->setPlainPassword('Test1234');
        $user3->setRegistrationToken('a4b9e332d75ac0e99b54bf09d2de1duid');
        $user3->setCreated(new \DateTime('now')
        );

        $manager->persist($user3);

        // create user
        $user4 = new User();
        $user4->setFirstName('user4');
        $user4->setLastName('user4');
        $user4->setEmail('user4@user.com');
        $user4->setEnabled(true);
        $user4->setPlainPassword('Test1234');
        $user4->setRegistrationToken('a4b9e332d75ac0e99b54bf09d2de1duqw');
        $user4->setCreated(new \DateTime('now')
        );

        $manager->persist($user4);

        // create user
        $user5 = new User();
        $user5->setFirstName('user5');
        $user5->setLastName('user5');
        $user5->setEmail('user5@user.com');
        $user5->setEnabled(true);
        $user5->setPlainPassword('Test1234');
        $user5->setRegistrationToken('a4b9e332d75ac0e99b54bf09d2de1dugh');
        $user5->setCreated(new \DateTime('now')
        );

        $manager->persist($user5);
        
        
        $manager->flush();

        $this->addReference('user', $user);
        $this->addReference('user1', $user1);
        $this->addReference('user2', $user2);
        $this->addReference('user3', $user3);
        $this->addReference('user4', $user4);
        $this->addReference('user5', $user5);
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 1; // the order in which fixtures will be loaded
    }
}