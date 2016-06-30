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
            ->add('id', null, array('label' =>'Id'))
            ->add('email', null, array('label' => 'Email'))
            ->add('firstname', null, array('label'=>'First Name'))
            ->add('lastname', null, array('label' => 'Last Name'))
            ->add('picture', null, array('label' => 'Picture', 'template' => 'ApplicationUserBundle:Admin:user_show_picture.html.twig'))
            ->add('profile', null, array('label' => 'Profile','template' => 'ApplicationUserBundle:Admin:user_show_profile_link.html.twig'))
            ->add('userSocial', null, array('label' => 'User Social','template' => 'ApplicationUserBundle:Admin:user_social_icon_show.html.twig'))
            ->add('userMobileOs', null, array('label' => 'User Mobile OS','template' => 'ApplicationUserBundle:Admin:user_mobile_os_icon_show.html.twig'))
            ->add('enabled', null, array('label' => 'Enabled'))
            ->add('listedGoals', null, array('label' => 'Listed Goals', 'template' => 'ApplicationUserBundle:Admin:user_show_listed_goal_count.html.twig'))
            ->add('createdGoals', null, array('label' => 'Created Goals', 'template' => 'ApplicationUserBundle:Admin:user_show_created_goal.html.twig'))
            ->add('successStory count', null, array('label' => 'Success Story Count', 'template' => 'ApplicationUserBundle:Admin:user_show_goal_story.html.twig'))
            ->add('sex', null, array('label' => 'Sex'))
            ->add('lastLogin', null, array('label' => 'Last login'))
            ->add('createdAt', 'datetime', array('label' =>'Date of registration'))
        ;
    }

    // Fields to be shown on create/edit forms
    protected function configureFormFields(FormMapper $formMapper)
    {

        $formMapper
            ->add('email', null, array('label'=>'Email'))
            ->add('plainPassword', 'repeated', array('first_name' => 'password',
                'required' => true,
                'second_name' => 'confirm',
                'type' => 'password',
                'invalid_message' => 'Passwords do not match',
                'first_options' => array('label' => 'Password'),
                'second_options' => array('label' => 'Repeat Password')))
            ->add('firstname', null, array('label'=>'First Name'))
            ->add('lastname', null, array('label'=>'Last Name'))
            ->add('enabled', null, array('label'=>'Enabled'))
        ;
    }

    // Fields to be shown on filter forms
    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper
            ->add('id', null, array('label'=>'Id','show_filter' => true))
            ->add('email', null, array('label'=>'Email\Username','show_filter' => true))
            ->add('firstname', null, array('label'=>'First Name','show_filter' => true))
            ->add('lastname', null, array('label'=>'Last Name','show_filter' => true))
            ->add('createdAt','doctrine_orm_date_range', array('label' => 'Created', 'show_filter' => true), 'sonata_type_date_range_picker',
                array('field_options_start' => array('format' => 'yyyy-MM-dd'),
                      'field_options_end' => array('format' => 'yyyy-MM-dd'))
                );
    }

    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper
            ->add('id', null, array('label' => 'Employee ID'))
            ->add('username', null, array('label'=>'Username'))
            ->add('firstname', null, array('label'=>'First Name'))
            ->add('lastame', null, array('label'=>'Last Name'))
            ->add('userSocial', null, array('label'=>'User Social', 'template' => 'ApplicationUserBundle:Admin:user_social_icon.html.twig'))
            ->add('userMobileOs', null, array('label' => 'User Mobile OS','template' => 'ApplicationUserBundle:Admin:user_mobile_os_icon_list.html.twig'))
            ->add('enabled', null, array('label'=>'Enabled'))
            ->add('createdAt', 'datetime', array('label' => 'Created'))
            ->add('_action', 'actions', array(
                'label' => 'Actions',
                'actions' => array(
                    'show' => array(),
                    'edit' => array(),
                    'delete' => array(),
                    'pushNote' => array('template' => 'ApplicationUserBundle:Admin:test_message.html.twig'))
            ))
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