require('dotenv').config();
const path = require('path');
const Dotenv = require('dotenv-webpack');

const withSass = require('@zeit/next-sass');
const withCSS = require("@zeit/next-css");

module.exports = withCSS(withSass({
  webpack(config, { dev }) {
    // envs
    config.plugins.push(new Dotenv({
      path: path.join(__dirname, '.env'),
      systemvars: true,
    }));

    // eslint config
    const eslintRule = {
      test: /\.js$/,
      enforce: 'pre',
      exclude: /node_modules/,
      loader: 'eslint-loader',
      options: {
        emitWarning: dev,
      },
    };
    config.module.rules.push(eslintRule);

    // url loader
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
        },
      },
    });
    return config;
  },
}));
