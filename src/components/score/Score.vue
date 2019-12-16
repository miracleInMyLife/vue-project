<template>
  <div class="star star-24">
    <span class="star-item on" v-for="(wholeStar,index) in wholeStars" :key="index"></span>
    <span class="star-item half" v-if ="halfStars"></span>
    <span class="star-item off" v-for="(emptyStar,index) in emptyStars" :key="index"></span>
  </div>
</template>


<script>

export default {
  props:['rate'], // 在使用组件时根据父组件传来的评分，计算出数值，根据传来的星星大小，对应相应的样式类名显示
  computed: {
    wholeStars(){
      return parseInt(this.rate)  // 取整数
    },
    halfStars(){
      if(this.rate - parseInt(this.rate) >= 0.5) {  
        return true
      }else {
        return false
      }
    },
    emptyStars(){
      if ( parseInt(this.rate) + this.halfStars < 5) {  
        console.log(this.rate)
        return (5 - this.halfStars -parseInt(this.rate))
      }else if ( parseInt(this.rate) + this.halfStars >= 5) {
        return 0
      }
    }
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus"d>
.star //2x图 3x图
  float left
  font-size 0
  .star-item
    display inline-block
    background-repeat no-repeat
  &.star-48
    .star-item
      width 20px
      height 20px
      margin-right 22px
      background-size 20px 20px
      &:last-child
        margin-right: 0
      &.on
        bg-image('./images/stars/star48_on')
      &.half
        bg-image('./images/stars/star48_half')
      &.off
        bg-image('./images/stars/star48_off')
  &.star-36
    .star-item
      width 15px
      height 15px
      margin-right 6px
      background-size 15px 15px
      &:last-child
        margin-right 0
      &.on
        bg-image('./images/stars/star36_on')
      &.half
        bg-image('./images/stars/star36_half')
      &.off
        bg-image('./images/stars/star36_off')
  &.star-24
    .star-item
      width 10px
      height 10px
      margin-right 3px
      background-size 10px 10px
      &:last-child
        margin-right 0
      &.on
        bg-image('./images/stars/star24_on')
      &.half
        bg-image('./images/stars/star24_half')
      &.off
        bg-image('./images/stars/star24_off')
</style>
