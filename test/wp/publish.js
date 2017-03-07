var expect = require('chai').expect;
var test = require('../../test/test.js');
var testData = test.testData;

describe('Publish new post user flow', function() {
  before(function() {
    driver = test.driver;
  });

  beforeEach(function(done) {
    driver.run(function() {
      test.pages.signin.signIn(driver);
      test.pages.mysite.goToMySite(driver);
      done();
    });
  });

  it('Publish a new post with valid title, text content and an image gallery of two jpg images in it [C001] @smoke', function(done) {
    driver.run(function() {
      test.pages.mysite.createNewPost(driver);
      test.pages.editor.editNewPost(driver);
      test.pages.editor.createGallery(driver, true);
      test.pages.editor.publishPost(driver);
      driver.sleep(2000);
      done();
    });
  });

/*
  it('Update gallery before publish [C002] @smoke', function(done) {
    driver.run(function() {
      test.pages.mysite.createNewPost(driver);
      test.pages.editor.editNewPost(driver);
      test.pages.editor.createAndUpdateGallery(driver, true);
      test.pages.editor.publishPost(driver);
      driver.sleep(5000);
      done();
    });
  });

  it('Publish a new post with multiple image galleries [C003] @smoke', function(done) {
    driver.run(function() {
      test.pages.mysite.createNewPost(driver);
      test.pages.editor.editNewPost(driver);
      test.pages.editor.createGallery(driver, true);
      test.pages.editor.createGallery(driver);
      test.pages.editor.publishPost(driver);
      driver.sleep(2000);
      done();
    });
  });
*/

});
