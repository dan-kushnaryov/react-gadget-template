var _ = require('underscore');
var path = require('path');

// Load underscore string
_.mixin(require('underscore.string').exports());

exports.command = function (caption) {
  var browser = this;

  var exampleName = _.dasherize(
    browser.currentTest.name.toLowerCase()
  );
  var moduleName = _.dasherize(
    browser.currentTest.module.split('/').shift()
  );
  var captionName = _.dasherize(caption);

  var screenshotName = path.join(
    'images',
    moduleName,
    exampleName,
    captionName + '.png'
  );

  browser
    .pause(500)
    .saveScreenshot(screenshotName);

  return browser;
}
