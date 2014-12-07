#!/usr/bin/env node

// Run versal preview, run nightwatch and kill preview.
// Passes through any arguments to nightwatch.

var spawn = require('child_process').spawn;
var http = require('http');
var fs = require('fs-extra');
var path = require('path');
var async = require('async');
var glob = require('glob');

var startServerAndRunTests = function(callback) {

  var versalPreviewCommand = 'versal preview --port 6952'.split(' ');

  var command = versalPreviewCommand[0];
  var args = versalPreviewCommand.slice(1);

  var versalPreview = spawn(command, args);

  versalPreview.stdout.pipe(process.stdout);
  versalPreview.stderr.pipe(process.stderr);

  versalPreview.stdout.on('data',
    onPreviewOutput.bind(null,
      versalPreview,
      callback
    )
  );
};

var onNightwatchOutput = function(versalPreview, nightwatch, callback, data) {
  if (/total assertions passed/.test(data.toString())) {
    versalPreview.kill('SIGINT');
    nightwatch.kill('SIGINT');
    callback();
  }
};

var startNightwatch = function(versalPreview, callback) {
  var nightwatchArgs = process.argv.slice(2);
  nightwatch = spawn('nightwatch', nightwatchArgs);

  nightwatch.stdout.pipe(process.stdout);
  nightwatch.stderr.pipe(process.stderr);

  var handler = onNightwatchOutput.bind(null,
    versalPreview,
    nightwatch,
    callback
  );

  nightwatch.stdout.on('data', handler);
};

var killSeleniumServer = function(callback) {
  var url = 'http://localhost:4444/selenium-server'
    + '/driver/?cmd=shutDownSeleniumServer';
  // Give it a few secs to wind down after killing
  callback = setTimeout.bind(null, callback, 4000);
  http.get(url, callback).on('error', function(err) { callback(); });
};

var onPreviewOutput = function(versalPreview, callback, data) {
  if (/ctrl \+ C to stop/.test(data.toString())) {
    killSeleniumServer(
      startNightwatch.bind(null, versalPreview, callback)
    );
  }
};

var ensureSeleniumJar = function(callback) {
  var libPath = path.join(__dirname, '../tests/lib');
  var jarFilePath = path.join(libPath, 'selenium.jar')

  fs.mkdirsSync(libPath);

  if (fs.existsSync(jarFilePath)) {
    return callback();
  }

  console.info('Hold on while we download selenium');

  var seleniumUrl = 'https://selenium-release.storage.googleapis.com' +
    '/2.44/selenium-server-standalone-2.44.0.jar';

  var wgetSeleniumCommand = [
    'wget',
    seleniumUrl,
    '--quiet',
    '--output-document='+jarFilePath
  ];

  var command = wgetSeleniumCommand[0];
  var args = wgetSeleniumCommand.slice(1);
  var wgetSelenium = spawn(command, args);

  wgetSelenium.stdout.pipe(process.stdout);
  wgetSelenium.stderr.pipe(process.stderr);
  wgetSelenium.stdout.on('close', callback);
};

var deleteImages = function(callback) {
  var images = glob.sync(__dirname + '/../images/**/*.png');
  images.forEach(fs.removeSync);
  callback();
};

async.series([
  deleteImages,
  ensureSeleniumJar,
  startServerAndRunTests
], function(err) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.info('Done.');
});
