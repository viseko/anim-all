/* global app */
import fs from "fs";
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";
import gulp from "gulp";
import { deleteAsync } from "del";

// Helper functions
const getFontWeight = (fontProps) => {
  let fontWeight = 400;

  const weights = {
    thin: 100,
    light: 300,
    ultralight: 200,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  };

  for (const weight in weights) {
    if (fontProps.includes(weight)) {
      fontWeight = weights[weight];
    }
  }

  return fontWeight;
};

const getFontStyle = (fontProps) => {
  return fontProps.includes("italic") ? "italic" : "normal";
};

const getFontData = (fontsFiles) => {
  const files = fontsFiles
    .filter((file) => file.slice(file.lastIndexOf(".") + 1) === "woff")
    .map((file) => file.slice(0, file.lastIndexOf(".")));

  const fontFaces = files.map((file) => {
    const fontName = file.split("-")[0];
    const fontProps = file.split("-")[1].toLowerCase();
    const fontWeight = getFontWeight(fontProps);
    const fontStyle = getFontStyle(fontProps);

    return [
      "@font-face {",
      `  font-family: "${fontName}";`,
      "  font-display: swap;",
      `  src: url("@fonts/${file}.woff2") format("woff2"), url("@fonts/${file}.woff") format("woff");`,
      `  font-weight: ${fontWeight};`,
      `  font-style: ${fontStyle};`,
      "}\r\n",
    ].join("\n");
  });

  return fontFaces.join("\n");
};

// Main functions
const otfToTtf = () => {
  return app.gulp
    .src(`${app.pathes.src.fonts}*.otf`)
    .pipe(
      fonter({
        formats: ["ttf"],
      })
    )
    .pipe(app.gulp.dest(app.pathes.src.fonts));
};

const ttfToWoff = () => {
  return app.gulp
    .src(`${app.pathes.src.fonts}*.ttf`)
    .pipe(
      fonter({
        formats: ["woff"],
      })
    )
    .pipe(app.gulp.dest(app.pathes.public.fonts))
    .pipe(app.gulp.src(`${app.pathes.src.fonts}*.ttf`))
    .pipe(ttf2woff2())
    .pipe(app.gulp.dest(app.pathes.public.fonts));
};

export const createFontsStyle = (cb) => {
  const fontsFilePath = `${app.pathes.src.styles}fonts.scss`;

  fs.readdir(app.pathes.public.fonts, (err, fontsFiles) => {
    if (err) {
      console.log(err);
    }

    if (!fontsFiles) {
      return;
    }

    const fontData = getFontData(fontsFiles);

    fs.writeFile(fontsFilePath, fontData, () => {
      console.log("fonts.scss writed!");
    });
  });

  cb();
};

const copyWoff = () => {
  return app.gulp
    .src(`${app.pathes.src.fonts}*.{woff,woff2}`)
    .pipe(app.gulp.dest(app.pathes.public.fonts));
};

const clear = async (cb) => {
  await deleteAsync([`${app.pathes.src.fonts}*.{otf,ttf,woff,woff2}`]);
  cb();
};

const fonts = gulp.series(
  otfToTtf,
  ttfToWoff,
  copyWoff,
  createFontsStyle,
  clear
);

export default fonts;
