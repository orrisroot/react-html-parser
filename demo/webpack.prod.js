const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const path = require('path');

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test:   /\.scss$/,
        include: [
          path.join(__dirname, 'src', 'sass')
        ],
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          { loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [["autoprefixer", { grid: true }]],
              }
            },
          },
          'sass-loader'
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          compress: {drop_console: true}
        }
      })
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'demo.css'
    })
  ]
});
