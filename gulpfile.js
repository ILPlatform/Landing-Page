const gulp = require('gulp');
const gap = require('gulp-append-prepend');

const license = `
=========================================================
* @ 2021 Independent Learning Platform
=========================================================

* Landing Page: https://www.ilplatform.be

* Coded by Daniel Cortild

=========================================================
`;

gulp.task('licenses', async () => {
  gulp
    .src('build/static/js/*chunk.js', { base: './' })
    .pipe(gap.prependText(`/*! ${license} */`))
    .pipe(gulp.dest('./', { overwrite: true }));

  gulp
    .src('build/index.html', { base: './' })
    .pipe(gap.prependText(`<!-- ${license} -->`))
    .pipe(gulp.dest('./', { overwrite: true }));

  gulp
    .src('build/static/css/*chunk.css', { base: './' })
    .pipe(gap.prependText(`/*! ${license} */`))
    .pipe(gulp.dest('./', { overwrite: true }));
});
