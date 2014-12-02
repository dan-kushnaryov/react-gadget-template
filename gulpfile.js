var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var reactify = require('reactify');
var exec = require('child_process').exec;
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');
var Filter = require('gulp-filter');
var globalShim = require('browserify-global-shim');

gulp.task('jslint', function (cb) {
  exec('./scripts/lint.sh', function (err, stdout, stderr) {
    if (err) {
      console.log(stdout);
      console.log(stderr);
    }
    cb(err);
  });
});

gulp.task('browserify', function(){
  var b = browserify({
    ignoreGlobals: true,
    extensions: ['.jsx']
  });
  var globalShimTransform = globalShim.configure({
    'react': 'React'
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
      'node_modules/normalize.css/normalize.css',
      'css/gadget.css',
      './css/**/*.styl'
    ])
    .pipe(filter)
    .pipe(stylus())
    .pipe(filter.restore())
    .pipe(concat('app.css'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['jslint', 'browserify', 'css']);
