<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 9/10/15
 * Time: 9:56 AM
 */

namespace AppBundle\Form;

use AppBundle\Entity\UserGoal;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * Class UserGoalType
 * @package AppBundle\Form
 */
class UserGoalType extends AbstractType
{

    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('targetDate', 'hidden', array('mapped' => false))
            ->add('note')
            ->add('location', 'hidden', array('mapped' => false))
            ->add('birthday', 'hidden', array('mapped' => false))
            ->add('isVisible')
        ;
    }

    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AppBundle\Entity\UserGoal'
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'app_bundle_user_goal';
    }
}
