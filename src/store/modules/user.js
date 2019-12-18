import {SAVE_TOKEN, SAVE_USER,AUTO_LOGIN,LOG_OUT,} from '../mutation-types'
import {reqAutoLogin} from '../../api/index'
export default {
  state:{
    token:localStorage.getItem('token_value'),   // token默认值从本地取，为了实现自动登录
    user:{},  // 存储用户的信息
  },
  actions:{
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
    // 退出登录
    logout({commit}){
      localStorage.removeItem('token_value')
      commit(LOG_OUT)
    },
  },
  mutations:{
    [SAVE_TOKEN] (state,token){
      state.token = token
    },
    [SAVE_USER] (state,user){
      state.user = user
    },
    [AUTO_LOGIN] (state,user){
      state.user = user
    },
    [LOG_OUT] (state){
      state.token=''
      state.user = {}
    },
  },
  getters:{
    
  }
}