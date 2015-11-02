<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 10/30/15
 * Time: 5:40 PM
 */


namespace AppBundle\Command;

use AppBundle\Entity\Goal;
use AppBundle\Entity\GoalImage;
use AppBundle\Model\PublishAware;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;


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

        // get entity manager
        $em = $this->getContainer()->get('doctrine')->getManager();

        $blService = $this->getContainer()->get('bl_service');

        $output->writeln("<info>Starting</info>");

        // loop for data
        foreach($arrayData['results'] as $data){

//            $category = $data['categories_'];
//            $didCount = $data['didCount'];
//            $goalID = $data['goalID'];
//            $likesCount = $data['likesCount'];
//            $listedCount = $data['listedCount'];


            $imageName = $data['goalImage']['name'];
            $imagePath = $data['goalImage']['url'];
            $imageOriginName = array_key_exists('imageName', $data) ? $data['imageName'] : 'img';

            $description = array_key_exists('description', $data) ? $data['description'] : ' ';
            $createdAt = $data['createdAt'];
            $createdAt = substr($createdAt, 0, 10);
            $updatedAt = $data['updatedAt'];
            $updatedAt = substr($updatedAt, 0, 10);
            $title = $data['title'];

            $create = \DateTime::createFromFormat('Y-m-d', $createdAt);
            $update = \DateTime::createFromFormat('Y-m-d', $updatedAt);

            $goal = new Goal();
            $goal->setTitle($title);
            $goal->setDescription($description);
            $goal->setCreated($create);
            $goal->setUpdated($update);
            $goal->setStatus(Goal::PUBLIC_PRIVACY);
            $goal->setPublish(PublishAware::PUBLISH);

            $goalImage = new GoalImage();
            $goalImage->setFileName($imageName);
            $goalImage->setFileOriginalName($imageOriginName);

            file_put_contents($goalImage->getAbsolutePath() . '/' . $goalImage->getFileName() , file_get_contents($imagePath));

            $blService->generateFileForCover($goalImage);
            $goalImage->setCover(true);
            $blService->generateFileForList($goalImage);
            $goalImage->setList(true);

            $goal->addImage($goalImage);

            $em->persist($goal);
            $em->persist($goalImage);

        }

        $em->flush();

        $output->writeln("<info>Success</info>");
    }
}