<?php

namespace AppBundle\Features\Context;

use Symfony\Component\HttpFoundation\Session\Session;
use Behat\Symfony2Extension\Context\KernelDictionary;

use Behat\Behat\Context\ClosuredContextInterface;
use Behat\Behat\Context\TranslatedContextInterface;
use Behat\Behat\Context\BehatContext;
use Behat\Behat\Context\SnippetAcceptingContext;

use Behat\MinkExtension\Context\MinkContext;

class FeatureContext extends MinkContext implements SnippetAcceptingContext
{
    use KernelDictionary;

    public function __construct(Session $session, $simpleArg)
    {
    }

    /**
     * @When I wait for angular
     */
    public function iWaitForAngular()
    {
        // Wait for angular to load
        $this->getSession()->wait(6000);
    }

}