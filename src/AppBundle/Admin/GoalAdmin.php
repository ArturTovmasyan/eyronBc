<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 9/24/15
 * Time: 1:53 PM
 */


namespace AppBundle\Admin;

use AppBundle\Entity\Goal;
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
            ->add('id')
            ->add('title')
            ->add('description')
            ->add('videoLink', null, array('template' => 'AppBundle:Admin:goal_video_show.html.twig'))
            ->add('tags')
            ->add('images', null, array('template' => 'AppBundle:Admin:goal_image_show.html.twig'))
        ;
    }

    // Fields to be shown on create/edit forms
    protected function configureFormFields(FormMapper $formMapper)
    {

        $formMapper
            ->add('title')
            ->add('description', 'textarea')
            ->add('videoLink')
            ->add('tags')
            ->add('bl_multiple_file', 'bl_multiple_file', array('label' => 'Images', 'required' => false));
    }

    // Fields to be shown on filter forms
    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper
            ->add('id')
            ->add('title')
            ->add('description')
            ->add('videoLink')
            ->add('tags')
        ;
    }

    // Fields to be shown on lists
    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper
            ->add('id')
            ->add('publish', null, array('editable' => true))
            ->add('title')
            ->add('description')
            ->add('getListPhoto', null, array('template' => 'AppBundle:Admin:goal_image_list.html.twig'))
            ->add('videoLink', null, array('template' => 'AppBundle:Admin:goal_video_list.html.twig'))
            ->add('tags')
            ->add('_action', 'actions', array(
                'actions' => array(
                    'show' => array(),
                    'edit' => array(),
                    'delete' => array(),
                )
            ))
        ;
    }

    /**
     * {@inheritdoc}
     */
    public function prePersist($object)
    {
        // get current user
        $user = $this->getConfigurationPool()->getContainer()->get('security.context')->getToken()->getUser();

        $object->setEditor($user);
        $object->setPublish(PublishAware::PUBLISH);
        $object->setReadinessStatus(Goal::TO_PUBLISH);

        $this->getAndAddTags($object);
        $this->addImages($object);
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
        $em = $this->getModelManager();

        $bucketService = $this->getConfigurationPool()->getContainer()->get('bl_service');

        //get images
        $images = $object->getImages();

        // check images
        if($images) {

            // loop for images
            foreach($images as $image) {

                // upload file

                $bucketService->uploadFile($image);

                // ad image to goal
                $object->addImage($image);

                $em->update($image);
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