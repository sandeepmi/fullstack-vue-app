<template>
  <Modal @close="close">
    <h2>{{title}}</h2>
      <form @submit.prevent="saveItem(item)">
        <div class="form-group">
          <label for="item_title" class="sr-only">Title</label>
          <input id="item_title" type="text" v-model="item.title" placeholder="Title" class="form-control">
        </div>
        <div class="form-group">
          <label for="item_type" class="sr-only">Type</label>
          <input id="item_type" type="text" v-model="item.type" placeholder="Type" class="form-control">
        </div>
        <div v-if="!isSaving">
          <button type="submit" class="btn">Submit</button>
          <a class="btn btn-secondary" @click="close">Cancel</a>
        </div>
        <Loading v-else size="small" centered="true" />
      </form>
  </Modal>
</template>

<script>
import Modal from '../core/Modal'
import Loading from '../core/Loading'
import { closeModal, messages, getErrorMsg } from '@/helpers'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'EditItem',
  props: ['item'],
  components: {
    Modal,
    Loading
  },
  data () {
    return {
      title: ''
    }
  },
  computed: mapState('items', [
    'isSaving'
  ]),
  mounted () {
    this.title = this.item._id ? 'Edit Item' : 'Add Item'
  },
  methods: {
    ...mapActions('items', [
      'addOrUpdateItem'
    ]),

    ...mapActions('toasts', [
      'addToast'
    ]),

    close () {
      closeModal(this.$root)
    },

    saveItem (item) {
      this.addOrUpdateItem({
        item,
        onSuccess: () => {
          this.close()
          this.addToast({
            text: messages.items.editSuccess,
            type: 'success'
          })
        },
        onError: err => {
          this.close()
          this.addToast({
            text: getErrorMsg(err),
            type: 'error'
          })
        }
      })
    }
  }
}
</script>
