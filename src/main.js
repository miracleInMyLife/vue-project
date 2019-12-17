// 入口文件

import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import 'lib-flexible'
import store from './store/store'
import './validate'
import i18n from './i18n'

Vue.config.productionTip = false

new Vue({
  // render: h => h(App),
  components:{
    App,
  },

  // 用模板语法相对于render来说文件大小会大一些
  template:'<App/>',

  //所有路由组件对象
  router,

  i18n,

  // 所有组件对象
  store
}).$mount('#app')
