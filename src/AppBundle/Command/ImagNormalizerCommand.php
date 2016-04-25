<?php

namespace AppBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use finfo;

class ImagNormalizerCommand extends ContainerAwareCommand
{
    protected function configure()
    {
        $this
            ->setName('image:normalize')
            ->setDescription('Normalize image extensions');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $begin = 0;
        $usersCount = 0;
        $em = $this->getContainer()->get('doctrine')->getManager();
        $file_info = new finfo(FILEINFO_MIME);

        do {
            $users = $em->getRepository('ApplicationUserBundle:User')->findByLimit(ActiveTimeCommand::USER_LIMIT * $begin++, ActiveTimeCommand::USER_LIMIT);
            if ($users) {
                foreach ($users as $user) {
                    if($user->getFileName()){
                        $extension = pathinfo($user->getFileName())['extension'];
                        if(!$extension){
                            $path = $user->getAbsolutePath();
                            $oldName = $user->getFileName();
                            $file = file_get_contents($path.$oldName);
                            $mime_type = $file_info->buffer($file);
                            $mime  = explode(';', $mime_type);
                            $extension = substr($mime[0] ,strpos($mime[0], '/') + 1);
                            $name = (md5(microtime()) . '.' . $extension);
                            $user->setFileName($name);
                            rename( $path.$oldName, $path.$name);
                            $usersCount ++;
                        }
                    }
                }

            }

            $em->flush();

        } while (count($users));

        $output->writeln('Normalized  ' . $usersCount . ' images ');
    }
}
