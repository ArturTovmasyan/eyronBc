<?php

namespace AppBundle\Command;

use AppBundle\Entity\NewFeed;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Helper\ProgressBar;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class ActivityGroupCommand extends ContainerAwareCommand
{
    /**
     * {@inheritdoc}
     */
    protected function configure()
    {
        $this
            ->setName('bl:group:activity')
            ->setDescription('Group old activities');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        //get entity manager
        $em = $this->getContainer()->get('doctrine')->getManager();

        //set default counter
        $counter = 0;

        //get new feed user ids
        $singleNewFeedIds = $em->getRepository('AppBundle:NewFeed')->findNewFeedForGroupAction();

        $output->writeln("<info>Starting</info>");

        $progress = new ProgressBar($output, count($singleNewFeedIds));

        $progress->start();

        foreach ($singleNewFeedIds as $singleNewFeedId)
        {
            //get new feed by ids and actions
            $newFeeds = $em->getRepository('AppBundle:NewFeed')->findNewFeedByActionAndIds($singleNewFeedId['id']);

            $addNewFeed = null;
            $doneNewFeed = null;

            foreach ($newFeeds as $newFeed)
            {
                if ($newFeed->getAction() == NewFeed::GOAL_ADD){
                    if (is_null($addNewFeed)){
                        $addNewFeed = $newFeed;
                        continue;
                    }

                    $addNewFeedDate = $addNewFeed->getDateTime();
                    $newFeedDate = $newFeed->getDateTime();

                    $date1 = strtotime($addNewFeedDate->format('Y-m-d h:m:s'));
                    $date2 = strtotime($newFeedDate->format('Y-m-d h:m:s'));

                    if($date1 > $date2) {
                        //get date diff
                        $dateDiff = $date1 - $date2;
                    }
                    else{
                        //get date diff
                        $dateDiff = $date2 - $date1;
                    }

                    //get different by minutes
                    $minutes = $dateDiff / 60;

                    //get high date
                    $date = $addNewFeedDate > $newFeedDate ? $addNewFeedDate : $newFeedDate;

                    if($minutes <= 30) {

                        //get goal in new feed
                        $goal = $newFeed->getGoal();

                        //add goal in old activity for group
                        $addNewFeed->addGoal($goal);

                        //set date in activity
                        $addNewFeed->setDatetime($date);

                        $em->remove($newFeed);
                    }
                    else{
                        $addNewFeed = $newFeed;
                    }
                }
                elseif ($newFeed->getAction() == NewFeed::GOAL_COMPLETE)
                {
                    if (is_null($doneNewFeed)){
                        $doneNewFeed = $newFeed;
                        continue;
                    }

                    $doneNewFeedDate = $doneNewFeed->getDateTime();
                    $newFeedDate = $newFeed->getDateTime();

                    $date1 = strtotime($doneNewFeedDate->format('Y-m-d h:m:s'));
                    $date2 = strtotime($newFeedDate->format('Y-m-d h:m:s'));

                    if($date1 > $date2) {
                        //get date diff
                        $dateDiff = $date1 - $date2;
                    }
                    else{
                        //get date diff
                        $dateDiff = $date2 - $date1;
                    }

                    //get different by minutes
                    $minutes = $dateDiff / 60;

                    //get high date
                    $date = $doneNewFeedDate > $newFeedDate ? $doneNewFeedDate : $newFeedDate;

                    if($minutes <= 30) {
                        //get goal in new feed
                        $goal = $newFeed->getGoal();

                        //add goal in old activity for group
                        $doneNewFeed->addGoal($goal);

                        //set date in activity
                        $doneNewFeed->setDatetime($date);

                        $em->remove($newFeed);
                    }
                    else{
                        $doneNewFeed = $newFeed;
                    }
                }
            }

            if ($counter > 50){

                $em->flush();
                $counter = 0;
                $em->clear();
            }

            $counter++;
            $progress->advance();
        }

        $em->flush();
        $progress->finish();
        $output->writeln("<info>Success</info>");
    }
}