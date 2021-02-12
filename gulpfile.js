const gulp = require('gulp');
const webpack = require('webpack-stream');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourceMaps = require('gulp-sourcemaps');
const image = require('gulp-image');
const browserSync = require('browser-sync').create();
const rename = require('gulp-rename');
const vinylNamed = require('vinyl-named');

const html = () => {
    gulp.src('./src/*.pug')
    .pipe(pug({pretty: true}))
    .pipe(browserSync.reload({stream: true}))
    .pipe(gulp.dest('./dist'));

    return gulp.src(['./src/templates/*.pug'])
    .pipe(pug({pretty: true}))
    .pipe(browserSync.reload({stream: true}))
    .pipe(gulp.dest('./dist/templates'));
}

const styles = () => {
    gulp.src(['./src/styles/*.scss', './src/styles/*.sass'])
    .pipe(sourceMaps.init())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(autoprefixer())
    .pipe(sourceMaps.write('./'))
    .pipe(browserSync.reload({stream: true}))
    .on("error", () => {})
    .pipe(gulp.dest('./dist/styles/'));

    return gulp.src(['./src/styles/*.scss', './src/styles/*.sass'])
    .pipe(sourceMaps.init())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(rename({suffix: '-min'}))
    .pipe(autoprefixer())
    .pipe(sourceMaps.write('./'))
    .pipe(browserSync.reload({stream: true}))
    .on("error", () => {})
    .pipe(gulp.dest('./dist/styles/'));
}

const scripts = () => {
    return gulp.src(['./src/scripts/*.ts', './src/scripts/*.js'])
    .pipe(vinylNamed())
    .pipe(webpack(require('./webpack.config')))
    .pipe(browserSync.reload({stream: true}))
    .pipe(gulp.dest('./dist/scripts'));
}

const images = () => {
    return gulp.src('./src/images/*.*')
    .pipe(image())
    .pipe(gulp.dest('./dist/images'));
}

const fonts = () => {
    return gulp.src("./src/fonts/**/*.*")
    .pipe(gulp.dest('./dist/fonts'));
}

const watch = () => {
    browserSync.init({  
        server: {
            baseDir: './dist/'
        }
    });

    gulp.watch(['./src/*.pug', './src/templates/*.pug', './src/mixins/*.pug'], html);
    gulp.watch(['./src/styles/**/*.scss', './src/styles/**/*.sass'], styles);
    gulp.watch(['./src/scripts/*.ts', './src/scripts/**/*.ts'], scripts);
    gulp.watch('./src/fonts/**/*.*', fonts);
    gulp.watch(['./src/images/**/*.*', './src/images/*.*'], images);
}

gulp.task('build',  gulp.series(html, styles, scripts, fonts, images))
gulp.task('dev', gulp.series(html, styles, scripts, fonts, images, watch));