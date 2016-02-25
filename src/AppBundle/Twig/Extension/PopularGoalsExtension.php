<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 9/27/15
 * Time: 11:10 AM
 */

namespace AppBundle\Twig\Extension;
use Doctrine\ORM\EntityManagerInterface;

/**
 * Class PopularGoalsExtension
 * @package AppBundle\Twig\Extension
 */
class PopularGoalsExtension extends \Twig_Extension
{
    /**
     * @var EntityManagerInterface
     */
    protected $entityManager;

    /**
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * @return array
     */
    public function getFunctions()
    {
        return array(
            new \Twig_SimpleFunction('popularGoals', array($this, 'popularGoals'))
        );
    }

    /**
     * @param $user
     * @param $count
     * @return mixed
     */
    public function popularGoals($user, $count)
    {
        $popularGoals = $this->entityManager->getRepository("AppBundle:Goal")->findPopular($user, $count);
        $this->entityManager->getRepository("AppBundle:Goal")->findGoalStateCount($popularGoals);
        return $popularGoals;
    }

    public function getName()
    {
        return 'bl_popular_goals_extension';
    }
}