// This is a good tutorial to get started with
// https://css-tricks.com/gulp-for-beginners/

var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var browserSync = require('browser-sync').create();

var sources = {
  "styles": "src/styles/*.+(css|scss)",
  "scripts": "src/scripts/*.js",
  "images": "src/images/*.+(png|jpg|svg)",
  "views": "src/views/*.+(html|pug)"
};
var dests = {
  "css": "dist/css",
  "js": "dist/js",
  "images": "dist/images"
};

gulp.task('css', function() {
  gulp.src(sources.styles)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(dests.css))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('html', function() {
  gulp.src(sources.views)
    .pipe(pug())
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('js', function() {
  gulp.src(sources.scripts)
  .pipe(gulp.dest(dests.js))
  .pipe(browserSync.reload({
    stream: true
  }));
});

gulp.task('img', function() {
  gulp.src(sources.images)
  .pipe(gulp.dest(dests.images))
  .pipe(browserSync.reload({
    stream: true
  }));
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  });
});

gulp.task('default', ['browserSync', 'html','css','js','img'], function() {
  gulp.watch(sources.styles, ['css']);
  gulp.watch(sources.views, ['html']);
  gulp.watch(sources.scripts, ['js']);
  gulp.watch(sources.images, ['img']);
});
