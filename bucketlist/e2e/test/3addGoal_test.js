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
    I.waitForText('goal1', 2);
    I.click('Add');
    I.amOutsideAngularApp();
    I.wait(1);
    // I.see('CONGRATULATIONS, YOUR GOAL HAS BEEN SUCCESSFULLY ADDED', 5);
    I.click('Completed');
    I.click('Active');
    I.see('Goal Status');
    I.see('Visibility');
    I.see('Deadline');
    I.setDateFields(2);
    I.click('Invisible');
    I.click('Visible');
    I.click('//div[@id="md-tab-label-0-1"]');
    I.waitForText('Priority');
    I.click('urgent');
    I.click('urgent');
    I.click('important');
    I.click('important');
    I.see('Notes');
    I.fillField('note', 'Write test data for note field');
    I.wait(1);
    I.click('Save');
    I.amOutsideAngularApp();
    I.click('a.user-popover');
    I.click('My Bucketlist');
    I.waitForVisible('i.icon-manage', 3);
    I.click('Manage');
    I.waitForText('Goal Status', 5);

    I.click('Cancel');
    I.click('Manage');
    I.waitForText('Goal Status', 5);

    I.click('REMOVE');
    I.waitForText('YOU ARE ABOUT TO REMOVE YOUR GOAL.');
    I.click('//div[@class="delete-content"]/a[1]');
    I.wait(2);
});
