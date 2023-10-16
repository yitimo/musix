const path = require('path')
const webpackMerge = require('webpack-merge').merge
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const EslintWebpackPlugin = require('eslint-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const getPages = require('../utils/getPages')

const isProd = process.env.NODE_ENV === 'production'

const pages = getPages()

/** @type {import('webpack').Configuration} */
const config = webpackMerge({
  target: 'web',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.vue'],
    modules: ['node_modules'],
  },
  output: {
    path: path.resolve(__dirname, '../../dist'),
    hashDigestLength: 8,
  },
  entry: {
    global: path.resolve(__dirname, '../../pages/global.ts'),
    ...pages.reduce((r, n) => ({ ...r, [n.name]: n.entry }), {}),
  },
  module: {
    rules: [
      {
        test: /\.(js(x?))$/,
        use: [{
          loader: 'babel-loader',
        }],
        // exclude: /node_modules/,
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
            options: {
              appendTsSuffixTo: [/\.vue$/],
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        use: [{
          loader: 'vue-loader',
          options: {
            compilerOptions: {
              preserveWhitespace: false,
            },
          },
        }],
      },
      {
        test: /\.(css|less)$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false,
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'less-loader',
          },
        ],
        exclude: /\.module\.less$/,
      },
      {
        test: /\.module\.(css|less)$/,
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
            loader: 'postcss-loader',
          },
          {
            loader: 'less-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    ...pages.map((page) => new HtmlWebpackPlugin({
      template: page.template,
      filename: page.filename,
      chunks: ['global', page.name],
      inject: 'body',
    })),
    new EslintWebpackPlugin(),
    new VueLoaderPlugin(),
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
})

module.exports = config
