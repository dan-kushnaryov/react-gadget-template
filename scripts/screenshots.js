#!/usr/bin/env node

// This script just copies files out of ./images that were
// created by selenium according to a key, `screenshots` in
// package.json:
//
// "screenshots": {
//   "default-authoring": "sanity/default-authoring/author-added-gadget",
//   "default-learning": "sanity/default-learning/author-toggled-to-learner"
// }
//
// This will copy
//
// ./sanity/default-authoring/author-added-gadget.png
// ./sanity/default-learning/author-toggled-to-learner.png
//
// to
//
// ./screenshots/default-authoring.png
// ./screenshots/default-learning.png

var _ = require('underscore');
var fs = require('fs-extra');
var path = require('path');

var screenshots = fs.readJsonSync('./package.json').screenshots;

var screenshotPaths = _.reduce(screenshots, function(mappings, from, to) {
  var fromPath = path.resolve('images', from + '.png');
  var toPath = path.resolve('screenshots', to + '.png');
  mappings.push({
    from: fromPath,
    to: toPath
  });
  return mappings;
}, []);

fs.removeSync('./screenshots');
fs.mkdirsSync('./screenshots');

_.each(screenshotPaths, function(screenshot) {

  if (!fs.existsSync(screenshot.from)) {
    console.warn('screenshot from path does not exist ', screenshot.from);
  } else {
    fs.copySync(screenshot.from, screenshot.to);
  }
});
