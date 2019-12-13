<template>
  <div id="app">
    <router-view></router-view>
    <!-- 底部的组件 -->
    <FooterNav v-show="$route.meta.isShowFooter"></FooterNav>
  </div>
</template>

 <script>
 import Vue from 'vue'
import FooterNav from './components/footer/FooterNav.vue'
import Header from './components/header/Header.vue' // 注册全局组件

// 注册全局的组件，因为header组件在四个页面中都用到了
Vue.component('Header',Header)

export default {
  name: 'app',
  components: {
    FooterNav
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
#app
  width 100%
  height 100%
  position relative
</style>
