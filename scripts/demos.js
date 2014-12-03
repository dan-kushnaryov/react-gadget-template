#!/usr/bin/env node

// Run versal preview, run nightwatch and kill preview.
// Passes through any arguments to nightwatch.

spawn = require('child_process').spawn;

var nightwatch, versalPreview;

var versalPreviewCommand = 'versal preview --port 6952'.split(' ');
var command = versalPreviewCommand[0];
var args = versalPreviewCommand.slice(1);
var versalPreview = spawn(command, args);

versalPreview.stdout.pipe(process.stdout);
versalPreview.stderr.pipe(process.stderr);

var onNightwatchOutput = function(data) {
  if (/total assertions passed/.test(data.toString())) {
    versalPreview.kill('SIGINT');
    nightwatch.kill('SIGINT');
    process.exit();
  }
};

var onPreviewOutput = function(data) {
  if (/ctrl \+ C to stop/.test(data.toString())) {
    var nightwatchArgs = process.argv.slice(2);
    nightwatch = spawn('nightwatch', nightwatchArgs);
    nightwatch.stdout.pipe(process.stdout);
    nightwatch.stderr.pipe(process.stderr);
    nightwatch.stdout.on('data', onNightwatchOutput);
  }
};
versalPreview.stdout.on('data', onPreviewOutput);
