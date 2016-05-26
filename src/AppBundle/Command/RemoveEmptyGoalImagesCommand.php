<?php
/**
 * Created by PhpStorm.
 * User: andranik
 * Date: 5/25/16
 * Time: 12:33 PM
 */

namespace AppBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class RemoveEmptyGoalImagesCommand extends ContainerAwareCommand
{
    /**
     * {@inheritdoc}
     */
    protected function configure()
    {
        $this
            ->setName('bl:remove:empty_goal_images')
            ->setDescription("Remove goal images which hasn't related file");
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $em = $this->getContainer()->get('doctrine')->getManager();

        $goalImages = $em
            ->createQuery("SELECT gi, g
                           FROM AppBundle:GoalImage gi
                           JOIN gi.goal g
                           WHERE gi.fileName IS NULL")
            ->getResult();

        $goals = [];
        foreach($goalImages as $goalImage){
            if (!isset($goals[$goalImage->getGoal()->getId()])){
                $goals[$goalImage->getGoal()->getId()] = [
                    'title'  => $goalImage->getGoal()->getTitle(),
                    'slug'  => $goalImage->getGoal()->getSlug(),
                    'id'    => $goalImage->getGoal()->getId(),
                    'count' => 0
                ];
            }

            $goals[$goalImage->getGoal()->getId()]['count']++;
            $em->remove($goalImage);
        }

        $em->flush();

        foreach($goals as $goal){
            $output->writeln("Goal id: " . $goal['id'] .
                            "\tTitle: " . $goal['title'] .
                            "\tSlug: " . $goal['slug'] .
                            "\tEmpty goal images count: " . $goal['count']
            );
        }


        $output->writeln('Success');
    }
}