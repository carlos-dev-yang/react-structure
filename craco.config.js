/* eslint-disable */
const path = require('path');

const resolve = (arg) => path.resolve(__dirname, arg);
const CracoAlias = require('craco-alias');

module.exports = {
  eslint: {
    configure: {
      rules: {
        'no-unused-vars': ['off', { varsIgnorePattern: 'React' }],
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'options',
        baseUrl: './',
        aliases: {
          '@components': './src/components',
          '@features': './src/features',
          '@hooks': './src/hooks',
          '@utils': './src/utils',
          '@src': './src/',
        },
      },
    },
  ],
  webpack: {
    alias: {
      '@src': resolve('src'),
      '@components': resolve('src/components'),
      '@features': resolve('src/features'),
      '@hooks': resolve('src/hooks'),
      '@utils': resolve('src/utils'),
    },
    configure: {
      // entry: './src/_development/index.tsx',
      entry: './src/index.tsx',
    },
  },
};
