module.exports = {
  devServer: {
    proxy: 'http://localhost:5000'
  },
  configureWebpack: {
    devtool: 'source-map'
  }
}