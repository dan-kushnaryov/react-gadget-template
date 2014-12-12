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
var clean = require('gulp-clean');
var fs = require('fs-extra');

// We store the settings in package.json to
// keep this file generic
var pkg = fs.readJsonSync('./package.json');
var args = process.argv.slice(2);

gulp.task('cleanup-dist', function() {
  return gulp.src('dist', {read: false})
    .pipe(clean());
});

gulp.task('jshint', function() {
  return gulp.src([
      'js/**/*.{js,jsx}',
      'tests/**/*.{js,jsx}'
    ])
    .pipe(react())
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('bundle', ['cleanup-dist'], function(){
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

gulp.task('css', ['cleanup-dist'], function() {
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
  // this will work when mixed with other tasks
  './scripts/demos.js ' + args.join(' ')
]));

gulp.task('run-tests', shell.task([
  './node_modules/.bin/jest'
]));

gulp.task('base', ['jshint', 'bundle', 'css']);
gulp.task('demo', ['base', 'run-demos']);
gulp.task('test', ['base', 'run-tests']);

gulp.task('default', ['base']);
