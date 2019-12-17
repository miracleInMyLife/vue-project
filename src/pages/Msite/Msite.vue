<template>
  <section class="msite">
    <!--首页头部-->
    <Header :title="address.name || '正在定位中...'">
      <span class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot="right" @click="$router.replace('/login')">
          <span class="header_login_text">登录 | 注册</span>
      </span>
    </Header>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categorys.length>0">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(cs,index) in categorysArr" :key="index">
            <div class="link_to_food" v-for="(c,index) in cs" :key="index">
              <div class="food_container">
                <img :src="'https://fuss10.elemecdn.com' + c.imgUrl">
              </div>
              <span>{{c.title}}</span>
            </div>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <div class="swiper-container" v-else>
        <img src="./images/msite_back.svg" alt="">
      </div>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <div class="shop_container">
        <ul class="shop_list" v-if="shops.length>0">
          <li class="shop_li border-1px" v-for="(shop,index) in shops" :key="index" @click="shopInfo">
            <a>
              <div class="shop_left">
                <img class="shop_img" :src="'https://fuss10.elemecdn.com' + shop.image_path">
              </div>
              <div class="shop_right">
                <section class="shop_detail_header">
                  <h4 class="shop_title ellipsis">{{shop.name}}</h4>
                  <ul class="shop_detail_ul">
                    <li class="supports" v-for="(support,index) in shop.supports" :key="index">{{support.icon_name}}</li>
                  </ul>
                </section>
                <section class="shop_rating_order">
                  <section class="shop_rating_order_left">
                    <!-- <div class="star star-24"> -->
                      <!-- <span class="star-item on"></span>
                      <span class="star-item on"></span>
                      <span class="star-item on"></span>
                      <span class="star-item half"></span>
                      <span class="star-item off"></span> -->
                      <!-- 将对应的评分传给score -->
                    <Score :rate="shop.rating" :size="24"/>
                    <!-- </div> -->
                    <div class="rating_section">
                      {{shop.rating}}
                    </div>
                    <div class="order_section">
                      月售{{shop.recent_order_num}}单
                    </div>
                  </section>
                  <section class="shop_rating_order_right">
                    <span class="delivery_style delivery_right">{{shop.delivery_mode.text}}</span>
                  </section>
                </section>
                <section class="shop_distance">
                  <p class="shop_delivery_msg">
                    <span>¥{{shop.float_minimum_order_amount}}起送</span>
                    <span class="segmentation">/</span>
                    <span>配送费约¥{{shop.float_delivery_fee}}</span>
                  </p>
                </section>
              </div>
            </a>
          </li>
        </ul>
        <ul v-else>
          <li>
            <img src="./images/shop_back.svg" alt="">
          </li>
          <li>
            <img src="./images/shop_back.svg" alt="">
          </li>
          <li>
            <img src="./images/shop_back.svg" alt="">
          </li>
          <li>
            <img src="./images/shop_back.svg" alt="">
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.css'  //引入样式，轮播类名才能起作用
import { mapState } from 'vuex'
import chunk from 'lodash/chunk' // chunk函数将一个一维数组变为二维数组，只引入chunk，是按需打包

export default {
  computed: {
    ...mapState(['address','categorys','shops']),

    // 加工一维数组，生成二维数组
    categorysArr(){
      return chunk(this.categorys,8)
    },
  },
  methods: {
    shopInfo(){
      this.$router.replace('/shop')
    }
  },
  async mounted() {
    this.$store.dispatch('getAddress')
    this.$store.dispatch('getShops')
    await this.$store.dispatch('getCategorys')   // 解决swiper无法正常显示的解决方法3：利用diapatch的返回的promise，用async和await等待数据和页面更新结束
    new Swiper('.swiper-container',{   // 上面一步，因为有await，页面已经更新，
      //direction : '', // 默认是水平轮播,所以不用设置
      loop : true,  // 是否无缝轮播
      pagination:{  // 设置分页器
        el:'.swiper-pagination'
      }
    })
    // this.$store.dispatch('getCategorys',()=>{  // 解决swiper无法正常显示的解决方法2：在callback中创建Swiper实例
    //   this.$nextTick(()=>{
    //     new Swiper('.swiper-container',{
    //       //direction : '', // 默认是水平轮播,所以不用设置
    //       loop : true,  // 是否无缝轮播
    //       pagination:{  // 设置分页器
    //         el:'.swiper-pagination'
    //       }
    //     })
    //   })
    // })
    
    // 单纯的在mounted中创建swiper实例，在动态产生数据时，swiper实例会失效
    // new Swiper('.swiper-container',{
    //   //direction : '', // 默认是水平轮播,所以不用设置
    //   loop : true,  // 是否无缝轮播
    //   pagination:{  // 设置分页器
    //     el:'.swiper-pagination'
    //   }
    // })
  },
  watch: {
    categorys(){  // 解决swiper无法正常显示的解决方法 1 ：监视categorys的变化,定时器延迟中创建Swiper实例或者用$nextTick回调中创建
      // setTimeout(() => {  
      //   new Swiper('.swiper-container',{
      //     //direction : '', // 默认是水平轮播,所以不用设置
      //     loop : true,  // 是否无缝轮播
      //     pagination:{  // 设置分页器
      //       el:'.swiper-pagination'
      //     }
      //   }) 
      // });
      // this.$nextTick(()=>{
      //   new Swiper('.swiper-container',{
      //     //direction : '', // 默认是水平轮播,所以不用设置
      //     loop : true,  // 是否无缝轮播
      //     pagination:{  // 设置分页器
      //       el:'.swiper-pagination'
      //     }
      //   })
      // })
    }
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'
.msite  //首页
  width 100%
  .msite_nav
    bottom-border-1px(#e4e4e4)
    margin-top 45px
    height 200px
    background #fff
    .swiper-container
      width 100%
      height 100%
      .swiper-wrapper
        width 100%
        height 100%
        .swiper-slide
          display flex
          flex-wrap wrap
          .link_to_food
            width 25%
            .food_container
              display block
              width 100%
              text-align center
              padding-bottom 10px
              font-size 0
              img
                display inline-block
                width 50px
                height 50px
            span
              display block
              width 100%
              text-align center
              font-size 13px
              color #666
      .swiper-pagination
        >span.swiper-pagination-bullet-active
          background #02a774
  .msite_shop_list
    top-border-1px(#e4e4e4)
    margin-top 10px
    background #fff
    .shop_header
      padding 10px 10px 0
      .shop_icon
        margin-left 5px
        color #999
      .shop_header_title
        color #999
        font-size 14px
        line-height 20px
    .shop_container
      margin-bottom 50px
      .shop_list
        .shop_li
          bottom-border-1px(#f1f1f1)
          width 100%
          >a
            clearFix()
            display block
            box-sizing border-box
            padding 15px 8px
            width 100%
            .shop_left
              float left
              box-sizing border-box
              width 23%
              height 75px
              padding-right 10px
              .shop_img
                display block
                width 100%
                height 100%
            .shop_right
              float right
              width 77%
              .shop_detail_header
                clearFix()
                width 100%
                .shop_title
                  float left
                  width 200px
                  color #333
                  font-size 16px
                  line-height 16px
                  font-weight 700
                  &::before
                    content '品牌'
                    display inline-block
                    font-size 11px
                    line-height 11px
                    color #333
                    background-color #ffd930
                    padding 2px 2px
                    border-radius 2px
                    margin-right 5px
                .shop_detail_ul
                  float right
                  margin-top 3px
                  .supports
                    float left
                    font-size 10px
                    color #999
                    border 1px solid #f1f1f1
                    padding 0 2px
                    border-radius 2px
              .shop_rating_order
                clearFix()
                width 100%
                margin-top 18px
                margin-bottom 8px
                .shop_rating_order_left
                  float left
                  color #ff9a0d
                  
                  .rating_section
                    float left
                    font-size 10px
                    color #ff6000
                    margin-left 4px
                  .order_section
                    float left
                    font-size 10px
                    color #666
                    transform scale(.8)
                .shop_rating_order_right
                  float right
                  font-size 0
                  .delivery_style
                    transform-origin 35px 0
                    transform scale(.7)
                    display inline-block
                    font-size 12px
                    padding 1px
                    border-radius 2px
                  .delivery_left
                    color #fff
                    margin-right -10px
                    background-color #02a774
                    border 1px solid #02a774
                  .delivery_right
                    color #02a774
                    border 1px solid #02a774
              .shop_distance
                clearFix()
                width 100%
                font-size 12px
                .shop_delivery_msg
                  float left
                  transform-origin 0
                  transform scale(.9)
                  color #666
                .segmentation
                  color #ccc
        
</style>