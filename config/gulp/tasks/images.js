/* global app */
import imagemin from "gulp-imagemin";
import webp from "gulp-webp";

const images = () => {
  // JPG/PNG optimization
  app.gulp
    .src(`${app.pathes.src.img}**/*.{jpg,jpeg,png,gif,webp,svg,ico}`)
    .pipe(
      imagemin({
        progressive: true,
        svgoplugins: [{ removeViewBox: false }],
        interlaced: true,
        optimizationLevel: 3, // 0-7
      })
    )
    .pipe(app.gulp.dest(app.pathes.public.img));

  // Converting to webp
  return app.gulp
    .src(`${app.pathes.src.img}**/*.{jpg,jpeg,png}`)
    .pipe(
      webp({
        progressive: true,
        svgoplugins: [{ removeViewBox: false }],
        interlaced: true,
        optimizationLevel: 3, // 0-7
      })
    )
    .pipe(app.gulp.dest(app.pathes.public.img));

  // src/icons folder shouldn't be cleared
};

export default images;
