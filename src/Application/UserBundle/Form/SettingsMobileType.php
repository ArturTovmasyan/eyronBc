<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 10/2/15
 * Time: 10:29 AM
 */

namespace Application\UserBundle\Form;

use Symfony\Component\DependencyInjection\Container;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * Class SettingsMobileType
 * @package Application\UserBundle\Form\Type
 */

class SettingsMobileType extends AbstractType
{

    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {

        $builder
            ->add('firstName', null, array('required'=>true, 'label' => 'form.firstName', 'translation_domain' => 'FOSUserBundle'))
            ->add('lastName', null, array('required'=>true, 'label' => 'form.lastName', 'translation_domain' => 'FOSUserBundle'))
            ->add('addEmail', null, array('required' => false, 'label' => 'form.add_email'))
            ->add('birthDate', 'date', array('required' => false, 'label' => 'form.birthDate', 'translation_domain' => 'FOSUserBundle', 'years' =>  range(\date("Y"), \date("Y") - 100),))
            ->add('primary', null, array('required' => false, 'label' => 'form.birthDate', 'translation_domain' => 'FOSUserBundle'))
            ->add('file', 'file', array('required' => false, 'label' => 'form.file', 'translation_domain' => 'FOSUserBundle'))
        ;
    }

    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)

    {
        $resolver->setDefaults(array(
            'data_class' => 'Application\UserBundle\Entity\User',
            'validation_groups' => 'Settings',
            'csrf_protection' => false,

        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'bl_mobile_user_settings';
    }
}