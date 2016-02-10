<?php
/**
 * Created by PhpStorm.
 * User: andranik
 * Date: 2/9/16
 * Time: 3:56 PM
 */


namespace AppBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Helper\ProgressBar;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;


class ChangeGoalSlugsCommand extends ContainerAwareCommand
{
    /**
     *
     */
    protected function configure()
    {
        $this
            ->setName('bl:change:goal:slugs')
            ->setDescription('Set slugs');
    }

    /**
     * @param InputInterface $input
     * @param OutputInterface $output
     * @return int|null|void
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $output->writeln("<info>Starting</info>");

        $em = $this->getContainer()->get('doctrine')->getManager();

        $goals = $em->getRepository('AppBundle:Goal')->findAll();

        foreach ($goals as $goal)
        {
            $goal->setTitle($goal->getTitle() . 1);
            $em->persist($goal);
        }

        $em->flush();
        $output->writeln("<info>\nSuccess </info>");
    }
}