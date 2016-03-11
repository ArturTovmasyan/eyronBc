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
        $this->getSession()->wait(5000,"typeof(jQuery)=='undefined' && 0 === jQuery.active && !$.active");
    }

    /**
     * @When I wait
     */
    public function iWait()
    {
       $this->getSession()->wait(2000);
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
     * @Given I am logged in as :user
     */
    public function iAmLoggedInAs($user)
    {
        if($user == 'admin') {
            $userName = 'admin@admin.com';
        }
        elseif($user == 'user')
        {
            $userName = 'user@user.com';
        }
        elseif($user == 'user1')
        {
            $userName = 'user1@user.com';
        }

        $password = 'Test1234';

        $this->visit('/login');
        $this->fillField('_username', $userName);
        $this->fillField('_password', $password);
        $this->pressButton('SIGN IN');

        if($user == 'admin') {
            $this->assertSession()->pageTextContains('HOMEPAGE');
        }
        else
        {
            $this->assertSession()->pageTextContains('MOST POPULAR');
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

        foreach($dateElements as $key => $dateElement) {

            if (null === $key) {
                throw new \InvalidArgumentException(sprintf('Cannot find text: "%s"', 'invalid xpath'));
            }

//            if ($dateElement->getHtml() != "") {

                $dateElement->click();

                $options = $page->findAll('css', '.list');

                if ($key == 0) {
                    $month = $options[0]->find(
                        'xpath',
                        $session->getSelectorsHandler()->selectorToXpath('xpath', '//li[text()="January"]')
                    );
                    $month->click();

                } elseif ($key == 1) {
                    $day = $options[1]->find(
                        'xpath',
                        $session->getSelectorsHandler()->selectorToXpath('xpath', '//li[text()="1"]')
                    );
                    $day->click();
                } elseif ($key == 2) {
                    $year = $options[2]->find(
                        'xpath',
                        $session->getSelectorsHandler()->selectorToXpath('xpath', '//li[text()="2016"]')
                    );
                    $year->click();
                }
//            }
        }
    }

    /**
     * @When I select language :value
     */
    public function iSelectLanguage($value)
    {
        //get session
        $session = $this->getSession(); // assume extends RawMinkContext

        $page = $session->getPage();

        $languageField = $page->find('css', '.language');

        $languageField->click();

        $option = $languageField->find('css', '.list');

        $lang = $option->find(
            'xpath',
                $session->getSelectorsHandler()->selectorToXpath('xpath', '//li[text()="'.$value.'"]')
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
            $session->executeScript("jQuery($('html, body').scrollTo('".$value."'));");
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


//    /**
//     * @When I click goal switch
//     */
//    public function iClickGoalSwitch()
//    {
//        //get session
//        $session = $this->getSession();
//
//        //get page
//        $page = $session->getPage();
//
//        $goalSwitchButton= $page->find('xpath',$session->getSelectorsHandler()->selectorToXpath('xpath', '//div[@class="onoffswitch"]'));
//
//        $goalSwitchButton->click();
//    }


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
     * @When I click on icon :value
     */
    public function iClickOnIcon($value)
    {
        //get session
        $session = $this->getSession(); // assume extends RawMinkContext

        //get page
        $page = $session->getPage();

        //get facebook icon in iframe
        $facebookIcon = $page->find('xpath',$session->getSelectorsHandler()->selectorToXpath('xpath', '//a[@class="'.$value.'"]'));

        //click facebook icon
        $facebookIcon->click();

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

}
