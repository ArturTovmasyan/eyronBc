<?php

namespace AppBundle\Features\Context;

use Behat\MinkExtension\Context\MinkAwareContext;
use Behat\Symfony2Extension\Context\KernelAwareContext;
use Behat\Testwork\Hook\Scope\BeforeSuiteScope;
use Symfony\Component\HttpFoundation\Session\Session;
use Behat\Symfony2Extension\Context\KernelDictionary;
use Behat\Behat\Context\SnippetAcceptingContext;
use Behat\MinkExtension\Context\MinkContext;

class FeatureContext extends MinkContext implements KernelAwareContext, SnippetAcceptingContext, MinkAwareContext
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
        $this->getSession()->wait(4000);
    }

    /**
     * @Given /^I am logged in$/
     */
    public function iAmLoggedIn()
    {
        $this->visit('/login');
        $this->fillField('_username', 'user@user.com');
        $this->fillField('_password', 'Test1234');
        $this->pressButton('SIGN IN');
        $this->assertSession()->pageTextContains('MOST POPULAR');

    }

    /**
     * @When I set fields data
     */
    public function iSetFieldsData()
    {
        //get session
        $session = $this->getSession(); // assume extends RawMinkContext

        //get page
        $page = $session->getPage();

        //get login block
        $loginBlock = $page->find('css', '.popover-content');

        if (null === $loginBlock) {
            throw new \LogicException('Could not find the element');
        }

        //check if login block is visible
        if ($loginBlock->isVisible()) {

            //find username and set data
            $loginBlock->fillField('_username', 'test@test.am');

            //find password and set data
            $loginBlock->fillField('_password', 'test1234');

            //find submit button
            $button = $loginBlock->findById('buttons');

            //press button
            $button->press();

        }
        else{
            throw new \LogicException('Element is not visible...');
        }
    }

    /**
     * @When I find password
     */
    public function iFindPassword()
    {
    }




//    /** @BeforeSuite */
//    public static function setupFeature(BeforeSuiteScope $scope)
//    {
//        $scope->output = shell_exec('./behat.sh');
//    }

}
