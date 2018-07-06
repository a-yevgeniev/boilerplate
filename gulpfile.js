const gulp = require('gulp'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  browserSync = require('browser-sync').create(),
  handlebars = require('gulp-compile-handlebars'),
  fs = require('fs'),
  sassLint = require('gulp-sass-lint'),
  autoprefixer = require('gulp-autoprefixer'),
  cleanCSS = require('gulp-clean-css');

gulp.task('html:build', () =>
  gulp.src('src/*.html')
    .pipe(handlebars(JSON.parse(fs.readFileSync('src/data/data.json')), {
      batch: ['./src/partials', './src/components']
    }))
    .on('error', handleError)
    .pipe(gulp.dest('build/'))
    .pipe(browserSync.stream())
);

gulp.task('css:build', () =>
  gulp.src(['./src/scss/**/*.scss', '!./src/scss/libs/**'])
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sourcemaps.init({largeFile: true}))
    .pipe(sass({outputStyle: 'expanded'}))
    .on('error', handleError)
    .pipe(autoprefixer({
        browsers: ['IE >= 11', 'Edge >= 12', 'Firefox >= 50', 'Chrome >= 55', 'Safari >= 8'],
        add: true,
        grid: true
    }))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('build/css/'))
    .pipe(browserSync.stream())
);

gulp.task('css:lint', () =>
  gulp.src(['./src/scss/**/*.scss', '!./src/scss/libs/**'])
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
);

gulp.task('image:build', () =>
  gulp.src('src/img/**/*.*')
    .pipe(gulp.dest('build/img/'))
    .pipe(browserSync.stream())
);

gulp.task('js:build', () =>
  gulp.src('src/js/**/*.*')
    .on('error', handleError)
    .pipe(gulp.dest('build/js/'))
    .pipe(browserSync.stream())
);

gulp.task('build', ['html:build', 'css:build', 'image:build', 'js:build']);

gulp.task('webserver', () =>
  browserSync.init({
    server: {
      baseDir: "./build"
    },
    startPath: "./index.html",
    port: 7777,
    ui: {
      port: 7778
    }
  })
);

gulp.task('watch', ['webserver'], function () {
  gulp.watch(['./src/**/*.html', './src/**/*.hbs', './src/**/*.json'], ['html:build']);
  gulp.watch('./src/scss/**/*.scss', ['css:build']);
  gulp.watch('./src/js/**/*.js', ['js:build']);
  gulp.watch('./src/img/**/*.*', ['image:build']);
  gulp.watch('./src/js/**/*.js', ['js:build']);
});

/*
  The general task of development workflow:
  1. Build all from 'src/' folder into 'build/';
  2. Run webserver on localhost;
  3. Start watching for changes in 'src/' folder and reload the page after any occurs.
  Use 'gulp' command to run this task
**/
gulp.task('default', ['build', 'webserver', 'watch']);


function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}