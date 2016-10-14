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
use Doctrine\ORM\EntityRepository;
use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Route\RouteCollection;
use Sonata\AdminBundle\Show\ShowMapper;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;

/**
 * Class GoalAdmin
 * @package AppBundle\Admin
 */
class GoalAdmin extends AbstractAdmin
{
    use GoalAdminTrait;

    protected $formOptions = array(
        'validation_groups' => array('goal')
    );

    protected  $baseRouteName = 'admin-goal';
    protected  $baseRoutePattern = 'admin-goal';

    /**
     * override list query
     *
     * @param string $context
     * @return \Sonata\AdminBundle\Datagrid\ProxyQueryInterface */

    public function createQuery($context = 'list')
    {
        // call parent query
        $query = parent::createQuery($context);

        // add selected
        $query->addSelect('sc, im, tg, at, pl');
        $query->leftJoin($query->getRootAlias() . '.successStories', 'sc');
        $query->leftJoin($query->getRootAlias() . '.images', 'im');
        $query->leftJoin($query->getRootAlias() . '.tags', 'tg');
        $query->leftJoin($query->getRootAlias() . '.author', 'at');
        $query->leftJoin($query->getRootAlias() . '.place', 'pl');

        return $query;
    }

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
            ->add('id', null, array('label'=>'admin.label.name.id'))
            ->add('title', null, array('label'=>'admin.label.name.title'))
            ->add('featuredDate', null, array('label'=>'admin.label.name.featured_date'))
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
            ->add('featuredDate', 'date', array('widget' => 'single_text', 'label'=>'admin.label.name.featured_date', 'required' => false))
            ->add('tags', 'sonata_type_model_autocomplete', array('label'=>'admin.label.name.tags', 'property'=>'tag', 'multiple' => true, 'required' => false))
            ->add('slug', null, array('label'=>'admin.label.name.slug', 'required' => false))
            ->add('publish', null, array('label'=>'admin.label.name.publish'))
            ->add('status', null, array('label'=>'admin.label.name.goal_status'))
            ->add('archived', null, array('label'=>'admin.label.name.archived'))
            ->add('place', 'sonata_type_model_autocomplete', array('label'=>'admin.label.name.place', 'property'=>'name', 'multiple' => true, 'required' => false))
            ->add('mergedGoalId', null, array('label'=>'admin.label.name.merged_id'))
            ->add('rawLocation', LocationType::class, array('label' => false))
            ->add('videoLink', BlMultipleVideoType::class, array('label' => false))
            ->add('language', ChoiceType::class, array('required' => true, 'choices' => ['en' => 'en', 'ru' => 'ru', 'fr' => 'French', 'nl' => 'Dutch']))
            ->add('bl_multiple_file', BlMultipleFileType::class, array('label'=>'admin.label.name.images', 'required' => false));
    }

    // Fields to be shown on filter forms
    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        //get container
        $container = $this->getConfigurationPool()->getContainer();

        //disable listener for stats count
        $container->get('bl.doctrine.listener')->disableUserStatsLoading();

        $datagridMapper
            ->add('author.email', null, array('label'=>'Author email'))
            ->add('author.firstname', null, array('label'=>'Author first name'))
            ->add('author.lastname', null, array('label'=>'Author last name'))
            ->add('id', null, array('label'=>'admin.label.name.id'))
            ->add('publish', null, array('label'=>'admin.label.name.publish'))
            ->add('title', null, array('label'=>'admin.label.name.title'))
            ->add('description', null, array('label'=>'admin.label.name.description'))
            ->add('featuredDate', null, array('widget' => 'single_text', 'label'=>'admin.label.name.featured_date'))
            ->add('tags.tag', null, array('label'=>'admin.label.name.tags'))
            ->add('videoLink', null, array('label'=>'admin.label.name.videoLink'))
            ->add('archived', null, array('label'=>'admin.label.name.archived'))
            ->add('mergedGoalId', null, array('label'=>'admin.label.name.merged_id'))
            ->add('status', null, array('label'=>'admin.label.name.goal_public', 'editable' => true))


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
        //get container
        $container = $this->getConfigurationPool()->getContainer();

        //disable goal archived filters
        $container->get('doctrine')->getManager()->getFilters()->disable('archived_goal_filter');

        $listMapper
            ->add('id', null, array('label'=>'admin.label.name.id'))
            ->add('publish', null, array('editable' => true, 'label'=>'admin.label.name.publish'))
            ->add('status', null, array('editable' => true, 'label'=>'admin.label.name.goal_status'))
            ->add('title', null, array('label'=>'admin.label.name.title'))
            ->add('author', null, array('template' => 'AppBundle:Admin:author_name_list.html.twig', 'label' => 'admin.label.name.author_name'))
            ->add('tags', null, array('label'=>'admin.label.name.tags'))
            ->add('place', null, array('label'=>'admin.label.name.place'))
            ->add('archived', null, array('label'=>'admin.label.name.archived'))
            ->add('mergedGoalId', null, array('label'=>'admin.label.name.merged_id'))
            ->add('getListPhoto', null, array('template' => 'AppBundle:Admin:goal_image_list.html.twig', 'label'=>'admin.label.name.getListPhoto'))
            ->add('videoLink', null, array('template' => 'AppBundle:Admin:goal_video_list.html.twig', 'label'=>'admin.label.name.videoLink'))
            ->add('created', null, array('label'=>'admin.label.name.created'))
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

            if ($object->getSlug() && $object->getAuthor()) {
                $container = $this->getConfigurationPool()->getContainer();
                $link = $container->get('router')->generate('inner_goal', ['slug' => $object->getSlug()]);
                $body = $container->get('translator')->trans('notification.publish_goal', ['%goal%' => $object->getTitle()], null, 'en');
                $container->get('bl_notification')->sendNotification(null, $link, $object->getId(), $body, $object->getAuthor());
            }
        }

        $this->updateData($object);
    }

    /**
     * @param mixed $object
     */
    public function preRemove($object) {

        //get removed goal object
        $goal = $this->getModelManager()->getEntityManager($this->getClass())->getUnitOfWork()->getOriginalEntityData($object);

        //get all user goals
        $userGoals = $goal['userGoal'];

        //get current date
        $currentDate = new \DateTime();

        foreach ($userGoals as $userGoal)
        {
            //get user
            $user = $userGoal->getUser();

            //set userGoal remove date in user
            $user->setUserGoalRemoveDate($currentDate);
        }
    }
}