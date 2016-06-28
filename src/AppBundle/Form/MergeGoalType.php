<?php
/**
 * Created by PhpStorm.
 * User: artur
 */

namespace AppBundle\Form;

use Doctrine\ORM\EntityRepository;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\FormBuilderInterface;


/**
 * Class MergeGoalType
 * @package AppBundle\Form
 */

class MergeGoalType extends AbstractType
{

    //set goalId private variable
    private $goalId;

    public function __construct($goalId = null)
    {
        //get goal id
        $this->goalId = $goalId;
    }

    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        //get goal id
        $goalId = $this->goalId;

        $builder
            ->add('goal', 'genemu_jqueryselect2_entity', array(
                'class' => 'AppBundle\Entity\Goal',
                'property' => 'title',
                'placeholder' => 'Select goal',
                'query_builder' => function(EntityRepository $er) use ($goalId) {
                    return $er->createQueryBuilder('g')
                        ->where('g.id != :goalId')
                    ->setParameter('goalId', $goalId);
                },
                ))
            ->add('tags', CheckboxType::class, array('required' => false))
            ->add('successStory', CheckboxType::class, array('required' => false, 'attr' => array('checked' => 'checked')))
            ->add('comment', CheckboxType::class, array('required' => false, 'attr' => array('checked' => 'checked')))
            ->add('user', CheckboxType::class, array('required' => false, 'attr' => array('checked' => 'checked')))
        ;
    }

    /**
     * @return string
     */
    public function getBlockPrefix()
    {
        return 'app_bundle_merge_goal';
    }
}
