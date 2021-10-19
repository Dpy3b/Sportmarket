const {src, dest, parallel, series, watch} = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify-es').default;
const del = require('del');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));;
const svgSprite = require('gulp-svg-sprite');
const fileInclude = require('gulp-file-include');
const sourcemaps = require('gulp-sourcemaps');
const rev = require('gulp-rev');
const revRewrite = require('gulp-rev-rewrite');
const revDel = require('gulp-rev-delete-original');
const htmlmin = require('gulp-htmlmin');
const gulpif = require('gulp-if');
const plumber = require("gulp-plumber");
const image = require('gulp-image');
const { readFileSync } = require('fs');
const concat = require('gulp-concat');

let isProd = false; // dev by default

const clean = () => {
	return del(['app/*'])
}

//svg sprite
const svgSprites = () => {
  return src('./src/img/svg/**.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: "../sprite.svg" //sprite file name
        }
      },
    }))
    .pipe(dest('./app/img'));
}

const styles = () => {
  return src('./src/scss/**/*.scss')
    .pipe(plumber())
    .pipe(gulpif(!isProd, sourcemaps.init()))
    .pipe(sass())
    .pipe(autoprefixer({
      overrideBrowserslist: ["last 5 versions"],
      cascade: false,
    }))
    .pipe(gulpif(isProd, cleanCSS({ level: 2 })))
    .pipe(gulpif(!isProd, sourcemaps.write('.')))
    .pipe(dest('./app/css/'))
    .pipe(browserSync.stream());
};

const stylesBackend = () => {
	return src('./src/scss/**/*.scss')
        .pipe(plumber())
		.pipe(sass())
    .pipe(autoprefixer({
      overrideBrowserslist: ["last 5 versions"],
      cascade: false,
		}))
    .pipe(dest('./app/css/'))
};

const scripts = () => {
	src('./src/js/vendor/**.js')
        .pipe(plumber())
		.pipe(concat('vendor.js'))
		.pipe(gulpif(isProd, uglify()))
		.pipe(dest('./app/js/'))
  return src(
    ['./src/js/functions/**.js', './src/js/components/**.js', './src/js/main.js'])
    .pipe(plumber())
    .pipe(gulpif(!isProd, sourcemaps.init()))
    .pipe(concat('main.js'))
    .pipe(gulpif(isProd, uglify()))
    .pipe(gulpif(!isProd, sourcemaps.write('.')))
    .pipe(dest('./app/js'))
    .pipe(browserSync.stream());
}

const scriptsBackend = () => {
	src('./src/js/vendor/**.js')
    .pipe(plumber())
    .pipe(concat('vendor.js'))
    .pipe(gulpif(isProd, uglify()))
		.pipe(dest('./app/js/'))
	return src(['./src/js/functions/**.js', './src/js/components/**.js', './src/js/main.js'])
    .pipe(dest('./app/js'))
};

const resources = () => {
  return src('./src/resources/**')
    .pipe(dest('./app'))
}

const favicon = () => {
    return src(['./src/favicon/**'])
        .pipe(dest('./app/favicon'))
}

const images = () => {
  return src([
        './src/img/**.jpg',
        './src/img/**.png',
        './src/img/**.jpeg',
        './src/img/**.webp',
      './src/img/**/*.jpg',
      './src/img/**/*.png',
      './src/img/**/*.jpeg',
      './src/img/**/*.webp'
      ])
    .pipe(gulpif(isProd, image()))
    .pipe(dest('./app/img'))
};

const htmlInclude = () => {
  return src(['./src/*.html'])
    .pipe(fileInclude({
      prefix: '@',
      basepath: '@file'
    }))
    .pipe(dest('./app'))
    .pipe(browserSync.stream());
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: "./app"
    },
  });

  watch('./src/scss/**/*.scss', styles);
  watch('./src/js/**/*.js', scripts);
  watch('./src/partials/*.html', htmlInclude);
  watch('./src/*.html', htmlInclude);
  watch('./src/resources/**', resources);
  watch('./src/img/*.{webp,jpg,jpeg,png}', images);
  watch('./src/img/**/*.{webp,jpg,jpeg,png}', images);
  watch('./src/favicon/**', favicon);
  watch('./src/img/svg/**.svg', svgSprites);
}

const cache = () => {
  return src('app/**/*.{css,js,svg,png,jpg,jpeg,woff2}', {
    base: 'app'})
    .pipe(rev())
    .pipe(dest('app'))
    .pipe(revDel())
    .pipe(rev.manifest('rev.json'))
    .pipe(dest('app'));
};

const rewrite = () => {
  const manifest = readFileSync('app/rev.json');

  return src('app/**/*.html')
    .pipe(revRewrite({
      manifest
    }))
    .pipe(dest('app'));
}

const htmlMinify = () => {
	return src('app/**/*.html')
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(dest('app'));
}

const toProd = (done) => {
  isProd = true;
  done();
};

exports.default = series(clean, htmlInclude, scripts, styles, resources, images, favicon, svgSprites, watchFiles);

exports.build = series(toProd, clean, htmlInclude, scripts, styles, resources, images, favicon, svgSprites, htmlMinify);

exports.cache = series(cache, rewrite);

exports.backend = series(toProd, clean, htmlInclude, scriptsBackend, stylesBackend, resources, images, favicon, svgSprites);
