<?php

namespace AppBundle\Admin;

use AppBundle\Form\Type\BlMultipleBlogType;
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
    public $supportsPreviewMode = true;
    
    /**
     * @param string $name
     * @return mixed|null|string
     */
    public function getTemplate($name)
    {
        switch ($name) {
            case 'edit':
                return 'AppBundle:Admin:blog_edit.html.twig';
                break;
            case 'preview':
                return 'AppBundle:Admin:preview.html.twig';
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
        //get product id for edit
        $showMapper
            ->add('id', null, array('label'=>'admin.label.name.id'))
            ->add('title', null, array('label'=>'admin.label.name.title'))
            ->add('slug', null, array('label'=>'admin.label.name.slug'))
            ->add('publish', null, array('label'=>'admin.label.name.publish'))
            ->add('metaDescription', null, array('label'=>'admin.label.name.meta_description'))
            ->add('getImagePath', null, array('template'=>'AppBundle:Admin:blog_image_show.html.twig', 'label'=>'admin.label.name.images'))
            ->add('publishedDate', 'datetime', array('label'=>'admin.label.name.published_date'))
            ->add('updated', null)
        ;
    }

    // Fields to be shown on create/edit forms
    protected function configureFormFields(FormMapper $formMapper)
    {
        // get the current Image instance
        $image = $this->getSubject();

        // use $fileFieldOptions so we can add other options to the field
        $fileFieldOptions = array('label'=>'admin.label.name.images', 'required' => false);

        if ($image && ($webPath = $image->getDownloadLink())) {

            // get the container so the full path to the image can be set
            $container = $this->getConfigurationPool()->getContainer();
            $fullPath = $container->get('request')->getSchemeAndHttpHost().$webPath;

            // add a 'help' option containing the preview's img tag
            $fileFieldOptions['help'] = '<img src="'.$fullPath.'" class="admin-preview" />';
        }

        $formMapper
            // ... other fields ...
            ->add('file', 'file', $fileFieldOptions);

        $formMapper
            ->add('title', null, array('label'=>'admin.label.name.title'))
            ->add('publish', null, array('label'=>'admin.label.name.publish'))
            ->add('blog', 'sonata_type_model_autocomplete', array('label'=>'admin.label.name.blog', 'property'=>'title', 'multiple' => true, 'required' => false))
            ->add('metaDescription', 'textarea', array('label'=>'admin.label.name.meta_description'))
            ->add('publishedDate', 'sonata_type_date_picker', array('label'=>'admin.label.name.published_date', 'required'=>false))
            ->add('bl_multiple_blog', BlMultipleBlogType::class, array('label'=>'admin.label.name.blog_data'))
        ;
    }

    // Fields to be shown on filter forms
    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper
            ->add('id', null, array('label'=>'admin.label.name.id', 'show_filter' => true))
            ->add('title', null, array('label'=>'admin.label.name.title', 'show_filter' => true))
            ->add('publish', null, array('label'=>'admin.label.name.publish'))
            ->add('slug', null, array('label'=>'admin.label.name.slug', 'show_filter' => true))
            ->add('publishedDate', 'doctrine_orm_date_range', array('label' => 'admin.label.name.published_date'), 'sonata_type_date_range_picker',
                array('field_options_start'=>array('format'=>'yyyy-MM-dd'),
                    'field_options_end'=>array('format'=>'yyyy-MM-dd'))
            );
        ;
    }

    // Fields to be shown on lists
    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper
            ->add('id', null, array('label'=>'admin.label.name.id'))
            ->add('title', null, array('label'=>'admin.label.name.title'))
            ->add('slug', null, array('label'=>'admin.label.name.slug'))
            ->add('publish', null, array('editable' => true, 'label'=>'admin.label.name.publish'))
            ->add('publishedDate', 'datetime', array('label'=>'admin.label.name.published_date'))
            ->add('updated')
            ->add('created')
            ->add('getImagePath', null, array('template' => 'AppBundle:Admin:blog_image_list.html.twig', 'label'=>'admin.label.name.images'))
            ->add('_action', 'actions', array(
                'actions' => array(
                    'show' => array(),
                    'edit' => array(),
                    'delete' => array(),
                    'blog_link' => array('template' => 'AppBundle:Admin:blog_list_action_link.html.twig'),
                )
            )) ;
    }

    /**
     * @param mixed $object
     */
    public function prePersist($object)
    {
        //get container
        $container = $this->getConfigurationPool()->getContainer();

        //call upload file listener
        $container->get('bl_service')->uploadFile($object);
    }

    /**
     * @param mixed $object
     */
    public function preUpdate($object)
    {
        //get container
        $container = $this->getConfigurationPool()->getContainer();

        //call upload file listener
        $container->get('bl_service')->uploadFile($object);
    }
}