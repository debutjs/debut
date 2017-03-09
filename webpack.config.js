const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  context: `${__dirname}/src`,
  entry: {
    debut: './index.tsx',
  },
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'debut',
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader?importLoaders=1!postcss-loader'
        }),
      },
      
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.css'],
    modules: [path.resolve('node_modules'), path.resolve('.')],
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
  ],
  externals: {
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
  },
  devtool: 'eval',
};
