<?php

namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
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
            ->add('type', ChoiceType::class,  array('choices' => array(
                                    'text'   => 'Text',
                                    'goal' => 'Goal')))
            ->add('position', IntegerType::class)
            ->add('content', TextType::class)
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