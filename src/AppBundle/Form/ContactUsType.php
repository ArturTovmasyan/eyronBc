<?php

namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ContactUsType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {

        $builder
            ->add('fullName', 'text', array('required' => true, 'label'=>'page.contacr_us.form.full_name'))
            ->add('email', 'email', array('required' => true, 'label'=>'page.contacr_us.form.email'))
            ->add('subject', 'text', array('required' => true, 'label'=>'page.contacr_us.form.subject', 'data' => 'My Bucket List'))
            ->add('message', 'textarea', array('required' => true, 'label'=>'page.contacr_us.form.message', 'attr'=>array('rows'=>'5')))
            ->add('send', 'submit', array('label'=>'page.contacr_us.form.send'))
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {

    }

    public function getName()
    {
        return 'app_bundle_contact_us';
    }
}
