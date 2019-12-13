<template>
  <div class="footer-nav">
    <span class="nav-item" :class="{on : $route.path === '/msite'}" @click="change('/msite')">
      <span>

      </span>
      <span>首页</span>
    </span>
    <span class="nav-item" :class="{on : $route.path === '/search'}" @click="change('/search')">
      <span>

      </span>
      <span>搜索</span>
    </span>
    <span class="nav-item" :class="{on : $route.path === '/order'}" @click="change('order')">
      <span>

      </span>
      <span>订单</span>
    </span>
    <span class="nav-item" :class="{on : $route.path === '/profile'}" @click="change('profile')">
      <span>

      </span>
      <span>我的</span>
    </span>
  </div>
</template>

<script>
export default {
  name:'footer-nav',
  methods: {
    change(path){  // 点击切换地址栏地址，然后就会触发动态的class生效
      this.$router.replace(path)
    }
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'
$color=#eee
.footer-nav 
  top-border-1px($color)
  position fixed
  left 0
  bottom 0 
  height 50px
  line-height 50px
  width 100%
  text-align center
  .nav-item
    display inline-block
    width 25% 
    &.on
      color $green

</style>