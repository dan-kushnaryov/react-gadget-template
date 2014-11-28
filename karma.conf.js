module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: [
      'test/timer_spec.js'
    ],
    reporters: ['dots'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['PhantomJS']
  });
};
