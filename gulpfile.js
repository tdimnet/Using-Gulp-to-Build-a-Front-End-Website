'use strict';

var gulp      = require('gulp');
var concat    = require('gulp-concat');
var uglify    = require('gulp-uglify');


gulp.task('scripts', () => {
    return gulp.src('./*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist'))
});
