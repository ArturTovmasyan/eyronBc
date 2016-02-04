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
            ->add('firstName', null, array('required'=>true))
            ->add('lastName', null, array('required'=>true))
            ->add('addEmail', null, array('required' => false))
            ->add('birthDate', 'date', array('required' => false))
            ->add('primary', null, array('required' => false))
            ->add('file', 'file', array('required' => false))
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