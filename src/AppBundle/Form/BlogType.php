<?php

namespace AppBundle\Form;

use AppBundle\Entity\Blog;
use Doctrine\ORM\EntityRepository;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\FormBuilderInterface;

/**
 * Class BlogType
 * @package AppBundle\Form
 */
class BlogType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('type', ChoiceType::class,  array('choices' => [Blog::TYPE_TEXT => 'Text', Blog::TYPE_GOAL => 'Goal']))
            ->add('position', IntegerType::class)
            ->add('content', TextareaType::class, array('required' => false))
            ->add('goal', 'genemu_jqueryselect2_entity', array(
                'required' => false,
                'class' => 'AppBundle\Entity\Goal',
                'property' => 'title',
                'choice_value' => 'id',
                'placeholder' => 'Select goal'))
        ;
    }

    /**
     * @return string
     */
    public function getBlockPrefix()
    {
        return 'app_bundle_blog';
    }
}