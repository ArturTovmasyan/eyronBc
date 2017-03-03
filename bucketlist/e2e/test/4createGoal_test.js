/// <reference path="../steps.d.ts" />
Feature('Test create goal functionality');

BeforeSuite((I) => {
  I.resizeWindow('maximize');
});

Scenario.only('Check create goal functionality', (I) => {
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
  I.wait(1);
  I.click('.mat-checkbox-inner-container');
  I.fillField('title', 'TEST GOALS');
  I.fillField('description', 'DESCRIPTION FOR #xcvh TEST HELLO HELLO!!');
  I.attachFile('form input[name=file]', 'e2e/output/login.jpg');
  I.attachFile('form input[name=file]', 'e2e/output/homepage.jpg');
  I.attachFile('form input[name=file]', 'e2e/output/login.jpg');
  I.fillField('input[ng-reflect-name=videoLink0]', 'https://www.youtube.com/watch?v=9R30petM1k0');
  I.executeScript('window.scrollTo(0, 0);');

  I.click('Preview');

  I.waitForVisible('#main-slider', 10);
  I.seeCurrentUrlEquals('/goal/test-goals/view');
  I.waitForText('TEST GOALS', 5);
  I.click('//div[@class="buttons"]//a[1]');
  I.clearField('description');
  I.fillField('description', 'DESCRIPTION FOR #etery HELLO MY #ANKAX FRIENDS');
  I.executeScript('window.scrollTo(0, 0);');
  I.wait(2)
  I.click('//div[@class="buttons"]//button[2]');
  I.wait(3);
  I.click('Edit');
  I.wait(2);
  I.click('.mat-checkbox-inner-container');
  I.clearField('description');
  I.fillField('description', 'DESCRIPTION FOR #etery HELLO MY #ANKAX FRIENDS');

  // I.click('//div[@class="buttons"]//button[2]');
  // I.waitForText('My Private Ideas', 5);
  // I.click('My Private Idea');


  I.click('//div[@class="buttons"]//button[3]');
  I.waitForText('TEST GOALS', 5);
  I.click('Invisible');
  pause()

  I.click('//div[@id="md-tab-label-0-1"]');
  I.waitForText('Priority');

  I.click('Save');

  I.amOutsideAngularApp();

  I.click('a.user-popover');
  I.click('Create Goal');
  I.waitForText('By checking you suggest your goal to be listed in the Ideas list', 10);

  I.fillField('title', 'TEST GOALS');
  I.fillField('description', 'DESCRIPTION FOR #xcvh TEST HELLO HELLO!!');
  I.executeScript('window.scrollTo(0, 0);');
  I.click('//div[@class="buttons"]//button[2]');
  I.waitForText('My Private Ideas', 5);
  I.click('My Private Idea');
  I.waitForText('TEST GOALS', 5);

  // I.click('//i[@class="icon-delete-in-circle"]');
  // I.waitForText('Your goal will be permanently deleted');
  // I.click('Delete');
  // I.wait(2);

  pause()
});
