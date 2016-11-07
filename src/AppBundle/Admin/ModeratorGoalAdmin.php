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
use AppBundle\Form\Type\BlMultipleFileType;
use AppBundle\Form\Type\BlMultipleVideoType;
use AppBundle\Form\Type\LocationType;
use AppBundle\Model\PublishAware;
use AppBundle\Traits\GoalAdminTrait;
use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Route\RouteCollection;
use Sonata\AdminBundle\Show\ShowMapper;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;

/**
 * Class ModeratorGoalAdmin
 * @package AppBundle\Admin
 * TODO: if all ok need to have parent goalAdmin class
 */
class ModeratorGoalAdmin extends AbstractAdmin
{
    use GoalAdminTrait;

    protected $datagridValues = array(
        '_page' => 1,
        '_sort_order' => 'DESC',
        '_sort_by' => 'updated',
    );

    protected $formOptions = array(
        'validation_groups' => array('goal')
    );

    protected  $baseRouteName = 'moderator-goal';
    protected  $baseRoutePattern = 'moderator-goal';

    /**
     * @param RouteCollection $collection
     */
    protected function configureRoutes(RouteCollection $collection)
    {
        $collection->add('merge', $this->getRouterIdParameter().'/merge');
    }

    /**
     * @param \Sonata\AdminBundle\Show\ShowMapper $showMapper
     *
     * @return void
     */
    protected function configureShowFields(ShowMapper $showMapper)
    {
        $showMapper
            ->add('id', null, array('label'=>'admin.label.name.id', 'template' => 'AppBundle:Admin:goal_show_link.html.twig'))
            ->add('title', null, array('label'=>'admin.label.name.title'))
            ->add('author', null, array('template' => 'AppBundle:Admin:author_name_show.html.twig', 'label' => 'admin.label.name.author_name'))
            ->add('description', null, array('label'=>'admin.label.name.description'))
            ->add('tags', null, array('label'=>'admin.label.name.tags'))
            ->add('videoLink', null, array('template' => 'AppBundle:Admin:goal_video_show.html.twig', 'label'=>'admin.label.name.videoLink'))
            ->add('images', null, array('template' => 'AppBundle:Admin:goal_image_show.html.twig', 'label'=>'admin.label.name.images'))
        ;
    }

    // Fields to be shown on create/edit forms
    protected function configureFormFields(FormMapper $formMapper)
    {

        $formMapper
            ->add('title', null, array('required' => true, 'label'=>'admin.label.name.title'))
            ->add('description', TextareaType::class, array('required' => false, 'label'=>'admin.label.name.description', 'attr'=>array('rows'=>8)))
//            , 'attr' => array('class' => 'tinymce')
            ->add('tags', null, array('label'=>'admin.label.name.tags'))
            ->add('slug', null, array('label'=>'admin.label.name.slug', 'required' => false))
            ->add('publish', null, array('label'=>'admin.label.name.publish'))
            ->add('archived', null, array('label'=>'admin.label.name.archived'))
            ->add('mergedGoalId', null, array('label'=>'admin.label.name.merged_id'))
            ->add('rawLocation', LocationType::class, array('label' => false))
            ->add('videoLink', BlMultipleVideoType::class, array('label' => false))
            ->add('language', ChoiceType::class, array('required' => true, 'choices' => ['en' => 'en', 'ru' => 'ru']))
            ->add('bl_multiple_file', BlMultipleFileType::class, array('label'=>'admin.label.name.images', 'required' => false));
    }

    // Fields to be shown on filter forms
    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        //disable listener for stats count
        $this->getConfigurationPool()->getContainer()->get('bl.doctrine.listener')->disableUserStatsLoading();

        $datagridMapper
            ->add('author.email', null, array('label'=>'Author email', 'show_filter' => true))
            ->add('author.firstname', null, array('label'=>'Author first name', 'show_filter' => true))
            ->add('author.lastname', null, array('label'=>'Author last name', 'show_filter' => true))
            ->add('id', null, array('label'=>'admin.label.name.id', 'show_filter' => true))
            ->add('title', null, array('label'=>'admin.label.name.title','show_filter' => true))
            ->add('slug', null, array('label'=>'admin.label.name.slug','show_filter' => true))
            ->add('description', null, array('label'=>'admin.label.name.description','show_filter' => true))
            ->add('tags', null, array('label'=>'admin.label.name.tags','show_filter' => true))
            ->add('videoLink', null, array('label'=>'admin.label.name.videoLink','show_filter' => true))
            ->add('archived', null, array('label'=>'admin.label.name.archived','show_filter' => true))
            ->add('mergedGoalId', null, array('label'=>'admin.label.name.merged_id','show_filter' => true))

            ->add('status', null, array('label'=>'admin.label.name.goal_public', 'show_filter' => true, 'editable' => true))

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
        ;
    }

    // Fields to be shown on lists
    protected function configureListFields(ListMapper $listMapper)
    {
        //disable goal archived filters
        $this->getConfigurationPool()->getContainer()->get('doctrine')->getManager()->getFilters()->disable('archived_goal_filter');

        $listMapper
            ->add('id', null, array('label'=>'admin.label.name.id'))
//            ->add('publish', null, array('editable' => true, 'label'=>'admin.label.name.publish'))
//            ->add('goalStatus', null, array('mapped' => false, 'template' => 'AppBundle:Admin:goal_status.html.twig', 'label'=>'admin.label.name.goal_status'))
            ->add('title', null, array('label'=>'admin.label.name.title'))
            ->add('author', null, array('template' => 'AppBundle:Admin:author_name_list.html.twig', 'label' => 'admin.label.name.author_name'))
            ->add('tags', null, array('label'=>'admin.label.name.tags'))
            ->add('archived', null, array('label'=>'admin.label.name.archived'))
            ->add('mergedGoalId', null, array('label'=>'admin.label.name.merged_id'))
            ->add('getListPhoto', null, array('template' => 'AppBundle:Admin:goal_image_list.html.twig', 'label'=>'admin.label.name.getListPhoto'))
            ->add('videoLink', null, array('template' => 'AppBundle:Admin:goal_video_list.html.twig', 'label'=>'admin.label.name.videoLink'))
            ->add('created', null, array('label'=>'admin.label.name.created'))
            ->add('updated', null, array('label'=>'admin.label.name.updated'))
            ->add('_action', 'actions', array(
                'actions' => array(
                    'show' => array('template' => 'AppBundle:Admin:goal_list_action_show.html.twig'),
                    'edit' => array('template' => 'AppBundle:Admin:goal_list_action_edit.html.twig'),
                    'delete' => array('template' => 'AppBundle:Admin:goal_list_action_delete.html.twig'),
                    'goal_link' => array('template' => 'AppBundle:Admin:goal_list_action_link.html.twig'),
                    'merge' => array('template' => 'AppBundle:Admin:goal_merge_action.html.twig'),
                )
            ))
        ;
    }

    /**
     * {@inheritdoc}
     */
    public function preUpdate($object)
    {
        $original = $this->getModelManager()->getEntityManager($this->getClass())->getUnitOfWork()->getOriginalEntityData($object);

        if((!isset($original['publish']) || $original['publish'] != $object->getPublish()) && $object->getPublish() == PublishAware::PUBLISH){
            $this->getRequest()->getSession()
                ->getFlashBag()
                ->set('goalPublished','Goal published from Web')
            ;
        }

        $this->updateData($object);

    }


    /**
     * @param string $context
     * @return \Sonata\AdminBundle\Datagrid\ProxyQueryInterface
     */
    public function createQuery($context = 'list') {
        $query = parent::createQuery($context);

        // add selected
        $query->addSelect('sc, im, tg, at');
        $query->leftJoin($query->getRootAlias() . '.successStories', 'sc');
        $query->leftJoin($query->getRootAlias() . '.images', 'im');
        $query->leftJoin($query->getRootAlias() . '.tags', 'tg');
        $query->leftJoin($query->getRootAlias() . '.author', 'at');
        $query->andWhere($query->expr()->eq($query->getRootAliases()[0] . '.status', ':privateStatus'))
                ->setParameter('privateStatus', Goal::PRIVATE_PRIVACY);

        return $query;
    }

}