<?php
/**
 * Created by PhpStorm.
 * User: artur
 * Date: 12/23/15
 * Time: 12:10 PM
 */

namespace AppBundle\Admin;

use Sonata\AdminBundle\Admin\Admin;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Route\RouteCollection;

class GoalMergeAdmin extends Admin
{
//    protected $baseRoutePattern = 'goal-manage';
//    protected $baseRouteName = 'goal-manage';

    /**
     * @param RouteCollection $collection
     */
    protected function configureRoutes(RouteCollection $collection)
    {
//        $collection->clearExcept(array('list'));
        $collection->add('merge');
    }

    # Override to add actions like delete, etc...
    public function getBatchActions()
    {
        // retrieve the default (currently only the delete action) actions
        $actions = parent::getBatchActions();

        // define calculate action
        $actions['merge']= array ('label'=> $this->trans('action_merge', array(),'SonataAdminBundle'),'ask_confirmation'=> true);


        return $actions;
    }

    // Fields to be shown on lists
    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper
            ->add('id', null, array('label'=>'admin.label.name.id'))
            ->add('title', null, array('label'=>'admin.label.name.author'))
            ->add('created', null, array('label'=>'admin.label.name.content'))
            ->add('updated', null, array('label'=>'admin.label.name.tags'))
            ->add('_action', 'actions', array(
                'actions' => array(
                    'merge' => array('template' => 'AppBundle:Admin:goal_merge_action.html.twig'),
                )
            ))
        ;
    }

    // Fields to be shown on filter forms
    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper
            ->add('id', null, array('label'=>'admin.label.name.id'))
            ->add('title', null, array('label'=>'admin.label.name.tag'))
        ;
    }

}