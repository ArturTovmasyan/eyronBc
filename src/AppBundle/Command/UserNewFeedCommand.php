<?php
/**
 * Created by PhpStorm.
 * User: andranik
 * Date: 6/7/16
 * Time: 1:59 PM
 */
namespace AppBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Helper\ProgressBar;

class UserNewFeedCommand extends ContainerAwareCommand
{
    /**
     *
     */
    protected function configure()
    {
        $this
            ->setName('bl:generate:user-new-feed')
            ->setDescription('Generate User NewFeeds');
    }


    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $em = $this->getContainer()->get('doctrine')->getManager();

        $newFeeds = $em->getRepository('AppBundle:NewFeed')->findAll();

        $progress = new ProgressBar($output, count($newFeeds));
        $progress->start();

        foreach($newFeeds as $newFeed){
            $em->getRepository('AppBundle:NewFeed')->bindNewFeed($newFeed);
            $progress->advance();
        }

        $progress->finish();

        $output->writeln("<info>Success</info>");
    }
}
