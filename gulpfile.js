'use strict';

const csso = require('gulp-csso');
const del = require('del');
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify-es').default;
const connect = require('gulp-connect');
const replace = require('gulp-replace');

const currentYear = new Date().getFullYear();

// CLEAN

gulp.task('clean', () => {
  return del(['dist', 'serve']);
});

// BUILD

gulp.task('build:styles', () => {
  return gulp.src('src/asset/**/*.scss')
    // Compile SASS files
    .pipe(sass().on("error", sass.logError))
    // Minify the file
    .pipe(csso())
    // Output
    .pipe(gulp.dest('dist/asset'));
});

gulp.task('build:scripts', () => {
  return gulp.src('src/asset/**/*.js')
    // Minify the file
    .pipe(uglify())
    // Output
    .pipe(gulp.dest('dist/asset'));
});

gulp.task('build:html', () => {
  return gulp.src(['src/**/*.html'])
    .pipe(replace("CURRENT_YEAR", String(currentYear)))
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true,
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('build:images', () => {
  return gulp.src(['src/asset/img/**/*']).pipe(gulp.dest('dist/asset/img'));
});

gulp.task('build', gulp.series('clean', 'build:styles', 'build:scripts', 'build:html', 'build:images'));

// SERVE

gulp.task('serve:styles', () => {
  return gulp.src('src/asset/style.scss')
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest('serve/asset/'));
});

gulp.task('serve:copy', () => {
  return gulp.src(['src/**/*', '!src/**/*.scss'])
    .pipe(replace("CURRENT_YEAR", String(currentYear)))
    .pipe(gulp.dest('serve'));
});

gulp.task('serve:reload', () => {
  return gulp.src('serve').pipe(connect.reload());
});

gulp.task('serve:watch', () => {
  return gulp.watch('src/**/*', gulp.series('clean', 'serve:copy', 'serve:styles', 'serve:reload'));
});

gulp.task('serve:connect', async () => {
  connect.server({
    port: 4000,
    root: 'serve',
    livereload: true,
  });
});

gulp.task('serve', gulp.series('clean', 'serve:copy', 'serve:styles', 'serve:reload', 'serve:connect', 'serve:watch'));

// DEFAULT

gulp.task('default', async () => {
  console.log('Check README.md to see development commands.');
});
