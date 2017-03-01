/// <reference path="../steps.d.ts" />
Feature('Test leader board page');

BeforeSuite((I) => {
  I.resizeWindow('maximize');
});

Scenario('Test leader board page functionality', (I) => {
  I.amOnPage('/');
  I.see('JOIN');
  I.click('JOIN');
  I.loginUser('user1@user.com', 'Test1234');
  I.seeCurrentUrlEquals('/ideas');
  I.wait(1);
  I.amOutsideAngularApp();
  I.click('a.user-popover');
  I.click('Leaderboard');
  I.waitForText('user9 user9');
  I.seeCurrentUrlEquals('/leaderboard');
  I.wait(1);
  I.checkIfTextExist('text-dark-gray', 'user3 user3');
  I.checkLeaderBoardList();
  I.click('Mentor');
  I.waitForText('user1 useryan', 3);
  I.click('Innovator');
  I.waitForText('userToo useryan', 3);
  I.saveScreenshot('leaderBoard.jpg');
});
