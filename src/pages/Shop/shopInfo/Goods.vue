<template>
<div>
  <div class="goods">
    <div class="menu-wrapper" ref="left">
      <ul ref="leftLis">
        <li class="menu-item" v-for="(good,index) in goods" :key="index" @click="clickMenu(index)" :class="{current:index === currentIndex}" >
          <span class="text bottom-border-1px">
            <img class="icon" :src="good.icon" v-if="good.icon"/>
            {{good.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="right">
      <ul ref="lis">
        <li class="food-list-hook" v-for="(good,index) in goods" :key="index">
          <h1 class="title">{{good.name}}</h1>
          <ul>
            <li class="food-item bottom-border-1px" v-for="(food,index) in good.foods" :key="index" @click="toggleShow(food)">
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}</span></div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <Cart :food="food"/>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- 购物车组件 -->
    <ShopCar />
  </div>
  <!-- 将目标food传给Food组件，但此时拿不到food，需要在上面遍历生成时，点击将food存入data中-->
  <!-- 该组件只在，点击对应食物时，才会显示 -->
  <!-- 此处不用v-show直接控制，用另一种方法 -->
  <!-- 组件标签对象就是对应的组件对象 -->
  <!-- 通过this.$refs.food 取到的就是Food组件对象，在Food组件中有toggle切换显示隐藏的方法，在父组件中可以直接通过this.$refs.food.toggle()调用子组件的方法 -->
  <Food :food="food" ref="food"/>
</div>
</template>

<script>
import { mapState } from 'vuex'
import BScroll from 'better-scroll'
import Food from '@/components/food/Food'
import ShopCar from '@/components/shopcar/ShopCar.vue'

export default {

  data() {
    return {
      tops:[],  // 保存右侧li的top值的数组
      scrollY:'',  // 实时值，在右侧滑动过程中不断变化的值
      index:'',
      food:{}   // 只有将food存到状态中，才可以传给Food组件
    }
  },
  components:{
    Food,
    ShopCar
  },
  computed: {
    ...mapState({
      goods : state => state.shop.goods
    }),
    currentIndex(){
      const index= this.tops.findIndex((top,index)=> this.scrollY >= top  && this.scrollY < this.tops[index+1])
      // 使滑动右侧列表时，左侧的菜单始终可见
      if (this.index !== index && this.scrollLeft) { // 若是在右侧同一个li的范围中滑懂，则左侧对应的也不变
        this.index = index   // 保存当前右侧滑动的index保存到状态中
        const li = this.$refs.leftLis.children[index]  // 根据计算出来的index取出对应的li标签
        this.scrollLeft.scrollToElement(li,500)  // 左边的滑到指定的li处
      }
      
      return index
    }
  },
  methods: {
    // 初始化滚动条
    initScroll(){
      this.scrollLeft = new BScroll(this.$refs.left,{
        click:true,  // 支持dom自定义的click事件
      })
      this.scrollRight = new BScroll(this.$refs.right,{
        click:true,  // 支持dom自定义的click事件
        probeType:1, 
      })
      // 绑定滚动事件监听
      this.scrollRight.on('scroll',({x,y})=>{  
        this.scrollY =  Math.abs(y)
      })
      // 绑定滚动事件结束监听
      this.scrollRight.on('scrollEnd',({x,y})=>{  
        this.scrollY =  Math.abs(y)
      })
    },
    // 初始化右侧每个li的top值组成的数组
    initTops(){
      //计算出初始的tops的值
      let tops= [0]
      let top = 0
      // tops.push(top)
      const lis = this.$refs.lis.children
      Array.from(lis).forEach((li)=>{
      top += li.clientHeight 
      tops.push(top)
      })
      this.tops = tops 
    },

    // 点击左侧菜单,使右侧滑到响应的位置
    clickMenu(index){
      // 计算出点击的index对应右侧应该往上滑的距离
      let top = this.tops[index]
      this.scrollY = top
      if (this.scrollRight) {
        this.scrollRight.scrollTo(0,-top,500)
      }
      
    },

  //父组件调用子组件的方法 
    // 将food存入状态中，由状态传给Food组件，并调用Food组件的方法
    toggleShow(food){
      this.food = food
      // this.$refs.food取得是Food的组件对象，所以可以调用Food组件的toggleShow方法
      this.$refs.food.toggleShow()
    }
  },
  watch: {
    goods(){
      this.$nextTick(()=>{
        this.initScroll() 
        this.initTops()
      })
    }
  },
}
</script>

<style  lang="stylus" rel="stylesheet/stylus">
@import "../../../common/stylus/mixins.styl"
.goods
  display: flex
  position: absolute
  top: 225px
  bottom: 46px
  width: 100%
  background: #fff;
  overflow: hidden
  .menu-wrapper
    flex: 0 0 80px
    width: 80px
    background: #f3f5f7
    .menu-item
      display: table
      height: 54px
      width: 56px
      padding: 0 12px
      line-height: 14px
      &.current
        position: relative
        z-index: 10
        margin-top: -1px
        background: #fff
        color: $green
        font-weight: 700
        .text
          border-none()
      .icon
        display: inline-block
        vertical-align: top
        width: 12px
        height: 12px
        margin-right: 2px
        background-size: 12px 12px
        background-repeat: no-repeat
      .text
        display: table-cell
        width: 56px
        vertical-align: middle
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        font-size: 12px
  .foods-wrapper
    flex: 1
    .title
      padding-left: 14px
      height: 26px
      line-height: 26px
      border-left: 2px solid #d9dde1
      font-size: 12px
      color: rgb(147, 153, 159)
      background: #f3f5f7
    .food-item
      display: flex
      margin: 18px
      padding-bottom: 18px
      bottom-border-1px(rgba(7, 17, 27, 0.1))
      &:last-child
        border-none()
        margin-bottom: 0
      .icon
        flex: 0 0 57px
        margin-right: 10px
      .content
        flex: 1
        .name
          margin: 2px 0 8px 0
          height: 14px
          line-height: 14px
          font-size: 14px
          color: rgb(7, 17, 27)
        .desc, .extra
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)
        .desc
          line-height: 12px
          margin-bottom: 8px
        .extra
          .count
            margin-right: 12px
        .price
          font-weight: 700
          line-height: 24px
          .now
            margin-right: 8px
            font-size: 14px
            color: rgb(240, 20, 20)
          .old
            text-decoration: line-through
            font-size: 10px
            color: rgb(147, 153, 159)
        .cartcontrol-wrapper
          position: absolute
          right: 0
          bottom: 12px

</style>