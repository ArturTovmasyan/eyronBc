<?php
/**
 * Created by PhpStorm.
 * User: andranik
 * Date: 5/27/16
 * Time: 2:23 PM
 */
namespace AppBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class AnalyticsCurlCommand extends ContainerAwareCommand
{
    /**
     * {@inheritdoc}
     */
    protected function configure()
    {
        $this
            ->setName('bl:analytics:request')
            ->addArgument('url', InputArgument::REQUIRED, 'Type a request url')
            ->setDescription('Send Analytics request');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $url = $input->getArgument('url');
        $analyticService = $this->getContainer()->get('google_analytic');
        $analyticService->sendEventInGoogleAnalytics($url);
    }
}