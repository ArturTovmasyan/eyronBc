'use strict';

class MyHelper extends Helper {

  _before() {}

  _after() {}

    /**
     * This function is used to switch on popup in test
     *
     * @param param
     */
  switchToWindow(param) {
      browser.getAllWindowHandles().then(function(handles){
          browser.switchTo().window(handles[param]);
      });
  }

}

module.exports = MyHelper;
