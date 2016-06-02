var gulp = require('gulp');
var babel = require('gulp-babel');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var connect = require('gulp-connect');

//this task is responsible for compiling, bundling, renaming, compressing, and generating the released JS file.
gulp.task('build', function() {
  return gulp.src('app/jsx/*')
          .pipe(babel({
              presets: ['react']
          }))
          .pipe(browserify())
          .pipe(rename('main.min.js'))
          .pipe(uglify())
          .pipe(gulp.dest('app/js'))
});

//this task will watch any change in app/jsx folder and then re-build it.
gulp.task('watch', function() {
  gulp.watch([
    'app/jsx/*'
  ], function() {
    //any changed detected, call build task
    gulp.run('build');
  });
});

//this task will run a server listening at port 8080
gulp.task('server', function() {
  connect.server({
    root: 'app',
    port: 8080,
    livereload: true
  });
});