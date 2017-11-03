// Подключаем Gulp и все необходимые библиотеки
var gulp = require('gulp'),
        sass = require('gulp-sass'),
        browserSync = require('browser-sync'),
        sass = require('gulp-sass')

// Компиляция stylesheet.css

gulp.task('sass', function () {
    return  gulp.src('src/scss/style.scss')
            .pipe(sass({
                includePaths: ['node_modules/']
            }))
            .on('error', sass.logError)
            .pipe(gulp.dest('dist/style/'))
});

gulp.task('sass:watch', function () {
    gulp.watch('src/scss/style.scss', ['sass']);
});

gulp.task('browser-sync', ['html','sass', 'sass:watch', 'js'], function() {
    browserSync.init({
        server: {baseDir: "dist/"},
        notify: true
    });
});

gulp.task('images', function(){
  gulp.src('src/img/**/*')
    .pipe(gulp.dest('dist/img/'));
});

gulp.task('html', function () {
 return  gulp.src('src/*.html')
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({
        stream: true
    }))
    ;
});

gulp.task('html:watch', function () {
 return  gulp.watch('./src/*.html',['html']);
});

gulp.task('js', function () {
 return  gulp.src('src/js/*.js')
    .pipe(gulp.dest('dist/js/'))
    .pipe(browserSync.reload({
        stream: true
    }))
    ;
});

gulp.task('js:watch', function () {
 return  gulp.watch('./src/js/*.js',['js']);
});


gulp.task('default', ['browser-sync', 'sass:watch', 'html:watch', 'js:watch', 'images']);
