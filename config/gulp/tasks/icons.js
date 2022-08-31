/* global app */
import { readdir } from "fs/promises";
import path from "path";
import svgSprite from "gulp-svg-sprite";
import spritesmith from "gulp.spritesmith";

const getDirectories = async (source) => {
  const dirs = await (await readdir(source, { withFileTypes: true }))
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  return dirs;
};

const createSvgSprite = (packNames) => {
  packNames.forEach((pack) => {
    const { dirname, packName } = pack;

    return app.gulp
      .src(`${app.pathes.src.icons}${dirname}/*.svg`)
      .pipe(
        svgSprite({
          mode: {
            stack: {
              sprite: `../${packName}.svg`,
              example: false,
            },
          },
        })
      )
      .pipe(app.gulp.dest(app.pathes.public.icons));
  });
};

const createPngSprite = (packNames) => {
  packNames.forEach((pack) => {
    const { dirname, packName } = pack;

    return app.gulp
      .src(`${app.pathes.src.icons}${dirname}/*.png`)
      .pipe(
        spritesmith({
          imgName: `${packName}.png`,
          cssName: `${packName}.css`,
        })
      )
      .pipe(app.gulp.dest(app.pathes.public.icons));
  });
};

const icons = async () => {
  const srcDir = path.resolve(app.pathes.root, app.pathes.src.icons);
  const dirnames = await getDirectories(srcDir);
  const svgPacks = [];
  const pngPacks = [];

  // Sorting icon-packs by type
  dirnames.forEach((dirname) => {
    const [format, packName] = [
      dirname.slice(0, dirname.indexOf("-")),
      dirname.slice(dirname.indexOf("-") + 1),
    ];

    let targetArray;

    if (format === "svg") {
      targetArray = svgPacks;
    }

    if (format === "png") {
      targetArray = pngPacks;
    }

    if (targetArray) {
      targetArray.push({
        dirname,
        packName,
      });
    }
  });

  // Making icon-packs
  await createSvgSprite(svgPacks);
  await createPngSprite(pngPacks);
};

export default icons;
