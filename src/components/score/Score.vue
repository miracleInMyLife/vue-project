<template>
  <div>
    <span class="star-item on" v-for="(wholeStar,index) in wholeStars" :key="index"></span>
    <span class="star-item half" v-if ="halfStars"></span>
    <span class="star-item off" v-for="(emptyStar,index) in emptyStars" :key="index"></span>
  </div>
</template>


<script>

export default {
  props:['rate'], // 在使用组件时根据父组件传来的评分，计算出数值
  computed: {
    wholeStars(){
      return parseInt(this.rate)  // 取整数
    },
    halfStars(){
      if(this.rate.toString().split('.')[1] !== '' || 0) {  
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

</style>
