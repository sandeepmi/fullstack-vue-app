import Vue from 'vue'
import Vuex from 'vuex'
import items from './items'
import toasts from './toasts'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    toasts,
    items
  },
  strict: process.env.NODE_ENV !== 'production'
})

export default store
