var gulp = require('gulp'),
    livereload = require('gulp-livereload');

gulp.task('reload', function() {

    livereload();
})


gulp.task('watch', function() {

    livereload.listen();
    gulp.watch('html/js/*.js', ['reload']);
});
