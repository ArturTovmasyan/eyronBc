<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 10/30/15
 * Time: 5:40 PM
 */


namespace AppBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Translation\Loader\JsonFileLoader;


class MigrationCommand extends ContainerAwareCommand
{

    /**
     *
     */
    protected function configure()
    {
        $this
            ->setName('bl:migration:migrate')
            ->setDescription('Migrate database')
        ;
    }

    /**
     * @param InputInterface $input
     * @param OutputInterface $output
     * @return int|null|void
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        // get file
        $file = __DIR__ . '/Files/Goal.json' ;

        // get json file form path
        $jsonData = file_get_contents($file);

        //get array from json
        $arrayData = json_decode($jsonData, true);

        foreach($arrayData['results'] as $data){
            dump($data);
        }


        exit;

//        dump($data);

        // get Entity manager
        $em = $this->getContainer()->get("doctrine")->getManager();


        $output->writeln("<info>Starting</info>");

        $output->writeln("<info>Success</info>");
    }
}