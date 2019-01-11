const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
const glob = require("glob");

// const devMode = process.env.NODE_ENV !== 'production';

module.exports = {

  entry: {
    js: [
      'babel-polyfill',
      path.resolve(__dirname, "./src/index.js"),
      ...glob.sync("./src/**/*.s*ss")
    ]
  },

  output: {
    path: path.join(__dirname, "/dist"),
    publicPath: "/",
    filename: "js/[name].bundle.js"
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.(sass|scss)$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  plugins: [
    new CleanWebpackPlugin(['/dist']),
    new ExtractTextPlugin({
      filename: "css/styles.css",
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      path: path.resolve(__dirname, '')
    })
  ],

  devServer: {
    publicPath: '/',
    historyApiFallback: true,
    inline:true,

    port: 3000 // You can choose your favorite PORT =)
  },
};