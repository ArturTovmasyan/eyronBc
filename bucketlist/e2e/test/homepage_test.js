Feature('Test homepage');

Before(function(I) {
    I.resizeWindow('maximize');
});

Scenario('Check Homepage', function(I) {
    I.amOnPage('/');
    I.see('JOIN');
    I.click('JOIN');
    I.waitForText('CONNECT WITH');
    I.click('.close-icon');
    I.click('DISCOVER MORE');
    I.seeCurrentUrlEquals('/ideas');
    I.see('your Browser Location Service or enter your location');
    I.amOnPage('/');
    I.waitForText('Have your list of goals for life and see how much more you would achieve over what you could possibly imagine.');
    I.click('Add');
    I.waitForText('CONNECT WITH');
    I.click('.close-icon');
    I.click('Complete');
    I.waitForText('CONNECT WITH');
    I.click('.close-icon');
    I.click('JOIN NOW');
    I.waitForText('CONNECT WITH');
    I.click('.close-icon');
    I.saveScreenshot('homepage.png');
});
