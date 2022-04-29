const path = require('path')
const webpackMerge = require('webpack-merge').merge

const baseConfig = require('./webpack.config.base')

/** @type {import('webpack').Configuration} */
const config = webpackMerge(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  target: 'web',
  output: {
    filename: 'static/js/[name].js',
    chunkFilename: 'static/js/[name].js',
  },
  plugins: [],
})

module.exports = config
