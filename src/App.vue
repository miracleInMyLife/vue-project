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
import {reqAutoLogin} from './api/index'

export default {
  name: 'app',
  components: {
    FooterNav
  },
  mounted() {
    //组件一挂载，就要发送自动登录的请求  
    //将发送请求的动作放到action中，因为发完请求后需要保存user的信息到vuex中
    this.$store.dispatch('autoLogin')
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
#app
  width 100%
  height 100%
  position relative
</style>
