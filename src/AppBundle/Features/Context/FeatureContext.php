<?php

namespace AppBundle\Features\Context;

use Behat\MinkExtension\Context\MinkAwareContext;
use Behat\Symfony2Extension\Context\KernelAwareContext;
use Symfony\Component\HttpFoundation\Session\Session;
use Behat\Symfony2Extension\Context\KernelDictionary;
use Behat\Behat\Context\SnippetAcceptingContext;
use Behat\MinkExtension\Context\MinkContext;

class FeatureContext extends MinkContext implements KernelAwareContext, SnippetAcceptingContext, MinkAwareContext
{
    use KernelDictionary;

    var $originalWindowName = '';

    public function __construct(Session $session, $simpleArg)
    {
    }


    /**
     * @Then /^The display should be block/
     */
    public function assertCssValue()
    {
        // JS script that makes the CSS assertion in the browser.

        $script = <<<JS
            (function(){
                return $('div.popover-content').css('display') === 'block';
            })();
JS;

        if (!$this->getSession()->evaluateScript($script)) {
            throw new Exception();
        }
    }

    /**
     * @Then /^I switch to popup$/
     */
    public function iSwitchToPopup() {


        $originalWindowName = $this->getSession()->getWindowName(); //Get the original name

        if (empty($this->originalWindowName)) {
            $this->originalWindowName = $originalWindowName;
        }

        $this->getSession()->getPage()->clickLink("JOIN"); //Pressing the withdraw button

        $this->iWaitForAngular();
        $popupName = $this->getNewPopup($originalWindowName);

        //Switch to the popup Window
        $this->getSession()->switchToWindow($popupName);

    }

    /**
     * @Then /^I switch back to original window$/
     */
    public function iSwitchBackToOriginalWindow() {
        //Switch to the original window
        $this->getSession()->switchToWindow($this->originalWindowName);
    }

    /**
     * This gets the window name of the new popup.
     */
    private function getNewPopup($originalWindowName = NULL) {
        //Get all of the window names first
        $names = $this->getSession()->getWindowNames();

        //Now it should be the last window name
        $last = array_pop($names);

        if (!empty($originalWindowName)) {
            while ($last == $originalWindowName && !empty($names)) {
                $last = array_pop($names);
            }
        }

        return $last;
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

//    /** @BeforeSuite */
//    public static function setupFeature(BeforeSuiteScope $scope)
//    {
//        $scope->output = shell_exec('./behat.sh');
//    }

}
