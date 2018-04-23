<template>
  <Modal :options="modalOptions" @close="close">
    <h2>{{title}}</h2>
    <Form :onSubmit="onSubmit">
      <InputGroup label="Title" name="itemTitle" v-model="item.title" required setFocus />
      <SelectGroup label="Type" name="itemType" v-model="item.type" :options="itemTypes" required :srOnly="false" />
      <Button type="submit" :loading="isSaving">Submit</Button>
      <a class="btn btn-secondary" @click="close">Cancel</a>
    </Form>
  </Modal>
</template>

<script>
import { Modal, Form, InputGroup, SelectGroup, Button, Alert } from '../core'
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
    SelectGroup,
    Button,
    Alert
  },
  data () {
    return {
      title: '',
      modalOptions: {
        width: '400px'
      },
      itemTypes: [
        { text: 'Test Category', value: 'test category' },
        { text: 'Lorem ipsum', value: 'Lorem ipsum' },
        { text: 'Type 3', value: 'Type 3' }
      ]
    }
  },
  computed: mapState([
    'isSaving'
  ]),
  created () {
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
