<template>
<div class="cartcontrol">
  <transition name="rotate">
    <div class="iconfont icon-jian-tianchong" @click.stop="addFood(false)" v-if="food.count > 0"></div>
  </transition>
  <div class="cart-count" v-if="food.count > 0">{{food.count}}</div>
                         <!-- 给按钮绑定点击，但要阻止冒泡，否则会触发Food组件的点击事件显示大图 -->
  <div class="iconfont icon-jia" @click.stop="addFood(true)"></div>
</div>
</template>


<script>
import throttle from 'lodash/throttle'  // 做函数节流

export default {
  props:['food'],

  methods: {
        // 用函数节流，不让点击频繁触发
    addFood:throttle(function(isAdd){ // 点击添加改变数量
        /* 
        问题1: 不应该直接在此更新, food不是当前组件的,是由Goods---Food--Cart传过来的,状态在哪里，更新状态的方法就应该在哪里
        问题2: 开始count值是undefined
        */
        // this.food.count++
      console.log('---节流啦--')
      this.$store.dispatch('foodCount',{isAdd,food:this.food})
    },1000)
  },
}
</script>


<style  lang="stylus" rel="stylesheet/stylus" scoped>
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