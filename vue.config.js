const path = require('path');
module.exports = {
    publicPath: '/',
    filenameHashing: true,
    assetsDir: 'static',
    configureWebpack: config => {
        process.env.NODE_ENV === 'development' && (config.devtool = 'source-map');
    },
    chainWebpack: config => {
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
        types.forEach(type => {
            var rule =  config.module.rule('less').oneOf(type);
            rule.use('style-resource')
            .loader('style-resources-loader')
            .options({
                patterns: [
                    path.resolve(__dirname, './src/assets/css/app/app_var.less'),
                ],
            })
        })
    },
    css: {
      loaderOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    },
    devServer: {
        port: 8080,
        proxy: {
            '^/api': {
                target: 'http://localhost:3000/',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '^/baidu_api':{
                target:'http://api.fanyi.baidu.com/api',
                changeOrigin:true,
                pathRewrite: {
                    '^/baidu_api': ''
                }
            }
        }
    }
}