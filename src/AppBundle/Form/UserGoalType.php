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
            ->add('goal', new GoalType(), array('label' => false))
            ->add('quality', 'choice', array(
                'choices' => array(
                    UserGoal::IMPORTANT => 'user_goal.important',
                    UserGoal::NOT_IMPORTANT => 'user_goal.not_important',
                    UserGoal::URGENT => 'user_goal.urgent',
                    UserGoal::NOT_URGENT => 'user_goal.not_urgent'
                ),
                'label' => 'user_goal.quality',
                'empty_value' => ' ',
                'required' => false,
                ))
            ->add('privacy', 'choice', array(
                'choices' => array(
                    UserGoal::PUBLIC_PRIVACY => 'user_goal.public',
                    UserGoal::PRIVATE_PRIVACY => 'user_goal.private'
                ),
                'label' => 'user_goal.privacy',
                'empty_value' => null,
                'required' => false,
                'multiple' => false,
                'expanded' => true,
            ))
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
