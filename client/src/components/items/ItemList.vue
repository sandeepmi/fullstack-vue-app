<template>
  <div class="container">
    <h1>Items</h1>
    <ul class="collection">
      <li v-for="item in items" v-bind:key="item._id" class="collection-item item">
        <a class="btn-floating light-blue darken-1 right" @click="editItem(item)"><i class="material-icons">mode_edit</i></a>
        <span>{{item.title}}</span><br>
        <span>{{item.type}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import EditItemModal from './EditItemModal'
import { cloneObj } from '../../helpers/utils'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Items',
  computed: mapState('items', {
    items: state => state.items
  }),
  mounted () {
    this.getItems()
  },
  methods: {
    ...mapActions([
      'showModal'
    ]),

    ...mapActions('items', [
      'getItems'
    ]),

    editItem (item) {
      this.showModal({
        component: EditItemModal,
        props: {
          item: cloneObj(item)
        }
      })
    }
  }
}
</script>
