var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var reactify = require('reactify');
var spawn = require('child_process').spawn;
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');
var Filter = require('gulp-filter');
var globalShim = require('browserify-global-shim');

gulp.task('lint', function (callback) {
  var lint = spawn('./scripts/lint.sh');
  lint.stdout.pipe(process.stdout);
  lint.stderr.pipe(process.stderr);

  lint.on('exit', function(code) {
    callback();
  });
});

gulp.task('run-demos', function (callback) {
  // If this breaks down for you you can always run
  // `versal preview --port 6952` and then `nightwatch`
  // in a second terminal and forgo the automation.
  var nightwatchArgs = process.argv.slice(2);
  var demos = spawn('./scripts/demos.js', nightwatchArgs);
  demos.stdout.pipe(process.stdout);
  demos.stderr.pipe(process.stderr);

  demos.on('exit', function(code) {
    callback();
  });
});

gulp.task('run-tests', function (callback) {
  var tests = spawn('./node_modules/.bin/jest');
  tests.stdout.pipe(process.stdout);
  tests.stderr.pipe(process.stderr);

  tests.on('exit', function(code) {
    callback();
  });
});

gulp.task('bundle', function(){
  var b = browserify({
    ignoreGlobals: true,
    extensions: ['.jsx']
  });
  var globalShimTransform = globalShim.configure({
    'react': 'React',
    'versal_player_api': 'VersalPlayerAPI'
  });
  b.transform(reactify);
  b.transform(globalShimTransform);
  b.add('./js/app.jsx');
  return b.bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('css', function() {
  var filter = Filter('**/*.styl');

  return gulp.src([
      'components/normalize-css/normalize.css',
      'components/versal-gadget-api/versal-gadget-theme.css',
      './css/**/*.styl'
    ])
    .pipe(filter)
    .pipe(stylus())
    .pipe(filter.restore())
    .pipe(concat('app.css'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('base', ['lint', 'bundle', 'css']);
gulp.task('demo', ['base', 'run-demos']);
gulp.task('test', ['base', 'run-tests']);
gulp.task('default', ['base']);
