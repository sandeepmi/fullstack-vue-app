<template>
  <Modal @close="closeModal($root)">
    <h2>{{options.title}}</h2>
    <p>{{options.message}}</p>
    <div v-if="options.actions">
      <span v-for="action in options.actions" v-bind:key="action.label" class="mr-2">
        <button class="ss-btn" @click="action.cancel ? closeModal($root) : action.callback()">{{action.label}}</button>
      </span>
    </div>
  </Modal>
</template>

<script>
import Modal from './Modal'
import { closeModal } from '@/helpers'

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
