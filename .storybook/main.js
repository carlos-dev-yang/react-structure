const path = require('path');
const customWebpackConfig = require('../craco.config.js');

module.exports = {
  stories: ['../src/**/*.stories.@(tsx|ts|mdx)'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-viewport/register',
    '@storybook/addon-knobs/register',
    '@storybook/addon-cssresources/register',
    '@storybook/addon-docs',
  ],
  webpackFinal: async (config) => {
    const { webpack } = customWebpackConfig;
    config.module.rules.push({
      test: /\.tsx$/,
      exclude: [/node_modules/, /.*.stories.*/],
      loader: 'eslint-loader',
      options: { quiet: true },
    });
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          ...webpack.alias,
          '.storybook': path.join(__dirname, '.'),
        },
      },
    };
  },
};
