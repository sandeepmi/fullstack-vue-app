import itemsService from '@/services/itemsService'
import { getErrorMsg, messages } from '@/helpers'
import * as types from '../mutation-types'

const state = {
  items: [],
  listViewStatus: null,
  isLoading: false,
  isSaving: false
}

const getters = {
  itemCount: state => {
    return state.items.length
  }
}

const mutations = {
  [types.SET_ITEMS] (state, items) {
    state.items = items
  },
  [types.ADD_ITEM] (state, item) {
    state.items.push(item)
  },
  [types.UPDATE_ITEM] (state, item) {
    const itemIndex = state.items.findIndex(i => i._id === item._id)
    state.items.splice(itemIndex, 1, item)
  },
  [types.DELETE_ITEM] (state, item) {
    const itemIndex = state.items.findIndex(i => i._id === item._id)
    state.items.splice(itemIndex, 1)
  },
  [types.SET_LIST_VIEW_STATUS] (state, status) {
    state.listViewStatus = status
  },
  [types.SET_LOADING_STATUS] (state, isLoading) {
    state.isLoading = isLoading
  },
  [types.SET_SAVING_STATUS] (state, isSaving) {
    state.isSaving = isSaving
  }
}

const actions = {
  getItems ({ commit }) {
    commit(types.SET_LOADING_STATUS, true)
    return itemsService.getItems()
      .then(items => {
        if (items && items.length > 0) {
          commit(types.SET_ITEMS, items)
        } else {
          commit(types.SET_LIST_VIEW_STATUS, messages.items.noItems)
        }
        commit(types.SET_LOADING_STATUS, false)
      })
      .catch(err => {
        commit(types.SET_LIST_VIEW_STATUS, getErrorMsg(err))
        commit(types.SET_LOADING_STATUS, false)
      })
  },
  addOrUpdateItem ({ commit }, { item, onSuccess, onError }) {
    commit(types.SET_SAVING_STATUS, true)

    const isNewItem = !item._id
    let promise = isNewItem
      ? itemsService.createItem(item)
      : itemsService.updateItem(item)

    promise = promise
      .then(savedItem => {
        isNewItem ? commit(types.ADD_ITEM, savedItem) : commit(types.UPDATE_ITEM, savedItem)
        commit(types.SET_SAVING_STATUS, false)
        onSuccess()
      })
      .catch(err => {
        commit(types.SET_SAVING_STATUS, false)
        onError(err)
      })

    return promise
  },
  deleteItem ({ commit }, { item, onSuccess, onError }) {
    item.isDeleting = true
    commit(types.UPDATE_ITEM, item)

    return itemsService.deleteItem(item)
      .then(() => {
        commit(types.DELETE_ITEM, item)
        onSuccess()
      })
      .catch(err => {
        delete item.isDeleting
        commit(types.UPDATE_ITEM, item)
        onError(err)
      })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
