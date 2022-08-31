import ESLintPlugin from "eslint-webpack-plugin";
import PugPlugin from "pug-plugin";
import StyleLintPlugin from "stylelint-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";

export default (env) => {
  const plugins = [
    // Pug
    new PugPlugin({
      pretty: true,
      extractCss: {
        filename: "styles/[name].[contenthash:8].css",
      },
    }),

    // ESLint
    new ESLintPlugin({
      failOnError: false,
      quiet: true,
    }),

    // Stylelint
    new StyleLintPlugin({
      configFile: ".stylelintrc.json",
      context: "src",
      files: "**/*.scss",
      fix: true,
      failOnError: false,
      quiet: true,
    }),

    // Copy files
    new CopyPlugin({
      patterns: [
        {
          from: `${env.paths.publicFolder}/files`,
          to: `${env.paths.buildFolder}/files`,
        },
        {
          from: `${env.paths.publicFolder}\\manifest.json`,
          to: `${env.paths.buildFolder}`,
        },
        {
          from: `${env.paths.publicFolder}\\google-touch-icon.png`,
          to: `${env.paths.buildFolder}`,
        },
      ],
    }),
  ];

  return plugins;
};
