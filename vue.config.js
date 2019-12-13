const px2rem = require('postcss-px2rem') // 将px单位转为rem单位
const postcss = px2rem({
  remUnit: 37.5   // px转rem的基准值，该值是设计稿的等分之后每一分的px值
})


module.exports = {
  runtimeCompiler : true,
  lintOnSave: false, // 关闭EsLint的规则

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
  configureWebpack:{},
}