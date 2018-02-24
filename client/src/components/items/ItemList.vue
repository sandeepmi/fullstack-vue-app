<template>
  <div class="container">
    <h1 class="my-3">
      Items ({{itemCount}})
      <a class="icon-link" @click="showAddItemView()">
        <i class="material-icons">add</i>
      </a>
    </h1>
    <Loading v-if="isLoading" type="card" />
    <div v-else-if="items.length > 0">
      <ul class="list-group ss-list-group">
        <li v-for="item in items" v-bind:key="item._id" class="list-group-item item">
          <div class="item-actions float-right mt-1">
            <div v-if="!item.isDeleting">
              <a class="float-right icon-link pt-2" @click="showDeleteConfirmView(item)">
                <i class="material-icons">delete</i>
              </a>
              <a class="float-right icon-link pt-2" @click="showEditItemView(item)">
                <i class="material-icons">mode_edit</i>
              </a>
            </div>
            <Loading v-else size="small" />
          </div>
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
import { cloneObj, showModal, messages, getErrorMsg, showAlertModal, closeModal } from '@/helpers'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'Items',
  components: {
    Loading
  },
  computed: {
    ...mapState('items', {
      items: 'items',
      status: 'listViewStatus',
      isLoading: 'isLoading'
    }),
    ...mapGetters('items', [
      'itemCount'
    ])
  },
  mounted () {
    this.getItems()
  },
  methods: {
    ...mapActions('items', [
      'getItems',
      'deleteItem'
    ]),

    ...mapActions('toasts', [
      'addToast'
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
        this.deleteItem({
          item,
          onSuccess: () => {
            closeModal(this.$root)
            this.addToast({
              text: messages.items.deleteSuccess,
              type: 'success'
            })
          },
          onError: err => {
            closeModal(this.$root)
            this.addToast({
              text: getErrorMsg(err),
              type: 'error'
            })
          }
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
            cancel: true
          }
        ]
      }
      showAlertModal(this.$root, options)
    }
  }
}
</script>
