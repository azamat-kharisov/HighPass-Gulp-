const { src, dest, series, watch, task, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const htmlMin = require("gulp-htmlmin");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const browserSync = require("browser-sync").create();
const svgSprite = require("gulp-svg-sprite");
const image = require("gulp-image");
const babel = require("gulp-babel");
const notify = require("gulp-notify");
const uglify = require("gulp-uglify-es").default;
const sourcemaps = require("gulp-sourcemaps");
const del = require("del");
const rename = require("gulp-rename");
const webpack = require("webpack");
const webpackStream = require("webpack-stream");
const webp = require("gulp-webp");
const path = require("path");

function fonts() {
  return src("src/fonts/**/*.woff", { encoding: false })
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write("."))
    .pipe(dest("dist/fonts"));
}

const clean = () => {
  return del(["dist"]);
};

const resources = () => {
  return src("src/resources/**").pipe(dest("dist"));
};

const cssStyle = () => {
  return src("src/styles/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: "expanded",
      }).on("error", notify.onError())
    )
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(
      cleanCSS({
        level: 2,
      })
    )
    .pipe(sourcemaps.write("."))
    .pipe(dest("dist/css"))
    .pipe(browserSync.stream());
};

const htmlMinify = () => {
  return src("src/**/*.html")
    .pipe(
      htmlMin({
        collapseWhitespace: true,
      })
    )
    .pipe(dest("dist"))
    .pipe(browserSync.stream());
};

const svgSprites = () => {
  return src("src/img/svg/**/*.svg")
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: "../sprite.svg",
          },
        },
      })
    )
    .pipe(dest("dist/img/svg"))
    .pipe(browserSync.stream());
};

const images = () => {
  return src(
    [
      "src/img/*.svg",
      "src/img/**/*.jpg",
      "src/img/**/*.png",
      "src/img/**/*.jpeg",
    ],
    { encoding: false }
  )
    .pipe(
      webp({
        quality: 75,
      })
    )
    .pipe(image())
    .pipe(dest("dist/img"));
};

const scripts = () => {
  return src("./src/js/main.js")
    .pipe(
      webpackStream({
        mode: "development",
        output: {
          filename: "main.js",
        },
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: ["@babel/preset-env"],
                },
              },
            },
          ],
        },
        resolve: {
          alias: {
            gsap: path.resolve(__dirname, "node_modules/gsap"),
          },
          fallback: {
            fs: false,
            path: false,
          },
        },
      })
    )
    .on("error", function (err) {
      console.error("WEBPACK ERROR", err);
      this.emit("end"); // Don't stop the rest of the task
    })

    .pipe(sourcemaps.init())
    .pipe(uglify().on("error", notify.onError()))
    .pipe(sourcemaps.write("."))
    .pipe(dest("dist/js"))
    .pipe(browserSync.stream());
};

const watchfiles = () => {
  browserSync.init({
    server: {
      baseDir: "dist",
    },
  });
  watch("src/fonts/*.woff", fonts);
  watch("src/**/*.html", htmlMinify);
  watch("src/styles/**/*.scss", cssStyle);
  watch("src/img/svg/**/*.svg", svgSprites);
  watch("src/js/**/*.js", scripts);
  watch("src/resources/**", resources);
  watch(
    [
      "src/img/*.svg",
      "src/img/**/*.jpg",
      "src/img/**/*.png",
      "src/img/**/*.jpeg",
    ],
    images
  );
};

const htmlMinifyBuild = () => {
  return src("src/**/*.html")
    .pipe(
      htmlMin({
        collapseWhitespace: true,
      })
    )
    .pipe(dest("dist"));
};

const cssStyleBuild = () => {
  return src("./src/styles/main.scss")
    .pipe(
      sass({
        outputStyle: "expanded",
      }).on("error", notify.onError())
    )
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(
      cleanCSS({
        level: 2,
      })
    )

    .pipe(dest("dist/css"));
};

const scriptsBuild = () => {
  return src("src/js/main.js")
    .pipe(
      webpackStream({
        output: {
          filename: "main.js",
        },
        module: {
          rules: [
            {
              test: /\.(?:js|mjs|cjs)$/,
              exclude: /node_modules/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: [["@babel/preset-env", { targets: "defaults" }]],
                },
              },
            },
          ],
        },
      })
    )

    .pipe(
      uglify({
        toplevel: true,
      }).on("error", notify.onError())
    )

    .pipe(dest("dist/js"));
};

// exports.default = series(resources, htmlMinify, scripts, cssStyle, fonts, images, svgSprites, watchfiles);
exports.default = series(
  parallel(htmlMinify, scripts, fonts, resources, images, svgSprites),
  cssStyle,
  watchfiles
);
exports.build = series(
  clean,
  htmlMinifyBuild,
  resources,
  scriptsBuild,
  cssStyleBuild,
  fonts,
  images,
  svgSprites
);
