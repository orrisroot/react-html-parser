const { merge } = require('webpack-merge');
const dev = require('./webpack.dev');
const path = require('path');

webpackConfig = merge(dev, {
  watch: true,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                '@babel/plugin-transform-modules-commonjs',
                'babel-plugin-istanbul'
              ]
            },
          },
        ],
        enforce: "pre",
        include: path.join(__dirname, 'src'),
      }
    ]
  }
});
delete webpackConfig.externals;
delete webpackConfig.output;

module.exports = webpackConfig;
