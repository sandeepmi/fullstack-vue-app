<template>
  <div class="container">
    <h1 class="my-3">
      Items <span v-if="itemCount">({{itemCount}})</span>
      <a class="btn float-right" @click="showAddItemView()">Add Item</a>
    </h1>
    <transition name="fade" mode="out-in">
      <Loading v-if="isLoading" type="card" />
      <div v-else-if="itemCount > 0">
        <ul class="list-group">
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
            <h5 class="mb-0 text-truncate">{{item.title}}</h5>
            <div class="text-muted">{{item.type}}</div>
          </li>
        </ul>
      </div>
      <div class="alert alert-danger" v-if="status" v-text="status"></div>
    </transition>
  </div>
</template>

<script>
import EditItem from './EditItemModal'
import Loading from '../core/Loading'
import { cloneObj, showModal, messages, showToast, showAlertModal, closeModal } from '@/helpers'
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
