<?php

namespace AppBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Helper\ProgressBar;

class SetUserActivityCommand extends ContainerAwareCommand
{
    protected function configure()
    {
        $this
            ->setName('bl:set:activity')
            ->setDescription('Set user activity value by user feed count');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        //get entity manager
        $em = $this->getContainer()->get('doctrine')->getManager();

        //get bl service
        $bl_service = $this->getContainer()->get('bl_service');

        //get all users
        $users = $em->getRepository('ApplicationUserBundle:User')->findAll();

        $output->writeln("<info>Starting</info>");

        $progress = new ProgressBar($output, count($users));
        $progress->start();

        //set default counter
        $counter = 0;

        // loop for data
        foreach($users as $user){

            //call set activity service
            $bl_service->setUserActivity($user);

            $counter++;
            $progress->advance();

        }

        $progress->finish();

        $output->writeln("<info>Success</info>");

    }
}
