<?php

namespace AppBundle\Admin;

use AppBundle\Entity\StoryImage;
use AppBundle\Form\StoryImageType;
use AppBundle\Form\Type\BlMultipleVideoType;
use AppBundle\Form\Type\StoryMultipleFileType;
use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Show\ShowMapper;
use Symfony\Component\Form\Extension\Core\Type\DateType;

class SuccessStoryAdmin extends AbstractAdmin
{
    protected $datagridValues = array(
        '_page' => 1,
        '_sort_order' => 'DESC',
        '_sort_by' => 'updated',
    );

    /**
     * @param DatagridMapper $datagridMapper
     */
    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper
            ->add('id')
            ->add('created', 'doctrine_orm_callback', array(
                'show_filter' => true,
                'callback' => function($queryBuilder, $alias, $field, $value) {
                    if (!$value['value']) {
                        return;
                    }

                    $queryBuilder
                        ->andWhere("DATE(" . $alias . ".created) = DATE(:value)")
                        ->setParameter('value', $value['value'])
                    ;

                    return true;
                },
                'label'=>'admin.label.name.created'
            ), 'date', array('widget' => 'single_text'))
            ->add('story')
        ;
    }

    /**
     * @param ListMapper $listMapper
     */
    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper
            ->add('id')
            ->add('created')
            ->add('updated')
            ->add('story')
            ->add('files', null, array('template' => 'AppBundle:Admin:success_story_image_list.html.twig'))
            ->add('_action', null, array(
                'actions' => array(
                    'show' => array(),
                    'edit' => array(),
                    'delete' => array(),
                    'goal_link' => array('template' => 'AppBundle:Admin:success_story_list_action_link.html.twig'),
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
            ->add('created', DateType::class, array('widget' => 'single_text'))
            ->add('updated', DateType::class, array('widget' => 'single_text'))
            ->add('story')
            ->add('videoLink', BlMultipleVideoType::class)
            ->add('files', StoryMultipleFileType::class)
        ;
    }

    /**
     * @param ShowMapper $showMapper
     */
    protected function configureShowFields(ShowMapper $showMapper)
    {
        $showMapper
            ->add('id')
            ->add('story_goal', null, array('template' => 'AppBundle:Admin:success_story_show_link.html.twig', 'mapped' => false))
            ->add('created')
            ->add('updated')
            ->add('story')
            ->add('files', null, array('template' => 'AppBundle:Admin:success_story_image_show.html.twig'))
            ->add('videoLink', null, array('template' => 'AppBundle:Admin:goal_video_show.html.twig'))
        ;
    }

    /**
     * @param mixed $object
     */
    public function preUpdate($object)
    {
        $videoLink = array_values($object->getVideoLink());
        $object->setVideoLink(array_filter($videoLink));

        $bucketService = $this->getConfigurationPool()->getContainer()->get('bl_service');
        $images = $object->getFiles();

        if($images) {
            foreach($images as $image) {
                if (!($image instanceof StoryImage)){
                    $object->removeFile($image);
                    continue;
                }

                $bucketService->uploadFile($image);
                $image->setStory($object);
            }
        }
    }

    /**
     * @param mixed $object
     */
    public function prePersist($object)
    {
        $this->preUpdate($object);
    }
}
