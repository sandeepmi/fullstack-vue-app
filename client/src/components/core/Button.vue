<template>
  <button class="btn" @click="clickEvent" :disabled="loading">
    <slot v-if="!loading"></slot>
    <Loading v-if="loading" centered />
  </button>
</template>

<script>
import Loading from './Loading'

export default {
  props: {
    onClick: Function,
    loading: Boolean
  },
  components: {
    Loading
  },
  methods: {
    clickEvent () {
      if (this.onClick) {
        this.onClick()
      }
    }
  }
}
</script>
