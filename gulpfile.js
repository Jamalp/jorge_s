var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var autoPrefixer = require('gulp-autoprefixer');
//if node version is lower than v.0.1.2
require('es6-promise').polyfill();
var cssComb = require('gulp-csscomb');
var cmq = require('gulp-merge-media-queries');
var cleanCss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
gulp.task('sass',function(){
    gulp.src(['assets/styles/scss/style.scss'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoPrefixer())
        .pipe(cssComb())
        .pipe(cmq({log:true}))
        .pipe(concat('main.css'))
        .pipe(gulp.dest('assets/styles/css'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cleanCss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('assets/styles/css'))
        .pipe(reload({stream:true}))
        .pipe(notify('css task finished'))
});
gulp.task('js',function(){
    gulp.src(['assets/scripts/src/app.js'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('assets/scripts/min'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('assets/scripts/min'))
        .pipe(reload())
        .pipe(notify('js task finished'))
});
gulp.task('html',function(){
    gulp.src(['html/**/*.html'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(gulp.dest('./'))
        .pipe(reload())
        .pipe(notify('html task finished'))
});
gulp.task('default',function(){
    browserSync.init({
        server: "./",
    });
    gulp.watch('assets/scripts/src/app.js',gulp.series('js'));
    gulp.watch('assets/styles/scss/**.scss',gulp.series('sass'));
});
