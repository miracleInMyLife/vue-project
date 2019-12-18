// vuex 最核心的管理对象
import Vue from 'vue'
import Vuex from 'vuex'

import state from './state.js'
import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'
import msite from './modules/msite'
import user from './modules/user'
import shop from './modules/shop'

Vue.use(Vuex)
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules:{
    msite,
    user,
    shop
  }
})