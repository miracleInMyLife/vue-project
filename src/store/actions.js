import {reqAddress,reqCategorys,reqShops} from '../api/index'
import {ADDRESS,CATEGORYS,SHOPS} from './mutation-types'

export default {
  // 根据经纬度请求地址
  async getAddress({commit,state}){
    const {longitude,latitude} = state
    let result = await reqAddress(longitude,latitude)
    if (result.code === 0) {
      const {data} = result
      commit(ADDRESS,data)
    }
  },

  // 请求分类列表
  async getCategorys({commit}){
    let result = await reqCategorys()
    if (result.code === 0) {
      const {data} = result
      // 加工数组
      const categorys = data.map((item)=>{
        return {
          title:item.title,
          imgUrl:item.image_url, 
        }
      })
      commit(CATEGORYS,categorys)
    }
  },
  // 请求商家
  async getShops({commit,state}){
    const {longitude,latitude} = state
    let result = await reqShops(longitude,latitude)
    if (result.code === 0) {
      const {data} = result
      const shops = data.map((item)=>{
        return {
          id:item.id,
          name:item.name,
          address:item.address,
          location:item.location,
          imgUrl:item.image_url, 
          phone:item.phone,
          category:item.category,
          supports:item.supports,
          orderNum : item.recent_order_num,
          count:item.rating_count,
          fee:item.piecewise_agent_fee.tips,
          time:item.opening_hours,
          imgUrl:item.image_path,
          minPrice:item.float_minimum_order_amoun,
          carryFee:item.float_delivery_fee,
          leadTime:item.order_lead_time,
        }
      })
      commit(SHOPS,shops)
    }
  },

}