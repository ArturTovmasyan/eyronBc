/// <reference path="../steps.d.ts" />
Feature('Test create goal functionality');

BeforeSuite((I) => {
    I.resizeWindow('maximize');
});

Scenario('Check create goal functionality', (I) => {
    I.amOnPage('/');
    I.see('JOIN');
    I.click('JOIN');
    I.loginUser('user1@user.com', 'Test1234');
    I.seeCurrentUrlEquals('/ideas');
    I.wait(1);
    I.amOutsideAngularApp();
    I.click('a.user-popover');
    I.click('Create Goal');
    I.waitForText('By checking you suggest your goal to be listed in the Ideas list', 10);
    I.seeCurrentUrlEquals('/goal/create');
    I.click('.mat-checkbox-inner-container');
    I.wait(2);
    I.click('.mat-checkbox-inner-container');
    I.fillField('title', 'TEST GOALS');
    I.fillField('description', 'DESCRIPTION FOR #test #test TEST #GOALS #GOALS');
    I.attachFile('form input[name=file]', 'e2e/output/login.jpg');
    I.attachFile('form input[name=file]', 'e2e/output/homepage.jpg');
    I.attachFile('form input[name=file]', 'e2e/output/login.jpg');
    // I.fillField('videoLink0', 'https://www.youtube.com/watch?v=yVGrbOB79lw');
    I.click('.goal-view-submit');
    I.wait(1);
    I.seeCurrentUrlEquals('/goal/test-goals/view');
    I.waitForText('TEST GOALS');
    I.click('//div[@class="buttons"]/a[1]');
    I.clearField('description');
    I.fillField('description', 'DESCRIPTION FOR #test HELLO MY #GOALS FRIENDS #GOALS');

    // I.click('//div[@class="buttons"]/button[2]');
    // I.amOutsideAngularApp();
    // I.click('Edit');
    // I.seeInCurrentUrl('drafts');
    // I.click('//div[@class="buttons"]/button[3]');
    // I.waitForText('CONGRATULATIONS, YOUR GOAL HAS BEEN SUCCESSFULLY CREATE');
    // I.click('//div[@class="modal-bottom"]/a[1]');
    // pause()
});
