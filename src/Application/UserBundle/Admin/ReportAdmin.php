<?php

namespace Application\UserBundle\Admin;

use Application\UserBundle\Entity\Report;
use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Show\ShowMapper;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;

class ReportAdmin extends AbstractAdmin
{
    protected $datagridValues = array(
        '_page' => 1,
        '_sort_order' => 'DESC',
        '_sort_by' => 'created',
    );

    /**
     * @param DatagridMapper $datagridMapper
     */
    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper
            ->add('id')
            ->add('user')
            ->add('reportedUser')
            ->add('contentType', null, [], ChoiceType::class, array(
                'choices' => [
                    Report::COMMENT       => 'comment',
                    Report::SUCCESS_STORY => 'Success story'
                ]))
            ->add('reportType', null, [], ChoiceType::class, array(
                'choices' => [
                    Report::SPAM       => "It's annoying or spam",
                    Report::SHOULD_NOT => "I think it shouldn't be on BucketList127"
                ]))
            ->add('contentId')
            ->add('message')
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
            ), 'date', array('widget' => 'single_text'))
        ;
    }

    public $comments;
    public $successStories;


    /**
     * @param ListMapper $listMapper
     */
    protected function configureListFields(ListMapper $listMapper)
    {
        $em = $this->getConfigurationPool()->getContainer()->get('doctrine')->getManager();
        $ids = $em->getRepository('ApplicationUserBundle:Report')->findCommentAndSuccessStoriesIds();

        $this->comments       = $em->getRepository('ApplicationCommentBundle:Comment')->findByIds($ids['commentIds']);
        $this->successStories = $em->getRepository('AppBundle:SuccessStory')->findByIds($ids['successStoryIds']);

        $listMapper
            ->add('id')
            ->add('user')
            ->add('reportedUser')
            ->add('contentTypeString')
            ->add('reportTypeString')
            ->add('contentId')
            ->add('message')
            ->add('created')
            ->add('_action', null, array(
                'actions' => array(
                    'show' => array(),
                    'edit' => array(),
                    'delete' => array(),
                    'goal_link' => array('template' => 'ApplicationUserBundle:Admin:report_list_action_link.html.twig'),
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
            ->add('id')
            ->add('user')
            ->add('reportedUser')
            ->add('contentType', ChoiceType::class, array(
                'choices' => [
                    Report::COMMENT       => 'comment',
                    Report::SUCCESS_STORY => 'Success story'
                ]))
            ->add('reportType', ChoiceType::class, array(
                'choices' => [
                    Report::SPAM       => "It's annoying or spam",
                    Report::SHOULD_NOT => "I think it shouldn't be on BucketList127"
                ]))
            ->add('contentId')
            ->add('message')
        ;
    }

    /**
     * @param ShowMapper $showMapper
     */
    protected function configureShowFields(ShowMapper $showMapper)
    {
        $showMapper
            ->add('id')
            ->add('user')
            ->add('reportedUser')
            ->add('contentTypeString')
            ->add('reportTypeString')
            ->add('contentId')
            ->add('message')
            ->add('created')
        ;
    }
}
