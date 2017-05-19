'use strict';

const gulp      = require('gulp');
const concat    = require('gulp-concat');
const uglify    = require('gulp-uglify');


gulp.task('scripts', () => {
    return gulp.src('./js/circle/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
});
