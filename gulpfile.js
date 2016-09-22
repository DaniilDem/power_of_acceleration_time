/**
 * Created by Daniil on 06.08.2016.
 */
var gulp = require('gulp'),
    less = require('gulp-less'),
    livereload = require('gulp-livereload'),
    prefix = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat');

gulp.task('less', function() {
    gulp.src('less/*.less')
        .pipe(less())
        .pipe(prefix('last 4 versions'))
        .pipe(gulp.dest('css'))
        .pipe(livereload());
});

gulp.task('html', function() {

    gulp.src("*.html")
        .pipe(livereload());
});

gulp.task('js', function() {

    gulp.src(['js/*.js', '!js/build.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('build.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('js'))
        .pipe(livereload());
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('less/*.less', ['less']);
    gulp.watch(["*.html", '*.php'], ['html']);
    gulp.watch('js/*.js', ['js']);

});

gulp.task('default', ['watch']);