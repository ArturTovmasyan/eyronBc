<?php
/**
 * Created by PhpStorm.
 * User: andranik
 * Date: 9/27/16
 * Time: 5:54 PM
 */
namespace AppBundle\Command;

use Application\AffiliateBundle\Entity\Affiliate;
use Application\AffiliateBundle\Entity\AffiliateType;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Helper\ProgressBar;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use AppBundle\Entity\PlaceType;

class CreateAffiliateCommand extends ContainerAwareCommand
{
    /**
     * {@inheritdoc}
     */
    protected function configure()
    {
        $this
            ->setName('bl:create:affiliates')
            ->setDescription('This command is used to create goals affiliates')
            ->setDefinition(array(
                new InputArgument('affiliateId', InputArgument::REQUIRED, 'Affiliate type id')
            ));
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $em = $this->getContainer()->get('doctrine')->getManager();
        $googlePlace =  $this->getContainer()->get('app.google_place');
        $routing = $this->getContainer()->get('router');

        $goals = $em->createQuery("SELECT g
                          FROM AppBundle:Goal g
                          INDEX BY g.id
                          WHERE g.lat IS NOT NULL AND g.lng IS NOT NULL")
            ->getResult();

        $output->writeln('Start finding goals cities');
        $progress = new ProgressBar($output, count($goals));
        $progress->start();

        $resultArray = [];
        foreach($goals as $goal){
            $result = $googlePlace->getPlace($goal->getLat(), $goal->getLng());
            if (isset($result[PlaceType::city]) && isset($result[PlaceType::country_short_name])){
                $resultArray[$result[PlaceType::country_short_name]] = [$result[PlaceType::city] => $goal->getId()];
            }

            $progress->advance();
        }

        $progress->finish();
        $output->writeln('Finish finding goals cities');


        $affiliateId = $input->getArgument('affiliateId');
        $affiliateType = $em->getRepository('ApplicationAffiliateBundle:AffiliateType')->find($affiliateId);
        if (!$affiliateType){
            throw new \Exception('Affiliate Type not found');
        }

        $output->writeln('Read excel data');
        $path = __DIR__ . '/Booking/cities_excel.xls';
        $objPHPExcel = \PHPExcel_IOFactory::load($path);

        $output->writeln('Start ufi code finding');
        $progress = new ProgressBar($output);
        $progress->start();

        $cityCell    = 'A2';
        $countryCell = 'C2';
        $ufiCell     = 'D2';

        $sheetData = $objPHPExcel->getActiveSheet();

        do {
            $city    = strtolower($sheetData->getCell($cityCell)->getValue());
            $country = strtolower($sheetData->getCell($countryCell)->getValue());

            if (!$city && !$country){
                break;
            }

            if (isset($resultArray[$country]) && isset($resultArray[$country][$city])){

                $ufi = $sheetData->getCell($ufiCell)->getValue();

                if (!is_null($ufi)) {
                    $affiliate = new Affiliate();
                    $affiliate->setName($city);
                    $affiliate->setAffiliateType($affiliateType);
                    $affiliate->setUfi($ufi);

                    $link = $routing->generate('inner_goal', ['slug' => $goals[$resultArray[$country][$city]]->getSlug()]);
                    $affiliate->setLinks([$link]);

                    $em->persist($affiliate);
                    $em->flush();
                }

            }

            $cityCellCrd    = \PHPExcel_Cell::coordinateFromString($cityCell);
            $countryCellCrd = \PHPExcel_Cell::coordinateFromString($countryCell);
            $ufiCellCrd     = \PHPExcel_Cell::coordinateFromString($ufiCell);

            ++$cityCellCrd[1];
            ++$countryCellCrd[1];
            ++$ufiCellCrd[1];

            $cityCell    = implode($cityCellCrd);
            $countryCell = implode($countryCellCrd);
            $ufiCell     = implode($ufiCellCrd);

            $progress->advance();

        } while(true);

        $progress->finish();
        $em->flush();
        $output->writeln('Success!!!');
    }
}