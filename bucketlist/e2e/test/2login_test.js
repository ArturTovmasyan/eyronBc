/// <reference path="../steps.d.ts" />
Feature('Test login functionality');

Before(function(I) {
    I.resizeWindow('maximize');
});

Scenario('Check login functionality', function(I) {
    I.amOnPage('/');
    I.see('JOIN');
    I.loginUser('testuser@test.com', 'Test1234');
    I.wait(1);
    I.executeScript('window.localStorage.clear();window.history.back();');
    I.refresh();
    I.seeCurrentUrlEquals('/');
    I.click('JOIN');
    I.waitForText('CONNECT WITH');
    I.click('.mat-button-ripple', '#login-page');
    I.wait(2);
    I.saveScreenshot('login.png');
});
