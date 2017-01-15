'use strict'

var gulp = require("gulp");
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var filter = require('gulp-filter');
var mainBowerFiles = require('main-bower-files');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');
var runSequence = require('run-sequence');
var replace = require('gulp-replace');
var webpack = require('webpack-stream');


gulp.paths = {
    dist: 'dist'
}
var paths = gulp.paths;

gulp.task('serve', ['sass', 'scripts'], function(){
    browserSync.init({
        server: {
            baseDir: 'src',
            routes: {'/bower_components': 'bower_components', '/js': 'tmp/js'}
        }
    });

    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/scripts/**/*.js', ['scripts']);
    gulp.watch('**/*.html').on('change', browserSync.reload);
    gulp.watch('tmp/**/*.js').on('change', browserSync.reload);
});

gulp.task('scripts', function(){
    return gulp.src('src/scripts/main.js')
        //.pipe(named())
        //.pipe(webpack(require("./webpack.config.js")))
        .pipe(webpack({
            //watch: true,  //此配置会阻塞 serve 任务
            output: {
                filename: 'main.js',
            }
        }))
        //.pipe(gulp.dest(paths.dist + "/js"));
        .pipe(gulp.dest("tmp/js"))
        .pipe(browserSync.stream());
});

gulp.task('sass', function(){
    return gulp.src('src/scss/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream());
});

gulp.task('sass:watch', function () {
    gulp.watch('src/scss/**/*.scss');
});

gulp.task('clean:dist', function () {
    return del(paths.dist);
});

gulp.task('copy:bower', function () {
    return gulp.src(mainBowerFiles(['**/*.js', '!**/*.min.js']))
        .pipe(gulp.dest(paths.dist+'/js/libs'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.dist+'/js/libs'));
});

gulp.task('copy:css', function() {
   gulp.src('src/css/**/*')
   .pipe(gulp.dest(paths.dist+'/css'));
});

gulp.task('copy:img', function() {
   return gulp.src('src/img/**/*')
   .pipe(gulp.dest(paths.dist+'/img'));
});

gulp.task('copy:fonts', function() {
   return gulp.src('src/fonts/**/*')
   .pipe(gulp.dest(paths.dist+'/fonts'));
});

gulp.task('copy:js', function() {
   return gulp.src('tmp/js/**/*')
   .pipe(gulp.dest(paths.dist+'/js'));
});

gulp.task('copy:html', function() {
   return gulp.src('src/**/*.html')
   .pipe(gulp.dest(paths.dist+'/'));
});

gulp.task('replace:bower', function(){
    return gulp.src([
        './dist/*.html',
        './dist/**/*.js',
    ], {base: './'})
    .pipe(replace(/bower_components+.+(\/[a-z0-9][^/]*\.[a-z0-9]+(\'|\"))/ig, 'js/libs$1'))
    .pipe(gulp.dest('./'));
});

gulp.task('build:dist', function(callback) {
    runSequence('clean:dist', 'copy:bower', 'copy:css', 'copy:img', 'copy:fonts', 'copy:js', 'copy:html', 'replace:bower', callback);
});

gulp.task('default', ['serve']);