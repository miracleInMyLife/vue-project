
import {ADDRESS,CATEGORYS,SHOPS} from './mutation-types'
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
}