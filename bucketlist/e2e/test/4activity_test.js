/// <reference path="../steps.d.ts" />
Feature('Test activity page');

BeforeSuite((I) => {
  I.resizeWindow('maximize');
});

Scenario('Test activity functionality', (I) => {
  I.amOnPage('/');
  I.see('JOIN');
  I.click('JOIN');
  I.loginUser('user4@user.com', 'Test1234');
  I.seeCurrentUrlEquals('/ideas');
  I.amOutsideAngularApp();
  I.waitForVisible('a.mat-button', 5);
  I.click('Add');
  I.wait(1);
  I.click('Save');
  I.click('Add');
  I.wait(1);
  I.click('Save');
  I.waitForVisible('i.activity-icon', 5);
  I.click('ACTIVITY');
  I.waitForVisible('a.text-dark-gray', 5);
  I.seeCurrentUrlEquals('/activity');
  I.wait(2);
  I.click('Comments');
  I.fillField('commentBody', 'My first comment added');
  I.pressEnterOnComment();
  I.wait(2);
  I.waitForText('My first comment added', 5);
  I.fillField('commentBody', 'My first REPLY TEXT added');
  I.pressEnterOnComment();
  I.wait(2);
  I.waitForText('My first REPLY TEXT added', 5);
  I.executeScript('window.scrollTo(0, 0);');
  I.see('Active', 'ul.horizontal-menu');
  I.see('Listed', 'ul.horizontal-menu');
  I.see('Completed', 'ul.horizontal-menu');
  I.click('Active');
  I.waitForText('user4 user4');
  I.seeCurrentUrlEquals('/profile/my/active');
  I.executeScript('window.history.back();');
  I.click('Completed');
  I.waitForText('user4 user4');
  I.seeCurrentUrlEquals('/profile/my/completed');
  I.executeScript('window.history.back();');
  I.waitForVisible('i.icon-question-icon', 4);
  I.click('//i[@class="icon-question-icon "]');
  I.see('Confirm your account');
  I.click('//ol[@class="slide"]/li[3]');
  I.waitForText('UPLOAD A PHOTO');
  I.seeCurrentUrlEquals('/edit/profile');
  I.wait(1);
  I.executeScript('window.history.back();');
  I.waitForVisible('i.icon-ok-icon', 3);
  I.click('Goalfriends 10');
  I.waitForText('Most Matching', 3);
  I.seeCurrentUrlEquals('/goal-friends');
  I.executeScript('window.history.back();');
  I.click('//a[@class="load"][1]');
  I.wait(1);
  I.click('//a[@class="load"][1]');
  I.wait(1);
  I.click('//span[text()="Top Ideas"]');
  I.executeScript('window.history.back();');
  I.waitForVisible('i.icon-ok-icon', 3);
  I.click('//i[@class="icon-top-idea"]');
  I.waitForVisible('i.icon-ok-icon', 3);
  I.seeCurrentUrlEquals('/ideas/most-popular');
  I.click('//span[contains(text(), "Listed by")]');
  I.waitForText('Completed', 5);
  I.wait(2);
  I.click('a.close-icon', 'div.cdk-focus-trap-content');
  I.executeScript('window.history.back();');
  I.amOnPage('/leaderboard');
  I.waitForText('user7 user7', 5);
  I.seeCurrentUrlEquals('/leaderboard');
  I.wait(1);
  I.checkIfTextExist('text-dark-gray', 'user3 user3');
  I.amOutsideAngularApp();
  I.wait(1);
  I.click('ACTIVITY');
  I.wait(1);
  I.click('//a[@id="topIdeasLoad"]');
  I.wait(1);
  I.click('//a[@id="topIdeasLoad"]');
  I.click('//div[@id="leaderboard-list"]//a[@id="goalFriendLoad"]');
  I.wait(1);
  I.click('//div[@id="leaderboard-list"]//a[@id="goalFriendLoad"]');
  I.executeScript('window.scrollTo(0, document.body.scrollHeight);');
  I.wait(1);
});
