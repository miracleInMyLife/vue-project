
import {ADDRESS,CATEGORYS,SHOPS,SAVE_TOKEN,SAVE_USER,AUTO_LOGIN,LOG_OUT} from './mutation-types'
export default {
  [ADDRESS] (state,data){
    state.address = data
  },
  [CATEGORYS] (state,categorys){
    state.categorys = categorys
  },
  [SHOPS] (state,shops){
    state.shops = shops
  },
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
}