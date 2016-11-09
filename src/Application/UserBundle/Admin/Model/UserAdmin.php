<?php
/**
 * Created by PhpStorm.
 * User: artur
 * Date: 28/06/2016
 * Time: 14:24 PM
 */

namespace Application\UserBundle\Admin\Model;

use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Route\RouteCollection;
use Sonata\AdminBundle\Show\ShowMapper;
use Symfony\Component\HttpKernel\Exception\HttpException;
use FOS\UserBundle\Model\UserManagerInterface;


class UserAdmin extends AbstractAdmin
{

    protected $baseRouteName    = 'admin-user';
    protected $baseRoutePattern = 'admin-user';
    public    $usersCount       = 0;

    /**
     * @param string $name
     * @return mixed|null|string
     */
    public function getTemplate($name)
    {
        switch ($name) {
            case 'list':
                return 'ApplicationUserBundle:Admin:user_list.html.twig';
                break;
            case 'show':
                return 'ApplicationUserBundle:Admin:user_show.html.twig';
                break;
            default:
                return parent::getTemplate($name);
                break;
        }
    }

    /**
     * @param \Sonata\AdminBundle\Show\ShowMapper $showMapper
     *
     * @return void
     */
    protected function configureShowFields(ShowMapper $showMapper)
    {
        $showMapper
            ->tab('General')
                ->with('User')
                    ->add('id', null, ['label' =>'Id'])
                    ->add('email', null, ['label' => 'Email'])
                    ->add('firstname', null, ['label'=>'First Name'])
                    ->add('lastname', null, ['label' => 'Last Name'])
                    ->add('picture', null, ['label' => 'Picture', 'template' => 'ApplicationUserBundle:Admin:user_show_picture.html.twig'])
                    ->add('profile', null, ['label' => 'Profile','template' => 'ApplicationUserBundle:Admin:user_show_profile_link.html.twig'])
                    ->add('userSocial', null, ['label' => 'User Social','template' => 'ApplicationUserBundle:Admin:user_social_icon_show.html.twig'])
                    ->add('userMobileOs', null, ['label' => 'User Mobile OS','template' => 'ApplicationUserBundle:Admin:user_mobile_os_icon_show.html.twig'])
                    ->add('enabled', null, ['label' => 'Enabled'])
                    ->add('listedGoals', null, ['label' => 'Listed Goals', 'template' => 'ApplicationUserBundle:Admin:user_show_listed_goal_count.html.twig'])
                    ->add('createdGoals', null, ['label' => 'Created Goals', 'template' => 'ApplicationUserBundle:Admin:user_show_created_goal.html.twig'])
                    ->add('successStory count', null, ['label' => 'Success Story Count', 'template' => 'ApplicationUserBundle:Admin:user_show_goal_story.html.twig'])
                    ->add('sex', null, ['label' => 'Sex'])
                    ->add('lastLogin', null, ['label' => 'Last login'])
                    ->add('createdAt', 'datetime', ['label' =>'Date of registration'])
                ->end()
            ->end()
            ->tab('Emails')
                ->with('Sent Emails')
                    ->add('sentEmails', null, ['label' => 'Sent Emails', 'template' => 'ApplicationUserBundle:Admin:user_emails.html.twig'])
                ->end()
            ->end()
        ;
    }

    // Fields to be shown on create/edit forms
    protected function configureFormFields(FormMapper $formMapper)
    {

        $formMapper
            ->add('email', null, ['label'=>'Email'])
            ->add('plainPassword', 'repeated', [
                'first_name' => 'password',
                'required' => true,
                'second_name' => 'confirm',
                'type' => 'password',
                'invalid_message' => 'Passwords do not match',
                'first_options' => ['label' => 'Password'],
                'second_options' => ['label' => 'Repeat Password']] )
            ->add('firstname', null, ['label'=>'First Name'])
            ->add('lastname', null, ['label'=>'Last Name'])
            ->add('enabled', null, ['label'=>'Enabled'])
        ;
    }

    // Fields to be shown on filter forms
    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        //disable listener for stats count
        $this->getConfigurationPool()->getContainer()->get('bl.doctrine.listener')->disableUserStatsLoading();

        $datagridMapper
            ->add('id', null, ['label'=>'Id','show_filter' => true])
            ->add('email', null, ['label'=>'Email\Username','show_filter' => true])
            ->add('firstname', null, ['label'=>'First Name','show_filter' => true])
            ->add('lastname', null, ['label'=>'Last Name','show_filter' => true])
            ->add('createdAt','doctrine_orm_date_range', ['label' => 'Created', 'show_filter' => true], 'sonata_type_date_range_picker',
                    [
                        'field_options_start' => ['format' => 'yyyy-MM-dd'],
                        'field_options_end' => ['format' => 'yyyy-MM-dd']
                    ]
                );
    }

    protected function configureListFields(ListMapper $listMapper)
    {

        $listMapper
            ->add('id', null, ['label' => 'Employee ID'])
            ->add('username', null, ['label'=>'Username'])
            ->add('firstname', null, ['label'=>'First Name'])
            ->add('lastname', null, ['label'=>'Last Name'])
            ->add('userSocial', null, ['label'=>'Social', 'template' => 'ApplicationUserBundle:Admin:user_social_icon.html.twig'])
            ->add('userMobileOs', null, ['label' => 'Mobile','template' => 'ApplicationUserBundle:Admin:user_mobile_os_icon_list.html.twig'])
            ->add('enabled', null, ['label'=>'Enabled'])
            ->add('createdAt', 'datetime', ['label' => 'Created'])
            ->add('_action', 'actions', [
                'label' => 'Actions',
                'actions' => [
                    'show' => [],
                    'edit' => [],
                    'delete' => [],
                    'pushNote' => ['template' => 'ApplicationUserBundle:Admin:test_message.html.twig']
                ]
            ]
            )
        ;
    }

    /**
     * {@inheritdoc}
     */
    public function createQuery($context = 'list')
    {
        $container = $this->getConfigurationPool()->getContainer();

        $user = $container->get('security.token_storage')->getToken()->getUser();
        $em = $container->get('doctrine')->getManager();
        $this->usersCount = $em->getRepository('ApplicationUserBundle:User')->findAllCount();

        $query = parent::createQuery($context);

        //check if user has ROLE_GOD
        if (!$user->hasRole('ROLE_GOD')) {

            $query->andWhere($query->getRootAliases()[0] . ".roles LIKE :roleAdmin or " . $query->getRootAliases()[0] . ".roles LIKE :roleSuper");
            $query->setParameter('roleAdmin', '%ROLE_SUPER_ADMIN%');
            $query->setParameter('roleSuper', '%ROLE_ADMIN%');
        }

        return $query;
    }

    public function prePersist($object)
    {
        $object->addRole("ROLE_ADMIN");
        $object->addRole("ROLE_SUPER_ADMIN");
    }

    /**
     * @param UserManagerInterface $userManager
     */
    public function setUserManager(UserManagerInterface $userManager)
    {
        $this->userManager = $userManager;
    }

    /**
     * @return UserManagerInterface
     */
    public function getUserManager()
    {
        return $this->userManager;
    }
}