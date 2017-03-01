/// <reference path="../steps.d.ts" />

// Feature('Test complete goal page');

// BeforeSuite((I) => {
//   I.resizeWindow('maximize');
// });

xScenario('Test complete goal functionality', (I) => {
  I.amOnPage('/');
  I.see('JOIN');
  I.click('JOIN');
  I.loginUser('user1@user.com', 'Test1234');
  I.seeCurrentUrlEquals('/ideas');
  I.wait(1);
  I.amOutsideAngularApp();
  I.waitForText('goal1', 2);
  I.click('Complete');
  I.waitForText('Share your achievement', 5);
  I.see('Write a success story,please !');
  I.fillField('story', 'as');

  pause()
});
