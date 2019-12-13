// 入口文件

import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import flexible from 'lib-flexible'
import store from './store/store'
Vue.config.productionTip = false

new Vue({
  // render: h => h(App),
  components:{
    App,
  },
  template:'<App/>',  // 用模板语法相对于render来说文件大小会大一些
  router,
  store,
}).$mount('#app')
