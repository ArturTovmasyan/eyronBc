<?php

namespace AppBundle\Features\Context;

use Behat\Behat\Context\Context;
use Symfony\Component\HttpFoundation\Session\Session;

class FeatureContext implements Context
{
    public function __construct(Session $session, $simpleArg)
    {
        // $session is your Symfony2 @session
    }
}