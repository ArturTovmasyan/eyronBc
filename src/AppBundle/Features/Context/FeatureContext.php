<?php

namespace AppBundle\Features\Context;

use Behat\Mink\Driver\Selenium2Driver;
use Behat\Mink\Exception\UnsupportedDriverActionException;
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
        $this->getSession()->wait(5000, "typeof(jQuery)=='undefined' && 0 === jQuery.active");
    }

    /**
     * @When I wait
     */
    public function iWait()
    {
        $this->getSession()->wait(3000, "document.readyState == 'complete'");
    }

    /**
     * @BeforeStep
     */
    public function beforeStep()
    {
        $this->getSession()->getDriver()->maximizeWindow();
    }

    /** @BeforeSuite */
    public static function callFixturesCommand(BeforeSuiteScope $scope)
    {
        $scope->output = shell_exec('./bin/behat.sh');
    }

    /**
     * @Given I am logged in as :user
     */
    public function iAmLoggedInAs($user)
    {
        //set default value
        $userName = null;

        //set userName
        if($user == 'admin') {
            $userName = 'admin@admin.com';
        }
        elseif($user == 'user1')
        {
            $userName = 'user1@user.com';
        }
        elseif($user == 'user2')
        {
            $userName = 'user2@user.com';
        }

        //set password
        $password = 'Test1234';

        //open login form
        $this->clickLink('JOIN');

        //set data in login form
        $this->iSetUsernameAndPassword($userName, $password);

        //check if user admin
        if($user == 'admin') {
            $this->assertSession()->pageTextContains('HOMEPAGE');
        }
        else
        {
            $this->assertSession()->pageTextContains('useryan');
        }
    }

    /**
     * @Then I should see categories
     */
    public function iShouldSeeCategories()
    {
        //get session
        $session = $this->getSession(); // assume extends RawMinkContext

        //get page
        $page = $session->getPage();

        $categoryCount = $page->findAll('xpath', '//ul[@class="filter"]//li');

        if(count($categoryCount) == 8) {
            return;
        }
        else{
            throw new \LogicException('Wrong category count');
        }
    }

    /**
     * @When I set username :userName and password :password
     */
    public function iSetUsernameAndPassword($userName, $password)
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

        //find username and set data
        $loginBlock->fillField('_username', $userName);

        //find password
        $loginBlock->fillField('_password', $password);

        //find submit button
        $button = $loginBlock->findById('buttons');

        //press button
        $button->click();
    }

    /**
     * @When I select date fields
     */
    public function iSelectDateFields()
    {
        //get mink session
        $session = $this->getSession(); // assume extends RawMinkContext

        //get current page
        $page = $session->getPage();

        //get date fields
        $dateElements = $page->findAll('css','#behat');

        if (null === $dateElements) {
            throw new \InvalidArgumentException(sprintf('Cannot find $dateElements'));
        }

        foreach($dateElements as $dateElement) {

            //click on date filed
            $dateElement->click();

            //get options list in field
            $optionsList = $dateElement->find('css', '.list');

            //get value in opt
            $option = $optionsList->find(
                'xpath',
                $session->getSelectorsHandler()->selectorToXpath('xpath', '//li[2]')
            );

            $option->click();

        }
    }

    /**
     * @When I select language
     */
    public function iSelectLanguage()
    {
        //get session
        $session = $this->getSession(); // assume extends RawMinkContext

        $page = $session->getPage();

        $languageField = $page->find('css', '#behat-lng');

        $languageField->click();

        $option = $languageField->find('css', '.list');

        $lang = $option->find(
            'xpath',
            $session->getSelectorsHandler()->selectorToXpath('xpath', '//li[not(contains(@class, "selected"))]')
        );

        $lang->click();
    }

    /**
     * @When I scroll page to :value
     */
    public function iScrollPageTo($value)
    {
        //get session
        $session = $this->getSession();

        if($value == 'top') {
            $session->executeScript("window.scrollTo(0, document.body.scrollTop)");
        }
        else {
            $session->executeScript("jQuery($('body').scrollTo('".$value."'));");
        }
    }

    /**
     * @When I press key :key
     */
    public function iPressKey($key)
    {
        //get session
        $session = $this->getSession();

        //13 it is 'enter' key on keyboard for selenium2 Driver
        $session->getDriver()->keyPress('//input[@name="search"]', $key);
    }

    /**
     * @When I switch to iframe :value
     */
    public function iSwitchToIframe($value)
    {
        //get session
        $session = $this->getSession(); // assume extends RawMinkContext

        //get page
        $page = $session->getPage();

        //get iframe blcok
        $iframe = $page->find('css', $value);

        //check if iframe block exist
        if (null === $iframe) {
            throw new \LogicException('Iframe is not found');
        }

        //get iframe id
        $iframeId = $iframe->getAttribute('id');

        if($iframeId == null) {

            //get iframe name
            $iframeId = $iframe->getAttribute('name');
        }

        if (null === $iframeId) {

            throw new \LogicException('Iframe id is not found');
        }

        //swith to iframe window
        $this->getSession()->switchToIframe($iframeId);
    }


    /**
     * @When I click on :value
     */
    public function iClickOn($value)
    {
        //get session
        $session = $this->getSession(); // assume extends RawMinkContext

        //get page
        $page = $session->getPage();

        //get icon
        $icon = $page->find('xpath',$session->getSelectorsHandler()->selectorToXpath('xpath', '//*[contains(@class, normalize-space("'.$value.'")) or contains(@id, normalize-space("'.$value.'"))]'));

        //click on icon
        $icon->click();

    }

    /**
     * @When I click button :value
     */
    public function iClickButton($value)
    {
        //get session
        $session = $this->getSession(); // assume extends RawMinkContext

        //get page
        $page = $session->getPage();

        //get icon
        $icon = $page->find('xpath',$session->getSelectorsHandler()->selectorToXpath('xpath', '//button[@class="'.$value.'"]'));

        //click on icon
        $icon->click();
    }

    /**
     * @When I switch to window
     */
    public function iSwitchToWindow()
    {
        //get window name
        $windowNames = $this->getSession()->getWindowNames();
        if(count($windowNames) > 1) {

            //switch to new window
            $this->getSession()->switchToWindow($windowNames[1]);
        }
    }

    /**
     * @When I change date
     */
    public function iChangeDate()
    {
        //get session
        $session = $this->getSession(); // assume extends RawMinkContext

        //get page
        $page = $session->getPage();

        //get date
        $date = $page->find('xpath',$session->getSelectorsHandler()->selectorToXpath('xpath', '//td[@class="day"][7]'));

        //click on icon
        $date->click();

    }

    /**
     * @When I change priority
     */
    public function iChangePriority()
    {
        //get session
        $session = $this->getSession(); // assume extends RawMinkContext

        //get page
        $page = $session->getPage();

        //get date
        $priority = $page->find('xpath',$session->getSelectorsHandler()->selectorToXpath('xpath', '//label[@class="radio-inline"]'));

        //click on icon
        $priority->click();


    }

    /**
     * @When I change switch :number
     */
    public function iChangeSwitch($number)
    {
        //get session
        $session = $this->getSession(); // assume extends RawMinkContext

        //get page
        $page = $session->getPage();

        //get date
        $switchs = $page->findAll('xpath',$session->getSelectorsHandler()->selectorToXpath('xpath', '(//label[@class="onoffswitch-label"])'));

        //click on icon
        $switchs[$number]->click();
    }

}
