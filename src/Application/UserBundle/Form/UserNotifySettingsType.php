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
 * Class UserNotifySettingsType
 * @package Application\UserBundle\Form
 */
class UserNotifySettingsType extends AbstractType
{

    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('commentNotify', 'checkbox', array('required'=> false))
            ->add('successStoryNotify', 'checkbox', array('required'=> false))
        ;
    }

    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Application\UserBundle\Entity\User'
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'bl_user_notify_settings';
    }
}