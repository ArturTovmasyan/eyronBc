<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 9/24/15
 * Time: 1:53 PM
 */


namespace AppBundle\Admin;

use AppBundle\Entity\Goal;
use AppBundle\Entity\GoalImage;
use AppBundle\Entity\Tag;
use AppBundle\Form\GoalImageType;
use AppBundle\Model\PublishAware;
use Sonata\AdminBundle\Admin\Admin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Show\ShowMapper;

/**
 * Class CategoryAdmin
 * @package AppBundle\Admin
 */
class GoalAdmin extends Admin
{
    protected $formOptions = array(
        'validation_groups' => array('goal')
    );

    protected  $baseRouteName = 'admin-goal';
    protected  $baseRoutePattern = 'admin-goal';

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
            ->add('description', null, array('label'=>'admin.label.name.description'))
            ->add('videoLink', null, array('template' => 'AppBundle:Admin:goal_video_show.html.twig', 'label'=>'admin.label.name.videoLink'))
            ->add('tags', null, array('label'=>'admin.label.name.tags'))
            ->add('images', null, array('template' => 'AppBundle:Admin:goal_image_show.html.twig', 'label'=>'admin.label.name.images'))
        ;
    }

    // Fields to be shown on create/edit forms
    protected function configureFormFields(FormMapper $formMapper)
    {

        $formMapper
            ->add('title', null, array('required' => true, 'label'=>'admin.label.name.title'))
            ->add('description', 'textarea', array('required' => false, 'label'=>'admin.label.name.description', 'attr' => array('class' => 'tinymce')))
            ->add('rawLocation', 'bl_location', array('label' => false))
            ->add('videoLink', 'bl_multiple_video', array('label' => false))
            ->add('tags', null, array('label'=>'admin.label.name.tags'))
            ->add('bl_multiple_file', 'bl_multiple_file', array('label'=>'admin.label.name.images', 'required' => false));
    }

    // Fields to be shown on filter forms
    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper
            ->add('id', null, array('label'=>'admin.label.name.id'))
            ->add('publish', null, array('label'=>'admin.label.name.publish'))
            ->add('title', null, array('label'=>'admin.label.name.title'))
            ->add('description', null, array('label'=>'admin.label.name.description'))
            ->add('videoLink', null, array('label'=>'admin.label.name.videoLink'))
            ->add('tags', null, array('label'=>'admin.label.name.tags'))
            ->add('created', 'doctrine_orm_callback', array(
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
        ;
    }

    // Fields to be shown on lists
    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper
            ->add('id', null, array('label'=>'admin.label.name.id'))
            ->add('publish', null, array('editable' => true, 'label'=>'admin.label.name.publish'))
            ->add('title', null, array('label'=>'admin.label.name.title'))
            ->add('description', null, array('label'=>'admin.label.name.description'))
            ->add('getListPhoto', null, array('template' => 'AppBundle:Admin:goal_image_list.html.twig', 'label'=>'admin.label.name.getListPhoto'))
            ->add('videoLink', null, array('template' => 'AppBundle:Admin:goal_video_list.html.twig', 'label'=>'admin.label.name.videoLink'))
            ->add('tags', null, array('label'=>'admin.label.name.tags'))
            ->add('created', null, array('label'=>'admin.label.name.created'))
            ->add('_action', 'actions', array(
                'actions' => array(
                    'show' => array('template' => 'AppBundle:Admin:goal_list_action_delete.html.twig'),
                    'edit' => array('template' => 'AppBundle:Admin:goal_list_action_edit.html.twig'),
                    'delete' => array('template' => 'AppBundle:Admin:goal_list_action_show.html.twig'),
                    'goal_link' => array('template' => 'AppBundle:Admin:goal_list_action_link.html.twig'),
                )
            ))
        ;
    }

    /**
     * {@inheritdoc}
     */
    public function prePersist($object)
    {
        $object->setPublish(PublishAware::PUBLISH);
        $object->setStatus(Goal::PUBLIC_PRIVACY);
        $this->preUpdate($object);
    }

    /**
     * {@inheritdoc}
     */
    public function preUpdate($object)
    {
        // get current user
        $user = $this->getConfigurationPool()->getContainer()->get('security.context')->getToken()->getUser();

        $object->setEditor($user);
        $object->setReadinessStatus(Goal::TO_PUBLISH);

        $this->getAndAddTags($object);
        $this->addImages($object);

        if ($videoLinks = $object->getVideoLink()){
            $videoLinks = array_values($videoLinks);
            $videoLinks = array_filter($videoLinks);

            $object->setVideoLink($videoLinks);
        }
    }

    /**
     * @param $object
     */
    private function getAndAddTags($object)
    {
        // get container
        $container =  $this->getConfigurationPool()->getContainer();

        // get entity manager
        $em = $container->get('doctrine')->getEntityManager();

        // get content
        $content = $object->getDescription();

        // get tags from description
        $tags = $this->getHashTags($content);

        // check tags
        if($tags){

            // get tags from db
            $dbTags = $em->getRepository("AppBundle:Tag")->getTagTitles();

            // get new tags
            $newTags = array_diff($tags, $dbTags);

            // tags that is already exist in database
            $existTags = array_diff($tags, $newTags);

            // get tags from database
            $oldTags = $em->getRepository("AppBundle:Tag")->findTagsByTitles($existTags);

            // loop for array
            foreach($newTags as $tagString){

                // create new tag
                $tag = new Tag();

                $title = strtolower($tagString);

                // replace ',' symbols
                $title = str_replace(',', '', $title);

                // replace ':' symbols
                $title = str_replace(':', '', $title);

                // replace '.' symbols
                $title = str_replace('.', '', $title);

                // set tag title
                $tag->setTag($title);

                // add tag
                $object->addTag($tag);

                // persist tag
                $em->persist($tag);

            }

            // loop for tags n database
            foreach($oldTags as $oldTag){

                // check tag in collection
                if(!$object->getTags() || !$object->getTags()->contains($oldTag)){

                    // add tag
                    $object->addTag($oldTag);

                    // persist tag
                    $em->persist($oldTag);
                }
            }

            $em->flush();

        }
    }

    /**
     * @param $text
     * @return mixed
     */
    private function getHashTags($text)
    {
        // get description
        $content = strtolower($text);

        // get hash tags
        preg_match_all("/#(\w+)/", $content, $hashTags);

        // return hash tags
        return $hashTags[1];
    }

    /**
     * @param $object
     */
    private function addImages($object)
    {
        $bucketService = $this->getConfigurationPool()->getContainer()->get('bl_service');

        //get images
        $images = $object->getImages();

        // check images
        if($images) {

            // loop for images
            foreach($images as $image) {
                if (!($image instanceof GoalImage)){
                    $object->removeImage($image);
                    continue;
                }

                // upload file

                $bucketService->uploadFile($image);
                $image->setGoal($object);
            }
        }
    }

    public function createQuery($context = 'list')
    {
        $query = parent::createQuery($context);

        if ($context == 'list'){
            $query
                ->andWhere($query->getRootAlias() . '.status = :publish_privacy')
                ->setParameter('publish_privacy', Goal::PUBLIC_PRIVACY)
            ;
        }

        return $query;
    }
}