<template>
  <Modal @close="close">
    <h2>Edit Item</h2>
    <div class="container">
      <div class="row">
        <form class="col s12" @submit.prevent="saveItem(item)">
          <div class="row">
            <div class="input-field col s6">
              <input id="item_title" type="text" v-model="item.title" class="validate">
              <label for="item_title" class="active">Title</label>
            </div>
            <div class="input-field col s6">
              <input id="item_type" type="text" v-model="item.type" class="validate">
              <label for="item_type" class="active">Type</label>
            </div>
          </div>
          <div class="row">
            <div class="col s12">
              <button class="btn light-blue darken-1 waves-effect waves-light">Submit</button>
              <a class="btn light-blue darken-1 waves-effect waves-light" @click="close">Cancel</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from '../core/Modal'
import { closeModal, itemsMsgs, getErrorMsg } from '@/helpers'
import { mapActions } from 'vuex'

export default {
  name: 'EditItem',
  props: ['item'],
  components: {
    Modal
  },
  methods: {
    ...mapActions('items', [
      'updateItem'
    ]),

    ...mapActions('toasts', [
      'addToast'
    ]),

    close () {
      closeModal(this.$root)
    },

    saveItem (item) {
      this.updateItem({
        item,
        onSuccess: () => {
          this.close()
          this.addToast({
            text: itemsMsgs.editSuccess,
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
