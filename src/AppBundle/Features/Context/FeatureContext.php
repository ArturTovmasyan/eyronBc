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
        $this->getSession()->wait(8000,"(typeof(jQuery)=='undefined' && (0 === jQuery.active)) && !$.active");
    }

    /**
     * @BeforeStep
     */
    public function beforeStep()
    {
        $this->getSession()->getDriver()->maximizeWindow();
//        $this->getSession()->resizeWindow(1920, 1080, 'current');
    }

    /** @BeforeSuite */
    public static function callFixturesCommand(BeforeSuiteScope $scope)
    {
        $scope->output = shell_exec('./behat.sh');
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

        } else {
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
        $saveBlock = $page->findById('goal-modal');

        if ($saveBlock->isVisible()) {

            //find submit button
            $saveButton = $saveBlock->findButton('btn_save');

            //find username and set data
            $saveButton->press();
        } else {

            throw new \LogicException('Element is not visible...');
        }
    }

    /**
     * @When I select register date fields
     */
    public function iSelectRegisterDateFields()
    {
        //get session
        $session = $this->getSession(); // assume extends RawMinkContext

        $page = $session->getPage();

        $dateElements = $page->findAll('css', '.current');

        foreach($dateElements as $key => $dateElement)
        {
            $dateElement->click();

            $options = $page->findAll('css', '.list');

            if($key == 0) {
                $month = $options[0]->find(
                    'xpath',
                    $session->getSelectorsHandler()->selectorToXpath('xpath', '//li[text()="January"]')
                );
                $month->click();

            }
            elseif($key == 1)
            {
                $day = $options[1]->find(
                    'xpath',
                    $session->getSelectorsHandler()->selectorToXpath('xpath', '//li[text()="1"]')
                );
                $day->click();
            }
            elseif($key == 2)
            {
                $year = $options[2]->find(
                    'xpath',
                    $session->getSelectorsHandler()->selectorToXpath('xpath', '//li[text()="2016"]')
                );
                $year->click();
            }

            if (null === $key) {
                throw new \InvalidArgumentException(sprintf('Cannot find text: "%s"', 'blooo'));
            }
        }
    }

    /**
     * @When I select settings date fields
     */
    public function iSelectSettingsDateFields()
    {
        //get session
        $session = $this->getSession(); // assume extends RawMinkContext

        $page = $session->getPage();

        $dateElements = $page->findAll('css', '.col-sm-4');

        foreach($dateElements as $key => $dateElement)
        {
            if (null === $key) {
                throw new \InvalidArgumentException(sprintf('Cannot find text: "%s"', 'invalid xpath'));
            }

            $dateElement->click();

            $options = $page->findAll('css', '.list');

            if($key == 0) {
                $month = $options[0]->find(
                    'xpath',
                    $session->getSelectorsHandler()->selectorToXpath('xpath', '//li[text()="January"]')
                );
                $month->click();

            }
            elseif($key == 1)
            {
                $day = $options[1]->find(
                    'xpath',
                    $session->getSelectorsHandler()->selectorToXpath('xpath', '//li[text()="1"]')
                );
                $day->click();
            }
            elseif($key == 2)
            {
                $year = $options[2]->find(
                    'xpath',
                    $session->getSelectorsHandler()->selectorToXpath('xpath', '//li[text()="2016"]')
                );
                $year->click();
            }
        }
    }

    /**
     * @When I click on the scroll icon
     */
    public function iClickOnTheScrollIcon()
    {
        //get session
        $session = $this->getSession(); // assume extends RawMinkContext

        //get page
        $page = $session->getPage();

        $scrollIcon = $page->find('xpath',$session->getSelectorsHandler()->selectorToXpath('xpath', '//a[@class="ng-isolate-scope"]'));

        $scrollIcon->click();
    }

    /**
     * @Then I scroll page down :size
     */
    public function iScrollPageDown($size)
    {
        //get session
        $session = $this->getSession(); // assume extends RawMinkContext

        $function = <<<JS
        (function(){
          var elem = document.getElementById("scroll-button");
          elem.scrollIntoView(true);
        })()
JS;
            $session->executeScript($function);
    }
}
