<template>
  <form @submit.prevent="onFormSubmit">
    <slot></slot>
  </form>
</template>

<script>
import { validateForm } from '@/helpers'

export default {
  name: 'Form',
  props: {
    onSubmit: Function
  },
  methods: {
    onFormSubmit () {
      const isFormValid = validateForm(this)
      if (!isFormValid) return

      this.onSubmit()
    }
  }
}
</script>
