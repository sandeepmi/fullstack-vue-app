<template>
  <transition-group name="toast" tag="div" class="toasts-container">
    <div v-for="toast in toasts" v-bind:key="toast.id" :class="['vue-toast', 'toast-' + toast.type]">
      {{toast.text}}
      <a class="toast-close right" @click="removeToast(toast)"><i class="material-icons">close</i></a>
    </div>
  </transition-group>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Toasts',
  computed: mapState('toasts', {
    toasts: state => {
      return state.toasts
    }
  }),
  methods: {
    ...mapActions('toasts', [
      'removeToast'
    ])
  }
}
</script>
