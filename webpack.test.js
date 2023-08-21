const { merge } = require('webpack-merge');
const dev = require('./webpack.dev');
const path = require('path');

const webpackConfig = merge(dev, {
  watch: true,
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ['babel-plugin-istanbul'],
              presets: [['@babel/preset-env', { modules: 'cjs' }]],
            },
          },
        ],
        include: path.join(__dirname, 'src'),
      },
    ],
  },
});
delete webpackConfig.externals;
delete webpackConfig.output;

module.exports = webpackConfig;
