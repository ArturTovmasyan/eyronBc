'use strict';
// in this file you can append custom step methods to 'I' object
module.exports = function() {

    return actor({
    // Define custom steps here, use 'this' to access default methods of I.
    // It is recommended to place a general 'login' function here.

        login: function(username, password) {
            this.click('JOIN');
            this.fillField('_username', username);
            this.fillField('_password', password);
            this.click('SIGN IN');
            this.seeCurrentUrlEquals('/ideas');
        },
        registration: function() {
            this.attachFile('form input[name=file]', 'e2e/output/homepage.png');
            this.fillField('firstName', '');
            this.fillField('lastName', '');
            this.fillField('email', 'asasasa');
            this.fillField('password', 'asa');
            this.fillField('plainPassword', 'tessdsdsad');
            this.fillField('password', 'asasasa');
            this.fillField('plainPassword', 'asasasa');
            this.fillField('firstName', 'Art');
            this.fillField('lastName', 'Tovmasyna');
            this.fillField('email', 'ateptan777@gmail.com');
            this.fillField('password', 'test1234');
            this.fillField('plainPassword', 'test1234');
            this.click('register');
            this.seeCurrentUrlEquals('/ideas');
            this.wait(1);
        }
  });
};
