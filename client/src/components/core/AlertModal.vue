<template>
  <Modal @close="closeModal">
    <h2>{{options.title}}</h2>
    <p>{{options.message}}</p>
    <div v-if="options.actions">
      <span v-for="action in options.actions" v-bind:key="action.label" class="mr10">
        <button class="btn light-blue darken-1 waves-effect waves-light" @click="action.cancel ? closeModal() : action.callback()">{{action.label}}</button>
      </span>
    </div>
  </Modal>
</template>

<script>
import Modal from './Modal'
import { mapActions } from 'vuex'

export default {
  props: ['options'],
  components: {
    Modal
  },
  methods: {
    ...mapActions([
      'closeModal'
    ])
  }
}
</script>
