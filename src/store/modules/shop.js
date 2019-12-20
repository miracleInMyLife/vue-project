import Vue from 'vue'

import {SHOP_RATINGS,SHOP_GOODS,SHOP_INFO,FOOD_COUNT,FOOD_COUNT_REDUCE,CLEAR_SHOPCAR} from '../mutation-types'
import {reqInfo,reqGoods,reqRatings} from '../../api/index'

export default {
  state:{
    goods:[],   // 存储商家详情页的商品列表
    ratings:[],  // 存储商家详情页的评价
    info:{},    // 存储商家详情页的商家信息
    cartFoods:[]   // 存放购物车中被选中的food
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
    },
    clearShopCar({commit}){
      commit(CLEAR_SHOPCAR)
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
        // 将food存入到数组中
        state.cartFoods.push(food)
      }
    },

    [FOOD_COUNT_REDUCE](state,{food}){
      food.count -- 
      // 当食物数量为0时，将food从cartFoods数组中删除
      if (food.count === 0 ) {
                  // indexOf可以查找到cartFoods中对应food的索引
        state.cartFoods.splice(state.cartFoods.indexOf(food),1)
      }
    },

    [CLEAR_SHOPCAR](state){
      state.cartFoods.forEach((cartFood)=>{  //还要清空数量,否则在食物界面还会有
        cartFood.count = 0 
      })
      // 清空数组，只是清除了购物车里的列表
      state.cartFoods = []
    }
  },
  getters:{  // 计算属性方法必须有返回值
    totalCount(state){
      return state.cartFoods.reduce((pre,food)=> pre + food.count ,0)
    },
    totalPrice(state){
      return state.cartFoods.reduce((pre,food)=> pre + food.count*food.price ,0)
    }
  }
}