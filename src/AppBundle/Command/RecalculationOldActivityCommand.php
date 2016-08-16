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

        //get userGoals ids by perform date
        $userGoalsIds = $em->getRepository('AppBundle:UserGoal')->findUserGoalIdsByActivityPerformDate();

        //get user goal by id
        $userGoals = $em->getRepository('AppBundle:UserGoal')->findUserGoalsByIds($userGoalsIds);

//        dump(count($userGoals));exit;

        $output->writeln("<info>Starting</info>");

        $progress = new ProgressBar($output, count($userGoals));

        $progress->start();

        foreach ($userGoals as $userGoal)
        {
            //set action
            $action = NewFeed::GOAL_ADD;

            //set perform date for activity
            $perform_date = $userGoal->getListedDate();

            if($userGoal->getCompletionDate() && ($userGoal->getListedDate() || (!$userGoal->getListedDate()))) {

                //set action
                $action = NewFeed::GOAL_COMPLETE;

                //set perform date for activity
                $perform_date = $userGoal->getCompletionDate();
            }

            //get user in userGoal
            $user = $userGoal->getUser();

            //get goal in userGoal
            $goal = $userGoal->getGoal();

            $lastId = 21;
            $lastDate = new \DateTime('now');

            //TODO must be get lastId and lastDate or create new repository
            $newFeed = $em->getRepository('AppBundle:NewFeed')->findNewFeed($user->getId(), $lastId, $lastDate);

            if (!isset($newFeed) || is_null($newFeed)){
                $newFeed = new NewFeed($action, $user, $goal);
                $newFeed->setDatetime($perform_date);
            }
            else {
                $newFeed->addGoal($goal);
            }

            //create activity
//            $newFeed = new NewFeed($action, $user, $goal);
//            $newFeed->setDatetime($perform_date);
            $em->persist($newFeed);

            $counter++;
            $progress->advance();

            if ($counter > 10){
                $em->flush();
                $counter = 0;
            }
        }

        $em->flush();

        $progress->finish();
        $output->writeln("<info>Success</info>");
    }
}