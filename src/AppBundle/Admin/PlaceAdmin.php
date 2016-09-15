<?php

namespace AppBundle\Admin;

use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Show\ShowMapper;

/**
 * Class PlaceAdmin
 * @package AppBundle\Admin
 */
class PlaceAdmin extends AbstractAdmin
{
    /**
     * @param \Sonata\AdminBundle\Show\ShowMapper $showMapper
     *
     * @return void
     */
    protected function configureShowFields(ShowMapper $showMapper)
    {
        $showMapper
            ->add('id', null, array('label'=>'admin.label.name.id'))
            ->add('name', null, array('label'=>'admin.label.name.name'))
            ->add('placeType', null, array('label'=>'admin.label.name.type'))
        ;
    }

    // Fields to be shown on create/edit forms
    protected function configureFormFields(FormMapper $formMapper)
    {

        $formMapper
            ->add('name', null, array('label'=>'admin.label.name.name'))
            ->add('placeType', 'sonata_type_model_autocomplete', array('label'=>'admin.label.name.type', 'property' => 'name', 'multiple' => false, 'required' => true))
        ;
    }

    // Fields to be shown on filter forms
    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper
            ->add('id', null, array('label'=>'admin.label.name.id', 'show_filter' => true))
            ->add('name', null, array('label'=>'admin.label.name.name', 'show_filter' => true))
            ->add('placeType.name', null, array('label'=>'admin.label.name.type', 'show_filter' => true))
        ;
    }

    // Fields to be shown on lists
    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper
            ->add('id', null, array('label'=>'admin.label.name.id'))
            ->add('name', null, array('label'=>'admin.label.name.name'))
            ->add('placeType.name', 'text', array('label'=>'admin.label.name.type'))
            ->add('_action', 'actions', array(
                'actions' => array(
                    'show' => array(),
                    'edit' => array(),
                    'delete' => array(),
                )
            ))
        ;
    }
}