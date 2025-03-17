const gulp = require("gulp");
const gap = require("gulp-append-prepend");
const purgecss = require("gulp-purgecss");

const license = `
=========================================================
* @ 2025 Independent Learning Platform
=========================================================

* Landing Page: https://www.ilplatform.be

* Coded by Daniel Cortild

=========================================================
`;

gulp.task("licenses", async () => {
  gulp
    .src("build/static/js/*chunk.js", { base: "./" })
    .pipe(gap.prependText(`/*! ${license} */`))
    .pipe(gulp.dest("./", { overwrite: true }));

  gulp
    .src("build/index.html", { base: "./" })
    .pipe(gap.prependText(`<!-- ${license} -->`))
    .pipe(gulp.dest("./", { overwrite: true }));

  gulp
    .src("build/static/css/*chunk.css", { base: "./" })
    .pipe(gap.prependText(`/*! ${license} */`))
    .pipe(gulp.dest("./", { overwrite: true }));
});

gulp.task("purgecss", () => {
  return gulp
    .src("src/**/*.css")
    .pipe(
      purgecss({
        content: ["src/**/*.html"],
      }),
    )
    .pipe(gulp.dest("build/"));
});
