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
use AppBundle\Entity\UserGoal;
use AppBundle\Model\PublishAware;
use Application\UserBundle\Entity\User;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Helper\ProgressBar;
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
        $file = __DIR__ . '/Files/Goal.json' ;
        $jsonData = file_get_contents($file);
        $arrayData = json_decode($jsonData, true);

        $em = $this->getContainer()->get('doctrine')->getManager();
        $blService = $this->getContainer()->get('bl_service');

        $output->writeln("<info>Starting</info>");

        $progress = new ProgressBar($output, count($arrayData['results']));
        $progress->start();

        $user = $em->getRepository('ApplicationUserBundle:User')->findByUsername('admin');
        if (count($user)){
            $user = $user[0];
        }
        else {
            $encoder = $this->getContainer()->get('security.password_encoder');

            $user = new User();
            $user->setEmail('admin');

            $encoded = $encoder->encodePassword($user, 'admin1324');
            $user->setPassword($encoded);
            $em->persist($user);
            $em->flush();
        }

        $counter = 0;
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
            $goal->setAuthor($user);

            $goalImage = new GoalImage();
            $goalImage->setFileName($imageName);
            $goalImage->setFileOriginalName($imageOriginName);

            file_put_contents($goalImage->getAbsolutePath() . $goalImage->getFileName() , file_get_contents($imagePath));

            $blService->generateFileForCover($goalImage);
            $goalImage->setCover(true);
            $blService->generateFileForList($goalImage);
            $goalImage->setList(true);

            $goal->addImage($goalImage);

            $userGoal = new UserGoal();
            $userGoal->setGoal($goal);
            $userGoal->setUser($user);
            $userGoal->setPrivacy(UserGoal::PUBLIC_PRIVACY);
            $userGoal->setDoDate(new \DateTime('+1 year'));

            $em->persist($goal);
            $em->persist($goalImage);
            $em->persist($userGoal);

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