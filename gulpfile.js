var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var reactify = require('reactify');
var exec = require('child_process').exec;

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
  b.transform(reactify);
  b.add('./js/app.jsx');
  return b.bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('styles', function() {
  gulp.src('./css/**/*')
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['jslint', 'browserify', 'styles']);
