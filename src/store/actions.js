import {reqAddress,reqCategorys,reqShops,reqAutoLogin} from '../api/index'
import {ADDRESS,CATEGORYS,SHOPS,SAVE_TOKEN, SAVE_USER,AUTO_LOGIN,LOG_OUT} from './mutation-types'

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
  async getCategorys({commit},callback){  // 解决swiper无法正常显示的解决方法2：在callback中创建Swiper实例
    let result = await reqCategorys()
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
      // const shops = data.map((item)=>{  加工数组
      //   return {
      //     id:item.id,
      //     name:item.name,
      //     address:item.address,
      //     location:item.location,
      //     imgUrl:item.image_url, 
      //     phone:item.phone,
      //     category:item.category,
      //     supports:item.supports,
      //     orderNum : item.recent_order_num,
      //     count:item.rating_count,
      //     fee:item.piecewise_agent_fee.tips,
      //     time:item.opening_hours,
      //     imgUrl:item.image_path,
      //     minPrice:item.float_minimum_order_amoun,
      //     carryFee:item.float_delivery_fee,
      //     leadTime:item.order_lead_time,
      //   }
      // })
      commit(SHOPS,data)
    }
  },

  // 保存token
  saveToken({commit},token){
    commit(SAVE_TOKEN,token)
  },
  // 保存user
  saveUser({commit},user){
    commit(SAVE_USER,user)
  },
  // 自动登录
  async autoLogin({commit,state}){
    // 只有在没有user只有token的情况下才自动登录
    if (!state.user._id && state.token) {
      // 执行自动登录的请求
      const result = await reqAutoLogin()
      if (result.code === 0 ) {
        console.log(result)
        const user = result.data
        commit(AUTO_LOGIN,user)
      }
    }
  },
  logout({commit}){
    localStorage.removeItem('token_value')
    commit(LOG_OUT)
  }

}