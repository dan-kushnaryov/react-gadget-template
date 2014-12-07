var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var reactify = require('reactify');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');
var globalShim = require('browserify-global-shim');
var shell = require('gulp-shell');

var args = process.argv.slice(2);

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
  return gulp.src([
      'bower_components/normalize-css/normalize.css',
      'bower_components/versal-gadget-api/versal-gadget-theme.css',
      './css/app.styl'
    ])
    .pipe(stylus())
    .pipe(concat('app.css'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('lint', shell.task(['./scripts/lint.sh ' + args.join(' ')]));
gulp.task('run-demos', shell.task(['./scripts/demos.js ' + args.join(' ')]));
gulp.task('run-tests', shell.task(['./node_modules/.bin/jest ' + args.join(' ')]));

gulp.task('base', ['lint', 'bundle', 'css']);
gulp.task('demo', ['base', 'run-demos']);
gulp.task('test', ['base', 'run-tests']);
gulp.task('default', ['base']);
