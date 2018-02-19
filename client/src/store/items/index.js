import itemsService from '@/services/itemsService'
import { getErrorMsg, itemsMsgs } from '@/helpers'

const state = {
  items: [],
  listViewStatus: null
}

const mutations = {
  setItems (state, items) {
    state.items = items
  },
  updateItem (state, item) {
    const itemIndex = state.items.findIndex(i => i._id === item._id)
    state.items.splice(itemIndex, 1, item)
  },
  setListViewStatus (state, status) {
    state.listViewStatus = status
  }
}

const actions = {
  getItems ({commit}) {
    return itemsService.getItems()
      .then(items => {
        if (items && items.length > 0) {
          commit('setItems', items)
        } else {
          commit('setListViewStatus', itemsMsgs.noItems)
        }
      })
      .catch(err => {
        commit('setListViewStatus', getErrorMsg(err))
      })
  },
  updateItem ({commit}, { item, onSuccess, onError }) {
    return itemsService.updateItem(item)
      .then(() => {
        commit('updateItem', item)
        onSuccess()
      })
      .catch(onError)
  }
}

const items = {
  namespaced: true,
  state,
  mutations,
  actions
}

export default items
