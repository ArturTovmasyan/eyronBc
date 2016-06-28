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
//    protected $translationDomain = 'messages'; // default is 'messages'
    protected $baseRouteName    = 'admin-user';
    protected $baseRoutePattern = 'admin-user';
    public    $usersCount       = 0;

    /**
     * @param \Sonata\AdminBundle\Show\ShowMapper $showMapper
     *
     * @return void
     */
    protected function configureShowFields(ShowMapper $showMapper)
    {
        $showMapper
            ->add('id', null, array('label' =>'admin.label.name.id'))
            ->add('email', null, array('label' => 'admin.label.name.email'))
            ->add('firstName', null, array('label'=>'admin.label.name.firstName'))
            ->add('lastName', null, array('label' => 'admin.label.name.lastName'))
            ->add('picture', null, array('template' => 'ApplicationUserBundle:Admin:user_show_picture.html.twig'))
            ->add('profile', null, array('template' => 'ApplicationUserBundle:Admin:user_show_profile_link.html.twig'))
            ->add('userSocial', null, array('template' => 'ApplicationUserBundle:Admin:user_social_icon_show.html.twig'))
            ->add('enabled', null, array('label'=>'admin.label.name.enabled'))
            ->add('listedGoals', null, array('template' => 'ApplicationUserBundle:Admin:user_show_listed_goal_count.html.twig'))
            ->add('createdGoals', null, array('template' => 'ApplicationUserBundle:Admin:user_show_created_goal.html.twig'))
            ->add('successStory count', null, array('template' => 'ApplicationUserBundle:Admin:user_show_goal_story.html.twig'))
            ->add('sex', null, array('label' => 'Sex'))
            ->add('lastLogin', null, array('label' => 'Last login'))
            ->add('created', 'datetime', array('label' =>'Date of registration'))
        ;
    }

    // Fields to be shown on create/edit forms
    protected function configureFormFields(FormMapper $formMapper)
    {

        $formMapper
            ->add('email', null, array('label'=>'admin.label.name.email'))
            ->add('plainPassword', 'repeated', array('first_name' => 'password',
                'required' => true,
                'second_name' => 'confirm',
                'type' => 'password',
                'invalid_message' => 'Passwords do not match',
                'first_options' => array('label' => 'admin.label.name.password'),
                'second_options' => array('label' => 'admin.label.name.repeat_password')))
            ->add('firstName', null, array('label'=>'admin.label.name.firstName'))
            ->add('lastName', null, array('label'=>'admin.label.name.lastName'))
            ->add('enabled', null, array('label'=>'admin.label.name.enabled'))
        ;
    }

    // Fields to be shown on filter forms
    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper
            ->add('id', null, array('label'=>'admin.label.name.id','show_filter' => true))
            ->add('email', null, array('label'=>'admin.label.name.email_username','show_filter' => true))
            ->add('firstName', null, array('label'=>'admin.label.name.firstName','show_filter' => true))
            ->add('lastName', null, array('label'=>'admin.label.name.lastName','show_filter' => true))
            ->add('created','doctrine_orm_date_range', array('show_filter' => true),'sonata_type_date_range_picker',
                array('field_options_start' => array('format' => 'yyyy-MM-dd'),
                      'field_options_end' => array('format' => 'yyyy-MM-dd'))
                );
    }

    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper
            ->add('id', null, array('label' => 'admin.label.name.employee_id'))
            ->add('username', null, array('label'=>'admin.label.name.username'))
            ->add('firstName', null, array('label'=>'admin.label.name.firstName'))
            ->add('lastName', null, array('label'=>'admin.label.name.lastName'))
            ->add('userSocial', null, array('template' => 'ApplicationUserBundle:Admin:user_social_icon.html.twig'))
            ->add('enabled', null, array('label'=>'admin.label.name.enabled'))
            ->add('created', 'datetime', array('label' => 'admin.label.name.created'))
            ->add('_action', 'actions', array(
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