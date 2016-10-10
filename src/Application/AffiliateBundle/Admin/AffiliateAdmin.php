<?php

namespace Application\AffiliateBundle\Admin;

use Application\AffiliateBundle\Entity\Affiliate;
use Application\AffiliateBundle\Entity\AffiliateType;
use Application\AffiliateBundle\Form\Type\AdminFileType;
use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Show\ShowMapper;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
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
            ->add('links')
            ->add('ufi')
            ->add('placeType', null, [],  ChoiceType::class, ['required' => false,
                'choices' => [
                    Affiliate::CITY_TYPE    => 'City',
                    Affiliate::REGION_TYPE  => 'Region',
                    Affiliate::COUNTRY_TYPE => 'Country',
                ]
            ])
            ->add('affiliateType')
        ;
    }

    /**
     * @param ListMapper $listMapper
     */
    protected function configureListFields(ListMapper $listMapper)
    {
        AffiliateType::$bookingAId = $this->getConfigurationPool()->getContainer()->getParameter('booking_aid');

        $listMapper
            ->add('publish', null, ['editable' => true])
            ->add('name')
            ->add('ufi')
            ->add('placeType')
            ->add('links', null, ['template' => 'ApplicationAffiliateBundle:Admin:listLinks.html.twig'])
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
            ->add('ufi', TextType::class, ['required' => false])
            ->add('placeType', ChoiceType::class, ['required' => false,
                'choices' => [
                    Affiliate::CITY_TYPE    => 'City',
                    Affiliate::REGION_TYPE  => 'Region',
                    Affiliate::COUNTRY_TYPE => 'Country',
                ]
            ])
            ->add('affiliateType')
            ->add('publish')
            ->add('links', CollectionType::class, array(
                'entry_type'   => TextType::class,
                'allow_add'    => true,
                'allow_delete' => true,
                'delete_empty' => true,
                'required'     => false
            ))
            ->add('sizeString', TextType::class, ['required' => false])
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
            ->add('publish')
            ->add('sizeString')
            ->add('link')
            ->add('ufi')
            ->add('placeType')
            ->add('links')
            ->add('affiliateType.name')
            ->add('affiliateType.id', null, ['template' => 'ApplicationAffiliateBundle:Admin:affiliateList.html.twig'])
        ;
    }

    /**
     * @param mixed $object
     */
    public function prePersist($object)
    {
        $container            = $this->getConfigurationPool()->getContainer();
        $bucketService        = $container->get('bl_service');
        $liipManager          = $container->get('liip_imagine.cache.manager');
        $filterConfiguration  = $container->get('liip_imagine.filter.configuration');
        $configuration        = $filterConfiguration->get('affiliate_image');
        $imagemanagerResponse = $container->get('liip_imagine.controller');

        $bucketService->uploadFile($object);

        if ($object->getSize()) {

            $liipManager->remove($object->getDownloadLink(), 'affiliate_image');
            $configuration['filters']['thumbnail']['size'] = $object->getSize();
            $filterConfiguration->set('affiliate_image', $configuration);

            $imagemanagerResponse->filterAction($this->getRequest(), $object->getDownloadLink(), 'affiliate_image');
//            $browserPath = $liipManager->getBrowserPath($object->getDownloadLink(), 'affiliate_image');
        }
    }

    /**
     * @param mixed $object
     */
    public function preUpdate($object)
    {
        $this->prePersist($object);
    }
}