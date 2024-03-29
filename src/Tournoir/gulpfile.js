﻿var gulp = require('gulp');
var rimraf = require('rimraf');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var hbsfy = require('hbsfy');
var project = require('./project.json');

var paths = {
  webroot: './' + project.webroot + '/'
};

paths.js = {
  main: paths.webroot + 'app/main.js',
  dest: paths.webroot + 'dist',
};

paths.sass = {
  main: paths.webroot + 'app/main.scss',
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
  .transform(babelify)
  .transform(hbsfy);

  return bundle_js(bundler);
});

gulp.task('sass', function () {
  gulp.src(paths.sass.main)
    .pipe(sass().on('error', gutil.log))
    .pipe(gulp.dest(paths.sass.dest));
});

gulp.task('sass:watch', function () {
  gulp.watch(paths.webroot + '/**/*.scss', ['sass']);
});

gulp.task('js:watch', function () {
  gulp.watch([paths.webroot + '/**/*.js', paths.webroot + '/**/*.hbs'], ['bundle']);
});

gulp.task('watch', ['sass:watch','js:watch']);
