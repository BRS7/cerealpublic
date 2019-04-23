const gulp         = require('gulp');
const browserSync  = require('browser-sync').create();
const sass         = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

// Compile Sass & Inject Into Browser
gulp.task('sass', function() {
    return gulp.src(['public/stylesheets/scss/*.scss'])
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest("public/stylesheets/css"))
        .pipe(browserSync.stream());
});
// Watch Sass & Serve
gulp.task('serve', ['sass'], function() {
    // browserSync.init({
    //     server: "./public/styleshets"
    // });

    gulp.watch(['public/stylesheets/scss/*.scss'], ['sass']);
    // gulp.watch("views/layouts/*.handlebars").on('change', browserSync.reload);
    // gulp.watch("views/*.handlebars").on('change', browserSync.reload);
});
gulp.task('default', ['serve']);


