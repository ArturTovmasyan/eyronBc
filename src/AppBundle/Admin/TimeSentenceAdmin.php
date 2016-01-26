<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 9/9/15
 * Time: 7:43 PM
 */

namespace AppBundle\Admin;

use Sonata\AdminBundle\Admin\Admin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Show\ShowMapper;

/**
 * Class TimeSentenceAdmin
 * @package AppBundle\Admin
 */
class TimeSentenceAdmin extends Admin
{
    protected  $baseRouteName = 'admin-time-sentence';
    protected  $baseRoutePattern = 'admin-time-sentence';

    /**
     * @param \Sonata\AdminBundle\Show\ShowMapper $showMapper
     *
     * @return void
     */
    protected function configureShowFields(ShowMapper $showMapper)
    {
        $showMapper
            ->add('id', null, array('label'=>'admin.label.name.id'))
            ->add('content', null, array('label'=>'admin.label.name.content'))
            ->add('replaceString', null, array('label'=>'admin.label.name.replaceString'))
            ->add('replaceWith', null, array('label'=>'admin.label.name.replaceWith'))

        ;
    }

    // Fields to be shown on create/edit forms
    protected function configureFormFields(FormMapper $formMapper)
    {

        $formMapper
            ->add('content', 'textarea', array('label'=>'admin.label.name.content'))
            ->add('replaceString', null, array('label'=>'admin.label.name.replaceString'))
            ->add('replaceWith', null, array('label'=>'admin.label.name.replaceWith'))
        ;
    }

    // Fields to be shown on filter forms
    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper
            ->add('id', null, array('label'=>'admin.label.name.id'))
            ->add('content', null, array('label'=>'admin.label.name.content'))
            ->add('replaceString', null, array('label'=>'admin.label.name.replaceString'))
            ->add('replaceWith', null, array('label'=>'admin.label.name.replaceWith'))
        ;
    }

    // Fields to be shown on lists
    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper
            ->add('id', null, array('label'=>'admin.label.name.id'))
            ->add('content', null, array('label'=>'admin.label.name.content'))
            ->add('replaceString', null, array('label'=>'admin.label.name.replaceString'))
            ->add('replaceWith', null, array('label'=>'admin.label.name.replaceWith'))
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