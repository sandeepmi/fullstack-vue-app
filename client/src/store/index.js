import Vue from 'vue'
import Vuex from 'vuex'
import items from './items'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    items
  },
  strict: process.env.NODE_ENV !== 'production'
})

export default store
