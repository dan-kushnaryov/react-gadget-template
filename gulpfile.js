var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var reactify = require('reactify');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');
var globalShim = require('browserify-global-shim');
var shell = require('gulp-shell');
var jshint = require('gulp-jshint');
var react = require('gulp-react');
var fs = require('fs-extra');

// We store the settings in package.json to
// keep this file generic
var pkg = fs.readJsonSync('./package.json');
var args = process.argv.slice(2);

gulp.task('jshint', function() {
  return gulp.src([
      'js/**/*.{js,jsx}',
      'tests/**/*.{js,jsx}'
    ])
    .pipe(react())
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('bundle', function(){
  var b = browserify({
    ignoreGlobals: true,
    extensions: ['.jsx']
  });

  var globalShimOptions = pkg['browserify-global-shim'];
  var globalShimTransform = globalShim.configure(globalShimOptions);

  b.transform(reactify);
  b.transform(globalShimTransform);

  b.add('./js/app.jsx');

  return b.bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('css', function() {
  return gulp.src([
      'bower_components/normalize-css/normalize.css',
      'bower_components/versal-gadget-api/versal-gadget-theme.css',
      './css/app.styl'
    ])
    .pipe(stylus())
    .pipe(concat('app.css'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('run-demos', shell.task([
  // NOTE: passes args down to nightwatch, unsure
  // this will scale when mixed with other tasks
  // e.g. copy-screenshots relies on this now
  './scripts/demos.js ' + args.join(' ')
]));

gulp.task('copy-screenshots', ['run-demos'], shell.task([
  './scripts/screenshots.js'
]));

gulp.task('run-tests', shell.task([
  './node_modules/.bin/jest'
]));

gulp.task('base', ['jshint', 'bundle', 'css']);
gulp.task('demo', ['base', 'run-demos']);
gulp.task('test', ['base', 'run-tests']);
gulp.task('screenshots', ['base', 'run-demos', 'copy-screenshots']);

gulp.task('default', ['base']);
