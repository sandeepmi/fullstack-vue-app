<template>
  <div class="form-group">
    <label :for="name" :class="cssClass">{{label}}</label>
    <slot></slot>
    <div v-if="error" class="text-left text-danger">{{error}}</div>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    name: String,
    srOnly: {
      type: Boolean,
      default: true
    },
    error: String
  },
  computed: {
    cssClass () {
      return {
        'sr-only': this.srOnly
      }
    }
  }
}
</script>
