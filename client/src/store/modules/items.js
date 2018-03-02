import itemsService from '@/services/itemsService'
import { getErrorMsg, messages, delay, cancelDelayedAction, promiseResult } from '@/helpers'
import * as types from '../mutation-types'

const state = {
  items: [],
  listViewStatus: null,
  isLoading: false,
  isSaving: false
}

const getters = {
  itemCount: state => {
    if (state.isLoading || state.listViewStatus) return ''
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
  async getItems ({ commit }) {
    // show loading with delay
    const delayId = delay(() => commit(types.SET_LOADING_STATUS, true))

    const [error, items] = await promiseResult(itemsService.getItems())

    if (!error) {
      if (items && items.length > 0) {
        commit(types.SET_ITEMS, items)
      } else {
        commit(types.SET_LIST_VIEW_STATUS, messages.items.noItems)
      }
    } else {
      commit(types.SET_LIST_VIEW_STATUS, getErrorMsg(error))
    }

    // hide loading
    cancelDelayedAction(delayId)
    commit(types.SET_LOADING_STATUS, false)
  },
  async addOrUpdateItem ({ commit }, item) {
    commit(types.SET_SAVING_STATUS, true)

    const isNewItem = !item._id
    const [error, savedItem] = isNewItem
      ? await promiseResult(itemsService.createItem(item))
      : await promiseResult(itemsService.updateItem(item))

    if (!error) {
      isNewItem ? commit(types.ADD_ITEM, savedItem) : commit(types.UPDATE_ITEM, item)
    }

    commit(types.SET_SAVING_STATUS, false)

    return error
  },
  async deleteItem ({ commit }, item) {
    item.isDeleting = true
    commit(types.UPDATE_ITEM, item)

    const [error] = await promiseResult(itemsService.deleteItem(item))
    if (!error) {
      commit(types.DELETE_ITEM, item)
    } else {
      delete item.isDeleting
      commit(types.UPDATE_ITEM, item)
    }

    return error
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
