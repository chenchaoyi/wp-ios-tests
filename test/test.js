var Config = require('config');
var Cyancat = require('cyancat');
var Pages = require('../lib').Pages

var driver = new Cyancat(Config.server, {
  maxWaitTime: 10000,
  proxy: Config.proxy
});

beforeEach(function(done) {
  driver.run(function() {
    driver.init(Config.capabilities);
    done();
  });
});

afterEach(function(done) {
  driver.run(function() {
    driver.quit();
    done();
  });
});

exports.driver = driver;
exports.pages = Pages;
exports.testData = require('../config/testData');
