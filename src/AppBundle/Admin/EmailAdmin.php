<?php

namespace AppBundle\Admin;

use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Show\ShowMapper;

class EmailAdmin extends AbstractAdmin
{
    /**
     * @param DatagridMapper $datagridMapper
     */
    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper
            ->add('id', null, ['label'=>'admin.label.name.id'])
            ->add('sent', null, ['label'=>'admin.label.name.sent'])
            ->add('seen', null, ['label'=>'admin.label.name.seen'])
            ->add('device', null, ['label'=>'admin.label.name.device'])
        ;
    }

    /**
     * @param ListMapper $listMapper
     */
    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper
            ->add('id', null, ['label'=>'admin.label.name.id'])
            ->add('sent', null, ['label'=>'admin.label.name.sent'])
            ->add('seen', null, ['label'=>'admin.label.name.seen'])
            ->add('device', null, ['label'=>'admin.label.name.device'])
            ->add('_action', null, [
                'actions' => [
                    'show' => [],
                    'edit' => [],
                    'delete' => [],
                ]
            ]
            )
        ;
    }

    /**
     * @param FormMapper $formMapper
     */
    protected function configureFormFields(FormMapper $formMapper)
    {
        $formMapper
            ->add('content', null, ['label'=>'admin.label.name.content'])
            ->add('sent', null, ['label'=>'admin.label.name.sent'])
            ->add('seen', null, ['label'=>'admin.label.name.seen'])
            ->add('device', null, ['label'=>'admin.label.name.device'])
        ;
    }

    /**
     * @param ShowMapper $showMapper
     */
    protected function configureShowFields(ShowMapper $showMapper)
    {
        $showMapper
            ->add('id', null, ['label'=>'admin.label.name.id'])
            ->add('content', null, ['label'=>'admin.label.name.content'])
            ->add('sent', null, ['label'=>'admin.label.name.sent'])
            ->add('seen', null, ['label'=>'admin.label.name.seen'])
            ->add('device', null, ['label'=>'admin.label.name.device'])
        ;
    }
}
