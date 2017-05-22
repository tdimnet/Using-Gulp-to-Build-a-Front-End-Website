'use strict';

const gulp      = require('gulp');
const concat    = require('gulp-concat');
const uglify    = require('gulp-uglify');
const sass      = require('gulp-sass');
const maps      = require('gulp-sourcemaps');
const del       = require('del');
const image     = require('gulp-image');


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
        .pipe(gulp.dest('./dist/images'))
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


// Run all the gulp scripts write below
gulp.task('build', [
    'clean',
    'images',
    'scripts',
    'styles'
]); // End: gulp build
