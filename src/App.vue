<template>
  <div id="app">
    <router-view></router-view>
    <!-- 底部的组件 -->
    <FooterNav></FooterNav>
  </div>
</template>

 <script>
import FooterNav from './components/footer/FooterNav.vue'
export default {
  name: 'app',
  components: {
    FooterNav
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
