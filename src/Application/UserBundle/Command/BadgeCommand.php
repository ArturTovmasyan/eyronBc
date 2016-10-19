<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 10/19/16
 * Time: 11:06 AM
 */

namespace Application\UserBundle\Command;

use Application\UserBundle\Entity\Badge;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Helper\ProgressBar;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
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
            ->setDescription('This command is used to calculate badges')
            ->addArgument('type', InputArgument::REQUIRED, 'Badge Type')
            ->addArgument('user', InputArgument::REQUIRED, 'User id')
            ->addArgument('score', InputArgument::REQUIRED, 'Score');
    }

    /**
     * @param InputInterface $input
     * @param OutputInterface $output
     * @return null|int null or 0
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $type = $input->getArgument('type'); // get badge type
        $userId = $input->getArgument('user'); // get user id
        $score = $input->getArgument('score'); // get score

        $em = $this->getContainer()->get('doctrine')->getManager(); // get entity manager
        $user = $em->getRepository("ApplicationUserBundle:User")->find($userId); // find user

        // check badge
        if($type != Badge::TYPE_INNOVATOR &&
            $type != Badge::TYPE_MOTIVATOR &&
            $type != Badge::TYPE_TRAVELLER ){

            throw new \RuntimeException("Wrong badge type, must be "
                . Badge::TYPE_INNOVATOR." OR ". Badge::TYPE_MOTIVATOR." OR "
                .Badge::TYPE_TRAVELLER." ");
        }

        // check user
        if(!$user){
            throw new \RuntimeException("User with '$userId' id was not found");
        }

        $output->writeln('start');

        // get badge service
        $badgeService = $this->getContainer()->get('bl.badge.service');

        sleep(10);

        // add to score
        $badgeService->addScore($type, $user, $score);

        $output->writeln('success');
        return 0;


    }

}