<?php

namespace AppBundle\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class BaseClass extends WebTestCase
{
    const HTTP_STATUS_OK = 200;
    const HTTP_STATUS_REDIRECT = 302;
    // constants for status
    const ACTIVE = 1;
    const COMPLETED = 2;

    // constants for filter in twig
    const URGENT_IMPORTANT = 1;
    const URGENT_NOT_IMPORTANT = 2;
    const NOT_URGENT_IMPORTANT = 3;
    const NOT_URGENT_NOT_IMPORTANT = 4;

    // constants for steps
    const TO_DO = 0;
    const DONE = 1;

    /**
     * @var \Doctrine\ORM\EntityManager
     */
    protected $em;

    /**
     * @var null
     */
    protected $client = null;

    /**
     * @var null
     */
    protected $clientSecond = null;

    /**
     * {@inheritDoc}
     */
    public function setUp()
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
        $this->clientSecond = static::createClient(array(), array(
            'PHP_AUTH_USER' => 'user@user.com',
            'PHP_AUTH_PW'   => 'Test1234',
        ));
        $this->clientSecond->enableProfiler();
    }

    /**
     *
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
        $this->clientSecond = static::createClient(array(), array(
            'PHP_AUTH_USER' => 'user@user.com',
            'PHP_AUTH_PW'   => 'Test1234',
        ));
        $this->clientSecond->enableProfiler();

        $filters = array(
            array('f_' . BaseClass::URGENT_IMPORTANT => 'on',
                    'd'=>true),
            array('f_' . BaseClass::URGENT_IMPORTANT => 'on',
                    'f_' . BaseClass::URGENT_NOT_IMPORTANT => 'on',
                    'd'=>false),
            array('f_' . BaseClass::URGENT_IMPORTANT => 'on',
                    'f_' . BaseClass::URGENT_NOT_IMPORTANT => 'on',
                    'f_' . BaseClass::NOT_URGENT_IMPORTANT => 'on',
                    'd'=>true),
            array('f_' . BaseClass::URGENT_IMPORTANT => 'on',
                    'f_' . BaseClass::URGENT_NOT_IMPORTANT => 'on',
                    'f_' . BaseClass::NOT_URGENT_IMPORTANT => 'on',
                    'f_' . BaseClass::NOT_URGENT_NOT_IMPORTANT=> 'on',
                    'd'=>false),
            array('f_' . BaseClass::URGENT_NOT_IMPORTANT => 'on',
                    'f_' . BaseClass::NOT_URGENT_IMPORTANT => 'on',
                    'f_' . BaseClass::NOT_URGENT_NOT_IMPORTANT=> 'on',
                    'd'=>true)
        );

        return array(array($filters));
    }
}