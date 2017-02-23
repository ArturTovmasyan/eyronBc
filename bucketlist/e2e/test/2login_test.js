/// <reference path="../steps.d.ts" />
Feature('Test login functionality');

Before(function(I) {
    I.resizeWindow('maximize');
});

Scenario('Check login functionality', function(I) {
    I.amOnPage('/');
    I.see('JOIN');
    I.click('JOIN');
    I.loginUser('adsscdsf@tesdfsdst.com', 'Test1234');
    I.see('Bad credentials');
    I.loginUser('testuser@test.com', 'Test1234');
    I.seeCurrentUrlEquals('/ideas');
    I.executeScript('window.localStorage.clear();window.history.back();');
    I.refresh();
    I.seeCurrentUrlEquals('/');
    I.click('JOIN');
    I.waitForText('CONNECT WITH');
    I.click('Forgot password?');
    I.seeCurrentUrlEquals('/resetting/request');
    I.see('Reset your password');
    I.fillField('email', 'asasas@mail.ru');
    I.click('Send');
    I.waitForText('User not found');
    I.see('User not found');
    I.fillField('email', 'testuser@test.com');
    I.click('Send');
    I.seeCurrentUrlEquals('/resetting/check-email');
    I.see('Check your email');
    I.click('JOIN');
    I.waitForText('CONNECT WITH');
    I.click('.mat-button-ripple', '#login-page');
    I.wait(2);
    I.saveScreenshot('login.png');
});
