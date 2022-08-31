/* global app */
import fs from "fs";
import imagemin from "gulp-imagemin";
import rename from "gulp-rename";
import svg2png from "gulp-svg2png";

import manifestData from "../config/manifest-data.js";

const favicon = (cb) => {
  const faviconFile = `${app.pathes.src.favicon}favicon.svg`;
  const faviconMasc = `${app.pathes.src.favicon}mask-icon.svg`;

  if (!fs.existsSync(faviconFile)) {
    return cb();
  }

  // favicon.svg
  app.gulp
    .src(faviconFile)
    .pipe(
      imagemin({
        progressive: true,
        svgolugins: [{ removeViewBox: false }],
        interlaced: true,
        optimizationLevel: 3,
      })
    )
    .pipe(app.gulp.dest(app.pathes.publicFolder));

  // mask-icon.svg
  if (fs.existsSync(faviconMasc)) {
    app.gulp
      .src(faviconMasc)
      .pipe(
        imagemin({
          progressive: true,
          svgolugins: [{ removeViewBox: false }],
          interlaced: true,
          optimizationLevel: 3,
        })
      )
      .pipe(app.gulp.dest(app.pathes.publicFolder));
  }

  // apple-touch-icon.png
  app.gulp
    .src(faviconFile)
    .pipe(
      svg2png({
        width: 180,
        height: 180,
      })
    )
    .pipe(
      imagemin({
        progressive: true,
        svgolugins: [{ removeViewBox: false }],
        interlaced: true,
        optimizationLevel: 3,
      })
    )
    .pipe(rename("apple-touch-icon.png"))
    .pipe(app.gulp.dest(app.pathes.publicFolder));

  // google-touch-icon.png
  app.gulp
    .src(faviconFile)
    .pipe(
      svg2png({
        width: 512,
        height: 512,
      })
    )
    .pipe(
      imagemin({
        progressive: true,
        svgolugins: [{ removeViewBox: false }],
        interlaced: true,
        optimizationLevel: 3,
      })
    )
    .pipe(rename("google-touch-icon.png"))
    .pipe(app.gulp.dest(app.pathes.publicFolder));

  // 2. Генерация manifest.json
  const manifestFile = app.pathes.public.manifest;

  fs.writeFile(manifestFile, JSON.stringify(manifestData), () => {
    console.log("Manifest file created!");
  });

  cb();
};

export default favicon;
