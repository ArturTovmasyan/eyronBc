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
            ->add('id')
            ->add('email')
            ->add('firstName')
            ->add('lastName')
        ;
    }

    // Fields to be shown on create/edit forms
    protected function configureFormFields(FormMapper $formMapper)
    {

        $formMapper
            ->add('email')
            ->add('plainPassword', 'repeated', array('first_name' => 'password',
                'required' => true,
                'second_name' => 'confirm',
                'type' => 'password',
                'invalid_message' => 'Passwords do not match',
                'first_options' => array('label' => 'Password'),
                'second_options' => array('label' => 'Repeat Password')))
            ->add('firstName')
            ->add('lastName')
        ;
    }

    // Fields to be shown on filter forms
    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper
            ->add('id')
            ->add('email')
            ->add('firstName')
            ->add('lastName')
            ;
        ;
    }

    // Fields to be shown on lists
    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper
            ->add('id', null, array('label' => 'Employee ID'))
            ->add('username')
            ->add('firstName')
            ->add('lastName')
            ->add('_action', 'actions', array(
                'actions' => array(
                    'show' => array(),
                    'edit' => array(),
                    'delete' => array(),
                )
            ))
        ;
    }

    /**
     * {@inheritdoc}
     */
    public function createQuery($context = 'list')
    {
        $query = parent::createQuery($context);
        $query->andWhere($query->getRootAliases()[0]. ".roles LIKE :roleAdmin or ". $query->getRootAliases()[0]. ".roles LIKE :roleSuper");
        $query->setParameter('roleAdmin', '%ROLE_SUPER_ADMIN%');
        $query->setParameter('roleSuper', '%ROLE_ADMIN%');
        return $query;
    }

    public function prePersist($object)
    {
        $object->addRole("ROLE_ADMIN");
        $object->addRole("ROLE_SUPER_ADMIN");
        $object->addRole("ROLE_SUPER_ADMIN");
    }
}