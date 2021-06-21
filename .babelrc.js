const path = require('path');

module.exports = {
  presets: ['@babel/react'],
  ignore: ['**/__snapshots__', '**/*.d.ts', '**/*.test.*', '**/*.stories.*'],
  plugins: [
    '@babel/plugin-transform-typescript',
    'babel-plugin-typescript-to-proptypes',
    '@babel/plugin-proposal-export-default-from',
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
    [
      'babel-plugin-module-resolver',
      {
        root: './src',
        alias: {
          '@src': '.',
          '@components': 'src/components',
          '@features': 'src/features',
          '@hooks': 'src/hooks',
          '@utils': 'src/utils',
        },
      },
    ],
  ],
};
