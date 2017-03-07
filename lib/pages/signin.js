// Page object for SignIn page

var expect = require('chai').expect;

var internals = {};

internals.Page = function () {};

// Locators
internals.Page = {
  emailTextField: {
    locator: 'Email or username',
    using: 'accessibility id'
  },

  nextButton: {
    locator: 'Next Button',
    using: 'accessibility id'
  },

  passwordTextField: {
    locator: 'Password',
    using: 'accessibility id'
  },

  logInButton: {
    locator: 'Log In Button',
    using: 'accessibility id'
  }
}

// Go to Account page
internals.Page.signIn = function (driver) {
  driver.typeEl(this.emailTextField, 'ccy77')
  driver.clickEl(this.nextButton);
  driver.typeEl(this.passwordTextField, 'Flow1234567')
  driver.clickEl(this.logInButton);
};

exports = module.exports = internals.Page;
