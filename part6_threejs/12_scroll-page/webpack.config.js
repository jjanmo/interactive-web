const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    main: './src/app.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].min.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'file-loader',
      },
      {
        test: /\.(mp3|ogg|wav)$/,
        loader: 'file-loader',
      },
      {
        test: /\.(glb|gltf)$/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify:
        process.env.NODE_ENV === 'production'
          ? {
              collapseWhitespace: true,
              removeComments: true,
            }
          : false,
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: `style.css` }),
    new CopyWebpackPlugin({
      patterns: [{ from: './src/models', to: './models' }],
    }),
  ],
  devServer: {
    liveReload: true,
  },
  optimization: {
    minimizer:
      process.env.NODE_ENV === 'production'
        ? [
            new TerserPlugin({
              terserOptions: {
                compress: {
                  drop_console: true,
                },
              },
            }),
          ]
        : [],
    splitChunks: {
      chunks: 'all',
    },
  },
}
