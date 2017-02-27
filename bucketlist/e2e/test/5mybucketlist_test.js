/// <reference path="../steps.d.ts" />
Feature('Test mybucketlist page');

BeforeSuite((I) => {
    I.resizeWindow('maximize');
});

Scenario('test my bucket list page functionality', (I) => {
    I.amOnPage('/');
    I.see('JOIN');
    I.click('JOIN');
    I.loginUser('user1@user.com', 'Test1234');
    I.seeCurrentUrlEquals('/ideas');
    I.wait(1);
    I.amOutsideAngularApp();
    I.click('a.user-popover');
    I.click('Leaderboard');
    I.waitForText('user1 useryan');
    I.seeCurrentUrlEquals('/leaderboard');
    I.click('a.user-popover');
    I.click('My Bucketlist');
    I.waitForText('user1 useryan');
    I.seeCurrentUrlEquals('/profile/my/all');

    I.click('Activity');
    I.click('Active');
    I.waitForText('goal9', 5);
    I.click('Completed');
    I.waitForText('goal3');
    I.click('Created');
    I.waitForText('goal15');
    I.click('My Bucketlist');

    I.click('Dreams');
    I.waitForText('goal9');
    I.click('Dreams');

    I.click('Important, urgent');
    I.waitForText('goal9');
    I.waitForText('goal6');
    I.click('Important, urgent');

    I.click('Not important, urgent');
    I.waitForText('goal8');
    I.waitForText('goal4');
    I.click('Not important, urgent');

    I.click('Important, not urgent');
    I.waitForText('goal3');
    I.waitForText('goal15');
    I.click('Completed by 1');
    I.amOutsideAngularApp();
    I.waitForText('Completed by 1 users', 5);
    I.see('user1 useryan');
    I.click('a.close-icon');
    I.click('Important, not urgent');

    I.click('Not important, not urgent');
    I.waitForText('goal7', 5);
    I.waitForVisible('i.icon-user-small');
    I.click('Listed by 8');
    I.amOutsideAngularApp();
    I.waitForText('Listed by 8 users', 5);
    I.see('user1 useryan');
    I.see('user3 user3');
    I.click('a.close-icon');
    I.click('Not important, not urgent');

    I.click('//li[@class="pull-right"]/a[2]');
    I.wait(2);
    I.waitForText('Satellite');
    I.click('//li[@class="pull-right"]/a[1]');
    I.waitForText('MONTH');
    I.waitForText('YEAR');
    I.waitForText('ALL');
    I.click('i.icon-arrow-right');
    I.click('i.icon-arrow-left');
});
