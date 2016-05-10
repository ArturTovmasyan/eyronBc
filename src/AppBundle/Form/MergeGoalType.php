<?php
/**
 * Created by PhpStorm.
 * User: artur
 */

namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;


/**
 * Class MergeGoalType
 * @package AppBundle\Form
 */

class MergeGoalType extends AbstractType
{

    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('goal', 'genemu_jqueryselect2_entity', array(
                'class' => 'AppBundle\Entity\Goal',
                'property' => 'title',
                'placeholder' => 'Select goal'))
            ->add('tags', 'checkbox', array('required' => false))
            ->add('successStory', 'checkbox', array('required' => false, 'attr' => array('checked' => 'checked')))
            ->add('comment', 'checkbox', array('required' => false, 'attr' => array('checked' => 'checked')))
            ->add('user', 'checkbox', array('required' => false, 'attr' => array('checked' => 'checked')))
        ;
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'app_bundle_merge_goal';
    }
}
