const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
//const concat = require('gulp-concat');
const del = require('del');

const paths = {
  src: 'src/**',
  dest: 'dist/'
};

function scripts() {
  return gulp.src(paths.src, { sourcemaps: true })
    .pipe(babel())
    .pipe(uglify())
    //.pipe(concat('index.min.js'))
    .pipe(gulp.dest(paths.dest));
}
function clean() {
  // You can use multiple globbing patterns as you would with `gulp.src`,
  // for example if you are using del 2.0 or above, return its promise
  return del(['dist']);
}

function watch() {
  gulp.watch(paths.src, build);
}


const build = gulp.series(clean, gulp.parallel(scripts));
gulp.task('default', watch);

gulp.task('build', build);

