const path = require('path')
const px2rem = require('postcss-px2rem') // 将px单位转为rem单位
const postcss = px2rem({
  remUnit: 37.5   // px转rem的基准值，该值是设计稿的等分之后每一分的px值
})


module.exports = {
  runtimeCompiler : true,

  // 关闭EsLint的规则
  lintOnSave: false,

  //配置css，当设备变化时可以动态的重计算rem的值
  css: { // 添加postcss配置
    loaderOptions: {
      postcss: {
        plugins: [
          postcss
        ]
      }
    }
  },

  // 写webpack原生的配置
  configureWebpack: { // 内部写webpack原生配置
    resolve: {
      extensions: ['.js', '.vue', '.json'], // 可以省略的后缀名
      alias: { // 路径别名(简写方式)
        // 'vue$': 'vue/dist/vue.esm.js',  // 表示精准匹配   带vue编译器
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
      }
    }
  },

  devServer: {
    proxy: {
      // 处理以/api开头路径的请求
      // '/api': 'http://localhost:4000'   // http://localhost:4000/api/search/users
      '/api': {
        target: 'http://localhost:4000', // 转发的目标地址
        pathRewrite: {
          '^/api' : ''  // 转发请求时去除路径前面的/api
        },
        changeOrigin: true, // 支持跨域, 如果协议/主机也不相同, 必须加上
      },
    }
  },

  pluginOptions: {
    i18n: {
      locale: 'zh_cn',
      fallbackLocale: 'zh_cn',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
