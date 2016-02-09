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


class DeleteEmptyImagesCommand extends ContainerAwareCommand
{
    /**
     *
     */
    protected function configure()
    {
        $this
            ->setName('bl:remove:empty:images')
            ->setDescription('Remove empty images');
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
        $goalImages = $em->getRepository('AppBundle:GoalImage')->findAll();
        $storyImages = $em->getRepository('AppBundle:StoryImage')->findAll();

        $progress = new ProgressBar($output, count($goalImages) + count($storyImages));
        $progress->start();

        $prefix = __DIR__ . '/../../../web';
        $removedGoalImages = 0;
        foreach($goalImages as $goalImage){
            $output->writeln($prefix . $goalImage->getDownloadLink() . ' ' . file_exists($prefix . $goalImage->getDownloadLink()) . ' ' . is_file($prefix . $goalImage->getDownloadLink()));
            if (!file_exists($prefix . $goalImage->getDownloadLink()) || !is_file($prefix . $goalImage->getDownloadLink())){
                $em->remove($goalImage);
                $removedGoalImages++;
            }

            $progress->advance();
        }

        $em->flush();

        $removedStoryImages = 0;
        foreach($storyImages as $storyImage){
            $output->writeln($prefix . $storyImage->getDownloadLink() . ' ' . file_exists($prefix . $storyImage->getDownloadLink()) . ' ' . is_file($prefix . $storyImage->getDownloadLink()));
            if (!file_exists($prefix . $storyImage->getDownloadLink()) || !is_file($prefix . $storyImage->getDownloadLink())){
                $em->remove($storyImage);
                $removedStoryImages++;
            }

            $progress->advance();
        }

        $em->flush();
        $progress->finish();

        $output->writeln("<info>\nSuccess: removedGoalImages: {$removedGoalImages} removedStoryImages: {$removedStoryImages}</info>");
    }
}