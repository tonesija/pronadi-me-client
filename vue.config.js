const path = require('path')

//for dev
/*function getTarget () {
    let ip = window.location.href.substring(0, window.location.href.lastIndexOf(':'))
    let port = '7070'
    return ip + ':' + port
}*/

module.exports = {
    chainWebpack: (config) => {
      const svgRule = config.module.rule('svg');
  
      svgRule.uses.clear();
  
      svgRule
        .use('vue-loader')
        .loader('vue-loader') // or `vue-loader-v16` if you are using a preview support of Vue 3 in Vue CLI
        .end()
        .use('vue-svg-loader')
        .loader('vue-svg-loader');
    },
    devServer: {
      proxy: {
        '/': {
          target: 'http://127.0.0.1:7070'
        }
      }
    },
    outputDir: path.resolve(__dirname, '../server/public')
  }