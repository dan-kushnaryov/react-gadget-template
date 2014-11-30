var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var reactify = require('reactify');
var concatCSS = require('gulp-concat-css');
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
    .pipe(gulp.dest('dist'));
});

gulp.task('css', function() {
  gulp.src(['css/*.css', 'node_modules/normalize.css/normalize.css', 'css/gadget.css'])
    .pipe(concatCSS('app.css'))
    .pipe(gulp.dest('dist/'))
});

gulp.task('default', ['jslint', 'browserify', 'css']);
