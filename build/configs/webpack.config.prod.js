const path = require('path')
const webpackMerge = require('webpack-merge').merge
const TerserJSPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const baseConfig = require('./webpack.config.base')

/** @type {import('webpack').Configuration} */
const config = webpackMerge(baseConfig, {
  mode: 'production',
  devtool: 'source-map',
  target: 'web',
  output: {
    filename: 'static/js/[name].[contenthash].js',
    chunkFilename: 'static/js/[name].[contenthash].js',
  },
  plugins: [],
  optimization: {
    minimize: true,
    minimizer: [new TerserJSPlugin(), new CssMinimizerPlugin()],
    splitChunks: {
      cacheGroups: {
        defaultVendors: false,
        default: false,
      },
    },
  },
})

module.exports = config
