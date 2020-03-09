const path = require('path');

//使用clean-webpack-plugin，在编译前自动清除dist目录（指定目录）的文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 使用html-webpack-plugin插件，在dist目录自动生成index.html文件
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  devServer: {
    compress: true
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  },
  plugins: [
    // [
    //   "component",
    //   {
    //     "libraryName": "element-ui",
    //     "styleLibraryName": "theme-chalk"
    //   }
    // ],
    new HtmlWebpackPlugin({
      title: 'Production'
    }),
    new CleanWebpackPlugin()
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}