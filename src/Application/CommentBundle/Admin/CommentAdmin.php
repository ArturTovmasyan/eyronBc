<?php

namespace Application\CommentBundle\Admin;

use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Show\ShowMapper;

class CommentAdmin extends AbstractAdmin
{
    /**
     * @param DatagridMapper $datagridMapper
     */
    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper
            ->add('body')
            ->add('ancestors')
            ->add('depth')
            ->add('createdAt')
            ->add('state')
            ->add('id')
        ;
    }

    /**
     * @param ListMapper $listMapper
     */
    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper
            ->add('body')
            ->add('ancestors')
            ->add('depth')
            ->add('createdAt')
            ->add('state')
            ->add('id')
            ->add('_action', null, array(
                'actions' => array(
                    'show' => array(),
                    'edit' => array(),
                    'delete' => array(),
                )
            ))
        ;
    }

    /**
     * @param FormMapper $formMapper
     */
    protected function configureFormFields(FormMapper $formMapper)
    {
        $formMapper
            ->add('body')
            ->add('ancestors')
            ->add('depth')
            ->add('createdAt')
            ->add('state')
            ->add('id')
        ;
    }

    /**
     * @param ShowMapper $showMapper
     */
    protected function configureShowFields(ShowMapper $showMapper)
    {
        $showMapper
            ->add('body')
            ->add('ancestors')
            ->add('depth')
            ->add('createdAt')
            ->add('state')
            ->add('id')
        ;
    }
}
