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
        $this->getSession()->wait(6000);
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
     * @When I find :field and set :fieldData
     */
    public function iFindAndSet($field, $fieldData)
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
            $loginBlock->fillField($field, $fieldData);

        }
        else{
            throw new \LogicException('Element is not visible...');
        }
    }

    /**
     * @When I find and press button in login
     */
    public function iFindAndPressButtonInLogin()
    {
        //get session
        $session = $this->getSession(); // assume extends RawMinkContext

        //get page
        $page = $session->getPage();

        //get login block
        $loginBlock = $page->find('css', '.popover-content');

        //find submit button
        $button = $loginBlock->findById('buttons');

        //press button
        $button->press();

    }

    /**
     * @Then I click on goal create
     */
    public function iClickOnGoalCreate()
    {
        //get session
        $session = $this->getSession(); // assume extends RawMinkContext

        //get page
        $page = $session->getPage();

        //get login block
//        $createBlock = $page->find('css', '.button');

        //find submit button
        $button = $page->findButton('btn_publish');

        $button->press();

    }

    /**
     * @Then I click on goal save
     */
    public function iClickOnGoalSave()
    {
        //get session
        $session = $this->getSession(); // assume extends RawMinkContext

        //get page
        $page = $session->getPage();

        //get login block
//        $saveButton = $page->find('css', '.modal-bottom');

        //find submit button
        $button = $page->findButton('btn_save');

        $button->press();
    }



    /** @BeforeSuite */
    public static function setupFeature(BeforeSuiteScope $scope)
    {
        $scope->output = shell_exec('./behat.sh');
    }

}
