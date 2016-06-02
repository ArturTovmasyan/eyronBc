<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 10/21/15
 * Time: 5:24 PM
 */

namespace Application\UserBundle\Admin;

use Sonata\AdminBundle\Admin\Admin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Route\RouteCollection;
use Sonata\AdminBundle\Show\ShowMapper;
use Symfony\Component\HttpKernel\Exception\HttpException;

class UserAdmin extends Admin
{
    protected  $baseRouteName = 'admin-user';
    protected  $baseRoutePattern = 'admin-user';

    /**
     * @param \Sonata\AdminBundle\Show\ShowMapper $showMapper
     *
     * @return void
     */
    protected function configureShowFields(ShowMapper $showMapper)
    {
        $showMapper
            ->add('id', null, array('label'=>'admin.label.name.id'))
            ->add('email', null, array('label'=>'admin.label.name.email'))
            ->add('firstName', null, array('label'=>'admin.label.name.firstName'))
            ->add('lastName', null, array('label'=>'admin.label.name.lastName'))
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
        ;
    }

    // Fields to be shown on filter forms
    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper
            ->add('id', null, array('label'=>'admin.label.name.id'))
            ->add('email', null, array('label'=>'admin.label.name.email_username'))
            ->add('firstName', null, array('label'=>'admin.label.name.firstName'))
            ->add('lastName', null, array('label'=>'admin.label.name.lastName'))
            ->add('created', 'doctrine_orm_datetime_range', array('field_type'=>'sonata_type_datetime_range_picker'),null,
                array('widget' => 'single_text',
                      'format' => 'yyyy-MM-dd',
                      'required' => false)
            );
    }

    // Fields to be shown on lists
    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper
            ->add('id', null, array('label' => 'admin.label.name.employee_id'))
            ->add('username', null, array('label'=>'admin.label.name.username'))
            ->add('firstName', null, array('label'=>'admin.label.name.firstName'))
            ->add('lastName', null, array('label'=>'admin.label.name.lastName'))
            ->add('userSocial', null, array('template' => 'ApplicationUserBundle:Admin:user_social_icon.html.twig'))
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
        $user = $this->getConfigurationPool()->getContainer()->get('security.token_storage')->getToken()->getUser();

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
}