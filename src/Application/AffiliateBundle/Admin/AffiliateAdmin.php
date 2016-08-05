<?php

namespace Application\AffiliateBundle\Admin;

use Application\AffiliateBundle\Form\Type\AdminFileType;
use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Show\ShowMapper;
use Symfony\Component\Form\Extension\Core\Type\TextType;

class AffiliateAdmin extends AbstractAdmin
{
    /**
     * @param DatagridMapper $datagridMapper
     */
    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper
            ->add('id')
            ->add('name')
            ->add('link')
            ->add('affiliateType')
        ;
    }

    /**
     * @param ListMapper $listMapper
     */
    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper
            ->add('id')
            ->add('name')
            ->add('affiliateType.name')
            ->add('affiliateType.id', null, ['label' => 'Content', 'template' => 'ApplicationAffiliateBundle:Admin:affiliateList.html.twig'])
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
            ->add('name', TextType::class, ['required' => false])
            ->add('link', TextType::class, ['required' => false])
            ->add('affiliateType')
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
            ->add('link')
            ->add('affiliateType')
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
