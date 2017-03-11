var Config = require('config');
var Cyancat = require('cyancat');
var Pages = require('../lib').Pages
var SauceLabs = require('saucelabs');
var Moment = require('moment');

var sauce_username = process.env.SAUCE_USERNAME;
var sauce_password = process.env.SAUCE_ACCESS_KEY;
var sauceAccount = new SauceLabs({
  username: sauce_username,
  password: sauce_password,
  proxy: Config.proxy
});

var driver;

if (process.env.SAUCE === "true") {
  // update SauceLabs settings
  Config.server = "http://" +
    sauce_username + ":" + sauce_password + "@ondemand.saucelabs.com:80/wd/hub";
  Config.capabilities.app = "sauce-storage:" + Config.remoteAppName;

  driver = new Cyancat(Config.server, {
    maxWaitTime: 10000,
    proxy: Config.proxy
  });

  beforeEach(function(done) {
    var title = this.currentTest.fullTitle();
    if (Config.desiredCapabilities) {
      // Based on --browsers value, Magellan sends back desiredCapabilities to each test
      // in NODE_CONFIG env variable, which can be extracted in Config.desiredCapabilities
      // Currently Magellan only returns desiredCapabilities like follows:
      // {
      //  "browserName":"iphone",
      //  "version":"9.2",
      //  "platform":"OS X 10.10",
      //  "deviceName":"iPhone Simulator"
      // }
      // Pending for https://github.com/TestArmada/guacamole/issues/15 to fully integrate
      Config.capabilities.platformVersion = Config.desiredCapabilities.version;
      Config.capabilities.deviceName = Config.desiredCapabilities.deviceName;
    }

    driver.run(function() {
      driver.init(Config.capabilities);
      // feed back selenium session ID to parent process (Magellan)
      if (process.send) {
        process.send({
          type: "selenium-session-info",
          sessionId: driver.sessionId
        });
      }

      // update Sauce dashboard status - job name
      sauceAccount.updateJob(driver.sessionId, {
        name: title
      }, function(err) {
        if (err) console.log(err);
      });
      done();
    });
  });

  afterEach(function(done) {
    var passed = this.currentTest.state === 'passed' ? 1 : 0;
    driver.run(function() {
      // update Sauce dashboard status - job result
      var build = process.env.BUILD === undefined ?
        Config.remoteAppName + '-' + Moment().format() :
        Config.remoteAppName + '-' + process.env.BUILD;
      sauceAccount.updateJob(driver.sessionId, {
        build: build,
        passed: passed
      }, function(err) {
        if (err) console.log(err);
      });
      driver.quit();
      done();
    });
  });

} else {
  driver = new Cyancat(Config.server, {
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
}

exports.driver = driver;
exports.pages = Pages;
exports.testData = require('../config/testData');
