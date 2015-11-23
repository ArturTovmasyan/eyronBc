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

    /**
     * @var \Doctrine\ORM\EntityManager
     */
    protected $em;

    /**
     * @var null
     */
    protected $client = null;

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
    }
}