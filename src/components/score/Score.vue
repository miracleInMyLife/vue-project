<template>
  <div class="star"  :class="`star-${size}`">
    <span class="star-item" v-for="(star,index) in stars" :key="index" :class="star"></span>
    <!-- <span class="star-item half" v-if ="halfStars"></span>
    <span class="star-item off" v-for="(emptyStar,index) in emptyStars" :key="index"></span> -->
  </div>
</template>


<script>

export default {
  props:['rate','size'], // 在使用组件时根据父组件传来的评分，计算出数值，根据传来的星星大小，对应相应的样式类名显示
  computed: {
    // wholeStars(){
    //   return parseInt(this.rate)  // 取整数
    // },
    // halfStars(){
    //   if(this.rate - parseInt(this.rate) >= 0.5) {  
    //     return true
    //   }else {
    //     return false
    //   }
    // },
    // emptyStars(){
    //   if ( parseInt(this.rate) + this.halfStars < 5) {  
    //     // console.log(this.rate)
    //     return (5 - this.halfStars -parseInt(this.rate))
    //   }else if ( parseInt(this.rate) + this.halfStars >= 5) {
    //     return '1'
    //   }
    // },
    stars(){
      let arr =[]
      let fullStars = parseInt(this.rate)
      for (let index = 0; index<fullStars; index++) {
        arr.push('on')
      }
      let halfStars = 0
      if (this.rate*10 - fullStars*10 >= 5 ) {
        halfStars = 1
        arr.push('half')
      }
      while (arr.length < 5) {
        arr.push('off')
      }
      // console.log(arr)
      return arr
    }
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'
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
