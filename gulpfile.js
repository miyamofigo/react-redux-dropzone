var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('compile-sass', () => 
  gulp.src('src/sass/*.scss')
    .pipe(sass().on('error',
      sass.logError))
    .pipe(gulp.dest('src/build/css')))

gulp.task('watch-sass', () =>
  gulp.watch('src/sass/*.scss',
    ['compile-sass']))
