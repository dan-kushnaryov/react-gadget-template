var _ = require('underscore');
var path = require('path');

// Load underscore string
_.mixin(require('underscore.string').exports());

var getScreenshotName = function(mod, example, caption) {
  var filename = new Date().getTime() + '-' + caption + '.png';

  return path.join(
    'images',
    mod,
    example,
    filename
  );
};

exports.command = function (caption) {
  var browser = this;

  var exampleName = _.dasherize(
    browser.currentTest.name.toLowerCase()
  );
  var moduleName = _.dasherize(
    browser.currentTest.module.split('/').shift()
  );
  var captionName = _.dasherize(caption);
  var screenshotName = getScreenshotName(
    moduleName, exampleName, captionName
  );

  browser
    .pause(500)
    .saveScreenshot(screenshotName);

  return browser;
}
