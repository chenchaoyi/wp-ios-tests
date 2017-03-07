// Page object for General page (shared element/operations across all pages)

var expect = require('chai').expect;
var Config = require('config');

var internals = {};

internals.Page = function () {};

// Locators
internals.Page = {
  allowAccessButton: {
    locator: 'com.android.packageinstaller:id/permission_allow_button',
    using: 'id'
  }
}

// Allow access
internals.Page.permissionAllow = function (driver) {
  return driver.clickEl(this.allowAccessButton);
};

// Go to Account page
internals.Page.getGeneralNavBarName = function (driver) {
  return driver.getElAttr(this.generalNavBar, 'name')
};

exports = module.exports = internals.Page;
