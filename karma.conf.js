module.exports = function(config) {
  config.set({
    frameworks: ['browserify', 'mocha', 'chai'],
    files: [
      // This polyfill is needed for phantomjs, see:
      // https://github.com/ariya/phantomjs/issues/10522
      'node_modules/polyfill-function-prototype-bind/bind.js',
      'test/**/*_spec.js'
    ],
    reporters: ['dots'],
    preprocessors: {
      'test/**/*_spec.js': ['browserify']
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    singleRun: true,
    autoWatch: false,
    browsers: ['PhantomJS'],
    browserify: {
      debug: true,
      transform: ['reactify', 'brfs', 'browserify-shim'],
      extensions: ['.jsx']
    }
  });
};
