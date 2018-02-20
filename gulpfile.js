const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const nodemon = require('gulp-nodemon');
//const concat = require('gulp-concat'); // 合併檔案
const del = require('del');

const paths = {
  src: 'src/**',
  dest: 'dist/'
};

// 每次編譯前先移除原有檔案
function clean() {
  return del(['dist']);
}
function scripts() {
  return gulp.src(paths.src, { sourcemaps: true })
    .pipe(babel()) // 使用babel轉成瀏覽器所看的懂的JavaScript
    .pipe(uglify()) // 將程式碼壓縮成一行
    //.pipe(concat('index.min.js')) // 合併所有檔案
    .pipe(gulp.dest(paths.dest)); // 編譯後產出到指定資料夾中
}
function nodemons(done) {
  nodemon({
    script: 'dist/index.js' // 使用nodemon監聽指定的程式碼
    , ext: 'js' // 監聽JavaScript
    , watch: paths.src // watch ES2015 code
    , tasks: ['default'] // compile synchronously onChange
    , env: { 'NODE_ENV': 'development' }
  })
  done();
}

const build = gulp.series(clean, gulp.parallel(scripts));
const serve = gulp.series(clean, scripts, nodemons);

// deploy product
gulp.task('default', build);

// development 開發模式
gulp.task('serve', serve);
