<template>
<div class="ratings-filter">
  <div class="rating-type border-1px">
    <span class="block">
      全部<span class="count">{{ratings.length}}</span>
    </span>
    <span class="block active">
      推荐<span class="count">{{recommond}}</span>
    </span>
    <span class="block">
      吐槽<span class="count">{{unrecommond}}</span>
    </span>
  </div>
  <div class="switch on">
    <span class="iconfont icon-check_circle"></span>
    <span class="text">只看有内容的评价</span>
  </div>
</div>
</template>


<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      ratings : state => state.shop.ratings
    }),

    recommond(){
      let recommondNum = 0
      
      this.ratings.forEach((rating)=>{
        if (rating.rateType === 0) {
          recommondNum ++
        }
      })
      return recommondNum
    },
    unrecommond (){
      let unrecommondNum = 0 
      this.ratings.forEach((rating)=>{
        if (rating.rateType === 1) {
          unrecommondNum ++
        }
      })
      return unrecommondNum
    }
  },


}
</script>


<style  lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/mixins.styl"

.ratings-filter
  .rating-type
    padding: 18px 0
    margin: 0 18px
    border -1px solid rgba(7, 17, 27, 0.1)
    .block
      display: inline-block
      padding: 8px 12px
      margin-right: 8px
      line-height: 16px
      border-radius: 1px
      font-size: 12px
      color: rgb(77, 85, 93)
      background: rgba(77, 85, 93, 0.2)
      &.active
        background: $green
        color: #fff
      .count
        margin-left: 2px
        font-size: 8px
  .switch
    padding: 12px 18px
    line-height: 24px
    border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    color: rgb(147, 153, 159)
    font-size: 0
    &.on
      .icon-check_circle
        color: $green
    .icon-check_circle
      display: inline-block
      vertical-align: top
      margin-right: 4px
      font-size: 24px
    .text
      display: inline-block
      vertical-align: top
      font-size: 12px

</style>