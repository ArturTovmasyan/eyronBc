<?php
/**
 * Created by PhpStorm.
 * User: aram
 * Date: 9/27/15
 * Time: 11:10 AM
 */

namespace AppBundle\Twig\Extension;

use Symfony\Component\DependencyInjection\Container;
use AppBundle\Entity\Goal;
use AppBundle\Entity\NewFeed;
use AppBundle\Entity\UserGoal;
use Application\UserBundle\Entity\User;

/**
 * Class OllTwigExtension
 * @package AppBundle\Twig\Extension
 */
class OllTwigExtension extends \Twig_Extension
{
    /**
     * @var Container
     */
    protected $container;

    /**
     * @var EntityManagerInterface
     */
    protected $entityManager;

    /**
     * OllTwigExtension constructor.
     * @param Container $container
     */
    public function __construct(Container $container)
    {
        $this->entityManager = $container->get('doctrine')->getEntityManager();
        $this->container = $container;
        $this->session = $container->get('session');
    }

    /**
     * @return array
     */
    public function getFilters()
    {
        return array(
            new \Twig_SimpleFilter('sliceString', array($this, 'sliceString')),
            new \Twig_SimpleFilter('removeTag', array($this, 'removeTag'))
        );
    }

    /**
     * @return array
     */
    public function getFunctions()
    {
        return array(
            new \Twig_SimpleFunction('replaceString', array($this, 'replaceString')),
            new \Twig_SimpleFunction('popularGoals', array($this, 'popularGoals')),
            new \Twig_SimpleFunction('getNewAction', array($this, 'getNewAction')),
            new \Twig_SimpleFunction('getPolicyLink', array($this, 'getPolicyLink')),
            new \Twig_SimpleFunction('isMobile', array($this, 'isMobile')),
            new \Twig_SimpleFunction('isTablet', array($this, 'isTablet')),
            new \Twig_SimpleFunction('goalFriends', array($this, 'goalFriends')),
            new \Twig_SimpleFunction('isMyGoal', array($this, 'isMyGoal')),
            new \Twig_SimpleFunction('getSession', array($this, 'getSession')),
            new \Twig_SimpleFunction('locations', array($this, 'locations')),
            new \Twig_SimpleFunction('getReferer', array($this, 'getReferer'))
        );
    }
    /**
     * @param $search
     * @param $replace
     * @param $object
     * @return mixed
     */
    public function replaceString($search, $replace, $object)
    {
        $content = str_replace($search, $replace, $object);
        return $content;
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

    /**
     * @param $actionCode
     * @return mixed
     */
    public function getNewAction($actionCode)
    {
        $translator = $this->container->get('translator');
        if ($actionCode == NewFeed::GOAL_CREATE){
            return $translator->trans('goal.create', array(), 'newsFeed');
        }
        if ($actionCode == NewFeed::GOAL_ADD){
            return $translator->trans('goal.add', array(), 'newsFeed');
        }
        if ($actionCode == NewFeed::GOAL_COMPLETE){
            return $translator->trans('goal.complete', array(), 'newsFeed');
        }
        if ($actionCode == NewFeed::SUCCESS_STORY){
            return $translator->trans('goal.success_story', array(), 'newsFeed');
        }
        if ($actionCode == NewFeed::COMMENT){
            return $translator->trans('goal.comment', array(), 'newsFeed');
        }

        return '';
    }

    /**
     * @return string
     */
    public function getPolicyLink()
    {
        $em = $this->container->get('doctrine')->getManager();
        $pages = $em->getRepository('AppBundle:Page')->findAllByOrdered();
        $route = $this->container->get('router');

        if($pages){

            foreach($pages as $page){
                if (strpos(strtolower($page->getName()), 'policy') !== false){
                    return $route->generate('page', array('slug' => $page->getSlug()));
                }
            }
        }

        return '#';
    }

    /**
     * @return bool
     */
    public function isMobile()
    {
        return $this->container->get('mobile_detect.mobile_detector')->isMobile();
    }

    /**
     * @return bool
     */
    public function isTablet()
    {
        return $this->container->get('mobile_detect.mobile_detector')->isTablet();
    }

    /**
     * @param $userId
     * @param $count
     * @return mixed
     */
    public function goalFriends($userId, $count = null)
    {
        $goalFriends = $this->entityManager->getRepository('AppBundle:Goal')->findGoalFriends($userId, false, $count);
        return $goalFriends;
    }

    /**
     * @param Goal $goal
     * @param User $user
     * @param $type
     * @return bool
     */
    public function isMyGoal(Goal $goal, $user, $type)
    {
        // check user
        if($user instanceof User){

            // get user goals
            $userGoals = $user->getUserGoal();

            // check user count
            if($userGoals->count() > 0){

                // get array from persist collection
                $userGoalsArray = $userGoals->toArray();

                // check if in array
                if(array_key_exists($goal->getId(), $userGoalsArray)){

                    // get user current goal
                    $userGoal = $userGoalsArray[$goal->getId()];

                    // if for add ro list return true
                    if($type == "add" || $userGoal ->getStatus() == UserGoal::COMPLETED ){
                        return true;
                    }
                }
            }
        }

        return false;
    }

    /**
     * @param $text
     * @return mixed
     */
    public function removeTag($text)
    {
        $content = preg_replace('/#([^\s#])/', '$1',  $text);

        return  $content;
    }

    /**
     * @param $text
     * @return mixed
     */
    public function getSession($text)
    {
        //get session
        $session = $this->session;

        //set addUrl default data
        $addUrl = null;

        //if session have data with nam $text
        if($session->has($text)) {

            //get add url in session
            $addUrl = $session->get($text);

            $session->remove($text);
        }

        return $addUrl;
    }

    /**
     * @param $goals
     * @return array
     * @throws \Exception
     */
    public function locations($goals)
    {
        // empty data for return result
        $result = array();

        // check data
        if($goals && is_array($goals)){

            // loop for goals
            foreach($goals as $item){

                // is user goal
                if($item instanceof UserGoal){
                    $id = $item->getGoal()->getId();
                    $goal = $item->getGoal();
                }
                // is goal
                elseif ($item instanceof Goal){
                    $id = $item->getId();
                    $goal = $item;
                }
                else {
                    throw new \Exception("Error");
                }

                $result[$id] = array(
                    'title' => $goal->getTitle(),
                    'latitude' => $goal->getLat(),
                    'longitude' => $goal->getLng(),
                    'slug' => $goal->getSlug(),
                    'image' => $goal->getListPhotoDownloadLink(),
                    'status' => $goal->getIsMyGoal()
                );
            }
        }


        return $result;
    }

    /**
     * @param $text
     * @return mixed
     */
    public function sliceString($text)
    {
        //clear html tag and spaces
        $text = strip_tags($text);
        $text = htmlspecialchars(trim($text));

        //check if text less then 160 symbol
        if(strlen($text) > 160) {

            //cut string
            $content = substr($text, 0, 160).".";

            //get last dot position
            $pos = strrpos($content, '.');

            //check if dot not exist
            if(!$pos) {
                $pos = strrpos($content, ',');
            }

            //cut text with dot position
            $content = substr($content, 0, $pos + 1);
        }
        else {
            $content = $text;
        }

        return $content;
    }

    /**
     * @return string
     */
    public function getReferer()
    {
        $referer = $this->container->get('request')->headers->get('referer');

        if($referer){
            return $referer;
        }
        return "";
    }

    public function getName()
    {
        return 'bl_oll_twig_extensions';
    }
}