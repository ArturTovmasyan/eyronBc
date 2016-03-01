<?php

namespace AppBundle\Features\Context;

use Behat\Behat\Tester\Exception\PendingException;
use Behat\Behat\Context\Context;
use Behat\Mink\Exception\Exception;
use Behat\MinkExtension\Context\MinkAwareContext;
use Behat\Symfony2Extension\Context\KernelAwareContext;
use Symfony\Component\HttpFoundation\Session\Session;
use Behat\Symfony2Extension\Context\KernelDictionary;

use Behat\Behat\Context\ClosuredContextInterface;
use Behat\Behat\Context\TranslatedContextInterface;
use Behat\Behat\Context\BehatContext;
use Behat\Behat\Context\SnippetAcceptingContext;
use Behat\MinkExtension\Context\MinkContext;

class FeatureContext extends MinkContext implements KernelAwareContext, SnippetAcceptingContext, MinkAwareContext
{
    use KernelDictionary;

    public function __construct(Session $session, $simpleArg)
    {
    }

//    /** @BeforeScenario */
//    public function beforeScenario()
//    {
//        var_dump($this->getMinkParameter('base_url'));
//    }

    /**
     * @return \Behat\Mink\Element\DocumentElement
     */
    protected function getPage()
    {
        return $this->getSession()->getPage();
    }

    /**
     * @When I fill in the search box with :arg1
     */
    public function iFillInTheSearchBoxWith($searchTerm)
    {
        $ele = $this->getPage()->find('css', 'input[name="search"]');
        dump($ele);exit;
        $ele->setValue($searchTerm);
    }

    /**
     * @When I press the search button
     */
    public function iPressTheSearchButton()
    {
        $this->getPage()->findButton('searchButton')->press();
    }

}
