import Vue from 'vue'
import Vuex from 'vuex'
import modal from './modal'
import items from './items'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    modal,
    items
  },
  strict: process.env.NODE_ENV !== 'production'
})

export default store
