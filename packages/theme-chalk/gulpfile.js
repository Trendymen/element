'use strict';

const { series, src, dest } = require('gulp');
const sass = require('gulp-sass');
sass.compiler = require("node-sass")
const cssmin = require('gulp-cssmin');
const cssnano = require("cssnano")
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");
const sourcemaps = require('gulp-sourcemaps')

function compile() {
  return src('./src/*.scss')
    .pipe(sass.sync())
    .pipe(sourcemaps.init())
    .pipe(postcss([
      autoprefixer({overrideBrowserslist: ['ie > 9', 'last 2 versions']}),
      cssnano()
    ]))
    .pipe( sourcemaps.write('.') )
    .pipe(dest('./lib'));
}

function copyfont() {
  return src('./src/fonts/**')
    .pipe(cssmin())
    .pipe(dest('./lib/fonts'));
}

exports.build = series(compile, copyfont);
