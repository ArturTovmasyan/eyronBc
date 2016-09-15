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
            ->add('place', 'text', array('label'=>'admin.label.name.place'))
            ->add('placeType', null, array('label'=>'admin.label.name.place_type'))
            ->add('userPlace', null, array('label'=>'admin.label.name.user_place'))
        ;
    }

    // Fields to be shown on create/edit forms
    protected function configureFormFields(FormMapper $formMapper)
    {

        $formMapper
            ->add('place', 'text', array('label'=>'admin.label.name.place'))
            ->add('placeType', null, array('label'=>'admin.label.name.place_type'))
        ;
    }

    // Fields to be shown on filter forms
    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper
//            ->add('id', null, array('label'=>'admin.label.name.id', 'show_filter' => true))
            ->add('place', null, array('label'=>'admin.label.name.place', 'show_filter' => true))
            ->add('placeType', null, array('label'=>'admin.label.name.place_type', 'show_filter' => true))
        ;
    }

    // Fields to be shown on lists
    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper
            ->add('id', null, array('label'=>'admin.label.name.id'))
            ->add('place', null, array('label'=>'admin.label.name.place'))
            ->add('placeType', null, array('label'=>'admin.label.name.place_type'))
            ->add('userPlace', null, array('label'=>'admin.label.name.user_place'))
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