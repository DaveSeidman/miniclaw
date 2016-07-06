var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minify = require('gulp-minify'),
    browserSync = require('browser-sync').create(),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    gulpIf = require('gulp-if'),
    del = require('del'),
    concat = require('gulp-concat'),
    cssnano = require('gulp-cssnano'),
    runSequence = require('run-sequence'),
    sourcemaps = require('gulp-sourcemaps');



gulp.task('watch', function() {
    //gulp.watch('source/**/*.*', ['useref']);
    gulp.watch('source/*.html', ['useref']);
    gulp.watch('source/styles/**/*.scss', ['styles']);
    gulp.watch('source/scripts/**/*.js',['scripts']);
})



gulp.task('browserSync', function() {

    browserSync.init({
        server: {
            baseDir: 'dist',
            port:8000
        }
    })
})

gulp.task('styles', function() {

    return gulp.src('source/styles/**/*.scss')
    .pipe(cssnano())
    .pipe(sass())
    .pipe(gulp.dest('dist/styles'))
    .pipe(browserSync.stream());
})

gulp.task('scripts', function() {

    return gulp.src('source/scripts/**/*.js')
    .pipe(concat('main.min.js'))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/scripts'))
    .pipe(browserSync.stream());
})

gulp.task('useref', function() {

    return gulp.src('source/*.html')
    .pipe(useref())
    .pipe(sourcemaps.init())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(sourcemaps.write())
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});


gulp.task('clean', function() {

    return del('dist')
});

gulp.task('default', function(callback) {
    runSequence('build',['browserSync','watch'],callback)
});


gulp.task('build', ['clean'], function(callback) {

    runSequence(['styles','scripts'],'useref', callback);
});
