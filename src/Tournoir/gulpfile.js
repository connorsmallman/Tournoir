var gulp = require('gulp');
var rimraf = require('rimraf');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var project = require('./project.json');

var paths = {
  webroot: './' + project.webroot + '/'
};

paths.js = {
  main: paths.webroot + 'js/main.js',
  dest: paths.webroot + 'dist',
};


function bundle_js(bundler) {
  return bundler.bundle()
    .on('error', gutil.log)
    .pipe(source('tournoir.js'))
    .pipe(buffer())
    .pipe(gulp.dest(paths.js.dest))
    .pipe(sourcemaps.init({ loadMaps: true }))
      // capture sourcemaps from transforms
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.js.dest));
}

gulp.task('bundle', function () {
  var bundler = browserify(paths.js.main, { 
    debug: true 
  })
  .transform(babelify);

  return bundle_js(bundler);
});
