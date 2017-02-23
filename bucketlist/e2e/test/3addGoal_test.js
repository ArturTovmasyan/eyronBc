/// <reference path="../steps.d.ts" />
Feature('Test add goal functionality');

Before(function(I) {
    I.resizeWindow('maximize');
});

Scenario('Test add goal', function(I) {
    I.amOnPage('/');
    I.see('JOIN');
    I.click('JOIN');
    I.loginUser('user1@user.com', 'Test1234');
    I.seeCurrentUrlEquals('/ideas');
    I.wait(1);
    I.amOutsideAngularApp();
    I.click('Discover');
    I.waitForText('goal1');
    I.click('Add');
    I.amOutsideAngularApp();
    I.waitForText('CONGRATULATIONS, YOUR GOAL HAS BEEN SUCCESSFULLY ADDED');
    I.click('Completed');
    I.click('Active');
    I.see('Deadline');
    I.see('Priority');
    I.click('urgent');
    I.click('important');
    I.fillField('note', 'TEST DATA');
    // I.fillField('stepText-0', 'STEP1');
    I.see('Visibility');
    I.click('Invisible');
    I.click('Visible');
    // I.pressKey('Esc');
    // I.amOutsideAngularApp();
    // I.click('MY BUCKETLIST');
    // I.wait(1);
    // I.seeCurrentUrlEquals('/profile/my/all');
    // I.click('Manage');
    // I.click('REMOVE');
    // I.click('REMOVE');
    // I.dontSee('goal1');
    pause();
});
