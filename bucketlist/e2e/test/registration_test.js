Feature('Check registration');

Before(function(I) {
    I.resizeWindow('maximize');
});

Scenario('Test registration form and all process', function(I) {
    I.amOnPage('/');
    I.see('JOIN');
    I.click('JOIN');
    I.waitForText('CONNECT WITH');
    I.click('SIGN UP');
    I.seeCurrentUrlEquals('/register');
    I.see('Sign up and discover great ideas');
    I.registration();
    I.saveScreenshot('homepage.png');
});
