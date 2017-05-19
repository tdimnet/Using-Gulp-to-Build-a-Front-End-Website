'use strict';

const gulp      = require('gulp');
const concat    = require('gulp-concat');
const uglify    = require('gulp-uglify');
const sass      = require('gulp-sass');
const maps      = require('gulp-sourcemaps');


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
        .pipe(maps.init())
        .pipe(sass(
            {outputStyle: 'compressed'}
        ))
        .pipe(maps.write('./'))
        .pipe(gulp.dest('./dist/css'))
}); // End: gulp styles
