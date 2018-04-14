<template>
  <div class="container">
    <h1 class="my-3">
      Items <span v-if="itemCount" class="item-count">({{itemCount}})</span>
      <a class="btn float-right" @click="showAddItemView()">Add Item</a>
    </h1>
    <transition name="fade" mode="out-in">
      <Loading v-if="isLoading" type="card" />
      <div v-else-if="itemCount > 0">
        <ul class="list-group">
          <li v-for="item in items" v-bind:key="item._id" class="list-group-item item">
            <div class="item-actions float-right mt-1">
              <div v-if="!item.isDeleting">
                <a class="item-delete float-right icon-link pt-2" @click="showDeleteConfirmView(item)">
                  <i class="material-icons">delete</i>
                </a>
                <a class="item-edit float-right icon-link pt-2" @click="showEditItemView(item)">
                  <i class="material-icons">mode_edit</i>
                </a>
              </div>
              <Loading v-else size="small" />
            </div>
            <h5 class="mb-0 text-truncate">{{item.title}}</h5>
            <div class="text-muted">{{item.type}}</div>
          </li>
        </ul>
      </div>
    </transition>
    <Alert :text="status" />
  </div>
</template>

<script>
import EditItem from './EditItemModal'
import { Loading, Alert } from '../core'
import { showModal, showAlertModal, closeModal, cloneObj, messages, showToast } from '@/helpers'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapGetters, mapActions } = createNamespacedHelpers('items')

export default {
  name: 'Items',
  components: {
    Loading,
    Alert
  },
  computed: {
    ...mapState({
      items: 'items',
      status: 'listViewStatus',
      isLoading: 'isLoading'
    }),
    ...mapGetters([
      'itemCount'
    ])
  },
  mounted () {
    this.getItems()
  },
  methods: {
    ...mapActions([
      'getItems',
      'deleteItem'
    ]),

    showAddItemView (item) {
      const newItem = {
        title: '',
        type: ''
      }
      showModal(this.$root, EditItem, { item: newItem })
    },

    showEditItemView (item) {
      showModal(this.$root, EditItem, { item: cloneObj(item) })
    },

    showDeleteConfirmView (item) {
      const confirmCallback = () => {
        closeModal(this.$root)

        this.deleteItem(item)
          .then(error => {
            showToast(error, messages.items.deleteSuccess)
          })
      }

      const options = {
        message: 'Are you sure you want to delete?',
        actions: [
          {
            label: 'Yes',
            callback: confirmCallback
          },
          {
            label: 'No',
            cancel: true,
            cssClass: 'btn-secondary'
          }
        ]
      }
      showAlertModal(this.$root, options)
    }
  }
}
</script>
