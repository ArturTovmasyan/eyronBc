/// <reference path="../steps.d.ts" />
Feature('Check registration');

Before(function(I) {
    I.resizeWindow('maximize');
});

Scenario('Test registration form and all process', function(I) {
    I.amOnPage('/');
    I.see('JOIN');
    I.click('JOIN');
    I.waitForText('CONNECT WITH');
    I.click('SIGN UP');
    I.seeCurrentUrlEquals('/register');
    I.see('Sign up and discover great ideas');
    I.registrationUser();
    I.saveScreenshot('homepage.png');
});
