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
            ->addArgument('clientId', InputArgument::REQUIRED, 'Type a client id for GA')
            ->setDescription('Send Analytics request');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        //get url in command argument
        $url = $input->getArgument('url');
        
        //get client id in command argument
        $clientId = $input->getArgument('clientId');
        
        $analyticService = $this->getContainer()->get('google_analytic');
        $analyticService->sendEventInGoogleAnalytics($url, $clientId);
    }
}