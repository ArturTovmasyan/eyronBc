<?php

namespace AppBundle\Admin;

use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Show\ShowMapper;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class BlogAdmin
 * @package AppBundle\Admin
 */

class BlogAdmin extends AbstractAdmin
{

    /**
     * @param \Sonata\AdminBundle\Show\ShowMapper $showMapper
     *
     * @return void
     */
    protected function configureShowFields(ShowMapper $showMapper)
    {
        //get product id for edit
        $showMapper
            ->add('id', null, array('label' => 'admin.label.name.id'))
            ->add('title', null, array('label'=>'admin.label.name.title'))
            ->add('slug', null, array('label'=>'admin.label.name.slug'))
        ;
    }

    // Fields to be shown on create/edit forms
    protected function configureFormFields(FormMapper $formMapper)
    {
        if ($this->id($this->getSubject())) {

            // EDIT
            //get product id for edit
            $edit = $this->getSubject()->getData();
            $type = array_keys($edit);
            $editData = reset($edit);

            $formMapper
                ->add('title', null, array('label'=>'admin.label.name.title'))
                ->add('type', 'choice', array('mapped' => false, 'choices' =>  ['text' => 'text', 'goal' => 'goal'],
                                              'data' => $type[0]))
                ->add('position', 'integer', array('mapped' => false, 'data' => $editData['position']))
                ->add('content', 'text', array('mapped' => false, 'data' => $editData['content']))
            ;
        }
        else {
            // CREATE
            $formMapper
                ->add('title', null, array('label'=>'admin.label.name.title'))
                ->add('type', 'choice', array('choices' => ['text' => 'text', 'goal' => 'goal'], 'mapped' => false))
                ->add('position', 'integer', array('mapped' => false))
                ->add('content', 'text', array('mapped' => false))
//                ->add('goal', 'genemu_jqueryselect2_entity', array(
//                    'mapped' => false,
//                    'class' => 'AppBundle\Entity\Goal',
//                    'property' => 'title',
//                    'placeholder' => 'Select goal'
//                ))
            ;
        }
    }

    // Fields to be shown on filter forms
    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper
            ->add('id', null, array('label'=>'admin.label.name.id', 'show_filter' => true))
            ->add('title', null, array('label'=>'admin.label.name.title'))
            ->add('slug', null, array('label'=>'admin.label.name.slug', 'show_filter' => true))
        ;
    }

    // Fields to be shown on lists
    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper
            ->add('id', null, array('label'=>'admin.label.name.id'))
            ->add('title', null, array('label'=>'admin.label.name.title'))
            ->add('slug', null, array('label'=>'admin.label.name.slug'))
            ->add('_action', 'actions', array(
                'actions' => array(
                    'show' => array(),
                    'edit' => array(),
                    'delete' => array(),
                )
            )) ;
    }

    /**
     * {@inheritdoc}
     */
    public function prePersist($object)
    {
        //get form data
        $type =  $this->getForm()->get('type')->getData();
        $position =  $this->getForm()->get('position')->getData();
        $content =  $this->getForm()->get('content')->getData();

        //generate blog data array
        $data = [$type => ['position' => $position, 'content' => $content]];

        //set blog data
        $object->setData($data);
    }

    /**
     * {@inheritdoc}
     */
    public function preUpdate($object)
    {
        $this->prePersist($object);
    }
}