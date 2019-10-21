module.exports = {
    publicPath: '/',
    filenameHashing: true,
    productionSourceMap: false,
    assetsDir: 'static',
    configureWebpack: config => {
  
    },
    devServer: {
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://localhost:3000/',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/baidu_api':{
                target:'http://api.fanyi.baidu.com/api',
                changeOrigin:true,
                pathRewrite: {
                    '^/bdapi': ''
                }
            }
        }
    }
}