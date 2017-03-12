# WordPress iOS App Appium tests

iOS App test automation for WordPress using Appium


## Setup

* Install Xcode 8+
* Install [Node.js >= v4.2.3 and npm](http://nodejs.org/)
* Clone this repo and install npm package dependencies:
```shell
$ git clone git@github.com:chenchaoyi/wp-ios-tests.git
$ cd wp-ios-tests
$ npm install
```

Note: For the first time running the tests:

* You may want to check your Appium setup by running:

```bash
# install appium-doctor
$ npm install appium-doctor -g
# check that all iOS dependencies are set up correctly
$ appium-doctor --ios
```

## Run tests

#### First start Appium server:

```shell
./node_modules/.bin/appium
```

#### Then from another terminal window:
```shell
# Run all the tests:
./node_modules/.bin/mocha test/wp/publish.js

# Run all the tests with all Appium command traffic in Charles proxy (https://www.charlesproxy.com/):
NODE_CONFIG='{"proxy": "http://127.0.0.1:8888"}' ./node_modules/.bin/mocha test/wp/publish.js

# Run all test with Magellan on Sauce Labs:
SAUCE=true SAUCE_USERNAME=account SAUCE_ACCESS_KEY=key ./node_modules/.bin/magellan --max_test_attempts=1 test/wp/publish.js --browsers=iphone_10_2_OS_X_10_11_iPhone_7,iphone_10_2_OS_X_10_11_iPhone_7_Plus --sauce=true --max-workers=5

```

