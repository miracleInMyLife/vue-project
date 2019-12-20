import {ADDRESS,CATEGORYS,SHOPS} from '../mutation-types'
import {reqAddress,reqCategorys,reqShops,reqSearchShops} from '../../api/index'

export default {
  state:{
    latitude: 40.10038, // 纬度
    longitude: 116.36867, // 经度
    address:{},
    categorys:[],
    shops:[],
    searchShops:[]  // 搜索的商家列表
  },
  actions:{
    async getAddress({commit,state}){
      const {longitude,latitude} = state
      let result = await reqAddress(longitude,latitude)
      if (result.code === 0) {
        const {data} = result
        commit(ADDRESS,data)
      }
    },
  
    // 请求分类列表
    async getCategorys({commit},callback){  // 解决swiper无法正常显示的解决方法2：在callback中创建Swiper实例
      let result = await reqCategorys()
      console.log(result)
      if (result.code === 0) {
        const {data} = result
        // 加工数组
        const categorys = data.map((item)=>{
          return {
            title:item.title,
            imgUrl:item.image_url, 
            link:item.link
          }
        })
        commit(CATEGORYS,categorys) // 同步改变状态，状态改变后就会触发界面更新
  
        typeof callback === 'function' && callback() // 在改变状态后触发回调，swiper实例在回调中
      }
    },
    // 请求商家
    async getShops({commit,state}){
      const {longitude,latitude} = state
      let result = await reqShops(longitude,latitude)
      if (result.code === 0) {
        const {data} = result
        commit(SHOPS,data)
      }
    },

    // 根据经纬度和关键字搜索商家
    async searchShops({commit,state},keyword){
      const result = await reqSearchShops(state.latitude,state.longitude,keyword)
      console.log(result)
      // commit()
    }

  },
  mutations:{
    [ADDRESS] (state,data){
      state.address = data
    },
    [CATEGORYS] (state,categorys){
      state.categorys = categorys
    },
    [SHOPS] (state,shops){
      state.shops = shops
    },
  },
  getters:{
    
  }
}
