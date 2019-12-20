<template>
<div>
  <div class="shopcart">
    <div class="content">
      <div class="content-left" @click="showCar">
        <div class="logo-wrapper">
          <div class="logo highlight">
            <i class="iconfont icon-gouwuche1" :class="{highlight :totalCount>0 }"></i>
          </div>
          <div class="num">{{totalCount}}</div>
        </div>
        <div class="price" :class="{highlight :totalCount>0 }">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{info.deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass">
          {{payText}}
        </div>
      </div>
    </div>
    <div class="shopcart-list" v-show="isShowCar">
      <div class="list-header">
        <h1 class="title">购物车</h1>
        <span class="empty" @click="clearShopCar">清空</span>
      </div>
      <div class="list-content" ref="scrollCar">
        <ul v-if="cartFoods.length > 0">
          <li class="food" v-for="(cartFood) in cartFoods" :key="cartFood.name">
            <span class="name">{{cartFood.name}}</span>
            <div class="price"><span>￥{{cartFood.price}}</span></div>
            <div class="cartcontrol-wrapper">
              <div class="cartcontrol">
                <Cart :food="cartFood"/>
              </div>
            </div>
          </li>
        </ul>
        <p v-else>
          购物车为空，快去加购吧！
        </p>
      </div>
    </div>
  </div>
  <transition name="fade">
    <div class="list-mask" v-show="isShowCar" @click="isShowCar=false"></div>
  </transition>
</div>
</template>

<script>
import { mapState,mapGetters } from 'vuex'
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      isShowCar : false 
    }
  },
  computed: {
    ...mapState({
      info:state => state.shop.info, // 需要info的配送信息
      cartFoods : state => state.shop.cartFoods  // 需要列表，动态渲染购物车的列表
    }),
    ...mapGetters(['totalCount','totalPrice']),

    // 
    payClass(){
      return this.totalPrice - this.info.minPrice > 0 ? 'enough' : 'not-enough'
    },
    payText(){
      if (this.totalPrice === 0 ) {
        return '20元起送'
      }else if (this.totalPrice < this.info.minPrice ){
        return `还差${this.info.minPrice-this.totalPrice}起送`
      }else {
        return '去结算'
      }
    }
  },
  methods: {
    showCar(){
      this.isShowCar = !this.isShowCar
    },
    clearShopCar(){
      this.$store.dispatch('clearShopCar')   
    }
  },
  watch: {
    cartFoods(){
      this.$nextTick(()=>{
        if (!this.scroll) { // 确保只创建一个
          this.scroll = new BScroll(this.$refs.scrollCar,{
            click:true
          })
        }else { // 使每次cartFoods改变时都会让scroll重新计算高度
          this.scroll.refresh()
        }
      })
    }
  },

}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/mixins.styl"
.shopcart
  position: fixed
  left: 0
  bottom: 0
  z-index: 50
  width: 100%
  height: 48px
  .content
    display: flex
    background: #141d27
    font-size: 0
    color: rgba(255, 255, 255, 0.4)
    .content-left
      flex: 1
      .logo-wrapper
        display: inline-block
        vertical-align: top
        position: relative
        top: -10px
        margin: 0 12px
        padding: 6px
        width: 56px
        height: 56px
        box-sizing: border-box
        border-radius: 50%
        background: #141d27
        .logo
          width: 100%
          height: 100%
          border-radius: 50%
          text-align: center
          background: #2b343c
          &.highlight
            background: $green
          .icon-gouwuche1
            line-height: 44px
            font-size: 24px
            color: #80858a
            &.highlight
              color: #fff
        .num
          position: absolute
          top: 0
          right: 0
          width: 24px
          height: 16px
          line-height: 16px
          text-align: center
          border-radius: 16px
          font-size: 9px
          font-weight: 700
          color: #ffffff
          background: rgb(240, 20, 20)
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
      .price
        display: inline-block
        vertical-align: top
        margin-top: 12px
        line-height: 24px
        padding-right: 12px
        box-sizing: border-box
        border-right: 1px solid rgba(255, 255, 255, 0.1)
        font-size: 16px
        font-weight: 700
        &.highlight
          color: #fff
      .desc
        display: inline-block
        vertical-align: top
        margin: 12px 0 0 12px
        line-height: 24px
        font-size: 10px
    .content-right
      flex: 0 0 105px
      width: 105px
      .pay
        height: 48px
        line-height: 48px
        text-align: center
        font-size: 12px
        font-weight: 700
        &.not-enough
          background: #2b333b
        &.enough
          background: #00b43c
          color: #fff
  .shopcart-list
    position: absolute
    left: 0
    top: 0
    z-index: -1
    width: 100%
    transform translateY(-100%)
    .list-header
      height: 40px
      line-height: 40px
      padding: 0 18px
      background: #f3f5f7
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      .title
        float: left
        font-size: 14px
        color: rgb(7, 17, 27)
      .empty
        float: right
        font-size: 12px
        color: rgb(0, 160, 220)

    .list-content
      padding: 0 18px
      max-height: 217px
      overflow: hidden
      background: #fff
      p
        height 80px
        line-height 80px
        text-align center
        font-size 18px
      .food
        position: relative
        padding: 12px 0
        box-sizing: border-box
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        .name
          line-height: 24px
          font-size: 14px
          color: rgb(7, 17, 27)
        .price
          position: absolute
          right: 90px
          bottom: 12px
          line-height: 24px
          font-size: 14px
          font-weight: 700
          color: rgb(240, 20, 20)
        .cartcontrol-wrapper
          position: absolute
          right: 0
          bottom: 6px


.list-mask
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  z-index: 40
  backdrop-filter: blur(10px)
  opacity: 1
  background: rgba(7, 17, 27, 0.6)
  &.fade-enter-active, &.fade-leave-active
    transition: all 0.5s
  &.fade-enter, &.fade-leave-to
    opacity: 0

</style>