<?php

namespace Application\UserBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * Class SettingsEmailType
 * @package Application\UserBundle\Form
 */

class SettingsEmailType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('settingEmails', 'text', array('attr'=>array('placeholder'=>'Add an email'),'label'=>false))
            ->add('primary', 'hidden', array('label'=>false))
        ;
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'app_bundle_settings_email';
    }
}