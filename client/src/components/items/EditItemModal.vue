<template>
  <Modal :options="options" @close="close">
    <h2>{{title}}</h2>
    <Form :onSubmit="onSubmit">
      <InputGroup label="Title" name="itemTitle" v-model="item.title" required :setFocus="true" />
      <InputGroup label="Type" name="itemType" v-model="item.type" required />
      <Button type="submit" :loading="isSaving">Submit</Button>
      <a class="btn btn-secondary" @click="close">Cancel</a>
    </Form>
  </Modal>
</template>

<script>
import { Modal, Form, InputGroup, Button, Alert } from '../core'
import { closeModal, messages, showToast } from '@/helpers'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('items')

export default {
  name: 'EditItem',
  props: ['item'],
  components: {
    Modal,
    Form,
    InputGroup,
    Button,
    Alert
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
  },
  methods: {
    ...mapActions([
      'addOrUpdateItem'
    ]),

    close () {
      closeModal(this.$root)
    },

    onSubmit () {
      this.addOrUpdateItem(this.item)
        .then(error => {
          this.close()
          showToast(error, messages.items.editSuccess)
        })
    }
  }
}
</script>
