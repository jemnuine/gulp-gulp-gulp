// include gulp
var gulp = require('gulp');

// include plug-ins
var jshint = require('gulp-jshint');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var minifyHTML = require('gulp-minify-html');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var sass = require('gulp-ruby-sass');

// js hint task
gulp.task('jshint', function() {
    gulp.src('./src/js/*.js')
    	.pipe(jshint())
    	.pipe(jshint.reporter('default'));
});

// minify images
gulp.task('minify_image', function() {
    var imgSrc = './src/images/**/*',
        imgDst = './build/images';
    gulp.src(imgSrc)
    	.pipe(changed(imgDst))
    	.pipe(imagemin())
    	.pipe(gulp.dest(imgDst));
});

// minify HTML pages
gulp.task('minify_html', function() {
    var htmlSrc = './src/*.html',
        htmlDst = './build';
    gulp.src(htmlSrc)
    	.pipe(changed(htmlDst))
    	.pipe(minifyHTML())
    	.pipe(gulp.dest(htmlDst));
});

// concat, strip debugging and minify js
gulp.task('scripts', function() {
    gulp.src(['./src/scripts/lib.js','./src/scripts/*.js'])
		.pipe(concat('script.js'))
		.pipe(stripDebug())
	    .pipe(uglify())
	    .pipe(gulp.dest('./build/scripts/'));
});

// generate styles from scss/sass
gulp.task('sass', function () {
    sass('./src/sass/')
        .pipe(gulp.dest('./src/styles/'));
});

// concat, autoprefix, and minify css files - including the generated from sass
gulp.task('styles', function() {
	gulp.src(['./src/styles/*.css'])
		.pipe(concat('styles.css'))
		.pipe(autoprefix('last 2 versions'))
		.pipe(minifyCSS())
		.pipe(gulp.dest('./build/styles/'));
});

// default gulp task
gulp.task('default', [
    'minify_image', 
    'minify_html', 
    'scripts', 
    'sass', 
    'styles'
], function() {
	
});
