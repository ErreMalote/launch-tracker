const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
  },
  module: {
    rules: [
        {
            test: /\.js$/,
            use: ['babel-loader'],
            exclude: /node_modules/
        },
        {
            test: /\.(css)/,
            use: ['style-loader', 'css-loader']
        },
        {
          test: /\.js$/,
          enforce: 'pre',
          use: ['source-map-loader'],
        }
    ]
},
  plugins: [
    // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Launch Tracker',
      template: 'index.html'
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    sourceMapFilename: "[name].js.map"
  },
};