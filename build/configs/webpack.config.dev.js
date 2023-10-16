// const path = require('path')
const webpackMerge = require('webpack-merge').merge

const baseConfig = require('./webpack.config.base')

/** @type {import('webpack').Configuration} */
const config = webpackMerge(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: 'static/js/[name].js',
    chunkFilename: 'static/js/[name].js',
  },
  plugins: [],
  devServer: {
    static: {
      publicPath: '/',
    },
    hot: true,
    open: true,
    allowedHosts: 'all',
    // host: '0.0.0.0',
    port: 3000,
  },
})

module.exports = config
