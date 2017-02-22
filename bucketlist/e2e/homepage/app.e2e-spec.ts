import { HomePage } from './homepage.po';
import { GlobalFunctions } from '../functions.po';
import { browser, element, by } from 'protractor';

describe('Check Homepage', function() {
  let page: HomePage;
  let globalFunctions: GlobalFunctions;
  let loginClose = element(by.css('.close-icon'));

  beforeEach(() => {
    page = new HomePage();
    globalFunctions = new GlobalFunctions();
  });

  it('Should see homepage header', () => {
    globalFunctions.navigateTo('/');
    expect(globalFunctions.getText('h1')).toContain('The goal is to have memories');
    expect(globalFunctions.getText('h2')).toEqual('Discover thousands of great ideas for your Bucket List');
  });

  it('Find and click DISCOVER MORE button', () => {
    globalFunctions.clickToLinks('DISCOVER MORE');
  });

  it('After must be redirect in ideas page', () => {
    expect(browser.getCurrentUrl()).toContain('/ideas');
    expect(element(by.css('span.text-purple')).getText()).toContain('Allow');
  });

  it('Back to homepage', () => {
    browser.navigate().back();
  });

  it('I should see Join Now button and click on it for open login form', () => {
    element(by.buttonText('JOIN NOW')).click();
  });

  it('Close login form', () => {
    expect(loginClose.isPresent()).toBeTruthy();
    loginClose.click();
  });

  it('Open login by JOIN menu', () => {
    page.openLogin();
    loginClose.click();
    browser.sleep(300);
  });

  it('Click on Add and Complete buttons', () => {
    browser.executeScript('window.scrollTo(0,0);').then(function () {
      globalFunctions.clickToLinks('Add');
      loginClose.click();
      globalFunctions.clickToLinks('Complete');
    })
  });
});
