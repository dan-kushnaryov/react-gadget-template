module.exports = function(config) {
  config.set({
    frameworks: ['browserify', 'mocha', 'chai'],
    files: [
      'bower_components/eventEmitter/EventEmitter.js',
      'bower_components/versal-gadget-api/versal-player-api.js',
      // This polyfill is needed for phantomjs, see:
      // https://github.com/ariya/phantomjs/issues/10522
      'test/shims/phantomjs-shims.js',
      'test/**/*_spec.js',
    ],
    reporters: ['dots'],
    preprocessors: {
      'test/**/*_spec.js': ['browserify']
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    singleRun: true,
    autoWatch: true,
    browsers: ['PhantomJS'],
    browserify: {
      debug: true,
      transform: ['reactify', 'brfs', 'browserify-shim'],
      extensions: ['.jsx']
    }
  });
};
