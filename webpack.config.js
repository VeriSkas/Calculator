const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.[chunghash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              sources: true,
            },
          },
        ],
      },
    ],
  },
  devServer: {
    port: 4200,
  },
};
