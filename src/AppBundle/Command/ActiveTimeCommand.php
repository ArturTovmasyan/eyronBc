<?php

namespace AppBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class ActiveTimeCommand extends ContainerAwareCommand
{
    const USER_LIMIT = 1000;
    /**
     * {@inheritdoc}
     */
    protected function configure()
    {
        $this
            ->setName('bl:set:active')
            ->setDescription('Set users active times ');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $begin = 0;
        $usersCount = 0;
        $em = $this->getContainer()->get('doctrine')->getManager();

        do {
            $users = $em->getRepository('ApplicationUserBundle:User')->findByLimit(self::USER_LIMIT * $begin++, self::USER_LIMIT);
            if ($users) {
                foreach ($users as $user) {
                    $activeTime = $user->getMostActiveTime();
                    $user->setActiveTime($activeTime);
                    $usersCount++;
                }
            }

            $em->flush();

        } while (count($users));

        $output->writeln('set active time  ' . $usersCount . ' users ');
    }
}