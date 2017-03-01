/// <reference path="../steps.d.ts" />
Feature('Test add goal functionality');

BeforeSuite((I) => {
    I.resizeWindow('maximize');
});

Scenario('Test add goal', (I) => {
    I.amOnPage('/');
    I.see('JOIN');
    I.click('JOIN');
    I.loginUser('user1@user.com', 'Test1234');
    I.seeCurrentUrlEquals('/ideas');
    I.wait(1);
    I.amOutsideAngularApp();
    I.click('Discover');
    I.waitForText('goal1', 2);
    I.click('Add');
    I.amOutsideAngularApp();
    I.wait(1);
    I.see('CONGRATULATIONS, YOUR GOAL HAS BEEN SUCCESSFULLY ADDED', 5);
    I.click('Completed');
    I.click('Active');
    I.see('Discover');
    I.see('Nearby');
    I.click('urgent');
    I.click('important');
    I.fillField('note', 'Write test data for note field');
    // I.fillField('stepText-0', 'STEP1');
    I.see('Featured');
    I.click('Invisible');
    I.click('Visible');
});
