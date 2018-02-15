import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    items: []
  },
  mutations: {
    setItems (state, items) {
      state.items = items
    },
    updateItem (state, item) {
      const itemIndex = state.items.findIndex(i => i._id === item._id)
      state.items.splice(itemIndex, 1, item)
    }
  },
  actions: {
    setItems ({commit}, items) {
      commit('setItems', items)
    },
    updateItem ({commit}, item) {
      commit('updateItem', item)
    }
  },
  strict: process.env.NODE_ENV !== 'production'
})

export default store
