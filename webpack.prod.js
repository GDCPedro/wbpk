const merge = require('webpack-merge')
const Webpack = require('webpack')
const common = require('./webpack.common.js')

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
  devtool: 'source-map',
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    }),
    // 设置环境变量
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
})