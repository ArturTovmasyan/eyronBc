<?php

namespace AppBundle\Command;

use AppBundle\Entity\NewFeed;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Helper\ProgressBar;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class RecalculationOldActivityCommand extends ContainerAwareCommand
{
    /**
     * {@inheritdoc}
     */
    protected function configure()
    {
        $this
            ->setName('bl:recalculation:activity')
            ->setDescription('Recalculation old activities');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        //get entity manager
        $em = $this->getContainer()->get('doctrine')->getManager();

        //set default counter
        $counter = 0;

        //get all userGoals
        $userGoals = $em->getRepository('AppBundle:UserGoal')->findUserGoalIdsByActivityPerformDate($first = null, $count = null);

        $output->writeln("<info>Starting</info>");

        $progress = new ProgressBar($output, count($userGoals));
        $progress->start();

        $userGoalIds = [];

        foreach ($userGoals as $userGoal)
        {
            $userGoalIds[] = $userGoal['id'];
        }

        //get user goal by id
        $userGoals = $em->getRepository('AppBundle:UserGoal')->findUserGoalsByIds($userGoalIds);

        foreach ($userGoals as $userGoal)
        {
            if($userGoal->getCompletionDate() && ($userGoal->getListedDate() || $userGoal->getListedDate() == null)) {
                $action = NewFeed::GOAL_COMPLETE;
                $perform_date = $userGoal->getCompletionDate();
            }
            elseif($userGoal->getCompletionDate() == null && $userGoal->getListedDate()) {
                $action = NewFeed::GOAL_ADD;
                $perform_date = $userGoal->getListedDate();
            }

            //create activity
            $newFeed = new NewFeed($action, $userGoal->getUser(), $userGoal->getGoal());
            $newFeed->setDatetime($perform_date);
            $em->persist($newFeed);

            $counter++;
            $progress->advance();

//            if ($counter > 10){
                $em->flush();
//                $counter = 0;
//            }
        }

        $progress->finish();
        $output->writeln("<info>Success</info>");
    }
}