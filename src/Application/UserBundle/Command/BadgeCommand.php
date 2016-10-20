<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 10/20/16
 * Time: 3:54 PM
 */

namespace Application\UserBundle\Command;

use AppBundle\Entity\UserGoal;
use Application\UserBundle\Entity\Badge;
use Application\UserBundle\Entity\MatchUser;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Helper\ProgressBar;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * Class BadgeCommand
 * @package Application\UserBundle\Command
 */
class BadgeCommand extends ContainerAwareCommand
{
    /**
     * {@inheritdoc}
     */
    protected function configure()
    {
        $this
            ->setName('bl:badge:calculate')
            ->setDescription('This command is used to calculate user badges')
        ;
    }

    /**
     * @param InputInterface $input
     * @param OutputInterface $output
     * @return null
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {

        $output->writeln('start');

        $this->calculateInnovator($input, $output);
        $this->calculateMottivator($input, $output);

        $output->writeln('end');

        return null;
    }

    /**
     * @param InputInterface $input
     * @param OutputInterface $output
     */
    private function calculateInnovator(InputInterface $input, OutputInterface $output)
    {
        $em = $this->getContainer()->get('doctrine')->getManager();

        $output->writeln('start calculate innovator');

        $badgeService = $this->getContainer()->get('bl.badge.service');

        $goals = $em->createQuery("SELECT g
                           FROM AppBundle:Goal g
                           JOIN g.userGoal ug
                           JOIN g.author a
                           WHERE a.isAdmin != 1 AND g.publish = 1
                           ")
        ->getResult();

        $progress = new ProgressBar($output, count($goals));

        $progress->start();

        foreach ($goals as $goal){

            $score = 0;

            // get author
            $author = $goal->getAuthor(); // get author
            $publish = $goal->getPublish();

            // check is admin
            if($publish && $author && !$author->isAdmin()){
                $score ++;

                $userGoals = $goal->getUserGoal();

                // check status
                foreach ($userGoals as $userGoal){

                    $status = $userGoal->getStatus();
                    if($status == UserGoal::ACTIVE){
                        $score += 1;
                    }elseif($status == UserGoal::COMPLETED){
                        $score += 2;
                    }
                }
                $badgeService->addScore(Badge::TYPE_INNOVATOR, $author->getId(), $score);

            }

            $progress->advance();


        }

        $progress->finish();

        $output->writeln('end calculate innovator');

    }

    private function calculateMottivator(InputInterface $input, OutputInterface $output)
    {
        $em = $this->getContainer()->get('doctrine')->getManager();

        $output->writeln('start calculate motivator');

        $badgeService = $this->getContainer()->get('bl.badge.service');

        $successStories = $em->createQuery("SELECT s
                           FROM AppBundle:SuccessStory  s
                           JOIN s.goal g
                           JOIN g.userGoal ug
                           JOIN g.author a
                           WHERE a.isAdmin != 1 AND g.publish = 1
                           ")
            ->getResult();

        $progress = new ProgressBar($output, count($successStories));

        $progress->start();

        foreach ($successStories as $successStory){

            $goal = $successStory->getGoal();
            // get author
            $author = $goal->getAuthor(); // get author
            $publish = $goal->getPublish();

            // check is admin
            if($publish && $author && !$author->isAdmin()){

                $voters = $successStory->getVotersCount();
                $badgeService->addScore(Badge::TYPE_MOTIVATOR, $author->getId(), $voters);
            }

            $progress->advance();
        }

        $progress->finish();

        $output->writeln('end calculate motivator');

    }

}