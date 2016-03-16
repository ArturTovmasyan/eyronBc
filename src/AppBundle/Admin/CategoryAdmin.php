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
 * Class CategoryAdmin
 * @package AppBundle\Admin
 */
class CategoryAdmin extends Admin
{
    protected  $baseRouteName = 'admin-category';
    protected  $baseRoutePattern = 'admin-category';

    /**
     * @param \Sonata\AdminBundle\Show\ShowMapper $showMapper
     *
     * @return void
     */
    protected function configureShowFields(ShowMapper $showMapper)
    {
        $showMapper
            ->add('id', null, array('label'=>'admin.label.name.id'))
            ->add('title', null, array('label'=>'admin.label.name.title'))
            ->add('tags', null, array('label'=>'admin.label.name.tags'))
            ->add('downloadLink', null, array('template' => 'AppBundle:Admin:image_show.html.twig', 'label'=>'admin.label.name.downloadLink'))

        ;
    }

    // Fields to be shown on create/edit forms
    protected function configureFormFields(FormMapper $formMapper)
    {
        $formMapper
            ->add('translations', 'a2lix_translations_gedmo', array(
                'label'=>'admin.label.name.title',
                'translatable_class' => 'AppBundle\Entity\Category',
            ))
            ->add('tags', null, array('label'=>'admin.label.name.tags'))
            ->add('file', 'file', array('required' => false, 'label'=>'admin.label.name.file'))
        ;
    }

    protected $formOptions = array(
        'validation_groups' => array('logo')
    );

    // Fields to be shown on filter forms
    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper
            ->add('id', null, array('label'=>'admin.label.name.id'))
            ->add('title', null, array('label'=>'admin.label.name.title'))
            ->add('tags', null, array('label'=>'admin.label.name.tags'))
        ;
    }

    // Fields to be shown on lists
    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper
            ->add('id', null, array('label'=>'admin.label.name.id'))
            ->add('title', null, array('label'=>'admin.label.name.title'))
            ->add('tags', null, array('label'=>'admin.label.name.tags'))
            ->add('downloadLink', null, array('template' => 'AppBundle:Admin:image_list.html.twig', 'label'=>'admin.label.name.downloadLink'))
            ->add('_action', 'actions', array(
                'actions' => array(
                    'show' => array(),
                    'edit' => array(),
                    'delete' => array(),
                )
            ))
        ;
    }


    public function prePersist($object)
    {
        $this->preUpdate($object);
    }

    public function preUpdate($object)
    {
        $bucketService = $this->getConfigurationPool()->getContainer()->get('bl_service');
        $bucketService->uploadFile($object);
    }
}