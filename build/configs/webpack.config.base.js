const path = require('path')
const webpackMerge = require('webpack-merge').merge
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

/** @type {import('webpack').Configuration} */
const config = webpackMerge({
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    modules: ['node_modules'],
  },
  output: {
    path: path.resolve(__dirname, '../../dist'),
    hashDigestLength: 8,
  },
  entry: {
    index: './pages/index/index.tsx',
    player: './pages/player/index.tsx',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [{
          loader: 'babel-loader',
        }],
        exclude: /node_modules/,
      },
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
        test: /\.(css|scss)$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              additionalData: `@import './pages/variables.scss';`,
            },
          },
        ],
        exclude: /\.module\.scss$/,
      },
      {
        test: /\.module\.(css|scss)$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false,
              modules: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              additionalData: `@import 'pages/variables.scss';`,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'pages/template.html',
      filename: 'index.html',
      chunks: ['index'],
      inject: 'body',
    }),
    new HtmlWebpackPlugin({
      template: 'pages/template.html',
      filename: 'player.html',
      chunks: ['player'],
      inject: 'body',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../../public'),
          to: 'static',
          filter(name) {
            if (name.endsWith('.gitkeep')) {
              return false
            }
            return true
          },
        },
      ],
    }),
  ],
  devServer: {
    static: {
      publicPath: '/',
    },
    hot: true,
    allowedHosts: 'all',
    host: '0.0.0.0',
    port: 3000,
    webSocketServer: { type: 'ws', options: { port: 3000 } },
  },
})

module.exports = config
