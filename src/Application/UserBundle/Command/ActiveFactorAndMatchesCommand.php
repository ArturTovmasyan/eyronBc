<?php
/**
 * Created by PhpStorm.
 * User: andranik
 * Date: 7/29/16
 * Time: 1:31 PM
 */
namespace Application\UserBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Helper\ProgressBar;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;


class ActiveFactorAndMatchesCommand extends ContainerAwareCommand
{
    /**
     * {@inheritdoc}
     */
    protected function configure()
    {
        $this
            ->setName('bl:active_factor:match:calculator')
            ->setDescription('This command is used to calculate user active factor and match matches');
    }

    /**
     * @param InputInterface $input
     * @param OutputInterface $output
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $em = $this->getContainer()->get('doctrine')->getManager();

        $users = $em->createQuery("SELECT u as user,
                                      (SELECT COUNT(cmt) FROM ApplicationCommentBundle:Comment cmt WHERE cmt.author = u) as commentCount,
                                      (SELECT COUNT(ss)  FROM AppBundle:SuccessStory ss WHERE ss.user = u) as storyCount,
                                      (SELECT COUNT(ug)  FROM AppBundle:UserGoal ug WHERE ug.user = u) as goalCount
                                   FROM ApplicationUserBundle:User u
                                   INDEX BY u.id
                                   WHERE DATE(u.factorCommandDate) < DATE(:currentDate) OR u.factorCommandDate IS NULL
                                   ORDER BY u.factorCommandDate ASC")
            ->setParameter('currentDate', new \DateTime())
            ->setMaxResults(100)
            ->getResult();

        if (count($users) == 0){
            return;
        }


        foreach($users as $userId => &$user){

            $stmt = $em->getConnection()
                ->prepare("SELECT u1.id AS u1_id, u2.id AS u2_id,
                        ((SELECT COUNT(ug1.id)
                         FROM users_goals ug1
                         INNER JOIN users_goals ug2 ON (ug2.goal_id = ug1.goal_id) AND (ug2.is_visible = true OR ug2.user_id = -1)
                         WHERE (ug1.user_id = u1.id AND ug2.user_id = u2.id) AND (ug1.is_visible = true OR ug1.user_id = -1)) /

                        (SELECT COUNT(_ug2.id)
                         FROM users_goals _ug2
                         WHERE (_ug2.user_id = u2.id) AND (_ug2.is_visible = true OR _ug2.user_id = -1)) ) AS commonFactor,

                        (SELECT COUNT(ug1_.id)
                         FROM users_goals ug1_
                         INNER JOIN users_goals ug2_ ON (ug2_.goal_id = ug1_.goal_id) AND (ug2_.is_visible = true OR ug2_.user_id = -1)
                         WHERE (ug1_.user_id = u1.id AND ug2_.user_id = u2.id) AND (ug1_.is_visible = true OR ug1_.user_id = -1)) AS commonGoals


                        FROM fos_user u1
                        INNER JOIN fos_user u2 ON (u2.id <> u1.id)
                        WHERE u1.id = :userId
                        HAVING commonFactor > 0.4 AND commonGoals > 2
                        ORDER BY commonFactor DESC, commonGoals DESC");

            $stmt->bindValue('userId', $userId);
            $stmt->execute();
            $commons = $stmt->fetchAll();


            $user['user']->setActiveFactor($user['commentCount'] + $user['storyCount'] + 0.5 * $user['goalCount']);
            $user['user']->setFactorCommandDate(new \DateTime());
        }

        $em->flush();

//        $progress = new ProgressBar($output, $users);
//        $progress->start();
//
//        $progress->advance();
//
//        $progress->finish();
        $output->writeln('success');
    }

}