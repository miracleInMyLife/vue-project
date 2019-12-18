<template>
<div class="cartcontrol">
  <transition name="rotate">
    <div class="iconfont icon-jian-tianchong" @click.stop="addFood(false)" v-show="food.count > 0"></div>
  </transition>
  <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
                         <!-- 给按钮绑定点击，但要阻止冒泡，否则会触发Food组件的点击事件显示大图 -->
  <div class="iconfont icon-jia" @click.stop="addFood(true)"></div>
</div>
</template>


<script>
// import {} from ''

export default {
  props:['food'],

  methods: {
    addFood(isAdd){ // 点击添加改变数量
      this.$store.dispatch('foodCount',{isAdd,food:this.food})
    }
  },
}
</script>


<style  lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
.cartcontrol
  font-size: 0
  .cart-decrease
    display: inline-block
    padding: 6px
    line-height: 24px
    font-size: 24px
    color: rgb(0, 160, 220)

  .icon-jian-tianchong
    display: inline-block
    padding 6px
    line-height 24px
    font-size 24px
    color $green
    &.rotate-enter-active,&.rotate-leave-avtive
      transition all 0.5s
    &.rotate-enter,&.rotate-leave-to
      opacity 0
      transform translateX(20px) rotate(180deg)
  .cart-count
    display: inline-block
    vertical-align: top
    width: 12px
    padding-top: 6px
    line-height: 24px
    text-align: center
    font-size: 10px
    color: rgb(147, 153, 159)
  .icon-jia
    display: inline-block
    padding: 6px
    line-height: 24px
    font-size: 24px
    color $green
</style>