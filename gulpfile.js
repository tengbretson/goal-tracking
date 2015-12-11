var gulp = require('gulp');
var sass = require('gulp-sass');
var webpack = require('gulp-webpack');

var paths = {
  sass: ['./style/**/*.scss'],
  js: ['./src/**/*']
};

gulp.task('default', ['sass']);

gulp.task('sass', function () {
  return new Promise(function (resolve, reject) {
    gulp.src('./style/index.scss')
      .pipe(sass({ includePaths: ['./node_modules'] }))
      .pipe(gulp.dest('./www/style'))
      .on('error', reject)
      .on('end', resolve);
  });
});

gulp.task('webpack', function () {
  return new Promise(function (resolve, reject) {
    gulp.src('./src/index.js')
      .pipe(webpack({
        output: { filename: 'index.js' },
        module: {
          loaders: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              loader: 'babel',
              query: { presets: ['stage-2', 'es2015'] }
            },
            {
              test: /\.html$/,
              loader: 'html'
            }
          ]
        }
      }))
      .pipe(gulp.dest('www/js'))
      .on('error', reject)
      .on('end', resolve);
  });
});

gulp.task('watch', ['webpack', 'sass'], function () {
  gulp.watch(paths.js, ['webpack']);
  gulp.watch(paths.sass, ['sass']);
});
