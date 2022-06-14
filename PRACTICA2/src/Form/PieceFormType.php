<?php

namespace App\Form;

use App\Entity\Piece;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class PieceFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('name', TextType::class, array(
                'label' => 'Nombre:'
            ))
            ->add('author', TextType::class, array(
                'label' => 'Autor:'
            ))
            ->add('description', TextareaType::class, array(
                'label' => 'Descripción:'
            ))
            ->add('imageSrc', FileType::class, array(
                'label' => 'Imagen:',
                'mapped' => FALSE,
                'required' => TRUE,
            ))
            ->add('width', IntegerType::class, array(
                'label' => 'Anchura de la imagen:',
                'mapped' => FALSE,
                'required' => TRUE,
                'data' => $options['trait_choices']['width'] ?? 0,
            ))
            ->add('height', IntegerType::class, array(
                'label' => 'Altura de la imagen:',
                'mapped' => FALSE,
                'required' => TRUE,
                'data' => $options['trait_choices']['height'] ?? 0,
            ))
            ->add('submit', SubmitType::class, array(
                'label' => 'Crear'
            ));
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Piece::class,
            'trait_choices' => NULL,
        ]);
    }
}
