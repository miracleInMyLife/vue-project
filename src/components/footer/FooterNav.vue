<template>
  <div class="footer-nav">
    <span class="nav-item" :class="{on : $route.path === '/msite'}" @click="change('/msite')">
      <span>
        <i class="iconfont icon-shouye"></i>
      </span>
      <span>{{$t('footer_home')}}</span>
    </span>
    <span class="nav-item" :class="{on : $route.path === '/search'}" @click="change('/search')">
      <span>
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span>{{$t('footer_search')}}</span>
    </span>
    <span class="nav-item" :class="{on : $route.path === '/order'}" @click="change('/order')">
      <span>
        <i class="iconfont icon-dingdan"></i>
      </span>
      <span>{{$t('footer_order')}}</span>
    </span>
    <span class="nav-item" :class="{on : $route.path === '/profile'}" @click="change('/profile')">
      <span>
        <i class="iconfont icon-yonghudianji"></i>
      </span>
      <span>{{$t('footer_profile')}}</span>
    </span>
  </div>
</template>

<script>
export default {
  name:'footer-nav',
  methods: {
    change(path){  // 点击切换地址栏地址，然后就会触发动态的class生效
    if (path !== this.$route.path) {// 判断，若是点击的同一个，则不做任何操作，若不做判断，当点击同一个时，会报错
      this.$router.replace(path)
    }else {  // 若是点击的同一个，则刷新当前页面---发送一个一般http请求
      window.location.href = path
    }
    }
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'
.footer-nav
  top-border-1px(#cccccc)
  z-index 100
  display flex
  position fixed
  left 0
  bottom 0
  width 100%
  height 50px
  background-color #fff
  .nav-item
    display flex
    flex-direction column
    text-align center
    width 25%
    justify-content center
    &.on
      color $green
    span
      margin-top 4px
      font-size 12px
      .iconfont
        font-size 22px

</style>