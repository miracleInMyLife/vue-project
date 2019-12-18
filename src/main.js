// 入口文件

import Vue from 'vue'
import 'lib-flexible'
import './validate'
import i18n from './i18n'
import {Button} from 'mint-ui'
import VueLazyload from 'vue-lazyload'


import App from './App.vue'
import router from './router/index'
import store from './store/store'
import './mock/mock-server'
import Header from './components/header/Header.vue' // 注册全局组件
import Score from './components/score/Score' // 注册全局组件
import Cart from './components/cart/cart.vue' // 注册全局组件
import loading from './components/food/timg.gif' // load的效果

Vue.config.productionTip = false


Vue.component('Cart',Cart)
// 注册全局的组件，因为header组件在四个页面中都用到了
Vue.component('Header',Header)
Vue.component('Score',Score)
Vue.component(Button.name, Button)  // mt-button

Vue.use(VueLazyload,{ //图片的load效果
  loading  
})

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
