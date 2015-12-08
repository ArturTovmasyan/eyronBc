<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 10/2/15
 * Time: 10:29 AM
 */

namespace Application\UserBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * Class SettingsType
 * @package Application\UserBundle\Form\Type
 */

class SettingsType extends AbstractType
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
            ->add('email', 'email', array('label' => 'form.email', 'translation_domain' => 'FOSUserBundle',
                'attr' => array(
                    'oninvalid' => "EmailValidation(this)",
                    'oninput' => "EmailValidation(this)"
                )
            ))
//            ->add('change_email', 'email',array('mapped' => false,
//                'attr' => array(
//                    'oninvalid' => "EmailValidation(this)",
//                    'oninput' => "EmailValidation(this)"
//                ),
//
//            ))
            ->add('password', 'password', array(
                'required' => true,
                'label' => 'form.current_password',
                'translation_domain' => 'FOSUserBundle',
                'mapped' => false
            ))
            ->add('plainPassword', 'repeated', array(
                'type' => 'password',
                'options' => array('translation_domain' => 'FOSUserBundle'),
                'first_options' => array('label' => 'form.password'),
                'second_options' => array('label' => 'form.password_confirmation'),
                'invalid_message' => 'fos_user.password.mismatch',
            ))
            ->add('birthDate', 'date', array('required' => false, 'label' => 'form.birthDate', 'translation_domain' => 'FOSUserBundle', 'years' =>  range(\date("Y"), \date("Y") - 100),))
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
            'validation_groups' => 'Register'
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'bl_user_settings';
    }
}