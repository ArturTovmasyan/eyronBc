<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 10/16/15
 * Time: 12:21 PM
 */

namespace AppBundle\Admin;

use Sonata\AdminBundle\Admin\Admin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Show\ShowMapper;

class PageAdmin extends Admin
{
    protected  $baseRouteName = 'admin-page';
    protected  $baseRoutePattern = 'admin-page';

    /**
     * @var bool
     */
    public $supportsPreviewMode = true;
    /**
     * @param string $name
     * @return null|string
     */
    public function getTemplate($name)
    {
        switch ($name) {
            case 'preview':
                return 'AppBundle:Admin:page_preview.html.twig';
                break;
            default:
                return parent::getTemplate($name);
                break;
        }
    }

    /**
     * @param \Sonata\AdminBundle\Show\ShowMapper $showMapper
     *
     * @return void
     */
    protected function configureShowFields(ShowMapper $showMapper)
    {
        $showMapper
            ->add('id')
            ->add('name')
            ->add('description')
            ->add('position')

        ;
    }

    // Fields to be shown on create/edit forms
    protected function configureFormFields(FormMapper $formMapper)
    {

        $names = $this->getConfigurationPool()->getContainer()->getParameter("pages");

        $formMapper
            ->add('name', 'choice', array(
                'choices' => $names,
                'empty_value' => 'Choose the name of page',
                'choices_as_values' => true,
                'choice_label' => function ($allChoices, $currentChoiceKey) {
                    return $allChoices;
                },
            ))
            ->add('description',  null, array('attr' => array('class' => 'tinymce')))
            ->add('position')
        ;
    }

    // Fields to be shown on filter forms
    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper
            ->add('id')
            ->add('name')
            ->add('description')
            ->add('position')
        ;
    }

    // Fields to be shown on lists
    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper
            ->add('id')
            ->add('name')
            ->add('description')
            ->add('position')
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