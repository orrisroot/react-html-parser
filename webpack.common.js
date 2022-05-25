const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    modules: [
      path.join(__dirname, 'src'),
      'node_modules'
    ],
    extensions: ['.js']
  },
  output: {
    library: {
      name: 'ReactHtmlParser',
      type: 'umd'
    }
  },
  optimization: {
    chunkIds: 'total-size',
    moduleIds: 'size'
  },
  externals: {
    react: 'React'
  }
};
