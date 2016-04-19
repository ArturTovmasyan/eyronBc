<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 9/10/15
 * Time: 9:56 AM
 */

namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;


/**
 * Class GoalType
 * @package AppBundle\Form
 */
class GoalType extends AbstractType
{

    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title', null, array('required' => true))
            ->add('description', 'textarea', array('required' => true))
            ->add('status')
            ->add('files', 'hidden', array('mapped' => false))
            ->add('hashTags', 'hidden', array('mapped' => false))
            ->add('videoLink', 'bl_multiple_video', array('required' => false))
            ->add('language', 'lng', array('required' => true, 'label' => 'language'))
        ;
    }

    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AppBundle\Entity\Goal',
            'validation_groups' => 'goal'
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'app_bundle_goal';
    }
}
