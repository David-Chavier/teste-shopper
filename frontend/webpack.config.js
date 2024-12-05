const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      templateContent: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>React App</title>
      </head>
      <body>
        <div id="root"></div>
      </body>
      </html>
      `,
    }),
    new Dotenv({
      path: path.resolve(__dirname, '../.env'),
      systemvars: true,
    }),
  ],
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 80,
    open: true,
  },
};
