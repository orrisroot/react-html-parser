const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
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
    extensions: ['.js', '.ts', '.jsx', '.tsx']
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
