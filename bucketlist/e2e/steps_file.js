'use strict';
// in this file you can append custom step methods to 'I' object
module.exports = function() {

    return actor({
    // Define custom steps here, use 'this' to access default methods of I.
    // It is recommended to place a general 'login' function here.

        loginUser: function(username, password) {
            this.click('JOIN');
            this.waitForText('CONNECT WITH');
            this.fillField('_username', username);
            this.fillField('_password', password);
            this.click('SIGN IN');
            this.seeCurrentUrlEquals('/ideas');
        },
        registrationUser: function() {
            this.attachFile('form input[name=file]', 'e2e/output/homepage.png');
            this.fillField('firstName', '');
            this.fillField('lastName', '');
            this.fillField('email', '');
            this.fillField('password', 'asa');
            this.fillField('plainPassword', 'tessdsdsad');
            this.fillField('email', 'asasasasa');
            this.fillField('password', 'asasasa');
            this.fillField('plainPassword', 'asasasa');
            this.fillField('firstName', 'ARTUR');
            this.fillField('lastName', 'Tovmasyan');
            this.fillField('email', 'user1@user.com');
            this.fillField('password', 'Test1234');
            this.fillField('plainPassword', 'Test1234');
            this.click('register');
            this.see('Account with this email already exists, please, sign in.');
            this.fillField('email', 'testuser@test.com');
            this.click('register');
            this.seeCurrentUrlEquals('/ideas');
            this.wait(1);
        }
  });
};
