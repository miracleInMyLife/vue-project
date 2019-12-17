<template>
  <div>
    <ShopHeader>
    </ShopHeader>
    <div>
      <router-link to="/shop/goods">商品</router-link>
    </div>
    <div>
      <router-link to="/shop/judge">评价</router-link>
    </div>
    <div>
      <router-link to="/shop/info">商家</router-link>
    </div>
    <router-view></router-view>
  </div>

</template>


<script>
import ShopHeader from '../../components/shopHeader/ShopHeader'
export default {
  components:{
    ShopHeader
  },
}
</script>


<style  lang="stylus" rel="stylesheet/stylus">

</style>