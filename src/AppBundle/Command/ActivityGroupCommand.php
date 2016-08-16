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

                    //get date diff
                    $dateDiff = date_diff($addNewFeed->getDateTime(), $newFeed->getDateTime(), true);

                    //get high date
                    $date = $addNewFeed->getDateTime() > $newFeed->getDateTime() ? $addNewFeed->getDateTime() : $newFeed->getDateTime();

                    //get different days
                    $days = $dateDiff->format("%a");

                    if($days <= 30) {
                        $goal = $newFeed->getGoal();
                        $addNewFeed->addGoal($goal);
                        $addNewFeed->setDatetime($date);
                        $em->persist($addNewFeed);

                        $em->remove($newFeed);
                        $em->flush();
                    }
                    else{
                        $addNewFeed = $newFeed;
                    }

                }
                else{

                    if ($newFeed->getAction() == NewFeed::GOAL_COMPLETE){
                        if (is_null($doneNewFeed)){
                            $doneNewFeed = $newFeed;
                            continue;
                        }

                        //get date diff
                        $dateDiff = date_diff($doneNewFeed->getDateTime(), $newFeed->getDateTime(), true);

                        //get high date
                        $date = $doneNewFeed->getDateTime() > $newFeed->getDateTime() ? $doneNewFeed->getDateTime() : $newFeed->getDateTime();

                        //get different days
                        $days = $dateDiff->format("%a");

                        if($days <= 30) {
                            $goal = $newFeed->getGoal();
                            $doneNewFeed->addGoal($goal);
                            $doneNewFeed->setDatetime($date);
                            $em->persist($doneNewFeed);

                            $em->remove($newFeed);
                            $em->flush();
                        }
                        else{
                            $doneNewFeed = $newFeed;
                        }
                    }
                }
            }

            $counter++;
            $progress->advance();

//                if ($counter > 10){
//                    $em->flush();
//                    $counter = 0;
//                }
        }

        $em->flush();

        $progress->finish();
        $output->writeln("<info>Success</info>");
    }
}