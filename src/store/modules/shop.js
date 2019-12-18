import Vue from 'vue'

import {SHOP_RATINGS,SHOP_GOODS,SHOP_INFO,FOOD_COUNT,FOOD_COUNT_REDUCE} from '../mutation-types'
import {reqInfo,reqGoods,reqRatings} from '../../api/index'

export default {
  state:{
    goods:[],   // 存储商家详情页的商品列表
    ratings:[],  // 存储商家详情页的评价
    info:{}    // 存储商家详情页的商家信息
  },

  actions:{
    // 请求商家的商品
    async reqShopGoods({commit}){
      const result = await reqGoods()
      // console.log(result)
      if (result.code === 0) {
        const goods = result.data
        commit(SHOP_GOODS,goods)
      }
      
    },
    // 请求商家的评价
    async reqShopRatings({commit}){
      const result = await reqRatings()
      // console.log(result)
      if (result.code === 0) {
        const ratings = result.data
        commit(SHOP_RATINGS,ratings)
      }
    },
    // 请求商家的信息
    async reqShopInfo({commit}){
      const result = await reqInfo()
      if (result.code === 0) {
        const info = result.data
        commit(SHOP_INFO,info)
      }
    },
    
    foodCount({commit},{isAdd,food}){
      if (isAdd) {
        commit(FOOD_COUNT,{food})
      }else {
        commit(FOOD_COUNT_REDUCE,{food})
      } 
    }
  },
  mutations:{
    [SHOP_GOODS] (state,goods){
      state.goods=goods
    },
    [SHOP_RATINGS] (state,ratings){
      state.ratings=ratings
    },
    [SHOP_INFO] (state,info){
      state.info=info
    },
    [FOOD_COUNT](state,{food}){
      if (food.count) {
        food.count++
      }else {
        // 给food响应式的添加属性---一添加就有数据绑定的效果
        Vue.set(food,'count',1)
      }
    },

    [FOOD_COUNT_REDUCE](state,{food}){
      food.count -- 
    }
  },
  getters:{
    
  }
}