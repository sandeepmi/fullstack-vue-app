<template>
  <Modal @close="closeModal($root)">
    <h2>{{options.title}}</h2>
    <p>{{options.message}}</p>
    <div v-if="options.actions">
      <span v-for="action in options.actions" v-bind:key="action.label">
        <button class="btn light-blue darken-1 waves-effect waves-light" @click="action.cancel ? closeModal($root) : action.callback()">{{action.label}}</button>&nbsp;
      </span>
    </div>
  </Modal>
</template>

<script>
import Modal from './Modal'
import { closeModal } from '../../common/modal'

export default {
  props: ['options'],
  components: {
    Modal
  },
  methods: {
    closeModal
  }
}
</script>
