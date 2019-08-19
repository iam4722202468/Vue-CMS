const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const { readdirSync, statSync } = require('fs')
const { join } = require('path')

const isDirectory = source => lstatSync(source).isFile()
const dirs = p => readdirSync(p).filter(f => statSync(join(p, f)).isFile())
const fileNames = JSON.stringify(dirs('./Vue-CMS-Data/views'))

module.exports = {
  lintOnSave: false,
  configureWebpack: {
    performance: {
      maxAssetSize: 500000,
    },
    plugins: [
      new CopyWebpackPlugin([{ from: 'Vue-CMS-Data/public', to: '' }]),
      new webpack.DefinePlugin({
          paths: fileNames,
        })
    ],
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true
      }
    }
  }
}
