<?php

namespace Application\AffiliateBundle\Admin;

use Application\AffiliateBundle\Entity\AffiliateType;
use Application\AffiliateBundle\Form\Type\AdminFileType;
use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Show\ShowMapper;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;

class AffiliateTypeAdmin extends AbstractAdmin
{
    /**
     * @param DatagridMapper $datagridMapper
     */
    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper
            ->add('id')
            ->add('name')
            ->add('zone', null, [], ChoiceType::class, array(
                'choices' => [
                    AffiliateType::LEFT_ZONE    => 'Left',
                    AffiliateType::RIGHT_ZONE   => 'Right',
                    AffiliateType::TOP_ZONE     => 'Top',
                    AffiliateType::BOTTOM_ZONE  => 'Bottom',
                    AffiliateType::INNER_ZONE   => 'Inner',
                ]
            ))
            ->add('defaultLink')
            ->add('htmlContent')
            ->add('jsContent')
        ;
    }

    /**
     * @param ListMapper $listMapper
     */
    protected function configureListFields(ListMapper $listMapper)
    {
        AffiliateType::$bookingAId = $this->getConfigurationPool()->getContainer()->getParameter('booking_aid');

        $listMapper
            ->add('id')
            ->add('name')
            ->add('zoneString')
            ->add('htmlContent', null, ['label' => 'Content', 'template' => 'ApplicationAffiliateBundle:Admin:affiliateTypeList.html.twig'])
            ->add('_action', null, array(
                'actions' => array(
                    'show' => array(),
                    'edit' => array(),
                    'delete' => array(),
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
            ->add('name', TextType::class)
            ->add('defaultLink', TextType::class)
            ->add('zone', ChoiceType::class, array(
                'choices' => [
                    AffiliateType::LEFT_ZONE    => 'Left',
                    AffiliateType::RIGHT_ZONE   => 'Right',
                    AffiliateType::TOP_ZONE     => 'Top',
                    AffiliateType::BOTTOM_ZONE  => 'Bottom',
                    AffiliateType::INNER_ZONE   => 'Inner',
                ]
            ))
            ->add('htmlContent', TextareaType::class, ['required' => false])
            ->add('jsContent', TextareaType::class, ['required' => false])
            ->add('file', AdminFileType::class, ['required' => false])
        ;
    }

    /**
     * @param ShowMapper $showMapper
     */
    protected function configureShowFields(ShowMapper $showMapper)
    {
        $showMapper
            ->add('id')
            ->add('name')
            ->add('zoneString')
            ->add('htmlContent', null, ['template' => 'ApplicationAffiliateBundle:Admin:affiliateTypeList.html.twig'])
        ;
    }

    /**
     * @param mixed $object
     */
    public function prePersist($object)
    {
        $bucketService = $this->getConfigurationPool()->getContainer()->get('bl_service');
        $bucketService->uploadFile($object);
    }

    /**
     * @param mixed $object
     */
    public function preUpdate($object)
    {
        $this->prePersist($object);
    }
}
