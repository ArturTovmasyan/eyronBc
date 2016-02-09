<?php

namespace AppBundle\Tests\Controller;

use AppBundle\Entity\UserGoal;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class BaseClass extends WebTestCase
{
    /**
     * @var \Doctrine\ORM\EntityManager
     */
    protected $em;

    /**
     * @var \Doctrine\ORM\EntityManager
     */
    protected $container;

    /**
     * @var null
     */
    protected $client = null;

    /**
     * @var null
     */
    protected $clientSecond = null;

    /**
     * this function create default client for testes
     *
     * {@inheritDoc}
     */
    public function setUp()
    {
        self::bootKernel();
        $this->container = static::$kernel->getContainer();
        $this->em = static::$kernel->getContainer()
            ->get('doctrine')
            ->getManager();
        $this->client = static::createClient(array(), array(
            'PHP_AUTH_USER' => 'admin@admin.com',
            'PHP_AUTH_PW'   => 'Test1234',
        ));
        $this->client->enableProfiler();
        $this->clientSecond = static::createClient(array(), array(
            'PHP_AUTH_USER' => 'user@user.com',
            'PHP_AUTH_PW'   => 'Test1234',
        ));
        $this->clientSecond->enableProfiler();
    }

    /**
     * this function create filter Provider data , client for testes
     */
    public function filterProvider()
    {
        self::bootKernel();
        $this->em = static::$kernel->getContainer()
            ->get('doctrine')
            ->getManager();
        $this->client = static::createClient(array(), array(
            'PHP_AUTH_USER' => 'admin@admin.com',
            'PHP_AUTH_PW'   => 'Test1234',
        ));
        $this->client->enableProfiler();

        $data = array(
            array('filter' => array('f_' . UserGoal::URGENT_IMPORTANT => 'on', 'd'=>false)),
            array('filter' => array('f_' . UserGoal::URGENT_IMPORTANT => 'on', 'f_' . UserGoal::URGENT_NOT_IMPORTANT => 'on', 'd'=>false)),
            array('filter' => array('f_' . UserGoal::URGENT_IMPORTANT => 'on', 'f_' . UserGoal::URGENT_NOT_IMPORTANT => 'on', 'f_' . UserGoal::NOT_URGENT_IMPORTANT => 'on', 'd'=>false)),
            array('filter' => array('f_' . UserGoal::URGENT_IMPORTANT => 'on', 'f_' . UserGoal::URGENT_NOT_IMPORTANT => 'on', 'f_' . UserGoal::NOT_URGENT_IMPORTANT => 'on', 'f_' . UserGoal::NOT_URGENT_NOT_IMPORTANT=> 'on', 'd'=>false)),
        );

        return $data;
    }

    /**
     * this function create file Provider data , client for testes
     */
    public function fileProvider()
    {
        self::bootKernel();
        $this->container = static::$kernel->getContainer();
        $this->em = static::$kernel->getContainer()
            ->get('doctrine')
            ->getManager();
        $this->client = static::createClient(array(), array(
            'PHP_AUTH_USER' => 'admin@admin.com',
            'PHP_AUTH_PW'   => 'Test1234',
        ));
        $this->client->enableProfiler();

        $files = $this->em->getRepository('AppBundle:GoalImage')->findAll();

        $fileNames = array();

        for($i = 1; $i<count($files); $i++)
        {
            $fileNames[] =
                array(
                    'file'.$i => $files[$i]->getFileName()
                );

        }

        return $fileNames;
    }

    /**
     * this function create all file Provider data , client for testes
     */
    public function allFileProvider()
    {
        self::bootKernel();
        $this->container = static::$kernel->getContainer();
        $this->em = static::$kernel->getContainer()
            ->get('doctrine')
            ->getManager();
        $this->client = static::createClient(array(), array(
            'PHP_AUTH_USER' => 'admin@admin.com',
            'PHP_AUTH_PW'   => 'Test1234',
        ));
        $this->client->enableProfiler();

        $files = $this->em->getRepository('AppBundle:GoalImage')->findAll();

        $fileNames = array();

        for($i = 0; $i<count($files); $i++)
        {
            $fileNames[] =
                array(
                    'file'.$i => $files[$i]->getId()
                );

        }

        return $fileNames;
    }

    /**
     * this function create goal data provider , client for testes
     */
    public function goalProvider()
    {
        self::bootKernel();
        $this->em = static::$kernel->getContainer()
            ->get('doctrine')
            ->getManager();
        $this->client = static::createClient(array(), array(
            'PHP_AUTH_USER' => 'admin@admin.com',
            'PHP_AUTH_PW'   => 'Test1234',
        ));
        $this->client->enableProfiler();

        $goals = $this->em->getRepository('AppBundle:Goal')->findAll();

        $goalIds = array();

        for($i = 0; $i<count($goals); $i++)
        {
            $goalIds[] =
                array(
                    'file'.$i => $goals[$i]->getId()
                );

        }

        return $goalIds;
    }

    /**
     * this function create user goal data provider , client for testes
     */
    public function userGoalProvider()
    {
        self::bootKernel();
        $this->em = static::$kernel->getContainer()
            ->get('doctrine')
            ->getManager();
        $this->client = static::createClient(array(), array(
            'PHP_AUTH_USER' => 'admin@admin.com',
            'PHP_AUTH_PW'   => 'Test1234',
        ));
        $this->client->enableProfiler();

        $userGoals = $this->em->getRepository('AppBundle:UserGoal')->findAll();

        $userGoalIds = array();

        for($i = 0; $i<count($userGoals); $i++)
        {
            $userGoalIds[] =
                array(
                    'file'.$i => $userGoals[$i]->getId()
                );

        }

        return $userGoalIds;
    }
}