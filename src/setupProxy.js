const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(
    proxy('/api', {
      target: 'http://104.233.252.68:7001',
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api'
      }
    })
  )

  app.use(
    proxy('/video', {
      target: 'http://h5lk6.com',
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        '^/video': '/video'
      }
    })
  )
}
