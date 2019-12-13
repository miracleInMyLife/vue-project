<template>
  <div class="footer-nav">
    <span class="nav-item">
      <span>

      </span>
      <span>首页</span>
    </span>
    <span class="nav-item">
      <span>

      </span>
      <span>搜索</span>
    </span>
    <span class="nav-item">
      <span>

      </span>
      <span>订单</span>
    </span>
    <span class="nav-item">
      <span>

      </span>
      <span>我的</span>
    </span>
  </div>
</template>
<script>
export default {
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
// @import '../../common/stylus/mixins.styl'
// $color=#eee
.footer-nav 
  // top-border-1px($color)
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

</style>