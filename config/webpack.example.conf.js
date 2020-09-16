const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const root = path.resolve(__dirname, '..');
const examplePath = path.resolve(root, 'examples');
const srcPath = path.resolve(root, 'src');
const base = require('./webpack.base.conf');

module.exports = merge(base, {
  mode: 'production',
  devtool: 'source-map',
  entry: path.join(srcPath, 'app.tsx'),
  output: {
    path: examplePath,
    filename: 'index.js',
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(srcPath, 'index.html'),
      filename: 'index.html',
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
      },
      hash: true,
    }),
  ],
});
