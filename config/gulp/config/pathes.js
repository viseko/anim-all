/* global app */
import path from "path";

const srcFolder = "./src";
const publicFolder = "./public";
const distFolder = "./dist";

const pathes = {
  root: path.resolve(),
  srcFolder,
  publicFolder,
  distFolder,

  src: {
    img: `${srcFolder}/img/`,
    icons: `${srcFolder}/icons/`,
    fonts: `${srcFolder}/fonts/`,
    styles: `${srcFolder}/styles/`,
    favicon: `${srcFolder}/favicon/`,
  },

  public: {
    img: `${publicFolder}/img/`,
    icons: `${publicFolder}/icons/`,
    fonts: `${publicFolder}/fonts/`,
    manifest: `${publicFolder}/manifest.json`,
  },
};

export default pathes;
