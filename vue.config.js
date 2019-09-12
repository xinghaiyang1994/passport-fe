module.exports = {
  publicPath: process.env.publicPath,
  assetsDir: 'static',
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/style/variable.scss";
        `
      }
    }
  },
  devServer: {
    host: '0.0.0.0',
    hot: true,
    disableHostCheck: true
  }
}