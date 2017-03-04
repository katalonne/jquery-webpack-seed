// var gulp = require('gulp');

import gulp from 'gulp';

import gulpLoadPlugins from 'gulp-load-plugins';

import cp from 'child_process';
var fs = require('fs');
const $ = gulpLoadPlugins();
var gutil = require('gulp-util');
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify');
var pump = require('pump');
var removeHtmlComments = require('gulp-remove-html-comments');
var strip = require('gulp-strip-comments');
const del = require('del');
var replace = require('gulp-replace');
var replace_two = require('gulp-replace-task');
var replace_three = require('gulp-string-replace');
var useref = require('gulp-useref');
var replaceall = require("replaceall");
var glob = require("glob")

var path = require('path');
var replace = require('gulp-replace');

gulp.task('compressJS', function (cb) {
  pump([
    gulp.src([ '!./dist/bundle_secondary.js','./dist/*.js']),
    uglify(),
    gulp.dest('./dist')
  ],
    cb
  );
});

// gulp.task('changeSrc', function (cb) {
//   glob("./dist/*.html", function (er, files) {
//     // console.log(files);
//     for (let i = 0; i < files.length; i++) {
//       // console.log(files[i]);
//       fs.readFile(files[i],"utf-8", (err, data) => {
//         if (err) {
//           throw err;
//         }
//         // content = data;
//         var newData = replaceall('src="/assets/', 'src="assets/', data);
//         console.log(newData);
//         fs.writeFileSync(files[i], newData, "UTF-8",{'flags': 'w+'});
//         // console.log(typeof data);
//       })
//     }

//   })
// })
gulp.task('changeCSS', function(){
  gulp.src(['./dist/*.css'])
    // '.\/assets\/imgs\/'
    .pipe(replace(/\.\/assets\/imgs\//g,()=>{
      return  '/img/';
    }) )
    .pipe(replace(/\/assets\/imgs\//g,()=>{
      return  '/img/';
    }) )
    .pipe(gulp.dest('./dist/costea_css'));
});





gulp.task('clean_costea',function(){
  del(['./dist/costea_css'
      ]).then(paths => {
    // console.log('Deleted files and folders:\n', paths.join('\n'));
  });
});


gulp.task('changeSrc', function(){
  gulp.src(['./dist/*.html'])
    .pipe(replace(/src="\/assets\//g,()=>{
      return  'src="assets/';
    }) )
    .pipe(replace(/src='\/assets\//g,()=>{
      return  "src='assets/";
    }) )
    .pipe(gulp.dest('./dist/'));
});


gulp.task('removeCommentsHTML', function () {
  return gulp.src('./dist/*.html')
    .pipe(removeHtmlComments())
    .pipe(gulp.dest('./dist'));
});

gulp.task('removeMapComments', function () {
  return gulp.src('./dist/map.*.js')
    .pipe(strip())
    .pipe(gulp.dest('./dist'));
});

gulp.task('clean', function () {
  del(['dist/assets/Swiper-3.3.1/*'
    , 'dist/assets/Swiper-3.3.1/.*'
    , '!dist/assets/Swiper-3.3.1/dist']).then(paths => {
      console.log('Deleted files and folders:\n', paths.join('\n'));
    });

})

gulp.task('copyFiles',()=>{
  gulp.src('./dist/assets/imgs/**')
    .pipe(gulp.dest(path.resolve(__dirname,'..','img')));
  // gulp.src('./dist/assets/js/**')
  //   .pipe(gulp.dest(path.resolve(__dirname,'..','js')));
  gulp.src('./dist/*.html')
    .pipe(gulp.dest(path.resolve(__dirname,'..','html')))
  gulp.src('./dist/*.css')
    .pipe(gulp.dest(path.resolve(__dirname,'..','css')))
})

gulp.task('default', (done) => {
  runSequence('compressJS','removeCommentsHTML', 'removeMapComments', 'clean','clean_costea','changeCSS', 'changeSrc',
              'copyFiles', done);
  // console.log('__dirname : ' + path.resolve(__dirname,'..','img'));
  // console.log('__dirname : ' + __dirname);
})
// ['changeSrc'],

// gulp.task('build:html', function() {
//   // console.log('noroc');
//   gulp.src(['./dev/index.html'])
//     .pipe($.fileInclude({
//       prefix:'@@',
//       basepath: '@file'
//     }))
//     .pipe(gulp.dest('./dist/'));
// });



// gulp.task('build:scss', () => {
//     return gulp.src([
//         './dev/styles.scss'
//     ])
//         .pipe($.plumber({
//             errorHandler: function (error) {
//                 gutil.log(gutil.colors.red('Error (' + error.plugin + '): ' + error.message));
//                 this.emit('end');
//             }
//         }))
//         .pipe($.sass({ outputStyle: 'expanded' }))
//         .pipe($.shorthand())
//         .pipe($.autoprefixer({
//             browsers: [
//                 'Android 2.3',
//                 'Android >= 4',
//                 'Chrome >= 20',
//                 'Firefox >= 24', // Firefox 24 is the latest ESR
//                 'Explorer >= 8',
//                 'iOS >= 6',
//                 'Opera >= 12',
//                 'Safari >= 6'
//             ],
//             cascade: false
//         }))
//         // .pipe($.csso())
//         .pipe(gulp.dest('dist'))
// })


// gulp.task('build:assets',()=>{
//   return gulp.src(['./dev/assets/**/*'])
//     .pipe(gulp.dest('./dist/assets'))
// })



// gulp.task('default', (done)=>{
//     runSequence('build:html','build:scss','build:assets',done);
// })


// gulp.task('serve', ['  '], () => {


    // gulp.watch('./dev/html/**/*.html', ['build:html'])
    // gulp.watch('./dev/styles.scss', ['build:scss']);
// })



//webpack-dev-server --inline --colors --progress --port 3000 --content-base ./dist