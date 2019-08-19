module.exports = {
  lintOnSave: false,
  assetsDir: "Vue-CMS-Data",
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true
      }
    }
  }
}
