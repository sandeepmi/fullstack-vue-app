import itemsService from '@/services/itemsService'

const state = {
  items: []
}

const mutations = {
  setItems (state, items) {
    state.items = items
  },
  updateItem (state, item) {
    const itemIndex = state.items.findIndex(i => i._id === item._id)
    state.items.splice(itemIndex, 1, item)
  }
}

const actions = {
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
}

const items = {
  namespaced: true,
  state,
  mutations,
  actions
}

export default items
