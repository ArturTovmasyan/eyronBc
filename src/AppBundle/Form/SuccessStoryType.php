<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 10/21/15
 * Time: 11:09 AM
 */

namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * Class SuccessStoryType
 * @package AppBundle\Form
 */
class SuccessStoryType extends AbstractType
{

    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('story', 'textarea')
            ->add('videoLink', null, array('required' => false))
            ->add('files', 'hidden', array('mapped' => false))
        ;
    }

    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AppBundle\Entity\SuccessStory'
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'app_bundle_success_story_type';
    }
}
