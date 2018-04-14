<template>
  <Modal :options="options" @close="close">
    <h2>{{title}}</h2>
      <form @submit.prevent="saveItem(item)">
        <div class="form-group">
          <label for="item_title" class="sr-only">Title</label>
          <input id="item_title" type="text" v-model="item.title" ref="inputTitle" placeholder="Title" class="form-control">
        </div>
        <div class="form-group">
          <label for="item_type" class="sr-only">Type</label>
          <input id="item_type" type="text" v-model="item.type" placeholder="Type" class="form-control">
        </div>
        <div v-if="!isSaving">
          <button type="submit" class="btn">Submit</button>
          <a class="btn btn-secondary" @click="close">Cancel</a>
        </div>
        <Loading v-else size="small" centered />
      </form>
  </Modal>
</template>

<script>
import { Modal, Loading } from '../core'
import { closeModal, messages, showToast } from '@/helpers'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('items')

export default {
  name: 'EditItem',
  props: ['item'],
  components: {
    Modal,
    Loading
  },
  data () {
    return {
      title: '',
      options: {
        width: '400px'
      }
    }
  },
  computed: mapState([
    'isSaving'
  ]),
  mounted () {
    // set modal title
    this.title = this.item._id ? 'Edit Item' : 'Add Item'

    // set default focus
    this.$refs.inputTitle.focus()
  },
  methods: {
    ...mapActions([
      'addOrUpdateItem'
    ]),

    close () {
      closeModal(this.$root)
    },

    saveItem (item) {
      this.addOrUpdateItem(item)
        .then(error => {
          this.close()
          showToast(error, messages.items.editSuccess)
        })
    }
  }
}
</script>
