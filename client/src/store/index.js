import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import items from './modules/items'
import toasts from './modules/toasts'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    toasts,
    items
  },
  strict: process.env.NODE_ENV !== 'production'
})

export default store
