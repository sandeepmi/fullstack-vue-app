<template>
  <div class="container">
    <h1 class="mt-3">Items</h1>
    <Loading v-if="isLoading" type="card" />
    <div v-else-if="items.length > 0">
      <ul class="list-group ss-list-group">
        <li v-for="item in items" v-bind:key="item._id" class="list-group-item item">
          <a class="float-right icon-link pt-2" @click="editItem(item)"><i class="material-icons">mode_edit</i></a>
          <span>{{item.title}}</span><br>
          <span>{{item.type}}</span>
        </li>
      </ul>
    </div>
    <div class="red-text" v-if="status" v-text="status"></div>
  </div>
</template>

<script>
import EditItem from './EditItemModal'
import Loading from '../core/Loading'
import { cloneObj, showModal } from '@/helpers'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Items',
  components: {
    Loading
  },
  computed: mapState('items', {
    items: 'items',
    status: 'listViewStatus',
    isLoading: 'isLoading'
  }),
  mounted () {
    this.getItems()
  },
  methods: {
    ...mapActions('items', [
      'getItems'
    ]),

    editItem (item) {
      showModal(this.$root, EditItem, { item: cloneObj(item) })
    }
  }
}
</script>
