'use strict';

const gulp          = require('gulp');
const concat        = require('gulp-concat');
const uglify        = require('gulp-uglify');
const sass          = require('gulp-sass');
const maps          = require('gulp-sourcemaps');
const del           = require('del');
const image         = require('gulp-image');
const connect       = require('gulp-connect');
const runSequence   = require('run-sequence');

// The default gulp command
gulp.task('default', ['build']);


// Minify and optimize all image files
gulp.task('images', () => {
    return gulp.src([
        './images/*.png',
        './images/*.jpg'
    ])
        .pipe(image({
            jpegRecompress: true,
            jpegoptim: false,
            mozjpeg: false,
        }))
        .pipe(gulp.dest('./dist/content'))
}); // End: images


// Concat and minify all js files
gulp.task('scripts', () => {
    return gulp.src([
        './js/*.js',
        './js/circle/*.js',
    ])
        .pipe(maps.init())
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(maps.write('./'))
        .pipe(gulp.dest('./dist/js'))
}); // End: scripts


// Concat and minify all sass files
gulp.task('styles', () => {
    return gulp.src('./sass/**/*.scss')
        .pipe(concat('all.min.css'))
        .pipe(maps.init())
        .pipe(sass(
            {outputStyle: 'compressed'}
        ))
        .pipe(maps.write('./'))
        .pipe(gulp.dest('./dist/css'))
}); // End: gulp styles


// Clean the files inside the dist folder
gulp.task('clean', () => {
    return del('./dist')
}); // End: gulp clean


// Copy and paste the index.html file
gulp.task('copyIndex', () => {
  gulp.src('./index.html')
    .pipe(gulp.dest('./dist/'))
}); // End: gulp copyIndex


// Run all the gulp scripts write below
gulp.task('build', () => {
  runSequence(
    'clean',
    [
      'copyIndex',
      'images',
      'scripts',
      'styles',
    ],
    'connect'
  )
});



// Watched the css files when a modification occurs
gulp.task('watch', () => {
    gulp.watch('sass/**/*.scss', ['styles']);
}); // End: gulp watch


// Run all the gulp scripts write below
gulp.task('connect', ['watch'] ,() => {
    connect.server({
        root: 'dist',
        livereload: true
    });
}); // End: gulp connect
