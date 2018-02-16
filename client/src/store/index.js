import Vue from 'vue'
import Vuex from 'vuex'
import itemsService from '@/services/itemsService'

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
    getItems ({commit}) {
      itemsService.getItems()
        .then(res => res.json())
        .then(items => {
          commit('setItems', items)
        })
    },
    updateItem ({commit}, { item, onSuccess }) {
      return itemsService.updateItem(item)
        .then(res => {
          if (res.ok) {
            commit('updateItem', item)
            onSuccess()
          }
        })
    }
  },
  strict: process.env.NODE_ENV !== 'production'
})

export default store
