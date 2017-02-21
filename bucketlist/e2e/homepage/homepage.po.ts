import { browser, element, by } from 'protractor';

export class HomePage {

  /**
   * This function is used to open login form
   */
  openLogin() {

    element(by.css('ul.navbar-right')).click();
    expect(element(by.id('signin')).isPresent()).toBeTruthy();

    // element(by.css('.close-icon')).click();
    // element( by.model('loginForm.username') ).sendKeys( params.login.user );
    // element( by.model('loginForm.password') ).sendKeys( params.login.password );
    // element(by.buttonText('SIGN IN')).click();
  }
}


