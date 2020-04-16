const path = require('path');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const root = path.resolve(__dirname, '..');

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          compilerOptions: {
            outDir: path.resolve(root, 'dist'),
          },
        },
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'images',
        },
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader?classPrefix=rt-scheduler',
      },
    ],
  },
  resolve: {
    modules: ['node_modules', root],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.es6'],
    alias: {
      '@app': path.resolve(root, 'src'),
    },
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
  ],
};
